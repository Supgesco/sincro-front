"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { CircularProgress } from "@/components/circular-progress"
import { Search, Plus, Users, ListChecks, Folder, Filter, ChevronDown, Check, X, Building2 } from "lucide-react"
import { ProjetoModal, CriarProjetoModal } from "@/components/projeto-modal"

const PROJETOS_STORAGE_KEY = "sincro-projetos-data"
const EQUIPES_STORAGE_KEY = "sincro-equipes-data"

const getProjetosStorage = () => {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(PROJETOS_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const saveProjetosStorage = (projetos: typeof projetosData) => {
  if (typeof window === "undefined") return
  localStorage.setItem(PROJETOS_STORAGE_KEY, JSON.stringify(projetos))
}

const TASKS_STORAGE_KEY = "sincro-tarefas-data"

const getTarefasStorage = (): { projeto?: string; status: string; checklist?: { concluido: boolean }[] }[] => {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(TASKS_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const getEquipesStorage = (): string[] => {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(EQUIPES_STORAGE_KEY)
    if (!raw) return []
    const parsed: { nome: string }[] = JSON.parse(raw)
    return parsed.map(e => e.nome)
  } catch {
    return []
  }
}

const calcularStatsProjeto = (titulo: string, tarefas: { projeto?: string; status: string; checklist?: { concluido: boolean }[] }[]) => {
  const tarefasProjeto = tarefas.filter(t => t.projeto === titulo)
  const total = tarefasProjeto.length
  const completas = tarefasProjeto.filter(t => t.status === "Finalizado").length
  const progresso = total > 0 ? Math.round((completas / total) * 100) : 0
  return { totalTarefas: total, tarefasCompletas: completas, progresso }
}

const projetosData = [
  {
    id: 1,
    titulo: "Projeto Alpha",
    data: "20/05/2026",
    equipe: "Equipe Alpha",
    requerente: "Secretaria de Saúde",
    gestores: ["Carlos Silva", "Ana Santos"],
    progresso: 50,
    status: "Em Andamento",
    urgente: true,
    complexidade: 5,
    criador: "Davi Silva",
    descricao: "Desenvolvimento do novo design system da plataforma Sicro.",
    tarefasCompletas: 5,
    totalTarefas: 10,
    comentarios: [
      { autor: "Carlos Silva", texto: "Iniciamos a prototipação das telas principais." },
      { autor: "Ana Santos", texto: "Preciso de ajuda com o feedback das cores no tema escuro." }
    ]
  },
  {
    id: 2,
    titulo: "Projeto Beta",
    data: "15/06/2026",
    equipe: "Equipe Dev",
    requerente: "Secretaria de Finanças",
    gestores: ["Rodrigo Lira"],
    progresso: 75,
    status: "Em Atraso",
    urgente: true,
    complexidade: 8,
    criador: "Rodrigo Lira",
    descricao: "Integração das APIs de pagamento e cobrança recorrente.",
    tarefasCompletas: 3,
    totalTarefas: 4,
    comentarios: []
  },
  {
    id: 3,
    titulo: "Projeto Gama",
    data: "01/04/2026",
    equipe: "Equipe QA",
    requerente: "Secretaria de Educação",
    gestores: ["Mariana Souza", "Pedro Costa"],
    progresso: 100,
    status: "Finalizado",
    urgente: false,
    complexidade: 4,
    criador: "Mariana Souza",
    descricao: "Testes automatizados de ponta a ponta e homologação final.",
    tarefasCompletas: 10,
    totalTarefas: 10,
    comentarios: [
      { autor: "Mariana Souza", texto: "Todos os testes passaram no ambiente de homologação!" }
    ]
  },
  {
    id: 4,
    titulo: "Projeto Delta",
    data: "10/07/2026",
    equipe: "Equipe Marketing",
    requerente: "SEIOP",
    gestores: ["Lucas Oliveira"],
    progresso: 0,
    status: "Não Iniciado",
    urgente: false,
    complexidade: 3,
    criador: "Lucas Oliveira",
    descricao: "Planejamento da campanha de lançamento da nova versão.",
    tarefasCompletas: 0,
    totalTarefas: 5,
    comentarios: []
  },
  {
    id: 5,
    titulo: "Projeto Epsilon",
    data: "22/05/2026",
    equipe: "Equipe Design",
    requerente: "Secretaria de Obras",
    gestores: ["Sofia Mendes", "Julia Lima"],
    progresso: 90,
    status: "Em Atraso",
    urgente: true,
    complexidade: 7,
    criador: "Sofia Mendes",
    descricao: "Criação das ilustrações e assets visuais da landing page.",
    tarefasCompletas: 9,
    totalTarefas: 10,
    comentarios: []
  },
  {
    id: 6,
    titulo: "Projeto Zeta",
    data: "30/08/2026",
    equipe: "Equipe Ops",
    requerente: "Secretaria de Administração",
    gestores: ["Pedro Álvares"],
    progresso: 0,
    status: "Não Iniciado",
    urgente: false,
    complexidade: 6,
    criador: "Pedro Álvares",
    descricao: "Migração de servidores e infraestrutura para a AWS.",
    tarefasCompletas: 0,
    totalTarefas: 8,
    comentarios: []
  },
  {
    id: 7,
    titulo: "Projeto Eta",
    data: "12/05/2026",
    equipe: "Equipe Dados",
    requerente: "Secretaria de Meio Ambiente",
    gestores: ["Felipe Melo", "Camila Rocha"],
    progresso: 25,
    status: "Em Atraso",
    urgente: true,
    complexidade: 9,
    criador: "Felipe Melo",
    descricao: "Configuração do pipeline de ETL e dashboards de Analytics.",
    tarefasCompletas: 2,
    totalTarefas: 8,
    comentarios: []
  },
  {
    id: 8,
    titulo: "Projeto Theta",
    data: "20/03/2026",
    equipe: "Equipe Suporte",
    requerente: "SEIOP",
    gestores: ["Julia Lima"],
    progresso: 100,
    status: "Finalizado",
    urgente: false,
    complexidade: 2,
    criador: "Julia Lima",
    descricao: "Elaboração dos novos artigos de ajuda da central de suporte.",
    tarefasCompletas: 5,
    totalTarefas: 5,
    comentarios: []
  },
  {
    id: 9,
    titulo: "Projeto Iota",
    data: "05/06/2026",
    equipe: "Equipe RH",
    requerente: "Secretaria de Transporte",
    gestores: ["Camila Rocha", "Felipe Melo"],
    progresso: 40,
    status: "Em Atraso",
    urgente: true,
    complexidade: 5,
    criador: "Camila Rocha",
    descricao: "Processo de onboarding e integração de novos colaboradores.",
    tarefasCompletas: 2,
    totalTarefas: 5,
    comentarios: []
  },
]

const statusBadge: Record<string, string> = {
  "Em Andamento": "bg-status-cyan",
  "Em Atraso": "bg-status-red",
  "Finalizado": "bg-status-green",
  "Não Iniciado": "bg-sincro-text-secondary/40",
  "Suspenso": "bg-status-yellow",
  "Em Planejamento": "bg-status-orange",
  "Concluído": "bg-status-green",
}

const progressBar: Record<string, string> = {
  "Em Andamento": "bg-status-cyan",
  "Em Atraso": "bg-status-red",
  "Finalizado": "bg-status-green",
  "Não Iniciado": "bg-sincro-text-secondary/40",
  "Suspenso": "bg-status-yellow",
  "Em Planejamento": "bg-status-orange",
  "Concluído": "bg-status-green",
}

export default function ProjetosPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [projetos, setProjetos] = useState(projetosData)
  const [selectedProjeto, setSelectedProjeto] = useState<typeof projetosData[0] | null>(null)
  const [isCriarModalOpen, setIsCriarModalOpen] = useState(false)
  const [equipeFilter, setEquipeFilter] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [complexidadeFilter, setComplexidadeFilter] = useState<string[]>([])
  const [setorFilter, setSetorFilter] = useState<string[]>([])
  const [apenasUrgentes, setApenasUrgentes] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [equipesDisponiveis, setEquipesDisponiveis] = useState<string[]>([])
  const [equipesMap, setEquipesMap] = useState<Record<string, string>>({})

  const hasLoadedFromStorage = useRef(false)

  useEffect(() => {
    const saved = getProjetosStorage()
    if (saved) setProjetos(saved)
    const tarefas = getTarefasStorage()
    setProjetos(prev => prev.map(p => {
      const stats = calcularStatsProjeto(p.titulo, tarefas)
      return { ...p, ...stats }
    }))
    // Carrega equipes criadas pelo usuário
    const nomeEquipes = getEquipesStorage()
    if (nomeEquipes.length > 0) setEquipesDisponiveis(nomeEquipes)
    // Carrega mapa de equipes -> setores
    try {
      const raw = localStorage.getItem("sincro-equipes-data")
      if (raw) {
        const equipes = JSON.parse(raw) as { nome: string; setor?: string }[]
        const map: Record<string, string> = {}
        equipes.forEach(e => { map[e.nome] = e.setor || "SEIOP" })
        setEquipesMap(map)
      }
    } catch {}
  }, [])

  useEffect(() => {
    if (!hasLoadedFromStorage.current) {
      hasLoadedFromStorage.current = true
      return
    }
    saveProjetosStorage(projetos)
  }, [projetos])

  const complexidadeDoProjeto = (c: number) => {
    if (c <= 3) return "Baixa"
    if (c <= 6) return "Média"
    return "Alta"
  }

  const filteredProjetos = projetos.filter(p => {
    const matchSearch = p.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchEquipe = equipeFilter.length === 0 || equipeFilter.includes(p.equipe)
    const matchStatus = statusFilter.length === 0 || statusFilter.includes(p.status)
    const matchComplexidade = complexidadeFilter.length === 0 || complexidadeFilter.includes(complexidadeDoProjeto(p.complexidade))
    const matchUrgente = !apenasUrgentes || p.urgente
    const projetoSetor = equipesMap[p.equipe || ""] || "SEIOP"
    const matchSetor = setorFilter.length === 0 || setorFilter.includes(projetoSetor)
    return matchSearch && matchEquipe && matchStatus && matchComplexidade && matchUrgente && matchSetor
  })

  const totalProjetos = filteredProjetos.length
  const projetosAtivos = filteredProjetos.filter(p => p.status === "Em Andamento").length
  const projetosAtraso = filteredProjetos.filter(p => p.status === "Em Atraso").length

  return (
    <div className="h-screen overflow-hidden bg-sincro-bg text-sincro-text-primary flex flex-col">
      <Navbar />

      <main className="p-6 flex-1 flex flex-col min-h-0">
        <div className="flex gap-6 flex-1 min-h-0">
          <div className="flex flex-col gap-4">
            <CircularProgress percentage={100} label="Total de Projetos" value={totalProjetos} colors={["#A78BFA", "#7A5BEF", "#5A3E99"]} />
            <CircularProgress
              percentage={totalProjetos > 0 ? (projetosAtivos / totalProjetos) * 100 : 0}
              label="Projetos Ativos"
              value={projetosAtivos}
              colors={["#7A5BEF", "#5A3E99", "#3A2962"]}
            />
            <CircularProgress
              percentage={totalProjetos > 0 ? (projetosAtraso / totalProjetos) * 100 : 0}
              label="Projetos em Atraso"
              value={projetosAtraso}
              colors={["#5A3E99", "#3A2962", "#251A40"]}
            />
          </div>

          <div className="flex-1 flex flex-col space-y-6 min-h-0">
            <div className="flex items-center gap-4 px-3 py-6 border border-sincro-border rounded-2xl bg-sincro-team-card flex-wrap shrink-0">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-sincro-border flex-1 min-w-[200px] max-w-xs bg-white/5">
                <Search className="w-4 h-4 opacity-50" />
                <input
                  type="text"
                  placeholder="Pesquisar Título"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent outline-none text-sm w-full text-sincro-text-primary"
                />
              </div>

              <FilterDropdown
                id="equipe"
                label="Equipe"
                icon={Users}
                options={Array.from(new Set(projetos.map(p => p.equipe)))}
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
                options={["Baixa", "Média", "Alta"]}
                selected={complexidadeFilter}
                onChange={setComplexidadeFilter}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />
              <FilterDropdown
                id="setor"
                label="Setor"
                icon={Building2}
                options={Array.from(new Set(Object.values(equipesMap)))}
                selected={setorFilter}
                onChange={setSetorFilter}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />

              <button
                type="button"
                onClick={() => setApenasUrgentes(prev => !prev)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-colors cursor-pointer ${
                  apenasUrgentes
                    ? "bg-status-red-bg border-status-red text-status-red font-bold"
                    : "border-white/40 hover:bg-white/10 text-sincro-text-primary"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-status-red" />
                Urgentes
              </button>

              {(equipeFilter.length > 0 || statusFilter.length > 0 || complexidadeFilter.length > 0 || setorFilter.length > 0 || apenasUrgentes || searchTerm) && (
                <button
                  onClick={() => {
                    setEquipeFilter([])
                    setStatusFilter([])
                    setComplexidadeFilter([])
                    setSetorFilter([])
                    setApenasUrgentes(false)
                    setSearchTerm("")
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
                Criar Novo Projeto
              </button>
            </div>

            <div className="text-sm text-sincro-text-secondary px-1">
              {filteredProjetos.length} Projeto{filteredProjetos.length !== 1 ? "s" : ""}
            </div>

            <div className="grid grid-cols-3 gap-4 overflow-y-auto min-h-0 p-1 pb-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-sincro-border [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
              {filteredProjetos.map((projeto) => (
                <ProjectCard
                  key={projeto.id}
                  projeto={projeto}
                  onClick={() => setSelectedProjeto(projeto)}
                />
              ))}
              {filteredProjetos.length === 0 && (
                <div className="col-span-3 text-center py-12 text-sincro-text-muted">
                  Nenhum projeto encontrado.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {selectedProjeto && (
        <ProjetoModal
          isOpen={!!selectedProjeto}
          onClose={() => setSelectedProjeto(null)}
          projeto={selectedProjeto}
          onVerTarefas={() => {
            router.push(`/tarefas?projeto=${encodeURIComponent(selectedProjeto.titulo)}`)
          }}
          onMarcarFinalizado={() => {
            setProjetos(prev =>
              prev.map(p =>
                p.id === selectedProjeto.id
                  ? { ...p, status: "Finalizado", tarefasCompletas: p.totalTarefas, progresso: 100 }
                  : p
              )
            )
            setSelectedProjeto(prev =>
              prev
                ? { ...prev, status: "Finalizado", tarefasCompletas: prev.totalTarefas, progresso: 100 }
                : null
            )
          }}
          onSave={(updated) => {
            setProjetos(prev => prev.map(p => p.id === updated.id ? { ...p, ...updated } : p))
            setSelectedProjeto({ ...selectedProjeto, ...updated })
          }}
          onExcluir={() => {
            setProjetos(prev => prev.filter(p => p.id !== selectedProjeto.id))
            setSelectedProjeto(null)
          }}
        />
      )}

      <CriarProjetoModal
        isOpen={isCriarModalOpen}
        onClose={() => setIsCriarModalOpen(false)}
        equipesDisponiveis={equipesDisponiveis}
        onCriar={(novoProjeto) => {
          const novo: typeof projetosData[0] = {
            id: projetos.length > 0 ? Math.max(...projetos.map(p => p.id)) + 1 : 1,
            titulo: novoProjeto.titulo || "Novo Projeto",
            data: new Date().toLocaleDateString("pt-BR"),
            equipe: novoProjeto.equipe || "Equipe Principal",
            requerente: novoProjeto.requerente || "",
            gestores: novoProjeto.gestores || [],
            progresso: 0,
            status: novoProjeto.status || "Não Iniciado",
            urgente: novoProjeto.urgente || false,
            complexidade: novoProjeto.complexidade || 5,
            criador: "Você",
            descricao: novoProjeto.descricao || "",
            tarefasCompletas: 0,
            totalTarefas: 5,
            comentarios: []
          }
          setProjetos(prev => [...prev, novo])
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
        className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-colors cursor-pointer ${
          hasFilter
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

function ProjectCard({
  projeto,
  onClick
}: {
  projeto: typeof projetosData[0];
  onClick: () => void;
}) {
  const progressoPorcentagem = projeto.totalTarefas > 0 ? (projeto.tarefasCompletas / projeto.totalTarefas) * 100 : 0

  return (
    <div
      onClick={onClick}
      className="border border-sincro-border rounded-2xl p-4 cursor-pointer bg-sincro-team-card hover:scale-[1.02] active:scale-[0.98] shadow-lg transition-all duration-200 h-full min-h-[160px] flex flex-col"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base text-sincro-text-primary truncate">{projeto.titulo}</h3>
          <p className="text-[11px] text-sincro-text-secondary mt-1">{projeto.data}</p>
          <p className="text-[11px] text-sincro-text-secondary">Equipe: {projeto.equipe}</p>
          {projeto.requerente && <p className="text-[11px] text-sincro-text-secondary">Requerente: {projeto.requerente}</p>}
        </div>
        <div className="text-right shrink-0 ml-3">
          <p className="text-[10px] uppercase tracking-wider text-sincro-text-secondary font-semibold">Complexidade</p>
          <p className="font-extrabold text-sm text-sincro-text-primary">{projeto.complexidade}/10</p>
          {projeto.urgente && (
            <span className="flex items-center gap-1 text-[11px] justify-end mt-1 text-status-red font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-status-red animate-pulse" />
              Urgente
            </span>
          )}
        </div>
      </div>

      <div className="mt-3">
        <div className="w-full h-1.5 rounded-full overflow-hidden bg-white/10">
          <div
            className={`h-full rounded-full transition-all duration-500 ${progressBar[projeto.status]}`}
            style={{ width: `${progressoPorcentagem}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-2.5">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider text-white font-bold ${statusBadge[projeto.status]}`}>
            {projeto.status}
          </span>
          <span className="text-[11px] text-sincro-text-secondary font-semibold">
            {projeto.tarefasCompletas}/{projeto.totalTarefas} tarefas
          </span>
        </div>
      </div>
    </div>
  )
}
