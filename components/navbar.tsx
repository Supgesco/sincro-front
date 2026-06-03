"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LayoutDashboard, CheckSquare, FolderKanban, Users, Shield, Bell, Sun, Moon } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: CheckSquare, label: "Tarefas", href: "/tarefas" },
  { icon: FolderKanban, label: "Projetos", href: "/projetos" },
  { icon: Users, label: "Equipes", href: "/equipes" },
  { icon: Shield, label: "Painel Admin", href: "/admin" },
]

export function Navbar() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  
  const isDark = theme === "dark"
  
  return (
    <nav className="border-b border-sincro-border bg-sincro-bg">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Sincro" width={120} height={32} className="h-8 w-auto" priority />
          </Link>
          
          <div className="flex items-center gap-4">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors ${
                    isActive
                      ? "bg-black/10 dark:bg-white/10"
                      : "hover:bg-black/5 dark:hover:bg-white/5"
                  } text-sincro-text-primary`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors hover:bg-black/10 dark:hover:bg-white/10 text-sincro-text-primary"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button className="p-2 rounded-full transition-colors hover:bg-black/10 dark:hover:bg-white/10 text-sincro-text-primary">
            <Bell className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sincro-text-primary/20" />
            <span className="text-sm text-sincro-text-primary">Seu Nome</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
