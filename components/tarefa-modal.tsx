"use client"

import { useState } from "react"
import { Modal } from "@/components/modal"
import { User, Calendar, Pencil, X, Check, Filter, Plus, Play } from "lucide-react"

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
  onSave?: (tarefa: Tarefa) => void
}

export function TarefaModal({ isOpen, onClose, tarefa, onAceitar, onIniciar, onFinalizar, onSave }: TarefaModalProps) {
  const [checklistItems, setChecklistItems] = useState(tarefa.checklist)
  const [isEditing, setIsEditing] = useState(false)
  const [comentario, setComentario] = useState("")

  // Edit fields state
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
    
    // In-place update fallback if onSave is not provided
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
      {/* CABEÇALHO — ~60px */}
      <div className="relative h-[60px] px-6 flex items-center justify-center bg-sincro-modal-header border-b border-white/10 text-sincro-modal-text shrink-0">
        {/* Status badge — canto superior esquerdo */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2">
          {isEditing ? (
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              className="px-2 py-1 rounded bg-[#2D243B] text-white text-[10px] font-bold border border-white/20 focus:outline-none"
            >
              <option value="A Fazer">A Fazer</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Concluído">Concluído</option>
              <option value="Em Atraso">Em Atraso</option>
            </select>
          ) : (
            <span className="px-3 py-1 rounded-full bg-status-cyan text-white text-[10px] font-bold uppercase tracking-wider">
              {tarefa.status}
            </span>
          )}
        </div>

        {/* Título + Editar — centro */}
        <div className="flex items-center gap-3">
          {isEditing ? (
            <input
              type="text"
              value={editNome}
              onChange={(e) => setEditNome(e.target.value)}
              className="text-xl font-bold text-white bg-white/10 border border-white/30 rounded px-2 py-1 focus:outline-none focus:border-white/60"
            />
          ) : (
            <h2 className="text-[28px] font-bold text-white leading-none">{tarefa.nome}</h2>
          )}
          
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 h-7 px-3 rounded-full border border-white/40 bg-transparent text-white text-[11px] font-semibold hover:bg-white/10 transition-colors"
            >
              <Pencil className="w-3 h-3" />
              Editar Tarefa
            </button>
          )}
        </div>

        {/* Botão fechar — canto superior direito */}
        <button 
          onClick={onClose}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full hover:bg-white/10 active:scale-90 flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex flex-1 min-h-0 text-sincro-modal-text bg-sincro-modal-bg dark:bg-sincro-dark-gradient">
        {/* PAINEL ESQUERDO — 70% */}
        <div className="flex-[7] px-6 py-5 flex flex-col gap-4 overflow-y-auto">

          {/* Criado por + Data */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-sincro-modal-text/70">Criado por:</span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-white">{tarefa.criador}</span>
            <span className="text-sincro-modal-text/60 ml-2">{tarefa.dataCriacao}</span>
          </div>

          {/* Tags (horizontal) */}
          <div className="flex flex-wrap gap-2 items-center">
            {isEditing ? (
              <>
                <span className="flex items-center gap-1.5 h-7 px-2 rounded text-xs border border-white/20 bg-white/10 text-white">
                  <Calendar className="w-3.5 h-3.5" />
                  <input
                    type="text"
                    value={editDataEntrega}
                    onChange={(e) => setEditDataEntrega(e.target.value)}
                    className="bg-transparent border-none text-white focus:outline-none w-20 text-xs"
                    placeholder="Data"
                  />
                </span>
                <select
                  value={editComplexidade}
                  onChange={(e) => setEditComplexidade(e.target.value)}
                  className="h-7 px-2 rounded text-xs bg-[#2D243B] text-white border border-white/20 font-semibold focus:outline-none"
                >
                  <option value="Baixa Complexidade">Baixa</option>
                  <option value="Média Complexidade">Média</option>
                  <option value="Alta Complexidade">Alta</option>
                </select>
                <label className="flex items-center gap-1 text-xs text-white">
                  <input
                    type="checkbox"
                    checked={editUrgente}
                    onChange={(e) => setEditUrgente(e.target.checked)}
                    className="rounded text-status-orange"
                  />
                  Urgente
                </label>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1.5 h-7 px-3 rounded-full text-xs border border-white/20 bg-white/10 text-white">
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
              <span className="font-bold text-white">Membros:</span>
              {isEditing && (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={novoMembro}
                    onChange={(e) => setNovoMembro(e.target.value)}
                    placeholder="Adicionar..."
                    className="px-2 py-0.5 rounded text-xs bg-white/10 border border-white/20 text-white focus:outline-none"
                  />
                  <button
                    onClick={handleAddMembro}
                    className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors text-white font-bold"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
            
            {isEditing && (
              <div className="flex flex-wrap gap-2">
                {editMembros.map((m, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full text-xs text-white">
                    <span>{m}</span>
                    <button
                      onClick={() => handleRemoveMembro(idx)}
                      className="text-status-red font-bold hover:text-red-500"
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
            <h3 className="text-base font-bold flex items-center gap-2 text-white">
              <span className="text-lg">≡</span>
              Descrição
            </h3>
            <div className="min-h-[120px] p-4 bg-sincro-bg-input rounded-xl border border-white/10">
              {isEditing ? (
                <textarea
                  value={editDescricao}
                  onChange={(e) => setEditDescricao(e.target.value)}
                  className="w-full min-h-[100px] bg-transparent text-white focus:outline-none resize-none text-sm leading-relaxed"
                  placeholder="Digite a descrição da tarefa..."
                />
              ) : (
                <p className="text-sm text-white/95 leading-relaxed">
                  {tarefa.descricao}
                </p>
              )}
            </div>
          </div>

          {/* Checklist */}
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-bold flex items-center gap-2 text-white">
              <span className="w-3 h-3 rounded-full bg-white/30" />
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
                        : "border border-white/30"
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
                        className="bg-white/10 border border-white/20 rounded px-2 py-0.5 text-xs text-white focus:outline-none flex-1"
                      />
                      <button
                        onClick={() => handleRemoveChecklistItem(item.id)}
                        className="text-status-red hover:text-red-500 text-xs font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <span 
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`text-sm text-white cursor-pointer ${item.concluido ? "line-through opacity-60" : ""}`}
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
                    className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-white focus:outline-none flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddChecklistItem()
                    }}
                  />
                  <button
                    onClick={handleAddChecklistItem}
                    className="px-3 py-1 rounded bg-[#2D243B] text-white text-xs border border-white/30 font-semibold"
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
                  className="px-6 py-2 rounded-full border border-white/30 text-white hover:bg-white/10 active:scale-95 transition-all text-sm font-bold"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <div>
                {!tarefa.aceita ? (
                  <button
                    onClick={onAceitar}
                    className="flex items-center gap-2 h-10 px-5 rounded-full border border-status-green text-status-green hover:bg-status-green/15 active:scale-95 transition-all text-sm font-bold"
                  >
                    <Check className="w-4 h-4" />
                    Aceitar Tarefa
                  </button>
                ) : tarefa.status === "Finalizado" ? (
                  <span className="inline-flex items-center gap-2 h-10 px-5 rounded-full border border-status-green/40 bg-status-green/10 text-status-green text-sm font-bold">
                    <Check className="w-4 h-4" />
                    Tarefa Finalizada
                  </span>
                ) : tarefa.status === "Em Andamento" ? (
                  <button
                    onClick={onFinalizar}
                    className="flex items-center gap-2 h-10 px-5 rounded-full bg-status-green text-white hover:brightness-110 active:scale-95 transition-all text-sm font-extrabold"
                  >
                    <Check className="w-4 h-4" />
                    Finalizar Tarefa
                  </button>
                ) : (
                  <button
                    onClick={onIniciar}
                    className="flex items-center gap-2 h-10 px-5 rounded-full bg-status-cyan text-white hover:brightness-110 active:scale-95 transition-all text-sm font-extrabold"
                  >
                    <Play className="w-4 h-4" />
                    Iniciar Tarefa
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* DIVISOR VERTICAL SUTIL */}
        <div className="hidden md:block w-px bg-white/10 flex-shrink-0 my-4" />

        {/* PAINEL DIREITO — 30% */}
        <div className="flex-[3] bg-sincro-modal-sidebar px-4 py-4 flex flex-col min-h-0">
          {/* Ícone de filtro no topo direito */}
          <div className="flex justify-end mb-3">
            <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 text-white flex items-center justify-center transition-all">
              <Filter className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Lista de Membros (cards empilhados) */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-3 mb-3 min-h-0 pr-1">
            {editMembros.length === 0 ? (
              <div className="text-center py-6 text-white/50 text-sm">
                Nenhum membro.
              </div>
            ) : (
              editMembros.map((membro, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 p-3 rounded-xl border border-white/15 bg-white/5"
                >
                  <div className="w-9 h-9 rounded-full bg-white/20 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-white truncate">{membro}</p>
                    <p className="text-xs text-white/60 truncate">Membro da equipe</p>
                  </div>
                </div>
              ))
            )}

            {/* Card de comentário (se houver) */}
            {tarefa.comentarios.map((c, idx) => (
              <div 
                key={`c-${idx}`} 
                className="flex items-start gap-3 p-3 rounded-xl border border-white/15 bg-white/5"
              >
                <div className="w-9 h-9 rounded-full bg-white/20 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-white truncate">{c.autor}</p>
                  <p className="text-xs text-white/70 mt-0.5 break-words">{c.texto}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input de Comentário — fixo no rodapé */}
          <div className="shrink-0">
            <input 
              type="text"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Digite seu comentário..."
              className="w-full h-[50px] bg-white/10 border border-white/20 rounded-full px-5 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all"
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}
