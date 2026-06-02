"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { CircularProgress } from "@/components/circular-progress"
import { Search, Plus } from "lucide-react"
import { ProjetoModal, CriarProjetoModal } from "@/components/projeto-modal"

const projetosData = [
  {
    id: 1,
    titulo: "Projeto Alpha",
    data: "20/05/2026",
    equipe: "Equipe Alpha",
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
}

const progressBar: Record<string, string> = {
  "Em Andamento": "bg-status-cyan",
  "Em Atraso": "bg-status-red",
  "Finalizado": "bg-status-green",
  "Não Iniciado": "bg-sincro-text-secondary/40",
}

export default function ProjetosPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [projetos, setProjetos] = useState(projetosData)
  const [selectedProjeto, setSelectedProjeto] = useState<typeof projetosData[0] | null>(null)
  const [isCriarModalOpen, setIsCriarModalOpen] = useState(false)

  const totalProjetos = projetos.length
  const projetosAtivos = projetos.filter(p => p.status === "Em Andamento").length
  const projetosAtraso = projetos.filter(p => p.status === "Em Atraso").length

  const filteredProjetos = projetos.filter(p =>
    p.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-sincro-bg text-sincro-text-primary">
      <Navbar />

      <main className="p-6">
        <div className="flex gap-6">
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

          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-4 p-4 border border-sincro-border rounded-2xl bg-sincro-modal-sidebar">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-sincro-border flex-1 max-w-xs bg-white/5">
                <Search className="w-4 h-4 opacity-50" />
                <input
                  type="text"
                  placeholder="Pesquisar Título"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent outline-none text-sm w-full text-sincro-text-primary"
                />
              </div>

              <FilterButton label="Equipe" />
              <FilterButton label="Status" />

              <button
                onClick={() => setIsCriarModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-status-green text-white text-sm font-extrabold hover:brightness-110 active:scale-95 transition-all ml-auto"
              >
                <Plus className="w-4 h-4" />
                Criar Novo Projeto
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
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
        />
      )}

      <CriarProjetoModal
        isOpen={isCriarModalOpen}
        onClose={() => setIsCriarModalOpen(false)}
        onCriar={(novoProjeto) => {
          const novo: typeof projetosData[0] = {
            id: projetos.length + 1,
            titulo: novoProjeto.titulo || "Novo Projeto",
            data: new Date().toLocaleDateString("pt-BR"),
            equipe: novoProjeto.equipe || "Equipe Principal",
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

function FilterButton({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-transparent text-sm transition-colors hover:bg-white/10 text-sincro-text-primary">
      <span className="w-4 h-4 rounded-full bg-sincro-text-secondary/20" />
      {label}
    </button>
  )
}

function ProjectCard({
  projeto,
  onClick
}: {
  projeto: typeof projetosData[0];
  onClick: () => void;
}) {
  const progressoPorcentagem = (projeto.tarefasCompletas / projeto.totalTarefas) * 100

  return (
    <div
      onClick={onClick}
      className="border border-sincro-border rounded-2xl p-4 cursor-pointer bg-sincro-modal-sidebar hover:border-white/30 hover:bg-white/5 active:scale-[0.98] transition-all duration-200"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base text-sincro-text-primary truncate">{projeto.titulo}</h3>
          <p className="text-[11px] text-sincro-text-secondary mt-1">{projeto.data}</p>
          <p className="text-[11px] text-sincro-text-secondary">Equipe: {projeto.equipe}</p>
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
