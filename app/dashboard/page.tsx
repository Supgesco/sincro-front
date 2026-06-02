"use client"

import { useState } from "react"
import { addDays } from "date-fns"
import { Navbar } from "@/components/navbar"
import { CircularProgress } from "@/components/circular-progress"
import { TarefaModal } from "@/components/tarefa-modal"
import { Check, ChevronLeft, ChevronRight, Play } from "lucide-react"

const tarefasData = [
  {
    id: 1,
    nome: "Nome da Tarefa 1",
    criador: "Seu Nome",
    dataCriacao: "25 de janeiro, 2025",
    dataEntrega: "12/04/2026",
    status: "Em Andamento",
    complexidade: "Média Complexidade",
    urgente: true,
    progresso: { atual: 1, total: 2 },
    descricao: "Esta é a descrição detalhada da Tarefa 1, aberta a partir do Dashboard.",
    checklist: [
      { id: 1, texto: "Revisar especificações", concluido: true },
      { id: 2, texto: "Montar esqueleto", concluido: false }
    ],
    membros: ["Pessoa 1", "Pessoa 2"],
    comentarios: [
      { autor: "Pessoa 2", texto: "Já iniciei as correções solicitadas." }
    ],
    aceita: false,
    equipe: "Equipe X",
    data: "12/04/2026"
  },
  {
    id: 2,
    nome: "Nome da Tarefa 2",
    criador: "Seu Nome",
    dataCriacao: "25 de janeiro, 2025",
    dataEntrega: "12/04/2026",
    status: "Em Andamento",
    complexidade: "Média Complexidade",
    urgente: true,
    progresso: { atual: 0, total: 0 },
    descricao: "Esta é a descrição detalhada da Tarefa 2, aberta a partir do Dashboard.",
    checklist: [],
    membros: ["Pessoa 3"],
    comentarios: [],
    aceita: false,
    equipe: "Equipe X",
    data: "12/04/2026"
  },
  {
    id: 3,
    nome: "Nome da Tarefa 3",
    criador: "Seu Nome",
    dataCriacao: "25 de janeiro, 2025",
    dataEntrega: "12/04/2026",
    status: "Não Iniciado",
    complexidade: "Alta Complexidade",
    urgente: false,
    progresso: { atual: 0, total: 0 },
    descricao: "Esta é a descrição detalhada da Tarefa 3, aberta a partir do Dashboard.",
    checklist: [],
    membros: [],
    comentarios: [],
    aceita: true,
    equipe: "Equipe X",
    data: "12/04/2026"
  },
  {
    id: 4,
    nome: "Nome da Tarefa 4",
    criador: "Seu Nome",
    dataCriacao: "25 de janeiro, 2025",
    dataEntrega: "12/04/2026",
    status: "Em Atraso",
    complexidade: "Baixa Complexidade",
    urgente: true,
    progresso: { atual: 0, total: 0 },
    descricao: "Esta é a descrição detalhada da Tarefa 4, aberta a partir do Dashboard.",
    checklist: [],
    membros: [],
    comentarios: [],
    aceita: true,
    equipe: "Equipe X",
    data: "12/04/2026"
  },
]

const atividades = [
  { id: 1, pessoa: "Pessoa 1", acao: "adicionou uma Nova Tarefa", data: "DD/MM/YYYY", projeto: "Projeto X", urgente: true },
  { id: 2, pessoa: "Pessoa 3", acao: "concluiu", item: "uma tarefa", data: "DD/MM/YYYY", projeto: "Projeto X", urgente: false },
  { id: 3, pessoa: "Pessoa 2", acao: "concluiu", item: "uma tarefa", data: "DD/MM/YYYY", projeto: "Projeto X", urgente: false },
]

const DIAS_SEMANA = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"]
const MESES_ABREV = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]

type DiaAgenda = {
  date: Date
  eventos: { nome: string; cor: string }[]
}

const HOJE_BASE = (() => {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
})()

