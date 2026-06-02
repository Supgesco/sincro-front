"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { CircularProgress } from "@/components/circular-progress"
import { TarefaModal } from "@/components/tarefa-modal"
import { Plus, Square, Search, Check, Play } from "lucide-react"

type Tarefa = {
  id: number
  nome: string
  criador: string
  projeto?: string
  dataCriacao: string
  dataEntrega: string
  status: string
  complexidade: string
  urgente: boolean
  progresso: { atual: number; total: number }
  descricao: string
  checklist: { id: number; texto: string; concluido: boolean }[]
  membros: string[]
  comentarios: { autor: string; texto: string }[]
  aceita: boolean
}

const tarefasData: Tarefa[] = [
  {
    id: 1,
    nome: "Nome da Tarefa 1",
    criador: "Seu Nome",
    projeto: "Projeto Alpha",
    dataCriacao: "25 de janeiro, 2025",
    dataEntrega: "12/04/2026",
    status: "Em Andamento",
    complexidade: "Média Complexidade",
    urgente: true,
    progresso: { atual: 2, total: 4 },
    descricao: "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    checklist: [
      { id: 1, texto: "Progresso 1", concluido: true },
      { id: 2, texto: "Progresso 2", concluido: true },
      { id: 3, texto: "Progresso 3", concluido: false },
      { id: 4, texto: "Progresso 4", concluido: false },
    ],
    membros: ["Pessoa 1", "Pessoa 2"],
    comentarios: [
      { autor: "Pessoa 2", texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }
    ],
    aceita: false
  },
  { id: 2, nome: "Nome da Tarefa 2", criador: "Seu Nome", projeto: "Projeto Alpha", dataCriacao: "25 de janeiro, 2025", dataEntrega: "12/04/2026", status: "Em Andamento", complexidade: "Média Complexidade", urgente: true, progresso: { atual: 0, total: 4 }, descricao: "Descrição da tarefa 2", checklist: [], membros: [], comentarios: [], aceita: false },
  { id: 3, nome: "Nome da Tarefa 3", criador: "Seu Nome", projeto: "Projeto Beta", dataCriacao: "25 de janeiro, 2025", dataEntrega: "12/04/2026", status: "Em Andamento", complexidade: "Alta Complexidade", urgente: false, progresso: { atual: 0, total: 4 }, descricao: "Descrição da tarefa 3", checklist: [], membros: [], comentarios: [], aceita: true },
  { id: 4, nome: "Nome da Tarefa 4", criador: "Seu Nome", projeto: "Projeto Gama", dataCriacao: "25 de janeiro, 2025", dataEntrega: "12/04/2026", status: "Em Andamento", complexidade: "Baixa Complexidade", urgente: true, progresso: { atual: 0, total: 4 }, descricao: "Descrição da tarefa 4", checklist: [], membros: [], comentarios: [], aceita: true },
  { id: 5, nome: "Nome da Tarefa 5", criador: "Seu Nome", projeto: "Projeto Delta", dataCriacao: "25 de janeiro, 2025", dataEntrega: "12/04/2026", status: "Em Andamento", complexidade: "Média Complexidade", urgente: false, progresso: { atual: 0, total: 4 }, descricao: "Descrição da tarefa 5", checklist: [], membros: [], comentarios: [], aceita: true },
  { id: 6, nome: "Nome da Tarefa 6", criador: "Seu Nome", projeto: "Projeto Epsilon", dataCriacao: "25 de janeiro, 2025", dataEntrega: "12/04/2026", status: "Em Andamento", complexidade: "Alta Complexidade", urgente: false, progresso: { atual: 0, total: 4 }, descricao: "Descrição da tarefa 6", checklist: [], membros: [], comentarios: [], aceita: false },
  { id: 7, nome: "Nome da Tarefa 7", criador: "Seu Nome", projeto: "Projeto Zeta", dataCriacao: "25 de janeiro, 2025", dataEntrega: "12/04/2026", status: "Em Andamento", complexidade: "Baixa Complexidade", urgente: false, progresso: { atual: 0, total: 4 }, descricao: "Descrição da tarefa 7", checklist: [], membros: [], comentarios: [], aceita: false },
]

function getPrioridadeInfo(t: Tarefa): { label: string; color: string } {
  if (t.urgente) return { label: "Urgente", color: "#FF6B6B" }
  if (t.complexidade === "Alta Complexidade") return { label: "Alta", color: "#FF6B6B" }
  if (t.complexidade === "Média Complexidade") return { label: "Média", color: "#FFD93D" }
  return { label: "Baixa", color: "#4ADE80" }
}

