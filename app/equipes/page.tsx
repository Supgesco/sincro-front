"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { EquipeModal, CriarEquipeModal } from "@/components/equipe-modal"
import { Plus, User } from "lucide-react"

const equipesData = [
  {
    id: 1,
    nome: "Nome da Equipe 1",
    gestor: "Nome Gestor",
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

  return (
    <div className="min-h-screen bg-sincro-bg text-sincro-text-primary">
      <Navbar />

      <main className="w-[85%] mx-auto py-8">
        {/* CABEÇALHO: Título + Botão na mesma linha */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[36px] font-extrabold text-sincro-text-primary leading-none">Suas Equipes</h1>
          <button
            onClick={() => setIsCriarModalOpen(true)}
            className="flex items-center gap-2 h-10 px-6 rounded-full bg-status-green text-white text-sm font-extrabold hover:brightness-110 active:scale-95 transition-all whitespace-nowrap shadow-lg hover:scale-[1.03]"
          >
            <Plus className="w-4 h-4" />
            Criar Nova Equipe
          </button>
        </div>

        {/* GRID DE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {equipes.map((equipe) => (
            <EquipeCard key={equipe.id} equipe={equipe} onClick={() => setSelectedEquipe(equipe)} />
          ))}
        </div>
      </main>

      {selectedEquipe && (
        <EquipeModal
          isOpen={!!selectedEquipe}
          onClose={() => setSelectedEquipe(null)}
          equipe={selectedEquipe}
        />
      )}

      <CriarEquipeModal
        isOpen={isCriarModalOpen}
        onClose={() => setIsCriarModalOpen(false)}
        onCriar={(novaEquipe) => {
          const novo = {
            ...equipesData[0],
            id: equipes.length + 1,
            nome: novaEquipe.nome,
            gestor: novaEquipe.gestor,
            descricao: novaEquipe.descricao,
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
