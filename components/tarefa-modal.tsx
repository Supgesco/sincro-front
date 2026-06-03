"use client"

import { useState, useEffect } from "react"
import { Modal } from "@/components/modal"
import { User, Calendar, Pencil, X, Check, Filter, Play, Send, RotateCcw, Plus, Users, Flag, Sparkles, AlertCircle, ListChecks } from "lucide-react"

const statusBadgeTarefa: Record<string, string> = {
  "Em Andamento": "bg-status-cyan text-white",
  "Em Atraso": "bg-status-red text-white",
  "Finalizado": "bg-status-green text-white",
  "Concluído": "bg-status-green text-white",
  "Não Iniciado": "bg-sincro-text-secondary/40 text-sincro-text-primary",
}

const COMPLEXIDADE_OPCOES = [
  { value: "Baixa Complexidade", label: "Baixa", color: "bg-status-green-bg text-status-green" },
  { value: "Média Complexidade", label: "Média", color: "bg-status-yellow-bg text-status-yellow" },
  { value: "Alta Complexidade", label: "Alta", color: "bg-status-red-bg text-status-red" },
] as const

const PROJETOS_DISPONIVEIS = [
  "Projeto Alpha", "Projeto Beta", "Projeto Gama",
  "Projeto Delta", "Projeto Epsilon", "Projeto Zeta",
]

const MEMBROS_DISPONIVEIS = [
  "Pessoa 1", "Pessoa 2", "Pessoa 3", "Pessoa 4", "Pessoa 5",
]

