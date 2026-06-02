"use client"

import { useState } from "react"
import { Search, Plus, Edit2, Trash2, X, User, CheckSquare } from "lucide-react"

type StatusProjeto = "Em Andamento" | "Em Atraso" | "Finalizado" | "Não Iniciado"

type Equipe = {
  id: number
  nome: string
  gestor: string
  numMembros: number
  numProjetos: number
}

type Projeto = {
  id: number
  titulo: string
  equipe: string
  criador: string
  data: string
  status: StatusProjeto
  progresso: number
  totalTarefas: number
  tarefasCompletas: number
}

const equipesIniciais: Equipe[] = [
  { id: 1, nome: "Equipe Alpha", gestor: "Davi Silva", numMembros: 6, numProjetos: 4 },
  { id: 2, nome: "Equipe Dev", gestor: "Rodrigo Lira", numMembros: 8, numProjetos: 6 },
  { id: 3, nome: "Equipe Design", gestor: "Ana Santos", numMembros: 5, numProjetos: 3 },
  { id: 4, nome: "Equipe QA", gestor: "Mariana Souza", numMembros: 4, numProjetos: 2 },
  { id: 5, nome: "Equipe Marketing", gestor: "Lucas Oliveira", numMembros: 3, numProjetos: 2 },
  { id: 6, nome: "Equipe Ops", gestor: "Pedro Álvares", numMembros: 4, numProjetos: 1 },
  { id: 7, nome: "Equipe Dados", gestor: "Felipe Melo", numMembros: 3, numProjetos: 2 },
  { id: 8, nome: "Equipe Suporte", gestor: "Julia Lima", numMembros: 5, numProjetos: 3 },
  { id: 9, nome: "Equipe RH", gestor: "Camila Rocha", numMembros: 3, numProjetos: 1 },
  { id: 10, nome: "Equipe Mobile", gestor: "Bruno Tavares", numMembros: 4, numProjetos: 3 },
]

const projetosIniciais: Projeto[] = [
  { id: 1, titulo: "Projeto Alpha", equipe: "Equipe Alpha", criador: "Davi Silva", data: "20/05/2026", status: "Em Andamento", progresso: 50, totalTarefas: 10, tarefasCompletas: 5 },
  { id: 2, titulo: "Projeto Beta", equipe: "Equipe Dev", criador: "Rodrigo Lira", data: "15/06/2026", status: "Em Atraso", progresso: 75, totalTarefas: 4, tarefasCompletas: 3 },
  { id: 3, titulo: "Projeto Gama", equipe: "Equipe QA", criador: "Mariana Souza", data: "01/04/2026", status: "Finalizado", progresso: 100, totalTarefas: 10, tarefasCompletas: 10 },
  { id: 4, titulo: "Projeto Delta", equipe: "Equipe Marketing", criador: "Lucas Oliveira", data: "10/07/2026", status: "Não Iniciado", progresso: 0, totalTarefas: 5, tarefasCompletas: 0 },
  { id: 5, titulo: "Projeto Epsilon", equipe: "Equipe Design", criador: "Sofia Mendes", data: "22/05/2026", status: "Em Atraso", progresso: 90, totalTarefas: 10, tarefasCompletas: 9 },
  { id: 6, titulo: "Projeto Zeta", equipe: "Equipe Ops", criador: "Pedro Álvares", data: "30/08/2026", status: "Não Iniciado", progresso: 0, totalTarefas: 8, tarefasCompletas: 0 },
  { id: 7, titulo: "Migração Cloud", equipe: "Equipe Dev", criador: "Marcos Lima", data: "12/05/2026", status: "Em Atraso", progresso: 25, totalTarefas: 8, tarefasCompletas: 2 },
  { id: 8, titulo: "App Mobile v2", equipe: "Equipe Mobile", criador: "Bruno Tavares", data: "20/03/2026", status: "Finalizado", progresso: 100, totalTarefas: 5, tarefasCompletas: 5 },
]

