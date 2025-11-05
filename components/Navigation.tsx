'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, PlusCircle, BookOpen, BarChart3, GraduationCap } from 'lucide-react'

interface NavItem {
  href: string
  label: string
  icon: React.ElementType
  color: 'indigo' | 'emerald' | 'blue' | 'purple'
}

export default function Navigation() {
  const pathname: string = usePathname()

  const navItems: NavItem[] = [
    { href: '/', label: 'Início', icon: Home, color: 'indigo' },
    { href: '/criar-prova', label: 'Criar Prova', icon: PlusCircle, color: 'emerald' },
    { href: '/provas', label: 'Provas', icon: BookOpen, color: 'blue' },
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3, color: 'purple' },
  ]

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                EduProva
              </span>
              <span className="text-xs text-slate-500 font-medium">Sistema Educacional</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            {navItems.map((item: NavItem) => {
              const Icon = item.icon
              const isActive: boolean = pathname === item.href
              
              const colorClasses: Record<NavItem['color'], string> = {
                indigo: isActive 
                  ? 'text-indigo-600 bg-indigo-50 border-indigo-200' 
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50',
                emerald: isActive 
                  ? 'text-emerald-600 bg-emerald-50 border-emerald-200' 
                  : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/50',
                blue: isActive 
                  ? 'text-blue-600 bg-blue-50 border-blue-200' 
                  : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/50',
                purple: isActive 
                  ? 'text-purple-600 bg-purple-50 border-purple-200' 
                  : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50/50'
              }
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-sm
                    transition-all duration-300 border border-transparent
                    ${colorClasses[item.color as keyof typeof colorClasses]}
                    ${isActive ? 'shadow-sm' : 'hover:shadow-sm'}
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'animate-pulse-soft' : ''}`} />
                  <span className="hidden md:block">{item.label}</span>
                </Link>
              )
            })}
            
            {/* User Avatar Placeholder */}
            <div className="ml-4 pl-4 border-l border-slate-200">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-slate-600">U</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}