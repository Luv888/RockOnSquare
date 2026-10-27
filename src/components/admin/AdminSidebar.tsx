'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard, Users, Layout, Building2, Star,
  HardHat, HelpCircle, Settings, LogOut, ChevronRight,
} from 'lucide-react'

const NAV = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Leads', href: '/admin/leads', icon: Users },
  { label: 'Banners', href: '/admin/banners', icon: Layout },
  { label: 'Floors', href: '/admin/floors', icon: Building2 },
  { label: 'Amenities', href: '/admin/amenities', icon: Star },
  { label: 'Construction', href: '/admin/construction', icon: HardHat },
  { label: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  if (pathname === '/admin/login') {
    return null
  }

  return (
    <aside className="flex flex-col w-60 min-h-screen bg-[#060a14] border-r border-white/5 flex-shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/5">
        <Link href="/admin/dashboard" className="block focus:outline-none">
          <div className="relative h-9 w-36 mb-1">
            <Image
              src="/images/logo.png"
              alt="Rock One Square"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>
        <p className="text-white/30 text-[10px] uppercase tracking-widest">Admin Portal</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors group ${
                isActive
                  ? 'bg-[rgba(201,168,76,0.1)] text-[#c9a84c]'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{label}</span>
              {isActive && <ChevronRight className="w-3 h-3 ml-auto opacity-50" />}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/5">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