interface Tarefa {
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

interface TarefaModalProps {
  isOpen: boolean
  onClose: () => void
  tarefa: Tarefa
  onAceitar?: () => void
  onIniciar?: () => void
  onFinalizar?: () => void
  onReabrir?: () => void
  onSave?: (tarefa: Tarefa) => void
}

export function TarefaModal({ isOpen, onClose, tarefa, onAceitar, onIniciar, onFinalizar, onReabrir, onSave }: TarefaModalProps) {
  const [checklistItems, setChecklistItems] = useState(tarefa.checklist)
  const [isEditing, setIsEditing] = useState(false)
  const [comentario, setComentario] = useState("")

  const [editNome, setEditNome] = useState(tarefa.nome)
  const [editDescricao, setEditDescricao] = useState(tarefa.descricao)
  const [editStatus, setEditStatus] = useState(tarefa.status)
  const [editDataEntrega, setEditDataEntrega] = useState(tarefa.dataEntrega)
  const [editComplexidade, setEditComplexidade] = useState(tarefa.complexidade)
  const [editUrgente, setEditUrgente] = useState(tarefa.urgente)
  const [editMembros, setEditMembros] = useState<string[]>(tarefa.membros)
  const [novoMembro, setNovoMembro] = useState("")
  const [novoChecklistItem, setNovoChecklistItem] = useState("")

  const toggleChecklistItem = (id: number) => {
    setChecklistItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, concluido: !item.concluido } : item
      )
    )
  }

  const handleSave = () => {
    if (!editNome.trim()) {
      alert("O nome da tarefa é obrigatório.")
      return
    }
    const updated: Tarefa = {
      ...tarefa,
      nome: editNome,
      descricao: editDescricao,
      status: editStatus,
      dataEntrega: editDataEntrega,
      complexidade: editComplexidade,
      urgente: editUrgente,
      membros: editMembros,
      checklist: checklistItems,
    }

    tarefa.nome = editNome
    tarefa.descricao = editDescricao
    tarefa.status = editStatus
    tarefa.dataEntrega = editDataEntrega
    tarefa.complexidade = editComplexidade
    tarefa.urgente = editUrgente
    tarefa.membros = editMembros
    tarefa.checklist = checklistItems

    if (onSave) {
      onSave(updated)
    }
    setIsEditing(false)
  }

  const handleAddComentario = () => {
    if (!tarefa.aceita) return
    const texto = comentario.trim()
    if (!texto) return
    tarefa.comentarios = [
      ...tarefa.comentarios,
      { autor: "Seu Nome", texto },
    ]
    setComentario("")
  }

  const handleCancel = () => {
    setEditNome(tarefa.nome)
    setEditDescricao(tarefa.descricao)
    setEditStatus(tarefa.status)
    setEditDataEntrega(tarefa.dataEntrega)
    setEditComplexidade(tarefa.complexidade)
    setEditUrgente(tarefa.urgente)
    setEditMembros(tarefa.membros)
    setChecklistItems(tarefa.checklist)
    setIsEditing(false)
  }

  const handleAddMembro = () => {
    if (novoMembro.trim() && !editMembros.includes(novoMembro.trim())) {
      setEditMembros([...editMembros, novoMembro.trim()])
      setNovoMembro("")
    }
  }

  const handleRemoveMembro = (index: number) => {
    setEditMembros(editMembros.filter((_, i) => i !== index))
  }

  const handleAddChecklistItem = () => {
    if (novoChecklistItem.trim()) {
      const newItem = {
        id: Date.now(),
        texto: novoChecklistItem.trim(),
        concluido: false,
      }
      setChecklistItems([...checklistItems, newItem])
      setNovoChecklistItem("")
    }
  }

  const handleRemoveChecklistItem = (id: number) => {
    setChecklistItems(checklistItems.filter(item => item.id !== id))
  }

  const handleEditChecklistItem = (id: number, text: string) => {
    setChecklistItems(checklistItems.map(item => item.id === id ? { ...item, texto: text } : item))
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideClose={true}
      className="w-[80vw] h-[75vh] flex flex-col overflow-hidden rounded-2xl"
    >
      <div className="flex flex-1 min-h-0 text-sincro-modal-text bg-sincro-modal-bg dark:bg-sincro-dark-gradient">
        {/* PAINEL ESQUERDO */}
        <div className="flex-[7] px-8 py-6 flex flex-col gap-5 overflow-y-auto">
          {/* Cabeçalho: status badge + título + editar + fechar */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {isEditing ? (
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="px-2 py-1 rounded-full bg-sincro-bg-input text-sincro-text-primary text-[10px] font-bold border border-sincro-border focus:outline-none"
                >
                  <option value="A Fazer">A Fazer</option>
                  <option value="Em Andamento">Em Andamento</option>
                  <option value="Concluído">Concluído</option>
                  <option value="Em Atraso">Em Atraso</option>
                </select>
              ) : (
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusBadgeTarefa[tarefa.status] ?? "bg-status-cyan text-white"}`}>
                  {tarefa.status}
                </span>
              )}

              {isEditing ? (
                <input
                  type="text"
                  value={editNome}
                  onChange={(e) => setEditNome(e.target.value)}
                  className="text-2xl font-bold text-sincro-modal-text bg-sincro-bg-input border border-sincro-border rounded px-2 py-1 focus:outline-none flex-1 min-w-0"
                />
              ) : (
                <h2 className="text-[26px] font-bold text-sincro-modal-text leading-none truncate">{tarefa.nome}</h2>
              )}

              {!isEditing && (
                <button
                  onClick={() => {
                    setEditNome(tarefa.nome)
                    setEditDescricao(tarefa.descricao)
                    setEditStatus(tarefa.status)
                    setEditDataEntrega(tarefa.dataEntrega)
                    setEditComplexidade(tarefa.complexidade)
                    setEditUrgente(tarefa.urgente)
                    setEditMembros(tarefa.membros)
                    setChecklistItems(tarefa.checklist)
                    setIsEditing(true)
                  }}
                  className="flex items-center gap-1.5 h-7 px-3 rounded-full border border-sincro-border bg-transparent text-sincro-modal-text text-[11px] font-semibold hover:bg-black/10 dark:hover:bg-white/10 transition-colors shrink-0"
                >
                  <Pencil className="w-3 h-3" />
                  Editar
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 active:scale-90 text-sincro-modal-text flex items-center justify-center transition-all shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="border-t border-sincro-border" />

          {/* Criado por + Data */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-sincro-text-secondary">Criado por:</span>
            <div className="w-6 h-6 rounded-full bg-sincro-bg-accent border border-sincro-border flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-sincro-text-primary" />
            </div>
            <span className="font-bold text-sincro-modal-text">{tarefa.criador}</span>
            <span className="text-sincro-text-muted ml-2">{tarefa.dataCriacao}</span>
          </div>

          {/* Tags (horizontal) */}
          <div className="flex flex-wrap gap-2 items-center">
            {isEditing ? (
              <>
                <span className="flex items-center gap-1.5 h-7 px-2 rounded-full text-xs border border-sincro-border bg-sincro-bg-input text-sincro-text-primary">
                  <Calendar className="w-3.5 h-3.5" />
                  <input
                    type="text"
                    value={editDataEntrega}
                    onChange={(e) => setEditDataEntrega(e.target.value)}
                    className="bg-transparent border-none text-sincro-text-primary focus:outline-none w-20 text-xs"
                    placeholder="Data"
                  />
                </span>
                <select
                  value={editComplexidade}
                  onChange={(e) => setEditComplexidade(e.target.value)}
                  className="h-7 px-3 rounded-full text-xs bg-sincro-bg-input text-sincro-text-primary border border-sincro-border font-semibold focus:outline-none"
                >
                  <option value="Baixa Complexidade">Baixa</option>
                  <option value="Média Complexidade">Média</option>
                  <option value="Alta Complexidade">Alta</option>
                </select>
                <label className="flex items-center gap-1.5 text-xs text-sincro-text-primary">
                  <input
                    type="checkbox"
                    checked={editUrgente}
                    onChange={(e) => setEditUrgente(e.target.checked)}
                    className="rounded accent-status-orange"
                  />
                  Urgente
                </label>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1.5 h-7 px-3 rounded-full text-xs border border-sincro-border bg-sincro-modal-sidebar text-sincro-modal-text">
                  <Calendar className="w-3.5 h-3.5" />
                  {tarefa.dataEntrega}
                </span>
                <span className="flex items-center h-7 px-3 rounded-full text-xs bg-status-red text-white font-semibold">
                  Em Atraso
                </span>
                <span className="flex items-center h-7 px-3 rounded-full text-xs bg-status-yellow text-[#583f99] font-semibold">
                  {tarefa.complexidade}
                </span>
                {tarefa.urgente && (
                  <span className="flex items-center h-7 px-3 rounded-full text-xs bg-status-orange text-white font-semibold">
                    Urgente
                  </span>
                )}
              </>
            )}
          </div>

          {/* Membros */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-bold text-sincro-modal-text">Membros:</span>
              {isEditing && (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={novoMembro}
                    onChange={(e) => setNovoMembro(e.target.value)}
                    placeholder="Adicionar..."
                    className="px-2 py-0.5 rounded-full text-xs bg-sincro-bg-input border border-sincro-border text-sincro-text-primary focus:outline-none"
                  />
                  <button
                    onClick={handleAddMembro}
                    className="w-6 h-6 rounded-full border border-sincro-border bg-sincro-modal-sidebar flex items-center justify-center hover:bg-sincro-bg-input text-sincro-modal-text font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
              )}
            </div>

            {isEditing && (
              <div className="flex flex-wrap gap-2">
                {editMembros.map((m, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 bg-sincro-bg-input px-2.5 py-1 rounded-full text-xs text-sincro-text-primary border border-sincro-border">
                    <span>{m}</span>
                    <button
                      onClick={() => handleRemoveMembro(idx)}
                      className="text-status-red font-bold hover:opacity-80"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Descrição */}
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-bold flex items-center gap-2 text-sincro-modal-text">
              <span className="text-lg">≡</span>
              Descrição
            </h3>
            <div className="min-h-[120px] p-4 bg-sincro-bg-input rounded-xl border border-sincro-border">
              {isEditing ? (
                <textarea
                  value={editDescricao}
                  onChange={(e) => setEditDescricao(e.target.value)}
                  className="w-full min-h-[100px] bg-transparent text-sincro-text-primary focus:outline-none resize-none text-sm leading-relaxed"
                  placeholder="Digite a descrição da tarefa..."
                />
              ) : (
                <p className="text-sm text-sincro-modal-text/90 leading-relaxed">
                  {tarefa.descricao}
                </p>
              )}
            </div>
          </div>

          {/* Checklist */}
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-bold flex items-center gap-2 text-sincro-modal-text">
              <span className="w-3 h-3 rounded-full bg-sincro-text-secondary/40" />
              Checklist
            </h3>

            <div className="flex flex-col gap-1.5">
              {checklistItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 select-none"
                >
                  <div
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                      item.concluido
                        ? "bg-status-green text-[#583f99]"
                        : "border border-sincro-border bg-sincro-bg-input"
                    }`}
                  >
                    {item.concluido && <Check className="w-3 h-3 stroke-[3px]" />}
                  </div>

                  {isEditing ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="text"
                        value={item.texto}
                        onChange={(e) => handleEditChecklistItem(item.id, e.target.value)}
                        className="bg-sincro-bg-input border border-sincro-border rounded px-2 py-0.5 text-xs text-sincro-text-primary focus:outline-none flex-1"
                      />
                      <button
                        onClick={() => handleRemoveChecklistItem(item.id)}
                        className="text-status-red hover:opacity-80 text-xs font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <span
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`text-sm text-sincro-modal-text cursor-pointer ${item.concluido ? "line-through opacity-60" : ""}`}
                    >
                      {item.texto}
                    </span>
                  )}
                </div>
              ))}

              {isEditing && (
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    value={novoChecklistItem}
                    onChange={(e) => setNovoChecklistItem(e.target.value)}
                    placeholder="Adicionar novo item..."
                    className="bg-sincro-bg-input border border-sincro-border rounded-full px-3 py-1.5 text-xs text-sincro-text-primary focus:outline-none flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddChecklistItem()
                    }}
                  />
                  <button
                    onClick={handleAddChecklistItem}
                    className="px-3 py-1.5 rounded-full bg-sincro-bg-input text-sincro-text-primary text-xs border border-sincro-border font-semibold hover:bg-sincro-modal-sidebar"
                  >
                    Adicionar
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Botões de Ação / Edição */}
          <div className="pt-2">
            {isEditing ? (
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 rounded-full bg-status-green text-white hover:brightness-110 active:scale-95 transition-all text-sm font-bold"
                >
                  Salvar Alterações
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 rounded-full border border-sincro-border text-sincro-modal-text hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 transition-all text-sm font-bold"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <div>
                {!tarefa.aceita ? (
                  <button
                    onClick={onAceitar}
                    className="flex items-center gap-2 h-12 px-6 rounded-full border border-status-green text-status-green hover:bg-status-green-bg active:scale-95 transition-all text-base font-extrabold"
                  >
                    <Check className="w-5 h-5" />
                    Aceitar Tarefa
                  </button>
                ) : tarefa.status === "Finalizado" ? (
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-status-green/40 bg-status-green-bg text-status-green text-base font-extrabold">
                      <Check className="w-5 h-5" />
                      Tarefa Finalizada
                    </span>
                    {onReabrir && (
                      <button
                        onClick={onReabrir}
                        className="flex items-center gap-2 h-12 px-6 rounded-full border border-sincro-text-secondary text-sincro-text-primary bg-transparent hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 transition-all text-base font-extrabold"
                      >
                        <RotateCcw className="w-5 h-5" />
                        Reabrir Tarefa
                      </button>
                    )}
                  </div>
                ) : tarefa.status === "Em Andamento" ? (
                  <button
                    onClick={onFinalizar}
                    className="flex items-center gap-2 h-12 px-6 rounded-full bg-status-green text-white hover:brightness-110 active:scale-95 transition-all text-base font-extrabold"
                  >
                    <Check className="w-5 h-5" />
                    Finalizar Tarefa
                  </button>
                ) : (
                  <button
                    onClick={onIniciar}
                    className="flex items-center gap-2 h-12 px-6 rounded-full bg-status-cyan text-white hover:brightness-110 active:scale-95 transition-all text-base font-extrabold"
                  >
                    <Play className="w-5 h-5" />
                    Iniciar Tarefa
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* DIVISOR VERTICAL */}
        <div className="hidden md:block w-px bg-sincro-border flex-shrink-0 my-4" />

        {/* PAINEL DIREITO */}
        <div className="flex-[3] bg-sincro-modal-sidebar px-5 py-5 flex flex-col min-h-0 border-l border-sincro-border">
          <div className="flex justify-end mb-3">
            <button className="w-8 h-8 rounded-full bg-sincro-bg-input hover:bg-sincro-bg-accent active:scale-90 text-sincro-modal-text flex items-center justify-center transition-all">
              <Filter className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 mb-3 min-h-0 pr-1">
            {editMembros.length === 0 && tarefa.comentarios.length === 0 ? (
              <div className="text-center py-6 text-sincro-text-muted text-sm">
                Nenhum membro ou comentário.
              </div>
            ) : (
              <>
                {editMembros.map((membro, idx) => (
                  <div
                    key={`m-${idx}`}
                    className="flex items-center gap-3 p-3 rounded-xl border border-sincro-border bg-sincro-modal-bg"
                  >
                    <div className="w-9 h-9 rounded-full bg-sincro-bg-accent border border-sincro-border shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-sincro-modal-text truncate">{membro}</p>
                      <p className="text-xs text-sincro-text-secondary truncate">Membro da equipe</p>
                    </div>
                  </div>
                ))}

                {tarefa.comentarios.map((c, idx) => (
                  <div
                    key={`c-${idx}`}
                    className="flex items-start gap-3 p-3 rounded-xl border border-sincro-border bg-sincro-modal-bg"
                  >
                    <div className="w-9 h-9 rounded-full bg-sincro-bg-accent border border-sincro-border shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-sincro-modal-text truncate">{c.autor}</p>
                      <p className="text-xs text-sincro-text-secondary mt-0.5 break-words">{c.texto}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="shrink-0">
            <div className={`flex items-center gap-2 h-[44px] rounded-full border border-sincro-border bg-sincro-bg-input px-2 transition-all ${!tarefa.aceita ? "opacity-60" : "focus-within:border-sincro-text-muted"}`}>
              <input
                type="text"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddComentario()
                  }
                }}
                disabled={!tarefa.aceita}
                placeholder={tarefa.aceita ? "Digite seu comentário..." : "Aceite a tarefa para comentar..."}
                className="flex-1 h-full bg-transparent px-3 text-sm text-sincro-text-primary placeholder-sincro-text-muted focus:outline-none disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={handleAddComentario}
                disabled={!tarefa.aceita || !comentario.trim()}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-sincro-bg-accent text-sincro-text-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-sincro-text-muted/30 active:scale-95 transition-all"
                aria-label="Enviar comentário"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

interface CriarTarefaModalProps {
  isOpen: boolean
  onClose: () => void
  onCriar?: (tarefa: Partial<Tarefa> & { projeto?: string; membros?: string[]; dataEntregaISO?: string }) => void
}

export function CriarTarefaModal({ isOpen, onClose, onCriar }: CriarTarefaModalProps) {
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [projeto, setProjeto] = useState(PROJETOS_DISPONIVEIS[0])
  const [membros, setMembros] = useState<string[]>([])
  const [status, setStatus] = useState("Não Iniciado")
  const [dataEntrega, setDataEntrega] = useState("")
  const [complexidade, setComplexidade] = useState<string>("Média Complexidade")
  const [urgente, setUrgente] = useState(false)
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setNome("")
      setDescricao("")
      setProjeto(PROJETOS_DISPONIVEIS[0])
      setMembros([])
      setStatus("Não Iniciado")
      setDataEntrega("")
      setComplexidade("Média Complexidade")
      setUrgente(false)
      setTouched(false)
    }
  }, [isOpen])

  const nomeInvalido = touched && !nome.trim()
  const dataInvalida = touched && dataEntrega && new Date(dataEntrega) < new Date(new Date().toISOString().slice(0, 10))

  const toggleMembro = (m: string) => {
    setMembros(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!nome.trim() || dataInvalida) return
    onCriar?.({
      nome: nome.trim(),
      descricao,
      projeto,
      membros,
      status,
      complexidade,
      urgente,
      dataEntregaISO: dataEntrega,
    })
    onClose()
  }

  const formatarDataBR = (iso: string) => {
    if (!iso) return ""
    const [y, m, d] = iso.split("-")
    return `${d}/${m}/${y}`
  }

  const complexidadeOpcao = COMPLEXIDADE_OPCOES.find(o => o.value === complexidade)!

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
              <ListChecks className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xl font-extrabold leading-tight">Criar Nova Tarefa</h2>
              <p className="text-xs text-sincro-text-secondary mt-0.5">Defina o que precisa ser feito</p>
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
            {/* Nome */}
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary mb-1.5">
                Nome da Tarefa <span className="text-status-red">*</span>
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex.: Atualizar documentação da API"
                className={`w-full h-11 px-4 rounded-xl border bg-sincro-bg-input text-sm text-sincro-text-primary placeholder-sincro-text-muted focus:outline-none transition-colors ${nomeInvalido ? "border-status-red" : "border-sincro-border focus:border-sincro-text-muted"}`}
                autoFocus
              />
              {nomeInvalido && (
                <p className="text-[11px] text-status-red mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Informe um nome para a tarefa.
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
                placeholder="Detalhe o que precisa ser feito e o critério de aceite..."
                className="w-full px-4 py-3 rounded-xl border border-sincro-border bg-sincro-bg-input text-sm text-sincro-text-primary placeholder-sincro-text-muted focus:outline-none focus:border-sincro-text-muted resize-none transition-colors"
              />
            </div>

            {/* Projeto + Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary mb-1.5">
                  <Flag className="w-3 h-3" /> Projeto
                </label>
                <select
                  value={projeto}
                  onChange={(e) => setProjeto(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-sincro-border bg-sincro-bg-input text-sm text-sincro-text-primary focus:outline-none focus:border-sincro-text-muted transition-colors"
                >
                  {PROJETOS_DISPONIVEIS.map((p) => (
                    <option key={p} value={p}>{p}</option>
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
                  <option value="Não Iniciado">Não Iniciado</option>
                  <option value="Em Andamento">Em Andamento</option>
                  <option value="Em Atraso">Em Atraso</option>
                </select>
              </div>
            </div>

            {/* Data de Entrega + Complexidade */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary mb-1.5">
                  <Calendar className="w-3 h-3" /> Data de Entrega
                </label>
                <input
                  type="date"
                  value={dataEntrega}
                  onChange={(e) => setDataEntrega(e.target.value)}
                  className={`w-full h-11 px-3 rounded-xl border bg-sincro-bg-input text-sm text-sincro-text-primary focus:outline-none transition-colors ${dataInvalida ? "border-status-red" : "border-sincro-border focus:border-sincro-text-muted"}`}
                />
                {dataInvalida && (
                  <p className="text-[11px] text-status-red mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> A data deve ser futura.
                  </p>
                )}
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary mb-1.5">
                  <Sparkles className="w-3 h-3" /> Complexidade
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {COMPLEXIDADE_OPCOES.map((op) => {
                    const ativo = op.value === complexidade
                    return (
                      <button
                        key={op.value}
                        type="button"
                        onClick={() => setComplexidade(op.value)}
                        className={`h-11 rounded-xl border text-xs font-extrabold transition-all ${ativo ? `${op.color} border-transparent` : "border-sincro-border bg-sincro-bg-input text-sincro-text-secondary hover:bg-black/5 dark:hover:bg-white/5"}`}
                      >
                        {op.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Membros (multi-select) */}
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary mb-1.5">
                <Users className="w-3 h-3" /> Membros Responsáveis
              </label>
              <div className="flex flex-wrap gap-2">
                {MEMBROS_DISPONIVEIS.map((m) => {
                  const ativo = membros.includes(m)
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => toggleMembro(m)}
                      className={`h-9 px-3 rounded-full border text-xs font-bold transition-all ${ativo ? "bg-status-cyan-bg text-status-cyan border-status-cyan" : "border-sincro-border bg-sincro-bg-input text-sincro-text-secondary hover:bg-black/5 dark:hover:bg-white/5"}`}
                    >
                      {m}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Toggle: Urgente */}
            <TarefaToggle
              checked={urgente}
              onChange={setUrgente}
              label="Marcar como urgente"
              description="Tarefa com prazo apertado ou prioridade alta."
            />
          </div>

          {/* Coluna direita — preview */}
          <div className="w-full lg:w-[320px] p-7 flex flex-col gap-4 bg-sincro-modal-sidebar overflow-y-auto">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary">
              <Sparkles className="w-3 h-3" /> Pré-visualização
            </div>

            <div className="rounded-2xl border border-sincro-border bg-sincro-modal-bg p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-extrabold text-base text-sincro-modal-text leading-tight break-words min-w-0">
                  {nome.trim() || "Nome da Tarefa"}
                </h3>
                <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold ${statusBadgeTarefa[status] ?? "bg-status-cyan text-white"}`}>
                  {status}
                </span>
              </div>

              {descricao ? (
                <p className="text-xs text-sincro-text-secondary line-clamp-3">{descricao}</p>
              ) : (
                <p className="text-xs text-sincro-text-muted italic">Sem descrição</p>
              )}

              <div className="flex flex-col gap-1.5 pt-2 border-t border-sincro-border">
                <PreviewRowTarefa icon={Flag} label="Projeto" value={projeto} />
                <PreviewRowTarefa icon={Calendar} label="Entrega" value={formatarDataBR(dataEntrega) || "—"} />
                <PreviewRowTarefa
                  icon={Sparkles}
                  label="Complexidade"
                  value={complexidadeOpcao.value.replace(" Complexidade", "")}
                />
              </div>

              {membros.length > 0 && (
                <div className="flex flex-col gap-1.5 pt-2 border-t border-sincro-border">
                  <span className="text-[11px] text-sincro-text-secondary font-semibold flex items-center gap-1.5">
                    <Users className="w-3 h-3" /> {membros.length} {membros.length === 1 ? "membro" : "membros"}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {membros.map((m) => (
                      <span key={m} className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-sincro-bg-accent text-sincro-text-primary">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {urgente && (
                <div className="pt-2 border-t border-sincro-border">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-status-red-bg text-status-red uppercase tracking-wider">
                    <AlertCircle className="w-3 h-3" /> Urgente
                  </span>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-sincro-border bg-sincro-modal-bg p-4 flex flex-col gap-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary">Dicas</p>
              <ul className="text-xs text-sincro-text-secondary flex flex-col gap-1.5 list-disc pl-4">
                <li>Seja específico no nome da tarefa.</li>
                <li>Defina o critério de aceite na descrição.</li>
                <li>Adicione os responsáveis para acompanhamento.</li>
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
            Criar Tarefa
          </button>
        </div>
      </div>
    </Modal>
  )
}

function PreviewRowTarefa({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-[11px]">
      <Icon className="w-3 h-3 text-sincro-text-muted shrink-0" />
      <span className="text-sincro-text-secondary font-semibold shrink-0">{label}:</span>
      <span className="text-sincro-modal-text font-bold truncate">{value}</span>
    </div>
  )
}

function TarefaToggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  description: string
}) {
  const ringClass = checked ? "bg-status-red" : "bg-sincro-text-muted/40"
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