const eventosBaseOffset: Record<number, { nome: string; cor: string }[]> = {
  1: [{ nome: "Reunião 9:00 - 12:00", cor: "bg-status-cyan/80" }],
  3: [{ nome: "Tarefa 2 14:00", cor: "bg-status-green/80" }],
  7: [{ nome: "Sprint Review", cor: "bg-status-cyan/80" }],
  9: [{ nome: "Deploy 10:00", cor: "bg-status-cyan/80" }],
  13: [{ nome: "Retrospectiva", cor: "bg-status-orange/80" }],
  20: [{ nome: "Planning Q3", cor: "bg-status-cyan/80" }],
  27: [{ nome: "Daily 10:00", cor: "bg-status-green/80" }],
  30: [{ nome: "Kickoff Projeto X", cor: "bg-status-orange/80" }],
}

const chaveData = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`

const eventosPorData: Record<string, { nome: string; cor: string }[]> = Object.fromEntries(
  Object.entries(eventosBaseOffset).map(([offset, eventos]) => [
    chaveData(addDays(HOJE_BASE, parseInt(offset))),
    eventos,
  ])
)

export default function DashboardPage() {
  const [tarefas, setTarefas] = useState(tarefasData)
  const [selectedTarefa, setSelectedTarefa] = useState<typeof tarefasData[0] | null>(null)
  const [semanaInicio, setSemanaInicio] = useState<Date>(HOJE_BASE)

  const totalTarefas = tarefas.length
  const tarefasConcluidas = tarefas.filter(t => t.status === "Finalizado").length
  const tarefasProgresso = tarefas.filter(t => t.status === "Em Andamento").length
  const tarefasPendentes = tarefas.filter(t => t.status === "Não Iniciado" || t.status === "Em Atraso").length

  const pctConcluidas = totalTarefas > 0 ? (tarefasConcluidas / totalTarefas) * 100 : 0
  const pctProgresso = totalTarefas > 0 ? (tarefasProgresso / totalTarefas) * 100 : 0
  const pctPendentes = totalTarefas > 0 ? (tarefasPendentes / totalTarefas) * 100 : 0

  const handleIniciarTarefa = (id: number) => {
    setTarefas(prev => prev.map(t => t.id === id ? { ...t, status: "Em Andamento" } : t))
    setSelectedTarefa(prev => prev && prev.id === id ? { ...prev, status: "Em Andamento" } : prev)
  }

  const handleFinalizarTarefa = (id: number) => {
    setTarefas(prev => prev.map(t => t.id === id ? { ...t, status: "Finalizado" } : t))
    setSelectedTarefa(prev => prev && prev.id === id ? { ...prev, status: "Finalizado" } : prev)
  }

  const handleReabrirTarefa = (id: number) => {
    setTarefas(prev => prev.map(t => t.id === id ? { ...t, status: "Em Andamento" } : t))
    setSelectedTarefa(prev => prev && prev.id === id ? { ...prev, status: "Em Andamento" } : prev)
  }

  const diasAgenda: DiaAgenda[] = Array.from({ length: 14 }, (_, i) => {
    const date = addDays(semanaInicio, i)
    return {
      date,
      eventos: eventosPorData[chaveData(date)] || [],
    }
  })

  const inicio = diasAgenda[0].date
  const fim = diasAgenda[diasAgenda.length - 1].date
  const isPeriodoAtual = semanaInicio.getTime() === HOJE_BASE.getTime()

  const irProxima = () => setSemanaInicio(prev => addDays(prev, 14))
  const irAnterior = () => setSemanaInicio(prev => addDays(prev, -14))
  const irHoje = () => setSemanaInicio(HOJE_BASE)

  const formatarPeriodo = (a: Date, b: Date) => {
    const mesmoMes = a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()
    const mesmoAno = a.getFullYear() === b.getFullYear()
    const fmt = (d: Date, comMes: boolean, comAno: boolean) => {
      let s = `${d.getDate()}`
      if (comMes) s += ` ${MESES_ABREV[d.getMonth()]}`
      if (comAno) s += ` ${d.getFullYear()}`
      return s
    }
    if (mesmoMes) return `${a.getDate()} — ${fmt(b, true, true)}`
    if (mesmoAno) return `${fmt(a, true, false)} — ${fmt(b, true, true)}`
    return `${fmt(a, true, true)} — ${fmt(b, true, true)}`
  }

  return (
    <div className="min-h-screen bg-sincro-bg text-sincro-text-primary">
      <Navbar />

      <main className="p-6">
        <div className="flex gap-6">
          {/* Coluna Esquerda — Indicadores Circulares (paleta roxa + tipografia do sistema) */}
          <div className="flex flex-col gap-4">
            <CircularProgress
              percentage={pctConcluidas}
              label="Tarefas Concluídas"
              value={`${Math.round(pctConcluidas)}%`}
              colors={["#A78BFA", "#7A5BEF", "#5A3E99"]}
            />
            <CircularProgress
              percentage={pctProgresso}
              label="Tarefas em Progresso"
              value={`${Math.round(pctProgresso)}%`}
              colors={["#7A5BEF", "#5A3E99", "#3A2962"]}
            />
            <CircularProgress
              percentage={pctPendentes}
              label="Tarefas Pendentes"
              value={`${Math.round(pctPendentes)}%`}
              colors={["#5A3E99", "#3A2962", "#251A40"]}
            />
          </div>

          {/* Coluna Central — Minhas Tarefas & Agenda */}
          <div className="flex-1 space-y-6">
            <div className="bg-sincro-modal-sidebar border border-sincro-border rounded-2xl p-5">
              <h2 className="text-lg font-bold mb-4">Minhas Tarefas</h2>
              <div className="flex flex-col gap-2.5">
                {tarefas.map((tarefa) => (
                  <div
                    key={tarefa.id}
                    className="flex items-center justify-between border border-sincro-border rounded-xl p-3 bg-white/5"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-sincro-text-primary truncate">{tarefa.nome}</h3>
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-sincro-text-secondary">
                        <span>{tarefa.equipe}</span>
                        {tarefa.urgente && (
                          <span className="flex items-center gap-1 text-status-red font-bold">
                            <span className="w-2 h-2 rounded-full bg-status-red animate-pulse" />
                            Urgente
                          </span>
                        )}
                        <span>{tarefa.data}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] text-white font-bold ${
                          tarefa.status === "Finalizado" ? "bg-status-green" :
                          tarefa.status === "Em Andamento" ? "bg-status-cyan" :
                          tarefa.status === "Em Atraso" ? "bg-status-red" : "bg-sincro-text-secondary/40"
                        }`}>{tarefa.status}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <button
                        onClick={() => setSelectedTarefa(tarefa)}
                        className="border border-sincro-border text-sincro-text-primary rounded-full px-4 py-2 text-xs font-bold hover:bg-white/10 active:scale-95 transition-all"
                      >
                        Abrir Tarefa
                      </button>
                      {tarefa.status === "Não Iniciado" || tarefa.status === "Em Atraso" ? (
                        <button
                          onClick={() => handleIniciarTarefa(tarefa.id)}
                          className="flex items-center gap-1.5 bg-status-cyan text-white rounded-full px-4 py-2 text-xs font-extrabold hover:brightness-110 active:scale-95 transition-all"
                        >
                          <Play className="w-3.5 h-3.5" />
                          Iniciar Tarefa
                        </button>
                      ) : tarefa.status === "Em Andamento" ? (
                        <button
                          onClick={() => handleFinalizarTarefa(tarefa.id)}
                          className="flex items-center gap-1.5 bg-status-green text-white rounded-full px-4 py-2 text-xs font-extrabold hover:brightness-110 active:scale-95 transition-all"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Marcar como Finalizada
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-sincro-modal-sidebar border border-sincro-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4 gap-3">
                <h2 className="text-lg font-bold">Agenda</h2>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-sincro-text-muted uppercase tracking-wider">
                    {formatarPeriodo(inicio, fim)}
                  </span>
                  {!isPeriodoAtual && (
                    <button
                      onClick={irHoje}
                      className="border border-sincro-border text-sincro-text-primary rounded-full px-3 py-1 text-[10px] font-bold hover:bg-white/10 active:scale-95 transition-all"
                    >
                      Hoje
                    </button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {diasAgenda.map((item, index) => {
                  const dia = item.date.getDate()
                  const isPrimeiroDoMes = dia === 1
                  const diaSemana = DIAS_SEMANA[item.date.getDay()]
                  const mesAbrev = MESES_ABREV[item.date.getMonth()]
                  const isHoje = item.date.getTime() === HOJE_BASE.getTime()
                  return (
                    <div
                      key={index}
                      className={`border rounded-xl p-2 min-h-[80px] ${
                        isHoje
                          ? "border-status-cyan bg-status-cyan/10"
                          : "border-sincro-border bg-white/5"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-xs font-bold ${isHoje ? "text-status-cyan" : "text-sincro-text-primary"}`}>
                          {dia}
                        </span>
                        {isPrimeiroDoMes ? (
                          <span className="text-[9px] font-extrabold text-status-cyan uppercase tracking-wider">
                            {mesAbrev}
                          </span>
                        ) : (
                          <span className="text-[9px] font-semibold text-sincro-text-muted uppercase tracking-wider">
                            {diaSemana}
                          </span>
                        )}
                      </div>
                      <div className="mt-1.5 space-y-1">
                        {item.eventos.map((evento, idx) => (
                          <div
                            key={idx}
                            className={`text-[10px] ${evento.cor} text-white px-1.5 py-0.5 rounded-md truncate font-semibold`}
                          >
                            {evento.nome}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={irAnterior}
                  className="flex items-center gap-1.5 border border-sincro-border text-sincro-text-primary rounded-full px-3 py-1.5 text-[11px] font-bold hover:bg-white/10 active:scale-95 transition-all"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  2 semanas atrás
                </button>
                <button
                  onClick={irProxima}
                  className="flex items-center gap-1.5 border border-sincro-border text-sincro-text-primary rounded-full px-3 py-1.5 text-[11px] font-bold hover:bg-white/10 active:scale-95 transition-all"
                >
                  Próximas 2 semanas
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Coluna Direita — Atividades Recentes (densidade da lista de comentários) */}
          <div className="w-80 bg-sincro-modal-sidebar border border-sincro-border rounded-2xl p-5">
            <h2 className="text-lg font-bold mb-4">Atividades Recentes</h2>
            <div className="flex flex-col gap-2">
              {atividades.map((atividade) => (
                <div key={atividade.id} className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/15 shrink-0 mt-1" />
                  <div className="flex-1 min-w-0 border border-sincro-border rounded-xl p-2.5 bg-white/5">
                    <p className="font-bold text-xs text-sincro-text-primary truncate">
                      {atividade.pessoa}
                    </p>
                    <p className="text-[11px] text-sincro-text-secondary mt-0.5 leading-relaxed break-words">
                      {atividade.acao}
                      {atividade.item && (
                        <span className="text-status-green font-semibold"> {atividade.item}</span>
                      )}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-sincro-text-muted">
                      <span>{atividade.data}</span>
                      <span className="opacity-60">•</span>
                      <span className="truncate">{atividade.projeto}</span>
                      {atividade.urgente && (
                        <span className="flex items-center gap-1 text-status-red font-bold ml-auto shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-status-red" />
                          Urgente
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {selectedTarefa && (
        <TarefaModal
          isOpen={!!selectedTarefa}
          onClose={() => setSelectedTarefa(null)}
          tarefa={selectedTarefa as any}
          onAceitar={() => {
            setTarefas(prev => prev.map(t => t.id === selectedTarefa.id ? { ...t, aceita: true } : t))
            setSelectedTarefa(prev => prev ? { ...prev, aceita: true } : null)
          }}
          onIniciar={() => handleIniciarTarefa(selectedTarefa.id)}
          onFinalizar={() => handleFinalizarTarefa(selectedTarefa.id)}
          onReabrir={() => handleReabrirTarefa(selectedTarefa.id)}
          onSave={(tarefaAtualizada) => {
            setTarefas(prev => prev.map(t => t.id === tarefaAtualizada.id ? { ...t, ...tarefaAtualizada } : t))
            setSelectedTarefa(tarefaAtualizada)
          }}
        />
      )}
    </div>
  )
}
