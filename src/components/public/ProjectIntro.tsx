import React from 'react'
import Image from 'next/image'
import { Store, Gamepad2, Briefcase, Home, ShieldCheck, Sparkles, MapPin } from 'lucide-react'

export function ProjectIntro() {
  const stats = [
    { value: '~1 Acre', label: 'Land Parcel', sub: 'Prime Raj Nagar Extn' },
    { value: '30 Metres', label: 'Road Frontage', sub: 'High-Visibility Meerut Road' },
    { value: '7 Floors', label: 'Complete', sub: 'Milestone Achieved' },
    { value: '4 Verticals', label: 'Ecosystem', sub: 'Retail &bull; Fun &bull; Work &bull; Living' },
  ]

  const verticals = [
    {
      icon: Store,
      label: 'Retail',
      highlight: '30m Frontage & Atrium',
      desc: 'Prime street-level and atrium shopping with maximum visibility on Meerut Road.',
    },
    {
      icon: Gamepad2,
      label: 'Entertainment',
      highlight: 'Gaming Zone & Recreation',
      desc: 'The district’s largest gaming arena with immersive arcade and family entertainment.',
    },
    {
      icon: Briefcase,
      label: 'Modern Offices',
      highlight: 'Smart Workspaces & HVAC',
      desc: 'Contemporary office suites engineered with integrated climate control and connectivity.',
    },
    {
      icon: Home,
      label: 'Studio Apartments',
      highlight: 'Urban Living & Skyline Views',
      desc: 'Intelligent modular living spaces combining high convenience and address prestige.',
    },
  ]

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#060a14] text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#c9a84c]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Lead Tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-[#c9a84c]" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#c9a84c]">
            The Rock Solid Destination &bull; Senflore Hospitality LLP
          </span>
        </div>

        {/* Top Split: Master Brand Narrative & Architectural Perspective */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          {/* Left Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-[1.15]">
              Designed to{' '}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#c9a84c] via-[#e4c870] to-[#c9a84c]">
                Elevate Every Experience.
              </span>
            </h2>

            <p className="text-white/80 text-base sm:text-lg font-light leading-relaxed">
              Some destinations offer a place to shop. Others offer a place to work, unwind or call home. <strong className="text-white font-medium">ROCK ONE SQUARE</strong> brings them all together.
            </p>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              Spread across one acre, ROCK ONE SQUARE is a thoughtfully planned mixed-use destination that brings together four distinct verticals &mdash; Retail, Entertainment, Modern Offices and Studio Apartments &mdash; under one landmark address.
            </p>

            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              From vibrant retail spaces and immersive entertainment to contemporary workspaces and modern urban living, every level is designed to create a more enriching experience.
            </p>

            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              A destination where everyday moments become memorable, business finds new opportunities and modern lifestyles find their perfect setting.
            </p>

            {/* Brand Callout */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#c9a84c]/15 to-transparent border border-[#c9a84c]/30">
              <p className="font-serif italic text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#c9a84c] via-[#e4c870] to-[#c9a84c]">
                ROCK ONE SQUARE &mdash; Where Every Experience Finds a Higher Level.
              </p>
            </div>
          </div>

          {/* Right Visual: Masterplan Aerial Elevation (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#c9a84c]/30 shadow-2xl group aspect-[4/3] sm:aspect-[16/11]">
              <Image
                src="/images/building-aerial.jpg"
                alt="Rock One Square Aerial Architectural Visualization"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Top floating badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#c9a84c]/40 text-[#e4c870] text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#c9a84c]" />
                  <span>Aerial Masterplan Perspective</span>
                </div>
              </div>

              {/* Bottom location info */}
              <div className="absolute bottom-4 inset-x-4 z-10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-white/90 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#c9a84c]" />
                  <span>Meerut Road, Raj Nagar Extension</span>
                </div>
                <span className="text-[#c9a84c] font-mono font-semibold">~1 ACRE SITE</span>
              </div>
            </div>

            {/* Decorative gold corner accent */}
            <div className="absolute -bottom-3 -right-3 w-20 h-20 border-r-2 border-b-2 border-[#c9a84c]/40 rounded-br-2xl pointer-events-none" />
          </div>
        </div>

        {/* Middle: Architectural Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-gradient-to-b from-[#0a0f1e] to-[#060a14] border border-[#c9a84c]/20 hover:border-[#c9a84c]/50 transition-all group"
            >
              <div className="font-serif text-3xl sm:text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-[#c9a84c] to-[#e4c870] mb-1 group-hover:translate-x-0.5 transition-transform">
                {s.value}
              </div>
              <div className="text-white text-sm font-medium">{s.label}</div>
              <div className="text-white/40 text-xs mt-1" dangerouslySetInnerHTML={{ __html: s.sub }} />
            </div>
          ))}
        </div>

        {/* Bottom: Four Pillars Interactive Cards */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-white">
              An Integrated Mixed-Use Landmark
            </h3>
            <p className="text-white/50 text-xs sm:text-sm mt-2">
              Four thoughtfully planned verticals designed to create continuous footfall and mutual commercial synergy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {verticals.map((v, idx) => {
              const Icon = v.icon
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-gradient-to-b from-[#0e1628]/60 to-[#070b14] border border-white/10 hover:border-[#c9a84c]/50 hover:bg-[#0e1628] transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c] mb-4 group-hover:scale-110 group-hover:bg-[#c9a84c] group-hover:text-[#060a14] transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-white font-medium text-base mb-1">{v.label}</h4>
                    <p className="text-[#c9a84c] text-xs font-mono font-medium mb-3">{v.highlight}</p>
                    <p className="text-white/60 text-xs leading-relaxed">{v.desc}</p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#c9a84c] font-medium">
                    <span>EXPLORE VERTICAL</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
