"use client"

import { useState, useEffect, useCallback, useRef, createContext, useContext } from "react"
import { CheckCircle, AlertTriangle, Info, X, AlertCircle } from "lucide-react"

type ToastType = "success" | "error" | "warning" | "info"

interface Toast {
  id: number
  message: string
  type: ToastType
}

export interface Notificacao {
  id: number
  message: string
  type: ToastType
  lida: boolean
  timestamp: number
}

const NOTIFICACOES_KEY = "sincro-notificacoes"

const getNotificacoesStorage = (): Notificacao[] => {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(NOTIFICACOES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const saveNotificacoesStorage = (notificacoes: Notificacao[]) => {
  if (typeof window === "undefined") return
  localStorage.setItem(NOTIFICACOES_KEY, JSON.stringify(notificacoes))
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void
  notificar: (message: string, type?: ToastType) => void
  notificacoes: Notificacao[]
  markAllRead: () => void
  clearNotificacoes: () => void
}

const ToastContext = createContext<ToastContextValue>({
  toast: () => {},
  notificar: () => {},
  notificacoes: [],
  markAllRead: () => {},
  clearNotificacoes: () => {},
})

export function useToast() {
  return useContext(ToastContext)
}

let idCounter = 0

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([])
  const pendingRef = useRef<Notificacao[]>([])

  useEffect(() => {
    const loaded = getNotificacoesStorage()
    const seen = new Set<number>()
    const unique = loaded.filter(n => {
      if (seen.has(n.id)) return false
      seen.add(n.id)
      return true
    })
    if (unique.length !== loaded.length) saveNotificacoesStorage(unique)
    setNotificacoes(unique)
  }, [])

  useEffect(() => {
    if (pendingRef.current.length > 0) {
      const existing = getNotificacoesStorage()
      const updated = [...pendingRef.current, ...existing].slice(0, 50)
      saveNotificacoesStorage(updated)
      setNotificacoes(updated)
      pendingRef.current = []
    }
  })

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now() + (++idCounter)
    setToasts(prev => [...prev, { id, message, type }])
  }, [])

  const notificar = useCallback((message: string, type: ToastType = "info") => {
    const newNotif: Notificacao = {
      id: Date.now() + (++idCounter),
      message,
      type,
      lida: false,
      timestamp: Date.now(),
    }
    pendingRef.current = [newNotif, ...pendingRef.current]
  }, [])

  const markAllRead = useCallback(() => {
    setNotificacoes(prev => {
      const updated = prev.map(n => ({ ...n, lida: true }))
      saveNotificacoesStorage(updated)
      return updated
    })
  }, [])

  const clearNotificacoes = useCallback(() => {
    saveNotificacoesStorage([])
    setNotificacoes([])
  }, [])

  const remove = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast, notificar, notificacoes, markAllRead, clearNotificacoes }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onRemove={() => remove(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

const icons: Record<ToastType, typeof CheckCircle> = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const colors: Record<ToastType, string> = {
  success: "bg-status-green text-white",
  error: "bg-status-red text-white",
  warning: "bg-status-orange text-white",
  info: "bg-sincro-bg-accent text-sincro-text-primary border border-sincro-border",
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  const Icon = icons[toast.type]

  useEffect(() => {
    const timer = setTimeout(onRemove, 4000)
    return () => clearTimeout(timer)
  }, [onRemove])

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg pointer-events-auto animate-slide-in ${colors[toast.type]}`}>
      <Icon className="w-4 h-4 shrink-0" />
      <span className="text-sm font-semibold">{toast.message}</span>
      <button onClick={onRemove} className="ml-2 shrink-0 hover:opacity-70">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
