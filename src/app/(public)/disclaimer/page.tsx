import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer',
  robots: { index: false },
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-light text-white mb-2">Disclaimer</h1>
        <p className="text-[#c9a84c] text-sm mb-10">Rock One Square · Senflore Hospitality LLP</p>

        <div className="space-y-6 text-white/60 leading-relaxed text-sm">
          <div className="p-4 border border-[rgba(201,168,76,0.2)] rounded-sm bg-[rgba(201,168,76,0.04)]">
            <p className="text-white/50 text-xs">
              <strong className="text-[#c9a84c]">Note:</strong> This disclaimer is a placeholder. It must be reviewed and approved by qualified legal professionals before this website is published to the public.
            </p>
          </div>

          <p>
            The information published on this website about Rock One Square is provided in good faith for general informational purposes only and is based on project documentation supplied by Senflore Hospitality LLP.
          </p>

          <p>
            All architectural renders, floor plans, specifications, and imagery presented on this website are artist&apos;s impressions and are indicative only. Actual specifications, dimensions, layouts, and finishes may vary. Nothing on this website constitutes a binding offer, guarantee, or contractual commitment.
          </p>

          <p>
            <strong className="text-white">Project specifications:</strong> All areas, floor counts, pricing, availability, construction timelines, and other quantitative data are subject to change and must be verified with the developer before any financial commitment.
          </p>

          <p>
            <strong className="text-white">No investment advice:</strong> Nothing on this website constitutes financial, investment, or legal advice. No representation or warranty is made regarding potential returns, appreciation, or rental income. Prospective buyers and investors should conduct their own due diligence.
          </p>

          <p>
            <strong className="text-white">RERA:</strong> You can check the project&apos;s RERA registration information using <a href="https://reratracker.com/" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] hover:underline">ReraTracker</a>. For official confirmation of registration status, please verify the project&apos;s registration details on the official Uttar Pradesh RERA portal (<a href="https://up-rera.in" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] hover:underline">up-rera.in</a>) before making any purchase decisions.
          </p>

          <p>
            <strong className="text-white">Connectivity and location:</strong> Information regarding nearby infrastructure, travel times, and proposed developments is based on publicly available information and supplied marketing documentation. This information should be independently verified.
          </p>

          <p className="text-white/25 text-xs border-t border-white/5 pt-4">
            Last updated: [Date — to be set before publication]. Senflore Hospitality LLP reserves the right to amend this disclaimer.
          </p>
        </div>
      </div>
    </div>
  )
}
