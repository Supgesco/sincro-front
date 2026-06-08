"use client"

import { useState, useEffect, Suspense, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { CircularProgress } from "@/components/circular-progress"
import { Modal } from "@/components/modal"
import { TarefaModal, CriarTarefaModal } from "@/components/tarefa-modal"
import { Plus, Search, Check, Play, X, User, Calendar, Folder, Eye, Star, Users, Filter, ListChecks, ChevronDown, ListTodo, RotateCcw } from "lucide-react"
import { useToast } from "@/components/toast"

const STORAGE_KEY = "sincro-tarefas-finalizadas"

type FinalizedInfo = { id: number; finalizadoPor: string; finalizadoEm: string }

const getFinalized = (): Record<number, FinalizedInfo> => {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const arr: FinalizedInfo[] = JSON.parse(raw)
    return arr.reduce((acc, item) => {
      acc[item.id] = item
      return acc
    }, {} as Record<number, FinalizedInfo>)
  } catch {
    return {}
  }
}

const saveFinalized = (id: number, finalizadoPor: string, finalizadoEm: string) => {
  if (typeof window === "undefined") return
  const existing = getFinalized()
  existing[id] = { id, finalizadoPor, finalizadoEm }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.values(existing)))
}

const removeFinalized = (id: number) => {
  if (typeof window === "undefined") return
  const existing = getFinalized()
  delete existing[id]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.values(existing)))
}

const FAVORITAS_KEY = "sincro-tarefas-favoritas"

