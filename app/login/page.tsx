"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [lembrar, setLembrar] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-sincro-bg text-sincro-text-primary flex items-center justify-center p-6">
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-3">
          <Image
            src="/logo.png"
            alt="Sincro"
            width={160}
            height={48}
            className="h-12 w-auto"
            priority
          />
          <h1 className="text-2xl font-extrabold text-center">Entrar na Plataforma</h1>
          <p className="text-sm text-sincro-text-secondary text-center">
            Gerencie seus projetos e tarefas em um só lugar.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full bg-sincro-modal-sidebar border border-sincro-border rounded-2xl p-6 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-sincro-text-secondary">
              E-mail
            </label>
            <div className="flex items-center gap-2 h-11 px-4 rounded-full bg-white/10 border border-white/20 focus-within:border-white/40 transition-all">
              <Mail className="w-4 h-4 text-white/70 shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="flex-1 bg-transparent outline-none text-sm text-sincro-text-primary placeholder:text-sincro-text-muted"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-sincro-text-secondary">
              Senha
            </label>
            <div className="flex items-center gap-2 h-11 px-4 rounded-full bg-white/10 border border-white/20 focus-within:border-white/40 transition-all">
              <Lock className="w-4 h-4 text-white/70 shrink-0" />
              <input
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="flex-1 bg-transparent outline-none text-sm text-sincro-text-primary placeholder:text-sincro-text-muted"
                required
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="text-white/70 hover:text-white transition-colors"
                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
              >
                {mostrarSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-sincro-text-secondary">
              <input
                type="checkbox"
                checked={lembrar}
                onChange={(e) => setLembrar(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#7A5BEF]"
              />
              Lembrar de mim
            </label>
            <a href="#" className="text-sincro-text-secondary hover:text-sincro-text-primary transition-colors font-semibold">
              Esqueci minha senha
            </a>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 h-11 mt-2 bg-status-green text-white rounded-full text-sm font-extrabold hover:brightness-110 active:scale-95 transition-all"
          >
            <LogIn className="w-4 h-4" />
            Entrar
          </button>

          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[10px] uppercase tracking-wider text-sincro-text-muted">ou</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <p className="text-center text-xs text-sincro-text-secondary">
            Não tem uma conta?{" "}
            <a href="#" className="text-white font-bold hover:underline">
              Cadastre-se
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
