import { NextRequest, NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation/schemas";
import { generateReferenceId, checkRateLimit, clientIp } from "@/lib/utils";
import { prisma } from "@/lib/db/prisma";

// Rate limit: 5 enquiries per IP per 15 minutes
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

function isDbConfigured(): boolean {
  const uri = process.env.MONGODB_URI || "";
  return (
    uri.length > 0 &&
    !uri.includes("username:password") &&
    !uri.includes("<username>")
  );
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting by IP
    const ip = clientIp(req.headers) ?? "unknown";

    const { allowed } = checkRateLimit(
      `enquiry:${ip}`,
      RATE_LIMIT_MAX,
      RATE_LIMIT_WINDOW_MS
    );

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    // Validate
    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          fields: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const data = parsed.data;

    // Honeypot — silent fake success
    if (data._hp) {
      return NextResponse.json({
        success: true,
        referenceId: `ROS-SPAM-${Date.now()}`,
      });
    }

    const referenceId = generateReferenceId();
    const now = new Date();

    // Persist to MongoDB if configured
    if (isDbConfigured()) {
      try {
        // Find default project (for linking)
        const project = await prisma.project.findFirst({
          select: { id: true },
        });

        await prisma.enquiry.create({
          data: {
            referenceId,
            projectId: project?.id ?? null,
            fullName: data.fullName,
            phone: data.phone,
            email: data.email || null,
            countryCode: "+91",
            enquiryType: data.enquiryType,
            message: data.message || null,
            preferredDate: data.preferredDate ? new Date(data.preferredDate) : null,
            preferredTime: data.preferredTime || null,
            source: "WEBSITE",
            sourcePage: req.headers.get("referer") || null,
            status: "NEW",
            consentGiven: data.consentGiven,
            consentTimestamp: data.consentGiven ? now : null,
            ipAddress: ip !== "unknown" ? ip : null,
            userAgent: req.headers.get("user-agent") || null,
          },
        });

        return NextResponse.json({
          success: true,
          referenceId,
          message: "Your enquiry has been received. Our team will contact you shortly.",
        });
      } catch (dbErr) {
        // Don't report success for a lead that was never saved
        console.error("[Enquiry] Database error:", dbErr);
        return NextResponse.json(
          { error: "We couldn't save your enquiry. Please try again or contact us directly." },
          { status: 503 }
        );
      }
    }

    // Demo mode (no DB configured)
    return NextResponse.json({
      success: true,
      referenceId,
      message:
        "Your enquiry has been received. Our team will contact you shortly.",
      isDemo: true,
    });
  } catch (error) {
    console.error("[Enquiry] Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
