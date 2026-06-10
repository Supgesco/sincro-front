"use client"

import { useState, useEffect } from "react"
import { Modal } from "./modal"
import { User, X, FolderPlus, Calendar, Users, Flag, Sparkles, AlertCircle, Check, Trash2 } from "lucide-react"

const statusCorProjeto: Record<string, string> = {
  "Em Andamento": "text-status-cyan",
  "Em Atraso": "text-status-red",
  "Concluído": "text-status-green",
  "Finalizado": "text-status-green",
  "Não Iniciado": "text-sincro-text-secondary",
  "Suspenso": "text-status-yellow",
  "Em Planejamento": "text-status-orange",
}

const statusBadgeProjeto: Record<string, string> = {
  "Em Andamento": "bg-status-cyan text-white",
  "Em Atraso": "bg-status-red text-white",
  "Concluído": "bg-status-green text-white",
  "Finalizado": "bg-status-green text-white",
  "Não Iniciado": "bg-sincro-text-secondary/40 text-sincro-text-primary",
  "Suspenso": "bg-status-yellow text-[#583f99]",
  "Em Planejamento": "bg-status-orange text-white",
}

const COMPLEXIDADE_LABEL: Record<number, string> = {
  1: "Muito Simples", 2: "Simples", 3: "Simples", 4: "Moderada",
  5: "Moderada", 6: "Moderada", 7: "Complexa", 8: "Complexa",
  9: "Muito Complexa", 10: "Muito Complexa",
}

const EQUIPES = [
  "Equipe Alpha", "Equipe Dev", "Equipe QA", "Equipe Marketing",
  "Equipe Design", "Equipe Ops", "Equipe Dados", "Equipe Suporte", "Equipe RH",
]

interface Projeto {
  id: number
  titulo: string
  data: string
  equipe?: string
  requerente?: string
  progresso?: number
  criador: string
  status: string
  urgente: boolean
  importante?: boolean
  complexidade: number
  descricao: string
  tarefasCompletas: number
  totalTarefas: number
  comentarios: { autor: string; texto: string }[]
  mostrarNoCalendario?: boolean
}

interface ProjetoModalProps {
  isOpen: boolean
  onClose: () => void
  projeto: Projeto
  onVerTarefas?: () => void
  onMarcarFinalizado?: () => void
  onSave?: (projeto: Projeto) => void
  onExcluir?: () => void
}

