"use client"

import { useState, useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { EquipeModal, CriarEquipeModal } from "@/components/equipe-modal"
import { Plus, User, Building2, ChevronDown, X } from "lucide-react"

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
  const [filtroSetorAberto, setFiltroSetorAberto] = useState(false)
  const [setores, setSetores] = useState<{ id: number; nome: string }[]>([])

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
    if (filtroSetor.length === 0) return true
    return filtroSetor.includes(e.setor || "SEIOP")
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

      <main className="w-[85%] mx-auto py-8 flex-1 flex flex-col min-h-0">
        {/* CABEÇALHO: Título + Botão na mesma linha */}
        <div className="flex items-center justify-between mb-6 shrink-0">
          <h1 className="text-[36px] font-extrabold text-sincro-text-primary leading-none">Suas Equipes</h1>
          <button
            onClick={() => setIsCriarModalOpen(true)}
            className="flex items-center gap-2 h-10 px-6 rounded-full bg-status-green text-white text-sm font-extrabold hover:brightness-110 active:scale-95 transition-all whitespace-nowrap shadow-lg hover:scale-[1.03]"
          >
            <Plus className="w-4 h-4" />
            Criar Nova Equipe
          </button>
        </div>

        {/* FILTRO POR SETOR */}
        <div className="flex items-center gap-3 mb-4 shrink-0">
          <div className="flex items-center gap-2 text-sm text-sincro-text-secondary">
            <Building2 className="w-4 h-4" />
            <span className="font-bold">Setor:</span>
          </div>
          <div className="relative">
            <button
              onClick={() => setFiltroSetorAberto(!filtroSetorAberto)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-sincro-border text-sm font-bold text-sincro-text-primary hover:bg-white/5 transition-all min-w-[200px]"
            >
              <span className="flex-1 text-left truncate">
                {filtroSetor.length === 0
                  ? "Todos os setores"
                  : filtroSetor.length === 1
                    ? filtroSetor[0]
                    : `${filtroSetor.length} setores selecionados`
                }
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${filtroSetorAberto ? "rotate-180" : ""}`} />
            </button>
            {filtroSetorAberto && (
              <div className="absolute top-full left-0 mt-2 w-full min-w-[250px] bg-sincro-modal-bg border border-sincro-border rounded-xl shadow-lg z-50 py-2 max-h-[300px] overflow-y-auto">
                <button
                  onClick={() => setFiltroSetor([])}
                  className={`w-full px-4 py-2 text-left text-sm font-bold hover:bg-white/5 transition-colors ${
                    filtroSetor.length === 0 ? "text-sincro-primary" : "text-sincro-text-primary"
                  }`}
                >
                  Todos
                </button>
                {setores.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => toggleSetor(s.nome)}
                    className={`w-full px-4 py-2 text-left text-sm font-bold hover:bg-white/5 transition-colors flex items-center justify-between ${
                      filtroSetor.includes(s.nome) ? "text-sincro-primary" : "text-sincro-text-primary"
                    }`}
                  >
                    <span>{s.nome}</span>
                    {filtroSetor.includes(s.nome) && (
                      <span className="w-5 h-5 rounded-full bg-sincro-primary text-white flex items-center justify-center">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          {filtroSetor.length > 0 && (
            <button
              onClick={() => setFiltroSetor([])}
              className="p-1.5 rounded-full hover:bg-white/10 text-sincro-text-secondary transition-colors"
              title="Limpar filtro"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* GRID DE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto min-h-0 p-1 pb-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-sincro-border [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          {equipesFiltradas.map((equipe) => (
            <EquipeCard key={equipe.id} equipe={equipe} onClick={() => setSelectedEquipe(equipe)} />
          ))}
          {equipesFiltradas.length === 0 && (
            <div className="col-span-full text-center py-12 text-sincro-text-muted">
              Nenhuma equipe encontrada para este setor.
            </div>
          )}
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
