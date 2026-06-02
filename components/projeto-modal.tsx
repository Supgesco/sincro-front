"use client"

import { useState, useEffect } from "react"
import { Modal } from "./modal"
import { User, X } from "lucide-react"

interface Projeto {
  id: number
  titulo: string
  data: string
  criador: string
  status: string
  urgente: boolean
  complexidade: number
  descricao: string
  tarefasCompletas: number
  totalTarefas: number
  comentarios: { autor: string; texto: string }[]
}

interface ProjetoModalProps {
  isOpen: boolean
  onClose: () => void
  projeto: Projeto
  onVerTarefas?: () => void
  onMarcarFinalizado?: () => void
  onSave?: (projeto: Projeto) => void
}

export function ProjetoModal({ isOpen, onClose, projeto, onVerTarefas, onMarcarFinalizado, onSave }: ProjetoModalProps) {
  const [comentario, setComentario] = useState("")
  const [comentarios, setComentarios] = useState(projeto.comentarios)

  // Edit fields state
  const [isEditing, setIsEditing] = useState(false)
  const [editTitulo, setEditTitulo] = useState(projeto.titulo)
  const [editDescricao, setEditDescricao] = useState(projeto.descricao || "")
  const [editData, setEditData] = useState(projeto.data)
  const [editStatus, setEditStatus] = useState(projeto.status)
  const [editUrgente, setEditUrgente] = useState(projeto.urgente)
  const [editComplexidade, setEditComplexidade] = useState(projeto.complexidade)

  useEffect(() => {
    setComentarios(projeto.comentarios)
  }, [projeto])

  const progresso = (projeto.tarefasCompletas / projeto.totalTarefas) * 100

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
      status: editStatus,
      urgente: editUrgente,
      complexidade: editComplexidade,
    }

    // In-place updates fallback
    projeto.titulo = editTitulo
    projeto.descricao = editDescricao
    projeto.data = editData
    projeto.status = editStatus
    projeto.urgente = editUrgente
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
                    className="text-2xl font-bold text-white bg-white/10 border border-white/30 rounded px-2.5 py-1 focus:outline-none w-full"
                    placeholder="Título do Projeto"
                  />
                  <input
                    type="text"
                    value={editData}
                    onChange={(e) => setEditData(e.target.value)}
                    className="text-xs text-white/80 bg-white/10 border border-white/20 rounded px-2 py-0.5 w-40 focus:outline-none"
                    placeholder="Data / Período"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold truncate">{projeto.titulo}</h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-sincro-modal-text/70">
                    <span>{projeto.data}</span>
                    <span>Criado por {projeto.criador}</span>
                  </div>
                </>
              )}

              <p className="mt-2 text-sm font-medium">
                Status Atual:{" "}
                {isEditing ? (
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="px-2 py-0.5 rounded bg-[#2D243B] text-white font-bold border border-white/20 focus:outline-none"
                  >
                    <option value="Em Planejamento">Em Planejamento</option>
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Concluído">Concluído</option>
                    <option value="Suspenso">Suspenso</option>
                  </select>
                ) : (
                  <span className="text-status-cyan font-bold">{projeto.status}</span>
                )}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
              {isEditing ? (
                <div className="flex flex-col items-end gap-1 text-xs text-white">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editUrgente}
                      onChange={(e) => setEditUrgente(e.target.checked)}
                      className="rounded"
                    />
                    Urgente
                  </label>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span>Complexidade:</span>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={editComplexidade}
                      onChange={(e) => setEditComplexidade(Number(e.target.value))}
                      className="bg-white/10 border border-white/20 rounded px-1.5 py-0.5 w-12 text-center text-white"
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
                  className="w-full h-full min-h-[100px] bg-white/5 border border-white/20 rounded-xl p-3 text-sm text-white focus:outline-none resize-none leading-relaxed"
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
  onCriar?: (projeto: Partial<Projeto>) => void
}

export function CriarProjetoModal({ isOpen, onClose, onCriar }: CriarProjetoModalProps) {
  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")
  const [urgente, setUrgente] = useState(false)
  const [complexidade, setComplexidade] = useState(5)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCriar?.({
      titulo,
      descricao,
      urgente,
      complexidade,
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 text-sincro-modal-text">
        <h2 className="text-2xl font-bold mb-6">Criar Novo Projeto</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Título do Projeto</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-sincro-border bg-sincro-bg-input"
              placeholder="Digite o título..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-sincro-border bg-sincro-bg-input resize-none"
              placeholder="Descreva o projeto..."
            />
          </div>

          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Complexidade (1-10)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={complexidade}
                onChange={(e) => setComplexidade(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-sm">{complexidade}/10</span>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={urgente}
                  onChange={(e) => setUrgente(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Urgente</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-full border border-sincro-border text-sincro-modal-text text-sm font-medium hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-status-green text-white text-sm font-medium hover:brightness-110 transition-colors"
            >
              Criar Projeto
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
