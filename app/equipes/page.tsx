"use client"

import { useState, useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { CircularProgress } from "@/components/circular-progress"
import { EquipeModal, CriarEquipeModal } from "@/components/equipe-modal"
import { Plus, User, Building2, ChevronDown, X, Check, Search } from "lucide-react"

const EQUIPES_STORAGE_KEY = "sincro-equipes-data"
const SETORES_STORAGE_KEY = "sincro-setores-data"

const getEquipesStorage = () => {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(EQUIPES_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const saveEquipesStorage = (equipes: typeof equipesData) => {
  if (typeof window === "undefined") return
  localStorage.setItem(EQUIPES_STORAGE_KEY, JSON.stringify(equipes))
}

const getSetoresStorage = (): { id: number; nome: string }[] => {
  if (typeof window === "undefined") return [{ id: 1, nome: "SEIOP" }]
  try {
    const raw = localStorage.getItem(SETORES_STORAGE_KEY)
    if (raw) return JSON.parse(raw).map((s: { id: number; nome: string }) => ({ id: s.id, nome: s.nome }))
  } catch {}
  return [{ id: 1, nome: "SEIOP" }]
}

const equipesData = [
  {
    id: 1,
    nome: "Nome da Equipe 1",
    gestor: "Nome Gestor",
    setor: "SEIOP",
    projetosAtivos: 4,
    emAndamento: 2,
    emAtraso: 1,
    numMembros: 4,
    membros: [
      { nome: "Nome do Membro 1", status: "Status: Tarefa 1", ativo: true },
      { nome: "Nome do Membro 2", status: "Status: Tarefa 1", ativo: true },
      { nome: "Nome do Membro 3", status: "Status: Tarefa 2", ativo: true },
      { nome: "Nome do Membro 4", status: "Status: Sem Tarefas Ativas", ativo: false },
    ],
    projetos: [
      { nome: "Projeto 1", completo: 5, total: 10, urgente: false },
      { nome: "Projeto 2", completo: 12, total: 15, urgente: false },
      { nome: "Projeto 3", completo: 3, total: 20, urgente: true },
      { nome: "Projeto 4", completo: 2, total: 7, urgente: false },
    ]
  },
  {
    id: 2,
    nome: "Nome da Equipe 2",
    gestor: "Nome Gestor",
    setor: "Secretaria de Saúde",
    projetosAtivos: 6,
    emAndamento: 3,
    emAtraso: 3,
    numMembros: 7,
    membros: [
      { nome: "Nome do Membro 1", status: "Status: Tarefa 1", ativo: true },
      { nome: "Nome do Membro 2", status: "Status: Tarefa 1", ativo: true },
      { nome: "Nome do Membro 3", status: "Status: Tarefa 2", ativo: true },
      { nome: "Nome do Membro 4", status: "Status: Sem Tarefas Ativas", ativo: false },
      { nome: "Nome do Membro 5", status: "Status: Tarefa 3", ativo: true },
      { nome: "Nome do Membro 6", status: "Status: Tarefa 4", ativo: true },
      { nome: "Nome do Membro 7", status: "Status: Sem Tarefas Ativas", ativo: false },
    ],
    projetos: [
      { nome: "Projeto A", completo: 8, total: 10, urgente: false },
      { nome: "Projeto B", completo: 5, total: 5, urgente: false },
      { nome: "Projeto C", completo: 1, total: 4, urgente: true },
    ]
  },
  {
    id: 3,
    nome: "Nome da Equipe 3",
    gestor: "Nome Gestor",
    setor: "SEIOP",
    projetosAtivos: 3,
    emAndamento: 5,
    emAtraso: 0,
    numMembros: 5,
    membros: [],
    projetos: []
  },
  {
    id: 4,
    nome: "Nome da Equipe 4",
    gestor: "Nome Gestor",
    setor: "Secretaria de Educação",
    projetosAtivos: 2,
    emAndamento: 1,
    emAtraso: 2,
    numMembros: 3,
    membros: [],
    projetos: []
  }
]

function EquipeCard({ equipe, onClick }: { equipe: typeof equipesData[0]; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        color: "var(--sincro-team-card-text)",
        minHeight: "110px",
      }}
      className="bg-sincro-team-card w-full flex flex-col justify-between gap-2 p-3.5 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
    >
      {/* TOPO: Nome + Gestor */}
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold leading-tight" style={{ color: "var(--sincro-team-card-text)" }}>
          {equipe.nome}
        </h2>
        <p className="text-xs flex items-center gap-1.5" style={{ color: "var(--sincro-team-card-text-muted)" }}>
          <User className="w-3.5 h-3.5" />
          Gestor: {equipe.gestor}
        </p>
        <p className="text-[10px] flex items-center gap-1.5" style={{ color: "var(--sincro-team-card-text-muted)" }}>
          <Building2 className="w-3 h-3" />
          {equipe.setor || "SEIOP"}
        </p>
      </div>

      {/* MEIO: Indicadores (mesma linha) */}
      <div className="flex items-center justify-between gap-2 text-[11px]" style={{ color: "var(--sincro-team-card-text-muted)" }}>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-status-green shrink-0" />
          {equipe.projetosAtivos} Projetos
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-status-cyan shrink-0" />
          {equipe.emAndamento} Em Andamento
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-status-red shrink-0" />
          {equipe.emAtraso} Em Atraso
        </span>
      </div>

      {/* INFERIOR: Membros */}
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--sincro-team-card-text-soft)" }}>
          Membros:
        </p>
        <div className="flex items-center -space-x-1.5">
          {Array.from({ length: equipe.numMembros }).map((_, idx) => (
            <div
              key={idx}
              className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
              style={{
                borderColor: "var(--sincro-team-card-avatar-border)",
                backgroundColor: "var(--sincro-team-card-avatar-bg)",
              }}
            >
              <User className="w-3 h-3" style={{ color: "var(--sincro-team-card-text)" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function EquipesPage() {
  const [equipes, setEquipes] = useState(equipesData)
  const [selectedEquipe, setSelectedEquipe] = useState<typeof equipesData[0] | null>(null)
  const [isCriarModalOpen, setIsCriarModalOpen] = useState(false)
  const [filtroSetor, setFiltroSetor] = useState<string[]>([])
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [setores, setSetores] = useState<{ id: number; nome: string }[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const hasLoadedFromStorage = useRef(false)

  useEffect(() => {
    const saved = getEquipesStorage()
    if (saved) setEquipes(saved)
    setSetores(getSetoresStorage())
  }, [])

  useEffect(() => {
    if (!hasLoadedFromStorage.current) {
      hasLoadedFromStorage.current = true
      return
    }
    saveEquipesStorage(equipes)
  }, [equipes])

  const equipesFiltradas = equipes.filter(e => {
    const matchSetor = filtroSetor.length === 0 || filtroSetor.includes(e.setor || "SEIOP")
    const matchSearch = !searchTerm || e.nome.toLowerCase().includes(searchTerm.toLowerCase()) || e.gestor.toLowerCase().includes(searchTerm.toLowerCase())
    return matchSetor && matchSearch
  })

  const toggleSetor = (nome: string) => {
    setFiltroSetor(prev => {
      if (prev.includes(nome)) return prev.filter(s => s !== nome)
      return [...prev, nome]
    })
  }

  const handleExcluir = (id: number) => {
    setEquipes(prev => prev.filter(e => e.id !== id))
  }

  return (
    <div className="h-screen overflow-hidden bg-sincro-bg text-sincro-text-primary flex flex-col">
      <Navbar />

      <main className="p-6 flex-1 flex flex-col min-h-0">
        <div className="flex gap-6 flex-1 min-h-0">
          <div className="flex flex-col gap-4">
            <CircularProgress 
              percentage={100} 
              label="Total de Equipes" 
              value={equipes.length} 
              colors={["#A78BFA", "#7A5BEF", "#5A3E99"]} 
            />
            <CircularProgress
              percentage={100}
              label="Total de Membros"
              value={equipes.reduce((acc, eq) => acc + eq.numMembros, 0)}
              colors={["#7A5BEF", "#5A3E99", "#3A2962"]}
            />
            <CircularProgress
              percentage={100}
              label="Projetos Ativos"
              value={equipes.reduce((acc, eq) => acc + eq.projetosAtivos, 0)}
              colors={["#5A3E99", "#3A2962", "#251A40"]}
            />
          </div>

          <div className="flex-1 flex flex-col space-y-6 min-h-0">
            {/* FILTRO POR SETOR */}
            <div className="flex items-center gap-4 px-3 py-6 border border-sincro-border rounded-2xl bg-sincro-team-card flex-wrap shrink-0">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-sincro-border flex-1 min-w-[200px] max-w-xs bg-white/5">
              <Search className="w-4 h-4 opacity-50" />
              <input
                type="text"
                placeholder="Pesquisar equipe..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none text-sm w-full text-sincro-text-primary"
              />
            </div>

            <FilterDropdown
              id="setor"
              label="Setor"
              icon={Building2}
              options={setores.map(s => s.nome)}
              selected={filtroSetor}
              onChange={setFiltroSetor}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />

            {filtroSetor.length > 0 && (
              <button
                onClick={() => setFiltroSetor([])}
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
              Criar Nova Equipe
            </button>
          </div>

          <div className="text-sm text-sincro-text-secondary px-1">
            {equipesFiltradas.length} Equipe{equipesFiltradas.length !== 1 ? "s" : ""}
          </div>

          {/* GRID DE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto min-h-0 p-1 pb-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-sincro-border [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
            {equipesFiltradas.map((equipe) => (
              <EquipeCard key={equipe.id} equipe={equipe} onClick={() => setSelectedEquipe(equipe)} />
            ))}
            {equipesFiltradas.length === 0 && (
              <div className="col-span-full text-center py-12 text-sincro-text-muted">
                Nenhuma equipe encontrada para este setor.
              </div>
            )}
          </div>
          </div>
        </div>
      </main>

      {selectedEquipe && (
        <EquipeModal
          isOpen={!!selectedEquipe}
          onClose={() => setSelectedEquipe(null)}
          equipe={selectedEquipe}
          onSave={(updated) => {
            setEquipes(prev => prev.map(e => e.id === updated.id ? { ...e, ...updated } : e))
            setSelectedEquipe({ ...selectedEquipe, ...updated })
          }}
          onDelete={handleExcluir}
        />
      )}

      <CriarEquipeModal
        isOpen={isCriarModalOpen}
        onClose={() => setIsCriarModalOpen(false)}
        onCriar={(novaEquipe) => {
          const novo = {
            ...equipesData[0],
            id: equipes.length > 0 ? Math.max(...equipes.map(e => e.id)) + 1 : 1,
            nome: novaEquipe.nome,
            gestor: novaEquipe.gestor,
            descricao: novaEquipe.descricao,
            setor: novaEquipe.setor || "SEIOP",
            numMembros: novaEquipe.membros.length,
            membros: novaEquipe.membros.map(m => ({ nome: m.nome, status: m.status, ativo: m.ativo })),
            projetosAtivos: 0,
            emAndamento: 0,
            emAtraso: 0,
            projetos: [],
          }
          setEquipes(prev => [...prev, novo])
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
