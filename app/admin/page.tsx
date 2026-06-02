"use client"

import { CircularProgress } from "@/components/circular-progress"
import { Users, FolderKanban, ListTodo, Activity, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"

const cards = [
  { icon: Users, label: "Usuários Ativos", value: 128, cor: "bg-status-cyan-bg text-status-cyan" },
  { icon: FolderKanban, label: "Equipes", value: 14, cor: "bg-status-green-bg text-status-green" },
  { icon: ListTodo, label: "Projetos Ativos", value: 47, cor: "bg-status-orange-bg text-status-orange" },
  { icon: Activity, label: "Tarefas em Aberto", value: 312, cor: "bg-status-yellow-bg text-status-yellow" },
]

const ultimosEventos = [
  { id: 1, tipo: "usuario", texto: "Novo usuário cadastrado: ana.santos@sincro.com", data: "Há 5 min" },
  { id: 2, tipo: "projeto", texto: "Projeto \"Migração Cloud\" criado por Marcos Lima", data: "Há 22 min" },
  { id: 3, tipo: "equipe", texto: "Equipe Design recebeu 3 novos membros", data: "Há 1 h" },
  { id: 4, tipo: "config", texto: "Políticas de senha atualizadas", data: "Há 3 h" },
  { id: 5, tipo: "erro", texto: "Falha ao enviar notificação para 2 usuários", data: "Há 5 h" },
]

const statusTarefa = [
  { status: "Concluídas", valor: 0.62, cor: "bg-status-green" },
  { status: "Em Andamento", valor: 0.23, cor: "bg-status-cyan" },
  { status: "Pendentes", valor: 0.12, cor: "bg-status-orange" },
  { status: "Em Atraso", valor: 0.03, cor: "bg-status-red" },
]

export default function AdminOverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-extrabold leading-none">Visão Geral</h1>
          <p className="text-sm text-sincro-text-secondary mt-2">Indicadores globais e atividade recente da plataforma.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-status-green-bg text-status-green text-xs font-bold">
          <CheckCircle2 className="w-4 h-4" />
          Todos os sistemas operacionais
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => {
          const Icon = c.icon
          return (
            <div key={c.label} className="border border-sincro-border rounded-2xl p-5 bg-sincro-modal-sidebar">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sincro-text-muted">{c.label}</span>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${c.cor}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-3xl font-extrabold">{c.value}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="border border-sincro-border rounded-2xl p-5 bg-sincro-modal-sidebar lg:col-span-1 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Status Global das Tarefas</h2>
          <CircularProgress
            percentage={62}
            label="Taxa de Conclusão"
            value="62%"
            colors={["#A78BFA", "#7A5BEF", "#5A3E99"]}
          />
          <div className="flex flex-col gap-2.5">
            {statusTarefa.map((s) => (
              <div key={s.status}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-sincro-text-secondary font-semibold">{s.status}</span>
                  <span className="font-extrabold">{Math.round(s.valor * 100)}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden bg-white/10">
                  <div className={`h-full ${s.cor}`} style={{ width: `${s.valor * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-sincro-border rounded-2xl p-5 bg-sincro-modal-sidebar lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Atividade da Plataforma</h2>
            <span className="flex items-center gap-1 text-[11px] font-bold text-status-green">
              <TrendingUp className="w-3.5 h-3.5" />
              +12% esta semana
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {ultimosEventos.map((ev) => {
              const cor =
                ev.tipo === "erro" ? "bg-status-red" :
                ev.tipo === "usuario" ? "bg-status-cyan" :
                ev.tipo === "projeto" ? "bg-status-green" :
                ev.tipo === "equipe" ? "bg-status-orange" :
                "bg-sincro-text-secondary/40"
              return (
                <div key={ev.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 border border-sincro-border">
                  <span className={`w-2 h-2 rounded-full ${cor} shrink-0`} />
                  <p className="text-xs text-sincro-text-primary flex-1">{ev.texto}</p>
                  <span className="text-[10px] text-sincro-text-muted font-semibold whitespace-nowrap">{ev.data}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="border border-status-yellow/30 rounded-2xl p-4 bg-status-yellow-bg flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-status-yellow shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-bold text-sincro-text-primary">Atenção: 3 projetos com prazo expirado</p>
          <p className="text-xs text-sincro-text-secondary mt-1">Verifique a aba de Projetos para tomar ação corretiva.</p>
        </div>
        <button className="text-xs font-extrabold text-status-yellow hover:underline">Ver detalhes →</button>
      </div>
    </div>
  )
}