export function ProjetoModal({ isOpen, onClose, projeto, onVerTarefas, onMarcarFinalizado, onSave, onExcluir }: ProjetoModalProps) {
  const [comentario, setComentario] = useState("")
  const [comentarios, setComentarios] = useState(projeto.comentarios)
  const [listaSetores, setListaSetores] = useState<string[]>([])

  // Edit fields state
  const [isEditing, setIsEditing] = useState(false)
  const [editTitulo, setEditTitulo] = useState(projeto.titulo)
  const [editDescricao, setEditDescricao] = useState(projeto.descricao || "")
  const [editData, setEditData] = useState(projeto.data)
  const [editRequerente, setEditRequerente] = useState(projeto.requerente || "")
  const [editStatus, setEditStatus] = useState(projeto.status)
  const [editUrgente, setEditUrgente] = useState(projeto.urgente)
  const [editMostrarNoCalendario, setEditMostrarNoCalendario] = useState(projeto.mostrarNoCalendario || false)
  const [editComplexidade, setEditComplexidade] = useState(projeto.complexidade)

  useEffect(() => {
    setComentarios(projeto.comentarios)
  }, [projeto])

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sincro-setores-data")
      if (raw) {
        const parsed: { nome: string }[] = JSON.parse(raw)
        setListaSetores(parsed.map(s => s.nome))
      }
    } catch {}
  }, [])

  const progresso = projeto.totalTarefas > 0 ? (projeto.tarefasCompletas / projeto.totalTarefas) * 100 : 0

  const handleAddComentario = () => {
    if (!comentario.trim()) return
    const novo = { autor: "Você", texto: comentario }
    const atualizados = [...comentarios, novo]
    setComentarios(atualizados)
    projeto.comentarios = atualizados
    setComentario("")
  }

  const handleSave = () => {
    if (!editTitulo.trim()) {
      alert("O título do projeto é obrigatório.")
      return
    }
    const updated: Projeto = {
      ...projeto,
      titulo: editTitulo,
      descricao: editDescricao,
      data: editData,
      requerente: editRequerente,
      status: editStatus,
      urgente: editUrgente,
      mostrarNoCalendario: editMostrarNoCalendario,
      complexidade: editComplexidade,
    }

    // In-place updates fallback
    projeto.titulo = editTitulo
    projeto.descricao = editDescricao
    projeto.data = editData
    projeto.requerente = editRequerente
    projeto.status = editStatus
    projeto.urgente = editUrgente
    projeto.mostrarNoCalendario = editMostrarNoCalendario
    projeto.complexidade = editComplexidade

    if (onSave) {
      onSave(updated)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitulo(projeto.titulo)
    setEditDescricao(projeto.descricao || "")
    setEditData(projeto.data)
    setEditStatus(projeto.status)
    setEditUrgente(projeto.urgente)
    setEditMostrarNoCalendario(projeto.mostrarNoCalendario || false)
    setEditComplexidade(projeto.complexidade)
    setIsEditing(false)
  }

  const descricaoLonga = editDescricao?.length > 200
    ? editDescricao
    : `${editDescricao || ""} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      hideClose={true}
      className="w-[80vw] h-[75vh] flex flex-col overflow-hidden rounded-2xl"
    >
      <div className="flex flex-col md:flex-row h-full text-sincro-modal-text flex-1 min-h-0 bg-sincro-modal-bg dark:bg-sincro-dark-gradient">
        {/* Painel Esquerdo (Detalhes) */}
        <div className="flex-1 p-8 flex flex-col gap-6 overflow-y-auto">
          {/* Cabeçalho */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={editTitulo}
                    onChange={(e) => setEditTitulo(e.target.value)}
                    maxLength={100}
                    className="text-2xl font-bold text-sincro-modal-text bg-sincro-bg-input border border-sincro-border rounded px-2.5 py-1 focus:outline-none w-full"
                    placeholder="Título do Projeto"
                  />
                  <input
                    type="text"
                    value={editData}
                    onChange={(e) => setEditData(e.target.value)}
                    maxLength={50}
                    className="text-xs text-sincro-modal-text bg-sincro-bg-input border border-sincro-border rounded px-2 py-0.5 w-40 focus:outline-none"
                    placeholder="Data / Período"
                  />
                  <select
                    value={editRequerente}
                    onChange={(e) => setEditRequerente(e.target.value)}
                    className="text-xs text-sincro-modal-text bg-sincro-bg-input border border-sincro-border rounded px-2 py-0.5 focus:outline-none"
                  >
                    <option value="">Requerente</option>
                    {listaSetores.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold truncate">{projeto.titulo}</h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-sincro-modal-text/70">
                    <span>{projeto.data}</span>
                    <span>Criado por {projeto.criador}</span>
                    {projeto.requerente && <span>Requerente: {projeto.requerente}</span>}
                  </div>
                </>
              )}

              <p className="mt-2 text-sm font-medium">
                Status Atual:{" "}
                {isEditing ? (
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="px-2 py-0.5 rounded bg-sincro-bg-input text-sincro-modal-text font-bold border border-sincro-border focus:outline-none"
                  >
                    <option value="Em Planejamento">Em Planejamento</option>
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Em Atraso">Em Atraso</option>
                    <option value="Concluído">Concluído</option>
                    <option value="Finalizado">Finalizado</option>
                    <option value="Não Iniciado">Não Iniciado</option>
                    <option value="Suspenso">Suspenso</option>
                  </select>
                ) : (
                  <span className={`font-bold ${statusCorProjeto[projeto.status] ?? "text-status-cyan"}`}>{projeto.status}</span>
                )}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
              {isEditing ? (
                <div className="flex flex-col items-end gap-1 text-xs text-sincro-modal-text">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editUrgente}
                      onChange={(e) => setEditUrgente(e.target.checked)}
                      className="rounded"
                    />
                    Urgente
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editMostrarNoCalendario}
                      onChange={(e) => setEditMostrarNoCalendario(e.target.checked)}
                      className="rounded"
                    />
                    Calendário
                  </label>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span>Complexidade:</span>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={editComplexidade}
                      onChange={(e) => setEditComplexidade(Number(e.target.value))}
                      className="bg-sincro-bg-input border border-sincro-border rounded px-1.5 py-0.5 w-12 text-center text-sincro-modal-text"
                    />
                  </div>
                </div>
              ) : (
                <>
                  {projeto.urgente && (
                    <div className="flex items-center gap-1.5 text-status-red">
                      <span className="w-2.5 h-2.5 rounded-full bg-status-red" />
                      <span className="text-xs font-bold uppercase tracking-wider">Urgente</span>
                    </div>
                  )}
                  {projeto.mostrarNoCalendario && (
                    <div className="flex items-center gap-1.5 text-status-cyan">
                      <span className="w-2.5 h-2.5 rounded-full bg-status-cyan" />
                      <span className="text-xs font-bold uppercase tracking-wider">Calendário</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-status-yellow text-[#583f99] text-xs font-extrabold tracking-wide">
                      {projeto.complexidade > 7 ? "ALTA" : projeto.complexidade > 4 ? "MÉDIA" : "BAIXA"}
                    </span>
                    <span className="text-xs text-sincro-modal-text/95 font-medium">Complexidade</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Linha Divisória */}
          <div className="border-t border-sincro-border" />

          {/* Descrição — preenche verticalmente todo o espaço central */}
          <div className="flex-1 flex flex-col gap-2 min-h-0">
            <h3 className="text-lg font-bold">Descrição do Projeto</h3>
            <div className="flex-1 overflow-y-auto pr-2">
              {isEditing ? (
                <textarea
                  value={editDescricao}
                  onChange={(e) => setEditDescricao(e.target.value)}
                  maxLength={500}
                  className="w-full h-full min-h-[100px] bg-sincro-bg-input border border-sincro-border rounded-xl p-3 text-sm text-sincro-modal-text focus:outline-none resize-none leading-relaxed"
                  placeholder="Descreva o projeto..."
                />
              ) : (
                <p className="text-sm text-sincro-modal-text/80 leading-relaxed">
                  {descricaoLonga}
                </p>
              )}
            </div>
          </div>

          {/* Progresso de Tarefas */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold">Tarefas Completas</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-3.5 bg-sincro-text-secondary/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-status-green rounded-full transition-all duration-500"
                  style={{ width: `${progresso}%` }}
                />
              </div>
              <span className="text-sm font-bold shrink-0">
                {projeto.tarefasCompletas}/{projeto.totalTarefas}
              </span>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-3 pt-2">
            {isEditing ? (
              <>
                <button 
                  onClick={handleSave}
                  className="bg-status-green text-white rounded-full px-6 py-2 text-sm font-extrabold hover:brightness-110 active:scale-95 transition-all"
                >
                  Salvar Alterações
                </button>
                <button 
                  onClick={handleCancel}
                  className="border border-sincro-border text-sincro-modal-text rounded-full px-6 py-2 text-sm font-bold hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 transition-all"
                >
                  Cancelar
                </button>
                {onExcluir && (
                  <button 
                    onClick={onExcluir}
                    className="ml-auto flex items-center gap-2 border border-status-red text-status-red rounded-full px-4 py-2 text-sm font-bold hover:bg-status-red-bg active:scale-95 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Excluir
                  </button>
                )}
              </>
            ) : (
              <>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="border border-sincro-border text-sincro-modal-text rounded-full px-6 py-2 text-sm font-bold hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 transition-all"
                >
                  Editar Projeto
                </button>
                <button 
                  onClick={onVerTarefas}
                  className="border border-sincro-border text-sincro-modal-text rounded-full px-6 py-2 text-sm font-bold hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 transition-all"
                >
                  Ver Tarefas
                </button>
                <button 
                  onClick={onMarcarFinalizado}
                  className="bg-status-green text-white rounded-full px-6 py-2 text-sm font-extrabold hover:brightness-110 active:scale-95 transition-all ml-auto"
                >
                  Marcar como Finalizada
                </button>
              </>
            )}
          </div>
        </div>

        {/* Painel Direito (Comentários) */}
        <div className="w-full md:w-[380px] bg-sincro-modal-sidebar p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-sincro-border min-h-0">
          <div className="flex flex-col flex-1 min-h-0">
            {/* Cabeçalho do Painel */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Comentários</h3>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 active:scale-90 text-sincro-modal-text flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Lista de Comentários — densidade alta, 4 cards, gap pequeno, avatar FORA */}
            <div className="flex-1 overflow-y-auto mb-4 pr-1 min-h-0">
              <div className="flex flex-col gap-2">
                {comentarios.length === 0 ? (
                  <div className="text-center py-8 text-sincro-text-muted text-sm">
                    Nenhum comentário ainda.
                  </div>
                ) : (
                  comentarios.slice(0, 4).map((c, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      {/* Avatar FORA da caixa, à esquerda */}
                      <div className="w-8 h-8 rounded-full bg-sincro-text-secondary/30 shrink-0 mt-1" />
                      {/* Caixa com borda contém apenas nome + texto */}
                      <div className="flex-1 min-w-0 border border-sincro-border rounded-xl p-2.5 bg-white/5">
                        <p className="font-bold text-xs text-white truncate">{c.autor}</p>
                        <p className="text-[11px] text-sincro-modal-text/80 mt-0.5 leading-relaxed break-words">
                          {c.texto}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Campo de Envio de Comentário — borda fina clara + fundo semi-transparente */}
          <div className="relative shrink-0">
            <input 
              type="text"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              maxLength={500}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddComentario()
                }
              }}
              placeholder="Digite seu comentário..."
              className="w-full bg-white/10 border border-white/30 rounded-full px-5 py-3 text-sm text-sincro-modal-text placeholder-sincro-text-muted focus:outline-none focus:border-white/60 transition-all"
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

interface CriarProjetoModalProps {
  isOpen: boolean
  onClose: () => void
  onCriar?: (projeto: Partial<Projeto> & { equipe: string; requerente?: string; dataInicio?: string; prazo?: string; mostrarNoCalendario?: boolean }) => void
  equipesDisponiveis?: string[]
}

export function CriarProjetoModal({ isOpen, onClose, onCriar, equipesDisponiveis }: CriarProjetoModalProps) {
  const listaEquipes = equipesDisponiveis && equipesDisponiveis.length > 0 ? equipesDisponiveis : EQUIPES

  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")
  const [equipe, setEquipe] = useState(listaEquipes[0])
  const [requerente, setRequerente] = useState("")
  const [status, setStatus] = useState("Em Planejamento")
  const [dataInicio, setDataInicio] = useState(new Date().toISOString().slice(0, 10))
  const [prazo, setPrazo] = useState("")
  const [complexidade, setComplexidade] = useState(5)
  const [urgente, setUrgente] = useState(false)
  const [importante, setImportante] = useState(false)
  const [mostrarNoCalendario, setMostrarNoCalendario] = useState(false)
  const [touched, setTouched] = useState(false)
  const [listaSetores, setListaSetores] = useState<string[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sincro-setores-data")
      if (raw) {
        const parsed: { nome: string }[] = JSON.parse(raw)
        setListaSetores(parsed.map(s => s.nome))
      }
    } catch {}
  }, [])

  useEffect(() => {
    if (isOpen) {
      setTitulo("")
      setDescricao("")
      setEquipe(listaEquipes[0])
      setRequerente("")
      setStatus("Em Planejamento")
      setDataInicio(new Date().toISOString().slice(0, 10))
      setPrazo("")
      setComplexidade(5)
      setUrgente(false)
      setImportante(false)
      setMostrarNoCalendario(false)
      setTouched(false)
    }
  }, [isOpen, listaEquipes])

  const tituloInvalido = touched && !titulo.trim()
  const prazoInvalido = touched && prazo && dataInicio && new Date(prazo) < new Date(dataInicio)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!titulo.trim() || prazoInvalido) return
    onCriar?.({
      titulo: titulo.trim(),
      descricao,
      equipe,
      requerente,
      status,
      dataInicio,
      prazo,
      complexidade,
      urgente,
      importante,
      mostrarNoCalendario
    })
    onClose()
  }

  const formatarDataBR = (iso: string) => {
    if (!iso) return ""
    const [y, m, d] = iso.split("-")
    return `${d}/${m}/${y}`
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideClose
      className="w-[min(960px,92vw)] max-h-[90vh] flex flex-col overflow-hidden rounded-2xl"
    >
      <div className="flex flex-col text-sincro-modal-text flex-1 min-h-0 bg-sincro-modal-bg dark:bg-sincro-dark-gradient">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between gap-4 px-7 py-5 border-b border-sincro-border shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-status-green-bg text-status-green shrink-0">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xl font-extrabold leading-tight">Criar Novo Projeto</h2>
              <p className="text-xs text-sincro-text-secondary mt-0.5">Defina as informações iniciais do projeto</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full transition-colors hover:bg-black/10 dark:hover:bg-white/10 text-sincro-modal-text shrink-0"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row flex-1 min-h-0">
          {/* Coluna esquerda — formulário */}
          <div className="flex-1 p-7 flex flex-col gap-5 overflow-y-auto border-b lg:border-b-0 lg:border-r border-sincro-border">
            {/* Título */}
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary mb-1.5">
                Título do Projeto <span className="text-status-red">*</span>
              </label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex.: Migração para Cloud"
                maxLength={100}
                className={`w-full h-11 px-4 rounded-xl border bg-sincro-bg-input text-sm text-sincro-text-primary placeholder-sincro-text-muted focus:outline-none transition-colors ${tituloInvalido ? "border-status-red" : "border-sincro-border focus:border-sincro-text-muted"}`}
                autoFocus
              />
              {tituloInvalido && (
                <p className="text-[11px] text-status-red mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Informe um título para o projeto.
                </p>
              )}
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary mb-1.5">
                Descrição
              </label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={3}
                maxLength={500}
                placeholder="Descreva os objetivos e o escopo do projeto..."
                className="w-full px-4 py-3 rounded-xl border border-sincro-border bg-sincro-bg-input text-sm text-sincro-text-primary placeholder-sincro-text-muted focus:outline-none focus:border-sincro-text-muted resize-none transition-colors"
              />
            </div>

            {/* Equipe + Status + Requerente */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary mb-1.5">
                  <Users className="w-3 h-3" /> Equipe Responsável
                </label>
                <select
                  value={equipe}
                  onChange={(e) => setEquipe(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-sincro-border bg-sincro-bg-input text-sm text-sincro-text-primary focus:outline-none focus:border-sincro-text-muted transition-colors"
                >
                  {listaEquipes.map((eq) => (
                    <option key={eq} value={eq}>{eq}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary mb-1.5">
                  Requerente (Setor)
                </label>
                <select
                  value={requerente}
                  onChange={(e) => setRequerente(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-sincro-border bg-sincro-bg-input text-sm text-sincro-text-primary focus:outline-none focus:border-sincro-text-muted transition-colors"
                >
                  <option value="">Selecione...</option>
                  {listaSetores.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary mb-1.5">
                  <Flag className="w-3 h-3" /> Status Inicial
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-sincro-border bg-sincro-bg-input text-sm text-sincro-text-primary focus:outline-none focus:border-sincro-text-muted transition-colors"
                >
                  <option value="Em Planejamento">Em Planejamento</option>
                  <option value="Não Iniciado">Não Iniciado</option>
                  <option value="Em Andamento">Em Andamento</option>
                  <option value="Em Atraso">Em Atraso</option>
                  <option value="Suspenso">Suspenso</option>
                </select>
              </div>
            </div>

            {/* Datas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary mb-1.5">
                  <Calendar className="w-3 h-3" /> Data de Início
                </label>
                <input
                  type="date"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-sincro-border bg-sincro-bg-input text-sm text-sincro-text-primary focus:outline-none focus:border-sincro-text-muted transition-colors"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary mb-1.5">
                  <Calendar className="w-3 h-3" /> Prazo de Entrega
                </label>
                <input
                  type="date"
                  value={prazo}
                  onChange={(e) => setPrazo(e.target.value)}
                  className={`w-full h-11 px-3 rounded-xl border bg-sincro-bg-input text-sm text-sincro-text-primary focus:outline-none transition-colors ${prazoInvalido ? "border-status-red" : "border-sincro-border focus:border-sincro-text-muted"}`}
                />
                {prazoInvalido && (
                  <p className="text-[11px] text-status-red mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> O prazo deve ser após a data de início.
                  </p>
                )}
              </div>
            </div>

            {/* Complexidade */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary">
                  Complexidade
                </label>
                <span className="text-xs font-extrabold text-sincro-modal-text">
                  {complexidade}/10 · <span className="text-sincro-text-secondary font-semibold">{COMPLEXIDADE_LABEL[complexidade]}</span>
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={complexidade}
                onChange={(e) => setComplexidade(Number(e.target.value))}
                className="w-full accent-status-green cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-sincro-text-muted mt-1">
                <span>Simples</span>
                <span>Moderada</span>
                <span>Complexa</span>
              </div>
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <ToggleSwitch
                checked={urgente}
                onChange={setUrgente}
                label="Urgente"
                description="Marque para projetos com prazo apertado."
                color="red"
              />
              <ToggleSwitch
                checked={importante}
                onChange={setImportante}
                label="Importante"
                description="Destaca o projeto na listagem."
                color="yellow"
              />
              <ToggleSwitch
                checked={mostrarNoCalendario}
                onChange={setMostrarNoCalendario}
                label="No Calendário"
                description="Exibe o projeto na agenda do Dashboard."
                color="cyan"
              />
            </div>
          </div>

          {/* Coluna direita — preview */}
          <div className="w-full lg:w-[320px] p-7 flex flex-col gap-4 bg-sincro-modal-sidebar overflow-y-auto">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary">
              <Sparkles className="w-3 h-3" /> Pré-visualização
            </div>

            <div className="rounded-2xl border border-sincro-border bg-sincro-modal-bg p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-extrabold text-base text-sincro-modal-text leading-tight break-words min-w-0">
                  {titulo.trim() || "Título do Projeto"}
                </h3>
                <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold ${statusBadgeProjeto[status]}`}>
                  {status}
                </span>
              </div>

              {descricao ? (
                <p className="text-xs text-sincro-text-secondary line-clamp-3">{descricao}</p>
              ) : (
                <p className="text-xs text-sincro-text-muted italic">Sem descrição</p>
              )}

              <div className="flex flex-col gap-1.5 pt-2 border-t border-sincro-border">
                <PreviewRow icon={Users} label="Equipe" value={equipe} />
                <PreviewRow icon={Calendar} label="Início" value={formatarDataBR(dataInicio) || "—"} />
                <PreviewRow icon={Calendar} label="Prazo" value={formatarDataBR(prazo) || "—"} />
                <PreviewRow
                  icon={Flag}
                  label="Complexidade"
                  value={`${complexidade}/10 · ${COMPLEXIDADE_LABEL[complexidade]}`}
                />
              </div>

              {(urgente || importante) && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-sincro-border">
                  {urgente && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-status-red-bg text-status-red uppercase tracking-wider">
                      <AlertCircle className="w-3 h-3" /> Urgente
                    </span>
                  )}
                  {importante && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-status-yellow-bg text-status-yellow uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" /> Importante
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-sincro-border bg-sincro-modal-bg p-4 flex flex-col gap-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary">Dicas</p>
              <ul className="text-xs text-sincro-text-secondary flex flex-col gap-1.5 list-disc pl-4">
                <li>Use um título claro e objetivo.</li>
                <li>Defina o prazo realista para a equipe.</li>
                <li>Marque como urgente apenas o que for crítico.</li>
              </ul>
            </div>
          </div>
        </form>

        {/* Rodapé */}
        <div className="flex items-center justify-end gap-3 px-7 py-4 border-t border-sincro-border shrink-0 bg-sincro-modal-sidebar">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-5 rounded-full border border-sincro-border text-sincro-modal-text text-sm font-bold hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 transition-all"
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="h-10 px-5 rounded-full bg-status-green text-white text-sm font-extrabold hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Criar Projeto
          </button>
        </div>
      </div>
    </Modal>
  )
}

function PreviewRow({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-[11px]">
      <Icon className="w-3 h-3 text-sincro-text-muted shrink-0" />
      <span className="text-sincro-text-secondary font-semibold shrink-0">{label}:</span>
      <span className="text-sincro-modal-text font-bold truncate">{value}</span>
    </div>
  )
}

function ToggleSwitch({
  checked,
  onChange,
  label,
  description,
  color,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  description: string
  color: "red" | "yellow" | "cyan"
}) {
  const ringClass = checked
    ? color === "red"
      ? "bg-status-red"
      : color === "cyan"
        ? "bg-status-cyan"
        : "bg-status-yellow"
    : "bg-sincro-text-muted/40"
  const dotClass = checked ? "translate-x-5" : "translate-x-0"
  return (
    <label className="flex items-center gap-3 p-3 rounded-xl border border-sincro-border bg-sincro-modal-bg cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
      <div
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${ringClass}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${dotClass}`} />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-sincro-modal-text">{label}</p>
        <p className="text-[11px] text-sincro-text-secondary mt-0.5">{description}</p>
      </div>
    </label>
  )
}
