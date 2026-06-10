"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { BarChart3, Users, FolderKanban, ScrollText, Settings, Building2 } from "lucide-react"

const adminNav = [
  { icon: BarChart3, label: "Visão Geral", href: "/admin" },
  { icon: Users, label: "Usuários", href: "/admin/usuarios" },
  { icon: Building2, label: "Setores", href: "/admin/setores" },
  { icon: FolderKanban, label: "Equipes & Projetos", href: "/admin/equipes-projetos" },
  { icon: ScrollText, label: "Logs", href: "/admin/logs" },
  { icon: Settings, label: "Configurações", href: "/admin/configuracoes" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin"
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-sincro-bg text-sincro-text-primary">
      <Navbar />

      <div className="border-b border-sincro-border bg-sincro-bg">
        <div className="px-6 py-3 flex items-center gap-2 overflow-x-auto">
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-sincro-bg-accent text-sincro-text-primary mr-2">
            <Settings className="w-3.5 h-3.5" />
            Admin
          </span>
          {adminNav.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors whitespace-nowrap ${
                  active
                    ? "bg-black/10 dark:bg-white/10"
                    : "hover:bg-black/5 dark:hover:bg-white/5"
                } text-sincro-text-primary`}
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-sincro-text-primary/20">
                  <Icon className="w-4 h-4" />
                </div>
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>

      <main className="p-6">{children}</main>
    </div>
  )
}