const getFavoritas = (): number[] => {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(FAVORITAS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const saveFavorita = (id: number) => {
  if (typeof window === "undefined") return
  const existing = getFavoritas()
  if (!existing.includes(id)) {
    localStorage.setItem(FAVORITAS_KEY, JSON.stringify([...existing, id]))
  }
}

const removeFavorita = (id: number) => {
  if (typeof window === "undefined") return
  const existing = getFavoritas()
  localStorage.setItem(FAVORITAS_KEY, JSON.stringify(existing.filter(fid => fid !== id)))
}

const TAREFAS_KEY = "sincro-tarefas-data"

const getTarefasStorage = (): Tarefa[] | null => {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(TAREFAS_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const saveTarefasStorage = (tarefas: Tarefa[]) => {
  if (typeof window === "undefined") return
  localStorage.setItem(TAREFAS_KEY, JSON.stringify(tarefas))
}

const complexidadeCor: Record<string, string> = {
  "Baixa Complexidade": "bg-status-green-bg text-status-green border-status-green/40",
  "Média Complexidade": "bg-status-yellow-bg text-status-yellow border-status-yellow/40",
  "Alta Complexidade": "bg-status-red-bg text-status-red border-status-red/40",
}

const statusPillCor: Record<string, string> = {
  "Finalizado": "bg-status-green-bg text-status-green border-status-green/40",
  "Em Andamento": "bg-status-cyan-bg text-status-cyan border-status-cyan/40",
  "Em Atraso": "bg-status-red-bg text-status-red border-status-red/40",
  "Não Iniciado": "bg-sincro-text-secondary/15 text-sincro-text-secondary border-sincro-text-secondary/30",
}

const statusBadgeSolidCor: Record<string, string> = {
  "Finalizado": "bg-status-green",
  "Em Andamento": "bg-status-cyan",
  "Em Atraso": "bg-status-red",
  "Não Iniciado": "bg-sincro-text-secondary/40",
}

const metaPillBase = "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border"

type Tarefa = {
  id: number
  nome: string
  criador: string
  projeto?: string
  equipe?: string
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
  finalizadoPor?: string
  finalizadoEm?: string
}

const tarefasData: Tarefa[] = [
  {
    id: 1,
    nome: "Nome da Tarefa 1",
    criador: "Seu Nome",
    projeto: "Projeto Alpha",
    equipe: "Equipe Dev",
    dataCriacao: "25 de janeiro, 2025",
    dataEntrega: "12/04/2026",
    status: "Não Iniciado",
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
  { id: 2, nome: "Nome da Tarefa 2", criador: "Seu Nome", projeto: "Projeto Alpha", equipe: "Equipe Dev", dataCriacao: "25 de janeiro, 2025", dataEntrega: "12/04/2026", status: "Não Iniciado", complexidade: "Média Complexidade", urgente: true, progresso: { atual: 0, total: 4 }, descricao: "Descrição da tarefa 2", checklist: [], membros: [], comentarios: [], aceita: false },
  { id: 3, nome: "Nome da Tarefa 3", criador: "Seu Nome", projeto: "Projeto Beta", equipe: "Equipe QA", dataCriacao: "25 de janeiro, 2025", dataEntrega: "12/04/2026", status: "Em Andamento", complexidade: "Alta Complexidade", urgente: false, progresso: { atual: 0, total: 4 }, descricao: "Descrição da tarefa 3", checklist: [], membros: [], comentarios: [], aceita: true },
  { id: 4, nome: "Nome da Tarefa 4", criador: "Seu Nome", projeto: "Projeto Gama", equipe: "Equipe Design", dataCriacao: "25 de janeiro, 2025", dataEntrega: "12/04/2026", status: "Em Andamento", complexidade: "Baixa Complexidade", urgente: true, progresso: { atual: 0, total: 4 }, descricao: "Descrição da tarefa 4", checklist: [], membros: [], comentarios: [], aceita: true },
  { id: 5, nome: "Nome da Tarefa 5", criador: "Seu Nome", projeto: "Projeto Delta", equipe: "Equipe Marketing", dataCriacao: "25 de janeiro, 2025", dataEntrega: "12/04/2026", status: "Em Andamento", complexidade: "Média Complexidade", urgente: false, progresso: { atual: 0, total: 4 }, descricao: "Descrição da tarefa 5", checklist: [], membros: [], comentarios: [], aceita: true },
  { id: 6, nome: "Nome da Tarefa 6", criador: "Seu Nome", projeto: "Projeto Epsilon", equipe: "Equipe Ops", dataCriacao: "25 de janeiro, 2025", dataEntrega: "12/04/2026", status: "Não Iniciado", complexidade: "Alta Complexidade", urgente: false, progresso: { atual: 0, total: 4 }, descricao: "Descrição da tarefa 6", checklist: [], membros: [], comentarios: [], aceita: false },
  { id: 7, nome: "Nome da Tarefa 7", criador: "Seu Nome", projeto: "Projeto Zeta", equipe: "Equipe Dados", dataCriacao: "25 de janeiro, 2025", dataEntrega: "12/04/2026", status: "Não Iniciado", complexidade: "Baixa Complexidade", urgente: false, progresso: { atual: 0, total: 4 }, descricao: "Descrição da tarefa 7", checklist: [], membros: [], comentarios: [], aceita: false },
]

function TarefasContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectFilter = searchParams.get("projeto")
  const { toast, notificar } = useToast()

  const [selectedTarefa, setSelectedTarefa] = useState<Tarefa | null>(null)
  const [tarefas, setTarefas] = useState<Tarefa[]>(tarefasData)
  const [searchTerm, setSearchTerm] = useState("")
  const [isCriarModalOpen, setIsCriarModalOpen] = useState(false)
  const [finalizadoInfo, setFinalizadoInfo] = useState<Tarefa | null>(null)
  const [favoritasIds, setFavoritasIds] = useState<number[]>([])
  const [equipeFilter, setEquipeFilter] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [complexidadeFilter, setComplexidadeFilter] = useState<string[]>([])
  const [projetoFilter, setProjetoFilter] = useState<string[]>([])
  const [apenasUrgentes, setApenasUrgentes] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const urlProjeto = searchParams.get("projeto")
    if (urlProjeto && !projetoFilter.includes(urlProjeto)) {
      setProjetoFilter([urlProjeto])
    }
  }, [searchParams])

  useEffect(() => {
    const handleStorage = () => {
      setFavoritasIds(getFavoritas())
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  const hasLoadedFromStorage = useRef(false)

  useEffect(() => {
    const saved = getTarefasStorage()
    if (saved) setTarefas(saved)
    const finalized = getFinalized()
    setFavoritasIds(getFavoritas())
    if (saved) {
      setTarefas(prev => {
        const updated = prev.map(t => {
          const f = finalized[t.id]
          if (f && t.aceita) {
            return { ...t, status: "Finalizado", finalizadoPor: f.finalizadoPor, finalizadoEm: f.finalizadoEm }
          }
          if (f && !t.aceita) {
            removeFinalized(t.id)
          }
          return t
        })
        const atrasadas = updated.filter(t => {
          if (t.status === "Finalizado") return false
          const [dia, mes, ano] = t.dataEntrega.split("/").map(Number)
          const entrega = new Date(ano, mes - 1, dia)
          const hoje = new Date()
          hoje.setHours(0, 0, 0, 0)
          return entrega < hoje
        })
        if (atrasadas.length > 0) {
          notificar(`${atrasadas.length} tarefa(s) em atraso!`, "warning")
        }
        return updated
      })
    }
  }, [])

  useEffect(() => {
    if (!hasLoadedFromStorage.current) {
      hasLoadedFromStorage.current = true
      return
    }
    saveTarefasStorage(tarefas)
  }, [tarefas])

  const handleToggleFavorita = (id: number) => {
    if (favoritasIds.includes(id)) {
      removeFavorita(id)
      setFavoritasIds(prev => prev.filter(fid => fid !== id))
    } else {
      saveFavorita(id)
      setFavoritasIds(prev => [...prev, id])
    }
  }

  const handleAceitarTarefa = (id: number) => {
    setTarefas(prev => prev.map(t => t.id === id ? { ...t, aceita: true, status: t.status === "Finalizado" ? "Em Andamento" : t.status } : t))
    setSelectedTarefa(prev => prev && prev.id === id ? { ...prev, aceita: true, status: prev.status === "Finalizado" ? "Em Andamento" : prev.status } : prev)
    toast("Tarefa aceita com sucesso!", "success")
  }

  const handleIniciarTarefa = (id: number) => {
    setTarefas(prev => prev.map(t => t.id === id ? { ...t, status: "Em Andamento" } : t))
    setSelectedTarefa(prev => prev && prev.id === id ? { ...prev, status: "Em Andamento" } : prev)
    toast("Tarefa iniciada!", "info")
  }

  const handleFinalizarTarefa = (id: number) => {
    const agora = new Date()
    const dd = agora.getDate().toString().padStart(2, "0")
    const mm = (agora.getMonth() + 1).toString().padStart(2, "0")
    const yyyy = agora.getFullYear()
    const hh = agora.getHours().toString().padStart(2, "0")
    const min = agora.getMinutes().toString().padStart(2, "0")
    const dataFinalizacao = `${dd}/${mm}/${yyyy} às ${hh}:${min}`
    setTarefas(prev => prev.map(t => t.id === id ? { ...t, status: "Finalizado", finalizadoPor: "Seu Nome", finalizadoEm: dataFinalizacao } : t))
    setSelectedTarefa(prev => prev && prev.id === id ? { ...prev, status: "Finalizado", finalizadoPor: "Seu Nome", finalizadoEm: dataFinalizacao } : prev)
    saveFinalized(id, "Seu Nome", dataFinalizacao)
    toast("Tarefa finalizada com sucesso!", "success")
  }

  const handleReabrirTarefa = (id: number) => {
    setTarefas(prev => prev.map(t => t.id === id ? { ...t, status: "Em Andamento" } : t))
    setSelectedTarefa(prev => prev && prev.id === id ? { ...prev, status: "Em Andamento" } : prev)
    removeFinalized(id)
    toast("Tarefa reaberta!", "info")
  }

  const getStatusEfetivo = (t: Tarefa): string => {
    if (t.status === "Finalizado") return "Finalizado"
    const [dia, mes, ano] = t.dataEntrega.split("/").map(Number)
    const entrega = new Date(ano, mes - 1, dia)
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    if (entrega < hoje) return "Em Atraso"
    return t.status
  }

  const totalTarefas = tarefas.length
  const tarefasConcluidas = tarefas.filter(t => getStatusEfetivo(t) === "Finalizado").length
  const tarefasProgresso = tarefas.filter(t => getStatusEfetivo(t) === "Em Andamento").length
  const tarefasPendentes = tarefas.filter(t => {
    const s = getStatusEfetivo(t)
    return s === "Não Iniciado" || s === "Em Atraso"
  }).length

  const pctConcluidas = totalTarefas > 0 ? (tarefasConcluidas / totalTarefas) * 100 : 0
  const pctProgresso = totalTarefas > 0 ? (tarefasProgresso / totalTarefas) * 100 : 0
  const pctPendentes = totalTarefas > 0 ? (tarefasPendentes / totalTarefas) * 100 : 0

  const filteredTarefas = tarefas.filter(t => {
    const statusEfetivo = getStatusEfetivo(t)
    const matchSearch = t.nome.toLowerCase().includes(searchTerm.toLowerCase())
    const matchProject = projetoFilter.length === 0 || projetoFilter.includes(t.projeto || "Pessoal")
    const matchEquipe = equipeFilter.length === 0 || equipeFilter.includes(t.equipe || "")
    const matchStatus = statusFilter.length === 0 || statusFilter.includes(statusEfetivo) || statusFilter.includes(t.status)
    const matchComplexidade = complexidadeFilter.length === 0 || complexidadeFilter.includes(t.complexidade)
    const matchUrgente = !apenasUrgentes || t.urgente
    return matchSearch && matchProject && matchEquipe && matchStatus && matchComplexidade && matchUrgente
  })

  return (
    <div className="h-screen overflow-hidden bg-sincro-bg text-sincro-text-primary flex flex-col">
      <Navbar />

      <main className="p-6 flex-1 flex flex-col min-h-0">
        <div className="flex gap-6 flex-1 min-h-0">
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
          <div className="flex-1 flex flex-col space-y-6 min-h-0">
            <div className="flex items-center gap-4 px-3 py-6 border border-sincro-border rounded-2xl bg-sincro-team-card flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-sincro-border flex-1 min-w-[200px] max-w-xs bg-white/5">
                <Search className="w-4 h-4 opacity-50" />
                <input
                  type="text"
                  placeholder="Pesquisar Tarefa"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent outline-none text-sm w-full text-sincro-text-primary"
                />
              </div>

              <FilterDropdown
                id="projeto"
                label="Projeto"
                icon={Folder}
                options={Array.from(new Set(["Pessoal", ...tarefas.map(t => t.projeto).filter(Boolean)])) as string[]}
                selected={projetoFilter}
                onChange={(next) => {
                  setProjetoFilter(next)
                  if (next.length === 0 && searchParams.get("projeto")) {
                    router.push("/tarefas")
                  }
                }}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />
              <FilterDropdown
                id="equipe"
                label="Equipe"
                icon={Users}
                options={Array.from(new Set(tarefas.map(t => t.equipe).filter(Boolean))) as string[]}
                selected={equipeFilter}
                onChange={setEquipeFilter}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />
              <FilterDropdown
                id="status"
                label="Status"
                icon={ListChecks}
                options={["Não Iniciado", "Em Andamento", "Em Atraso", "Finalizado"]}
                selected={statusFilter}
                onChange={setStatusFilter}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />
              <FilterDropdown
                id="complexidade"
                label="Complexidade"
                icon={Filter}
                options={["Baixa Complexidade", "Média Complexidade", "Alta Complexidade"]}
                selected={complexidadeFilter}
                onChange={setComplexidadeFilter}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />

              <button
                type="button"
                onClick={() => setApenasUrgentes(prev => !prev)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-colors cursor-pointer ${apenasUrgentes
                  ? "bg-status-red-bg border-status-red text-status-red font-bold"
                  : "border-white/40 hover:bg-white/10 text-sincro-text-primary"
                  }`}
              >
                <span className="w-2 h-2 rounded-full bg-status-red" />
                Urgentes
              </button>

              {(equipeFilter.length > 0 || statusFilter.length > 0 || complexidadeFilter.length > 0 || projetoFilter.length > 0 || apenasUrgentes || searchTerm) && (
                <button
                  onClick={() => {
                    setEquipeFilter([])
                    setStatusFilter([])
                    setComplexidadeFilter([])
                    setProjetoFilter([])
                    setApenasUrgentes(false)
                    setSearchTerm("")
                    if (searchParams.get("projeto")) router.push("/tarefas")
                  }}
                  className="text-xs text-white/60 hover:text-status-red transition-colors px-2"
                >
                  Limpar tudo
                </button>
              )}

              <button
                onClick={() => setIsCriarModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-status-green text-white text-sm font-extrabold hover:brightness-110 active:scale-95 transition-all ml-auto"
              >
                <Plus className="w-4 h-4" />
                Criar Nova Tarefa
              </button>
            </div>

            <div className="flex flex-col gap-3 p-4 rounded-2xl bg-black/5 overflow-y-auto flex-1 min-h-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-sincro-border [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
              {filteredTarefas.length === 0 ? (
                <div className="border border-sincro-border rounded-2xl p-8 text-center text-sincro-text-muted bg-sincro-modal-sidebar">
                  Nenhuma tarefa encontrada para o filtro selecionado.
                </div>
              ) : (
                filteredTarefas.map((tarefa) => {
                  return (
                    <div
                      key={tarefa.id}
                      className="flex items-center gap-4 border border-sincro-border rounded-xl p-3 bg-sincro-team-card min-h-[88px]"
                    >
                      <button
                        type="button"
                        onClick={() => handleToggleFavorita(tarefa.id)}
                        className={`shrink-0 p-1.5 rounded-full transition-all cursor-pointer ${favoritasIds.includes(tarefa.id)
                          ? "bg-status-yellow-bg"
                          : "hover:bg-white/10"
                          }`}
                        title={favoritasIds.includes(tarefa.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                      >
                        <Star
                          style={{ fill: favoritasIds.includes(tarefa.id) ? "currentColor" : "none" }}
                          className={`w-5 h-5 transition-all ${favoritasIds.includes(tarefa.id)
                            ? "text-status-yellow"
                            : "text-sincro-text-secondary"
                            }`}
                        />
                      </button>
                      <div className="flex flex-col justify-center min-w-0 flex-1">
                        <h3 className="font-bold text-xl text-sincro-text-primary truncate">{tarefa.nome}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-sincro-text-secondary min-w-0 flex-wrap">
                          <span className="truncate">{tarefa.projeto || "Pessoal"}</span>
                          <span className="opacity-50">•</span>
                          {(() => {
                            const s = getStatusEfetivo(tarefa)
                            return (
                              <span className={`px-2 py-0.5 rounded-full text-[10px] text-white font-extrabold shrink-0 ${statusBadgeSolidCor[s] || "bg-sincro-text-secondary/40"
                                }`}>{s}</span>
                            )
                          })()}
                          {tarefa.checklist.length > 0 && (() => {
                            const concluidas = tarefa.checklist.filter(c => c.concluido).length
                            const total = tarefa.checklist.length
                            const completo = concluidas === total
                            return (
                              <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold border shrink-0 ${completo
                                ? "bg-status-green-bg text-status-green border-status-green/40"
                                : "bg-sincro-bg-input text-sincro-text-primary border-sincro-border"
                                }`}>
                                <ListTodo className="w-3 h-3" />
                                {concluidas}/{total}
                              </span>
                            )
                          })()}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 shrink-0 min-w-[120px] text-sm min-h-[72px] justify-between">
                        {tarefa.urgente && (
                          <span className="flex items-center gap-1 text-status-red font-extrabold">
                            <span className="w-2 h-2 rounded-full bg-status-red animate-pulse" />
                            Urgente
                          </span>
                        )}
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${complexidadeCor[tarefa.complexidade] || "border-sincro-border text-sincro-text-primary"
                          }`}>{tarefa.complexidade}</span>
                        <span className="flex items-center gap-1.5 text-sincro-text-primary font-bold">
                          <Calendar className="w-3.5 h-3.5" />
                          {tarefa.dataEntrega}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setSelectedTarefa(tarefa)}
                          className="flex items-center gap-2 border border-sincro-border text-sincro-text-primary rounded-full h-12 px-6 text-base font-extrabold hover:scale-[1.03] hover:shadow-lg active:scale-95 transition-all"
                        >
                          <Eye className="w-5 h-5" />
                          Abrir Tarefa
                        </button>
                        {!tarefa.aceita ? (
                          <button
                            onClick={() => handleAceitarTarefa(tarefa.id)}
                            className="flex items-center justify-center gap-2 border border-status-green text-status-green rounded-full h-12 px-6 w-[220px] whitespace-nowrap text-base font-extrabold hover:scale-[1.03] hover:shadow-lg active:scale-95 transition-all"
                          >
                            <Check className="w-5 h-5" />
                            Aceitar Tarefa
                          </button>
                        ) : tarefa.status === "Não Iniciado" || tarefa.status === "Em Atraso" ? (
                          <button
                            onClick={() => handleIniciarTarefa(tarefa.id)}
                            className="flex items-center justify-center gap-2 bg-status-cyan text-white rounded-full h-12 px-6 w-[220px] whitespace-nowrap text-base font-extrabold hover:scale-[1.03] hover:shadow-lg active:scale-95 transition-all"
                          >
                            <Play className="w-5 h-5" />
                            Iniciar Tarefa
                          </button>
                        ) : tarefa.status === "Em Andamento" ? (
                          <button
                            onClick={() => handleFinalizarTarefa(tarefa.id)}
                            className="flex items-center justify-center gap-2 bg-status-green text-white rounded-full h-12 px-6 w-[220px] whitespace-nowrap text-base font-extrabold hover:scale-[1.03] hover:shadow-lg active:scale-95 transition-all"
                          >
                            <Check className="w-5 h-5" />
                            Finalizar Tarefa
                          </button>
                        ) : tarefa.status === "Finalizado" ? (
                          <button
                            onClick={() => handleReabrirTarefa(tarefa.id)}
                            className="flex items-center justify-center gap-2 border border-status-cyan text-status-cyan rounded-full h-12 px-6 w-[220px] whitespace-nowrap text-base font-extrabold hover:scale-[1.03] hover:shadow-lg active:scale-95 transition-all"
                          >
                            <RotateCcw className="w-5 h-5" />
                            Reabrir Tarefa
                          </button>
                        ) : null}
                      </div>
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
          onReabrir={() => handleReabrirTarefa(selectedTarefa.id)}
          onSave={(updated) => {
            setTarefas(prev => prev.map(t => t.id === updated.id ? updated : t))
            setSelectedTarefa(updated)
          }}
          onExcluir={() => {
            setTarefas(prev => prev.filter(t => t.id !== selectedTarefa.id))
            setSelectedTarefa(null)
          }}
        />
      )}

      {finalizadoInfo && (
        <Modal
          isOpen={!!finalizadoInfo}
          onClose={() => setFinalizadoInfo(null)}
          hideClose
          className="w-[min(440px,92vw)] rounded-2xl overflow-hidden"
        >
          <div className="bg-sincro-modal-bg dark:bg-sincro-dark-gradient text-sincro-modal-text">
            <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-sincro-border">
              <div className="flex items-center gap-2">
                <span className="w-9 h-9 rounded-full flex items-center justify-center bg-status-green-bg text-status-green">
                  <Check className="w-4 h-4" />
                </span>
                <h2 className="text-lg font-extrabold">Tarefa Finalizada</h2>
              </div>
              <button
                type="button"
                onClick={() => setFinalizadoInfo(null)}
                className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-5 flex flex-col gap-4">
              <p className="text-sm text-sincro-modal-text">
                <span className="font-bold">{finalizadoInfo.nome}</span> foi concluída.
              </p>
              <div className="rounded-xl border border-sincro-border bg-sincro-modal-sidebar p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-7 h-7 rounded-full bg-sincro-bg-accent border border-sincro-border flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5 text-sincro-text-primary" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-sincro-text-secondary">Finalizado por</p>
                    <p className="text-sm font-bold text-sincro-modal-text truncate">{finalizadoInfo.finalizadoPor || "Não registrado"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-7 h-7 rounded-full bg-sincro-bg-accent border border-sincro-border flex items-center justify-center shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-sincro-text-primary" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-sincro-text-secondary">Data/Hora</p>
                    <p className="text-sm font-bold text-sincro-modal-text truncate">{finalizadoInfo.finalizadoEm || "Não registrada"}</p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFinalizadoInfo(null)}
                className="h-10 px-5 rounded-full bg-status-green text-white text-sm font-extrabold hover:brightness-110 active:scale-95 transition-all self-end"
              >
                Fechar
              </button>
            </div>
          </div>
        </Modal>
      )}

      <CriarTarefaModal
        isOpen={isCriarModalOpen}
        onClose={() => setIsCriarModalOpen(false)}
        onCriar={(novaTarefa) => {
          const meses = [
            "janeiro", "fevereiro", "março", "abril", "maio", "junho",
            "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
          ]
          const hoje = new Date()
          const dataCriacao = `${hoje.getDate()} de ${meses[hoje.getMonth()]}, ${hoje.getFullYear()}`
          const dataEntrega = novaTarefa.dataEntregaISO
            ? novaTarefa.dataEntregaISO.split("-").reverse().join("/")
            : dataCriacao
          const novo: Tarefa = {
            id: tarefas.length > 0 ? Math.max(...tarefas.map(t => t.id)) + 1 : 1,
            nome: novaTarefa.nome || "Nova Tarefa",
            criador: "Seu Nome",
            projeto: novaTarefa.projeto,
            dataCriacao,
            dataEntrega,
            status: novaTarefa.status || "Não Iniciado",
            complexidade: novaTarefa.complexidade || "Média Complexidade",
            urgente: novaTarefa.urgente || false,
            progresso: { atual: 0, total: 4 },
            descricao: novaTarefa.descricao || "",
            checklist: [
              { id: 1, texto: "Progresso 1", concluido: false },
              { id: 2, texto: "Progresso 2", concluido: false },
              { id: 3, texto: "Progresso 3", concluido: false },
              { id: 4, texto: "Progresso 4", concluido: false },
            ],
            membros: novaTarefa.membros || [],
            comentarios: [],
            aceita: false
          }
          setTarefas(prev => [novo, ...prev])
        }}
      />
    </div>
  )
}

function FilterDropdown({
  id,
  label,
  icon: Icon,
  options,
  selected,
  onChange,
  openDropdown,
  setOpenDropdown
}: {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  options: string[]
  selected: string[]
  onChange: (next: string[]) => void
  openDropdown: string | null
  setOpenDropdown: (id: string | null) => void
}) {
  const isOpen = openDropdown === id
  const hasFilter = selected.length > 0

  const toggleOption = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter(s => s !== opt))
    } else {
      onChange([...selected, opt])
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpenDropdown(isOpen ? null : id)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-colors cursor-pointer ${hasFilter
          ? "bg-sincro-text-primary/20 border-sincro-text-primary text-sincro-text-primary font-bold"
          : "border-white/40 hover:bg-white/10 text-sincro-text-primary"
          }`}
      >
        {Icon && <Icon className="w-4 h-4 opacity-70" />}
        {label}
        {hasFilter && (
          <span className="ml-1 px-1.5 py-0.5 rounded-full bg-sincro-text-primary text-sincro-bg text-[10px] font-extrabold">
            {selected.length}
          </span>
        )}
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpenDropdown(null)}
          />
          <div className="absolute left-0 top-full mt-2 z-20 min-w-[220px] p-2 rounded-xl border border-sincro-border bg-sincro-modal-bg shadow-xl flex flex-col gap-1">
            {options.map(opt => {
              const isSelected = selected.includes(opt)
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleOption(opt)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left hover:bg-white/10 transition-colors cursor-pointer text-sincro-text-primary"
                >
                  <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${isSelected ? "bg-sincro-text-primary border-sincro-text-primary" : "border-white/40"}`}>
                    {isSelected && <Check className="w-3 h-3 text-sincro-bg" />}
                  </span>
                  <span className="flex-1">{opt}</span>
                </button>
              )
            })}
            {hasFilter && (
              <button
                type="button"
                onClick={() => onChange([])}
                className="mt-1 px-3 py-1.5 rounded-lg text-xs text-status-red hover:bg-status-red-bg transition-colors"
              >
                Limpar
              </button>
            )}
          </div>
        </>
      )}
    </div>
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
