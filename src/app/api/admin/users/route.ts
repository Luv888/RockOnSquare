import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role !== "superadmin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
      },
      orderBy: [{ role: "asc" }, { createdAt: "asc" }],
    });

    return NextResponse.json({
      users: users.map((u) => ({
        ...u,
        lastLoginAt: u.lastLoginAt?.toISOString() || null,
        createdAt: u.createdAt.toISOString(),
      })),
    });
  } catch (err) {
    console.error("[Users API] Error:", err);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