const statusBadge: Record<string, string> = {
  "Em Andamento": "bg-status-cyan",
  "Em Atraso": "bg-status-red",
  "Finalizado": "bg-status-green",
  "Não Iniciado": "bg-sincro-text-secondary/40",
}

function TarefasContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectFilter = searchParams.get("projeto")

  const [selectedTarefa, setSelectedTarefa] = useState<Tarefa | null>(null)
  const [tarefas, setTarefas] = useState(tarefasData)
  const [searchTerm, setSearchTerm] = useState("")

  const handleAceitarTarefa = (id: number) => {
    setTarefas(prev => prev.map(t => t.id === id ? { ...t, aceita: true } : t))
    setSelectedTarefa(prev => prev ? { ...prev, aceita: true } : null)
  }

  const handleIniciarTarefa = (id: number) => {
    setTarefas(prev => prev.map(t => t.id === id ? { ...t, status: "Em Andamento" } : t))
    setSelectedTarefa(prev => prev && prev.id === id ? { ...prev, status: "Em Andamento" } : prev)
  }

  const handleFinalizarTarefa = (id: number) => {
    setTarefas(prev => prev.map(t => t.id === id ? { ...t, status: "Finalizado" } : t))
    setSelectedTarefa(prev => prev && prev.id === id ? { ...prev, status: "Finalizado" } : prev)
  }

  const totalTarefas = tarefas.length
  const tarefasConcluidas = tarefas.filter(t => t.status === "Finalizado").length
  const tarefasProgresso = tarefas.filter(t => t.status === "Em Andamento").length
  const tarefasPendentes = tarefas.filter(t => t.status === "Não Iniciado" || t.status === "Em Atraso").length

  const pctConcluidas = totalTarefas > 0 ? (tarefasConcluidas / totalTarefas) * 100 : 0
  const pctProgresso = totalTarefas > 0 ? (tarefasProgresso / totalTarefas) * 100 : 0
  const pctPendentes = totalTarefas > 0 ? (tarefasPendentes / totalTarefas) * 100 : 0

  const filteredTarefas = tarefas.filter(t => {
    const matchSearch = t.nome.toLowerCase().includes(searchTerm.toLowerCase())
    const matchProject = !projectFilter || t.projeto?.toLowerCase() === projectFilter.toLowerCase()
    return matchSearch && matchProject
  })

  return (
    <div className="min-h-screen bg-sincro-bg text-sincro-text-primary">
      <Navbar />

      <main className="p-6">
        <div className="flex gap-6">
          {/* Coluna Esquerda — Indicadores Circulares */}
          <div className="flex flex-col gap-4">
            <CircularProgress
              percentage={pctConcluidas}
              label="Tarefas Concluídas"
              value={`${Math.round(pctConcluidas)}%`}
              colors={["#A78BFA", "#7A5BEF", "#5A3E99"]}
            />
            <CircularProgress
              percentage={pctProgresso}
              label="Em Andamento"
              value={`${Math.round(pctProgresso)}%`}
              colors={["#7A5BEF", "#5A3E99", "#3A2962"]}
            />
            <CircularProgress
              percentage={pctPendentes}
              label="Pendentes"
              value={`${Math.round(pctPendentes)}%`}
              colors={["#5A3E99", "#3A2962", "#251A40"]}
            />
          </div>

          {/* Coluna Central — Filtros & Lista */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-4 p-4 border border-sincro-border rounded-2xl bg-sincro-modal-sidebar">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-sincro-border flex-1 max-w-xs bg-white/5">
                <Search className="w-4 h-4 opacity-50" />
                <input
                  type="text"
                  placeholder="Pesquisar Tarefa"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent outline-none text-sm w-full text-sincro-text-primary"
                />
              </div>

              <FilterButton label={projectFilter ? `Projeto: ${projectFilter}` : "Projeto"} onClick={() => {}} />
              {projectFilter && (
                <button
                  onClick={() => router.push("/tarefas")}
                  className="text-xs text-white/60 hover:text-status-red transition-colors"
                  title="Limpar Filtro"
                >
                  ✕
                </button>
              )}
              <FilterButton label="Equipe" onClick={() => {}} />
              <FilterButton label="Status" onClick={() => {}} />

              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-status-green text-white text-sm font-extrabold hover:brightness-110 active:scale-95 transition-all ml-auto"
              >
                <Plus className="w-4 h-4" />
                Criar Nova Tarefa
              </button>
            </div>

            <div className="space-y-3">
              {filteredTarefas.length === 0 ? (
                <div className="border border-sincro-border rounded-2xl p-8 text-center text-sincro-text-muted bg-sincro-modal-sidebar">
                  Nenhuma tarefa encontrada para o filtro selecionado.
                </div>
              ) : (
                filteredTarefas.map((tarefa) => {
                  const prioridade = getPrioridadeInfo(tarefa)
                  return (
                    <div
                      key={tarefa.id}
                      className="flex flex-wrap items-center gap-6 md:gap-8 px-6 py-4 rounded-2xl border border-sincro-border bg-sincro-modal-sidebar text-white"
                    >
                      {/* COLUNA 1 — TÍTULO */}
                      <div className="flex-1 min-w-[180px]">
                        <h3 className="text-base md:text-lg font-bold text-sincro-text-primary truncate leading-tight">
                          {tarefa.nome}
                        </h3>
                        {tarefa.projeto && (
                          <p className="text-[11px] text-sincro-text-secondary mt-1">{tarefa.projeto}</p>
                        )}
                      </div>

                      {/* COLUNA 2 — PROGRESSO (☐ 2/4) */}
                      <div className="flex items-center gap-2 shrink-0">
                        <Square className="w-4 h-4 text-sincro-text-secondary" />
                        <span className="text-xs font-semibold text-sincro-text-primary whitespace-nowrap">
                          {tarefa.progresso.atual}/{tarefa.progresso.total}
                        </span>
                      </div>

                      {/* COLUNA 3 — INFORMAÇÕES (Prioridade, Complexidade, Data) */}
                      <div className="flex flex-col gap-1 min-w-[140px]">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: prioridade.color }}
                          />
                          <span className="text-[11px] font-bold text-sincro-text-primary">
                            {prioridade.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-4 h-1 rounded-full shrink-0"
                            style={{ backgroundColor: "#7CF7C3" }}
                          />
                          <span className="text-[11px] text-sincro-text-secondary">{tarefa.complexidade}</span>
                        </div>
                        <span className="text-[10px] text-sincro-text-muted ml-4">
                          {tarefa.dataEntrega}
                        </span>
                      </div>

                      {/* COLUNA 4 — STATUS BADGE */}
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider text-white font-bold ${statusBadge[tarefa.status] || "bg-sincro-text-secondary/40"}`}>
                        {tarefa.status}
                      </span>

                      {/* COLUNA 5 — ABRIR TAREFA */}
                      <button
                        onClick={() => setSelectedTarefa(tarefa)}
                        className="flex items-center justify-center h-9 px-4 rounded-full border border-sincro-border text-sincro-text-primary text-xs font-bold hover:bg-white/10 active:scale-95 transition-all shrink-0"
                      >
                        Abrir Tarefa
                      </button>

                      {/* COLUNA 6 — INICIAR / FINALIZAR */}
                      {tarefa.status === "Não Iniciado" || tarefa.status === "Em Atraso" ? (
                        <button
                          onClick={() => handleIniciarTarefa(tarefa.id)}
                          className="flex items-center justify-center gap-1.5 h-9 px-4 rounded-full bg-status-cyan text-white text-xs font-extrabold hover:brightness-110 active:scale-95 transition-all shrink-0"
                        >
                          <Play className="w-3.5 h-3.5" />
                          Iniciar Tarefa
                        </button>
                      ) : tarefa.status === "Em Andamento" ? (
                        <button
                          onClick={() => handleFinalizarTarefa(tarefa.id)}
                          className="flex items-center justify-center gap-1.5 h-9 px-4 rounded-full bg-status-green text-white text-xs font-extrabold hover:brightness-110 active:scale-95 transition-all shrink-0"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Marcar como Finalizada
                        </button>
                      ) : null}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </main>

      {selectedTarefa && (
        <TarefaModal
          isOpen={!!selectedTarefa}
          onClose={() => setSelectedTarefa(null)}
          tarefa={selectedTarefa}
          onAceitar={() => handleAceitarTarefa(selectedTarefa.id)}
          onIniciar={() => handleIniciarTarefa(selectedTarefa.id)}
          onFinalizar={() => handleFinalizarTarefa(selectedTarefa.id)}
        />
      )}
    </div>
  )
}

function FilterButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-transparent text-sm transition-colors hover:bg-white/10 text-sincro-text-primary"
    >
      <span className="w-4 h-4 rounded-full bg-sincro-text-secondary/20" />
      {label}
    </button>
  )
}

export default function TarefasPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-sincro-bg text-sincro-text-primary flex items-center justify-center">
        <span>Carregando tarefas...</span>
      </div>
    }>
      <TarefasContent />
    </Suspense>
  )
}
