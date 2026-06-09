"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { LayoutDashboard, CheckSquare, FolderKanban, Users, Shield, Bell, Sun, Moon, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { useToast } from "@/components/toast"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: CheckSquare, label: "Tarefas", href: "/tarefas" },
  { icon: FolderKanban, label: "Projetos", href: "/projetos" },
  { icon: Users, label: "Equipes", href: "/equipes" },
  { icon: Shield, label: "Painel Admin", href: "/admin" },
]

const typeIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const typeColors = {
  success: "text-status-green",
  error: "text-status-red",
  warning: "text-status-orange",
  info: "text-sincro-text-secondary",
}

export function Navbar() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const { notificacoes, markAllRead, clearNotificacoes } = useToast()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isDark = theme === "dark"
  const naoLidas = notificacoes.filter(n => !n.lida).length

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  const handleBellClick = () => {
    setOpen(prev => !prev)
    if (!open && naoLidas > 0) {
      markAllRead()
    }
  }

  return (
    <nav className="border-b border-sincro-border bg-sincro-bg relative">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo.png`} alt="Sincro" width={120} height={32} className="h-8 w-auto" priority />
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

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={handleBellClick}
              className="relative p-2 rounded-full transition-colors hover:bg-black/10 dark:hover:bg-white/10 text-sincro-text-primary"
            >
              <Bell className="w-5 h-5" />
              {naoLidas > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-status-red text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {naoLidas > 9 ? "9+" : naoLidas}
                </span>
              )}
            </button>

            {open && (
              <div className="absolute right-0 top-full mt-2 w-80 max-h-[70vh] overflow-y-auto bg-sincro-bg border border-sincro-border rounded-2xl shadow-xl z-[9998]">
                <div className="flex items-center justify-between px-4 py-3 border-b border-sincro-border">
                  <span className="text-sm font-semibold text-sincro-text-primary">Notificações</span>
                  {notificacoes.length > 0 && (
                    <button
                      onClick={() => { clearNotificacoes(); setOpen(false) }}
                      className="text-xs text-sincro-text-secondary hover:text-sincro-text-primary transition-colors"
                    >
                      Limpar tudo
                    </button>
                  )}
                </div>
                {notificacoes.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-sincro-text-secondary">
                    Nenhuma notificação
                  </div>
                ) : (
                  <div className="divide-y divide-sincro-border">
                    {notificacoes.map(n => {
                      const Icon = typeIcons[n.type]
                      return (
                        <div
                          key={n.id}
                          className={`flex items-start gap-3 px-4 py-3 ${!n.lida ? "bg-sincro-bg-accent/50" : ""}`}
                        >
                          <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${typeColors[n.type]}`} />
                          <div className="flex-1 min-w-0">
                            <span className="text-sm text-sincro-text-primary block">{n.message}</span>
                            <span className="text-xs text-sincro-text-secondary">
                              {new Date(n.timestamp).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                          {!n.lida && (
                            <div className="w-2 h-2 rounded-full bg-status-blue shrink-0 mt-1.5" />
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sincro-text-primary/20" />
            <span className="text-sm text-sincro-text-primary">Seu Nome</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