const statusBadge: Record<StatusProjeto, string> = {
  "Em Andamento": "bg-status-cyan",
  "Em Atraso": "bg-status-red",
  "Finalizado": "bg-status-green",
  "Não Iniciado": "bg-sincro-text-secondary/40",
}

const statusBar: Record<StatusProjeto, string> = {
  "Em Andamento": "bg-status-cyan",
  "Em Atraso": "bg-status-red",
  "Finalizado": "bg-status-green",
  "Não Iniciado": "bg-sincro-text-secondary/40",
}

type ModalTipo = "equipe" | "projeto" | null

export default function EquipesProjetosPage() {
  const [aba, setAba] = useState<"equipes" | "projetos">("equipes")
  const [equipes, setEquipes] = useState<Equipe[]>(equipesIniciais)
  const [projetos, setProjetos] = useState<Projeto[]>(projetosIniciais)
  const [search, setSearch] = useState("")
  const [modalTipo, setModalTipo] = useState<ModalTipo>(null)
  const [editandoEquipe, setEditandoEquipe] = useState<Equipe | null>(null)
  const [editandoProjeto, setEditandoProjeto] = useState<Projeto | null>(null)

  const [eqNome, setEqNome] = useState("")
  const [eqGestor, setEqGestor] = useState("")

  const [pjTitulo, setPjTitulo] = useState("")
  const [pjEquipe, setPjEquipe] = useState("")
  const [pjStatus, setPjStatus] = useState<StatusProjeto>("Não Iniciado")

  const abrirModal = (tipo: "equipe" | "projeto", item?: Equipe | Projeto) => {
    setModalTipo(tipo)
    if (tipo === "equipe") {
      const eq = item as Equipe | undefined
      if (eq) {
        setEditandoEquipe(eq)
        setEqNome(eq.nome)
        setEqGestor(eq.gestor)
      } else {
        setEditandoEquipe(null)
        setEqNome("")
        setEqGestor("")
      }
    } else {
      const pj = item as Projeto | undefined
      if (pj) {
        setEditandoProjeto(pj)
        setPjTitulo(pj.titulo)
        setPjEquipe(pj.equipe)
        setPjStatus(pj.status)
      } else {
        setEditandoProjeto(null)
        setPjTitulo("")
        setPjEquipe(equipes[0]?.nome || "")
        setPjStatus("Não Iniciado")
      }
    }
  }

  const fecharModal = () => {
    setModalTipo(null)
    setEditandoEquipe(null)
    setEditandoProjeto(null)
  }

  const salvarEquipe = () => {
    if (!eqNome.trim()) return
    if (editandoEquipe) {
      setEquipes(prev => prev.map(e => e.id === editandoEquipe.id ? { ...e, nome: eqNome, gestor: eqGestor } : e))
    } else {
      const nova: Equipe = {
        id: Math.max(0, ...equipes.map(e => e.id)) + 1,
        nome: eqNome,
        gestor: eqGestor,
        numMembros: 0,
        numProjetos: 0,
      }
      setEquipes(prev => [...prev, nova])
    }
    fecharModal()
  }

  const salvarProjeto = () => {
    if (!pjTitulo.trim()) return
    if (editandoProjeto) {
      setProjetos(prev => prev.map(p => p.id === editandoProjeto.id ? { ...p, titulo: pjTitulo, equipe: pjEquipe, status: pjStatus } : p))
    } else {
      const novo: Projeto = {
        id: Math.max(0, ...projetos.map(p => p.id)) + 1,
        titulo: pjTitulo,
        equipe: pjEquipe,
        criador: "Admin",
        data: new Date().toLocaleDateString("pt-BR"),
        status: pjStatus,
        progresso: 0,
        totalTarefas: 5,
        tarefasCompletas: 0,
      }
      setProjetos(prev => [...prev, novo])
    }
    fecharModal()
  }

  const removerEquipe = (id: number) => setEquipes(prev => prev.filter(e => e.id !== id))
  const removerProjeto = (id: number) => setProjetos(prev => prev.filter(p => p.id !== id))

  const equipesFiltradas = equipes.filter(e =>
    e.nome.toLowerCase().includes(search.toLowerCase()) ||
    e.gestor.toLowerCase().includes(search.toLowerCase())
  )

  const projetosFiltrados = projetos.filter(p =>
    p.titulo.toLowerCase().includes(search.toLowerCase()) ||
    p.equipe.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-extrabold leading-none">Equipes & Projetos</h1>
          <p className="text-sm text-sincro-text-secondary mt-2">Visão administrativa de todas as equipes e projetos da plataforma.</p>
        </div>
        <button
          onClick={() => abrirModal(aba === "equipes" ? "equipe" : "projeto")}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-status-green text-white text-sm font-extrabold hover:brightness-110 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          {aba === "equipes" ? "Nova Equipe" : "Novo Projeto"}
        </button>
      </div>

      <div className="flex items-center gap-2 self-start">
        <button
          onClick={() => setAba("equipes")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
            aba === "equipes" ? "bg-sincro-text-primary text-sincro-bg" : "border border-sincro-border text-sincro-text-primary hover:bg-white/5"
          }`}
        >
          <User className="w-4 h-4" />
          Equipes ({equipes.length})
        </button>
        <button
          onClick={() => setAba("projetos")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
            aba === "projetos" ? "bg-sincro-text-primary text-sincro-bg" : "border border-sincro-border text-sincro-text-primary hover:bg-white/5"
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          Projetos ({projetos.length})
        </button>
      </div>

      <div className="flex items-center gap-3 p-4 border border-sincro-border rounded-2xl bg-sincro-modal-sidebar">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-sincro-border flex-1 max-w-md bg-white/5">
          <Search className="w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder={aba === "equipes" ? "Pesquisar equipe ou gestor..." : "Pesquisar projeto..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm w-full text-sincro-text-primary"
          />
        </div>
      </div>

      {aba === "equipes" ? (
        <div className="border border-sincro-border rounded-2xl bg-sincro-modal-sidebar overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-sincro-bg-secondary">
                <tr className="text-left">
                  <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-sincro-text-muted">Equipe</th>
                  <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-sincro-text-muted">Gestor</th>
                  <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-sincro-text-muted">Membros</th>
                  <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-sincro-text-muted">Projetos</th>
                  <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-sincro-text-muted text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {equipesFiltradas.map((e) => (
                  <tr key={e.id} className="border-t border-sincro-border hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3 font-bold">{e.nome}</td>
                    <td className="px-5 py-3 text-sincro-text-secondary">{e.gestor}</td>
                    <td className="px-5 py-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-status-cyan-bg text-status-cyan">{e.numMembros}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-status-green-bg text-status-green">{e.numProjetos}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => abrirModal("equipe", e)}
                          className="p-1.5 rounded-full hover:bg-white/10 text-sincro-text-primary transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => removerEquipe(e.id)}
                          className="p-1.5 rounded-full hover:bg-status-red-bg text-status-red transition-colors"
                          title="Remover"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {equipesFiltradas.length === 0 && (
                  <tr><td colSpan={5} className="px-5 py-12 text-center text-sincro-text-muted">Nenhuma equipe encontrada.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projetosFiltrados.map((p) => (
            <div key={p.id} className="border border-sincro-border rounded-2xl p-4 bg-sincro-modal-sidebar flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-bold text-base truncate">{p.titulo}</h3>
                  <p className="text-[11px] text-sincro-text-secondary mt-1">{p.equipe} • {p.criador}</p>
                  <p className="text-[11px] text-sincro-text-secondary">{p.data}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider text-white font-bold ${statusBadge[p.status]}`}>
                  {p.status}
                </span>
              </div>
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="text-sincro-text-secondary font-semibold">Progresso</span>
                  <span className="font-extrabold">{p.progresso}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden bg-white/10">
                  <div className={`h-full ${statusBar[p.status]}`} style={{ width: `${p.progresso}%` }} />
                </div>
                <p className="text-[11px] text-sincro-text-secondary mt-2">{p.tarefasCompletas}/{p.totalTarefas} tarefas</p>
              </div>
              <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-sincro-border">
                <button
                  onClick={() => abrirModal("projeto", p)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-white/10 text-sincro-text-primary transition-colors"
                >
                  <Edit2 className="w-3 h-3" />
                  Editar
                </button>
                <button
                  onClick={() => removerProjeto(p.id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-status-red hover:bg-status-red-bg transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  Remover
                </button>
              </div>
            </div>
          ))}
          {projetosFiltrados.length === 0 && (
            <div className="col-span-full border border-sincro-border rounded-2xl p-8 text-center text-sincro-text-muted bg-sincro-modal-sidebar">
              Nenhum projeto encontrado.
            </div>
          )}
        </div>
      )}

      {modalTipo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md border border-sincro-border rounded-2xl bg-sincro-modal-bg shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-sincro-border">
              <h2 className="text-lg font-extrabold">
                {modalTipo === "equipe"
                  ? (editandoEquipe ? "Editar Equipe" : "Nova Equipe")
                  : (editandoProjeto ? "Editar Projeto" : "Novo Projeto")}
              </h2>
              <button onClick={fecharModal} className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              {modalTipo === "equipe" ? (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary">Nome da Equipe</label>
                    <input
                      value={eqNome}
                      onChange={(e) => setEqNome(e.target.value)}
                      className="h-10 px-4 rounded-full bg-white/10 border border-white/20 outline-none text-sm text-sincro-text-primary"
                      placeholder="Ex: Equipe Frontend"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary">Gestor</label>
                    <input
                      value={eqGestor}
                      onChange={(e) => setEqGestor(e.target.value)}
                      className="h-10 px-4 rounded-full bg-white/10 border border-white/20 outline-none text-sm text-sincro-text-primary"
                      placeholder="Nome do gestor"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary">Título do Projeto</label>
                    <input
                      value={pjTitulo}
                      onChange={(e) => setPjTitulo(e.target.value)}
                      className="h-10 px-4 rounded-full bg-white/10 border border-white/20 outline-none text-sm text-sincro-text-primary"
                      placeholder="Ex: Migração Cloud"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary">Equipe</label>
                    <select
                      value={pjEquipe}
                      onChange={(e) => setPjEquipe(e.target.value)}
                      className="h-10 px-4 rounded-full bg-white/10 border border-white/20 outline-none text-sm text-sincro-text-primary"
                    >
                      {equipes.map(e => <option key={e.id} value={e.nome}>{e.nome}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary">Status</label>
                    <select
                      value={pjStatus}
                      onChange={(e) => setPjStatus(e.target.value as StatusProjeto)}
                      className="h-10 px-4 rounded-full bg-white/10 border border-white/20 outline-none text-sm text-sincro-text-primary"
                    >
                      <option value="Não Iniciado">Não Iniciado</option>
                      <option value="Em Andamento">Em Andamento</option>
                      <option value="Em Atraso">Em Atraso</option>
                      <option value="Finalizado">Finalizado</option>
                    </select>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center justify-end gap-2 p-5 border-t border-sincro-border">
              <button onClick={fecharModal} className="px-4 py-2 rounded-full border border-sincro-border text-sm font-bold hover:bg-white/10 transition-all">
                Cancelar
              </button>
              <button
                onClick={modalTipo === "equipe" ? salvarEquipe : salvarProjeto}
                className="px-4 py-2 rounded-full bg-status-green text-white text-sm font-extrabold hover:brightness-110 active:scale-95 transition-all"
              >
                {modalTipo === "equipe"
                  ? (editandoEquipe ? "Salvar" : "Criar Equipe")
                  : (editandoProjeto ? "Salvar" : "Criar Projeto")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
