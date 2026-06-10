"use client"

import { useState, useEffect } from "react"
import { Modal } from "./modal"
import { Combobox } from "./combobox"
import { X, User, BarChart2, UserPlus, Plus, Trash2 } from "lucide-react"

function carregarUsuarios(): { label: string; sublabel?: string }[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem("sincro-usuarios-data")
    if (raw) {
      const users = JSON.parse(raw) as { nome: string; email: string; equipe: string }[]
      return users.filter(u => u.nome).map(u => ({ label: u.nome, sublabel: `${u.equipe} · ${u.email}` }))
    }
  } catch {}
  return []
}

interface Membro {
  nome: string
  status: string
  ativo: boolean
}

interface ProjetoEst {
  nome: string
  completo: number
  total: number
  urgente: boolean
}

interface Equipe {
  id: number
  nome: string
  gestores: string[]
  descricao?: string
  setor: string
  membros: Membro[]
  projetos: ProjetoEst[]
}

interface EquipeModalProps {
  isOpen: boolean
  onClose: () => void
  equipe: Equipe
  onSave?: (equipe: Equipe) => void
  onDelete?: (id: number) => void
}

export function EquipeModal({ isOpen, onClose, equipe, onSave, onDelete }: EquipeModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editNome, setEditNome] = useState(equipe.nome)
  const [editGestores, setEditGestores] = useState<string[]>(equipe.gestores || [])
  const [editDescricao, setEditDescricao] = useState(equipe.descricao || "")
  const [editMembros, setEditMembros] = useState<Membro[]>(equipe.membros)
  const [novoGestor, setNovoGestor] = useState("")

  const [novoMembroNome, setNovoMembroNome] = useState("")
  const [novoMembroStatus, setNovoMembroStatus] = useState("")
  const [novoMembroAtivo, setNovoMembroAtivo] = useState(true)

  const handleSave = () => {
    if (!editNome.trim()) {
      alert("O nome da equipe é obrigatório.")
      return
    }
    const updated: Equipe = {
      ...equipe,
      nome: editNome,
      gestores: editGestores,
      descricao: editDescricao,
      membros: editMembros,
    }

    equipe.nome = editNome
    equipe.gestor = editGestor
    equipe.descricao = editDescricao
    equipe.membros = editMembros

    if (onSave) {
      onSave(updated)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditNome(equipe.nome)
    setEditGestor(equipe.gestor)
    setEditDescricao(equipe.descricao || "")
    setEditMembros(equipe.membros)
    setIsEditing(false)
  }

  const handleAddMembro = () => {
    if (novoMembroNome.trim()) {
      setEditMembros([
        ...editMembros,
        {
          nome: novoMembroNome.trim(),
          status: novoMembroStatus.trim() || "Sem tarefas ativas",
          ativo: novoMembroAtivo,
        }
      ])
      setNovoMembroNome("")
      setNovoMembroStatus("")
      setNovoMembroAtivo(true)
    }
  }

  const handleRemoveMembro = (index: number) => {
    setEditMembros(editMembros.filter((_, idx) => idx !== index))
  }

  const handleMembroChange = (index: number, field: keyof Membro, value: any) => {
    setEditMembros(editMembros.map((m, idx) => idx === index ? { ...m, [field]: value } : m))
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideClose={true}
      className="w-[80vw] h-[75vh] flex flex-col overflow-hidden rounded-2xl"
    >
      <div className="flex flex-col md:flex-row h-full text-sincro-modal-text flex-1 min-h-0 bg-sincro-modal-bg dark:bg-sincro-dark-gradient">
        {/* PAINEL ESQUERDO — Detalhes & Membros */}
        <div className="flex-1 p-8 flex flex-col gap-5 overflow-y-auto">
          {/* Cabeçalho com título + botão de fechar */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <input
                  type="text"
                  value={editNome}
                  onChange={(e) => setEditNome(e.target.value)}
                  maxLength={100}
                  className="text-3xl font-bold text-sincro-modal-text bg-sincro-bg-input border border-sincro-border rounded px-2.5 py-1 focus:outline-none w-full"
                  placeholder="Nome da Equipe"
                />
              ) : (
                <h2 className="text-3xl font-bold text-sincro-modal-text truncate">{equipe.nome}</h2>
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

          {/* Card dos Gestores */}
          <div className="flex items-center gap-3 p-3 rounded-xl border border-sincro-border bg-sincro-modal-sidebar">
            <div className="w-12 h-12 rounded-full bg-sincro-bg-accent border border-sincro-border flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-sincro-text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] text-sincro-text-muted font-bold uppercase tracking-wider">Gestores da Equipe:</span>
                  <Combobox
                    options={carregarUsuarios()}
                    selected={editGestores}
                    onAdd={(v) => { if (!editGestores.includes(v)) setEditGestores([...editGestores, v]) }}
                    onRemove={(v) => setEditGestores(editGestores.filter(g => g !== v))}
                    placeholder="Buscar gestor..."
                  />
                </div>
              ) : (
                <>
                  <h3 className="text-sm font-bold text-sincro-modal-text leading-tight">
                    {(equipe.gestores || []).length > 0 ? equipe.gestores.join(", ") : "Sem gestor"}
                  </h3>
                  <p className="text-[11px] text-sincro-text-secondary">Gestor(es) de Equipe</p>
                </>
              )}
            </div>
          </div>

          {/* Descrição da Equipe */}
          <div className="flex flex-col gap-1.5 p-3 rounded-xl border border-sincro-border bg-sincro-modal-sidebar">
            <h4 className="text-[11px] font-bold text-sincro-text-muted uppercase tracking-wider">Descrição:</h4>
            {isEditing ? (
              <textarea
                value={editDescricao}
                onChange={(e) => setEditDescricao(e.target.value)}
                maxLength={500}
                className="w-full text-xs text-sincro-text-primary bg-sincro-bg-input border border-sincro-border rounded px-2 py-1.5 focus:outline-none resize-none min-h-[60px]"
                placeholder="Insira a descrição da equipe..."
              />
            ) : (
              <p className="text-xs text-sincro-modal-text/90 leading-relaxed">
                {equipe.descricao || "Esta equipe coordena projetos e gerencia as principais tarefas associadas."}
              </p>
            )}
          </div>

          {/* Lista de Membros (a tal "aba" de tarefas) */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-[11px] font-bold text-sincro-text-muted uppercase tracking-wider">Tarefas dos Membros:</h4>
            <div className="flex flex-col gap-2">
              {editMembros.map((membro, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-sincro-border bg-sincro-modal-sidebar gap-2"
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-sincro-bg-accent border border-sincro-border flex items-center justify-center shrink-0">
                      <User className="w-3.5 h-3.5 text-sincro-text-secondary" />
                    </div>
                    {isEditing ? (
                      <div className="flex gap-2 flex-1 min-w-0">
                        <input
                          type="text"
                          value={membro.nome}
                          onChange={(e) => handleMembroChange(idx, "nome", e.target.value)}
                          maxLength={80}
                          className="text-xs font-semibold text-sincro-text-primary bg-sincro-bg-input border border-sincro-border rounded px-2 py-1 focus:outline-none w-1/2"
                          placeholder="Nome"
                        />
                        <input
                          type="text"
                          value={membro.status}
                          onChange={(e) => handleMembroChange(idx, "status", e.target.value)}
                          maxLength={50}
                          className="text-[10px] text-sincro-text-secondary bg-sincro-bg-input border border-sincro-border rounded px-2 py-1 focus:outline-none w-1/2"
                          placeholder="Status"
                        />
                      </div>
                    ) : (
                      <span className="text-xs font-semibold text-sincro-modal-text truncate">{membro.nome}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {isEditing ? (
                      <>
                        <input
                          type="checkbox"
                          checked={membro.ativo}
                          onChange={(e) => handleMembroChange(idx, "ativo", e.target.checked)}
                          className="rounded accent-status-green"
                        />
                        <button
                          onClick={() => handleRemoveMembro(idx)}
                          className="text-status-red hover:opacity-80 font-bold text-sm px-1.5"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <>
                        <span className={`w-2 h-2 rounded-full shrink-0 ${membro.ativo ? "bg-status-green" : "bg-status-yellow"}`} />
                        <span className="text-[10px] text-sincro-text-secondary">{membro.status}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {isEditing && (
                <div className="flex flex-col gap-2 p-3 rounded-xl border border-dashed border-sincro-border bg-sincro-modal-sidebar mt-2">
                  <span className="text-[10px] font-bold text-sincro-text-muted uppercase tracking-wider">Adicionar Membro</span>
                  <Combobox
                    options={carregarUsuarios().filter(u => !editMembros.find(m => m.nome === u.label))}
                    selected={[]}
                    onAdd={(v) => {
                      setEditMembros(prev => [...prev, { nome: v, status: "Sem tarefas ativas", ativo: true }])
                    }}
                    onRemove={() => {}}
                    placeholder="Buscar membro para adicionar..."
                  />
                  <div className="flex justify-between items-center mt-1">
                    <label className="flex items-center gap-1.5 text-[10px] text-sincro-text-secondary cursor-pointer">
                      <input
                        type="checkbox"
                        checked={novoMembroAtivo}
                        onChange={(e) => setNovoMembroAtivo(e.target.checked)}
                        className="rounded accent-status-green"
                      />
                      Ativo
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="pt-1">
            {isEditing ? (
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-status-green text-white rounded-full text-xs font-bold hover:brightness-110 active:scale-95 transition-all"
                >
                  Salvar
                </button>
                <button
                  onClick={handleCancel}
                  className="px-5 py-2 border border-sincro-border text-sincro-modal-text rounded-full text-xs font-bold hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 transition-all"
                >
                  Cancelar
                </button>
                {onDelete && (
                  <button
                    onClick={() => { onDelete(equipe.id); onClose() }}
                    className="flex items-center gap-2 h-9 px-4 rounded-full border border-status-red/30 text-status-red text-xs font-semibold hover:bg-status-red-bg active:scale-95 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Excluir
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 h-9 px-4 rounded-full border border-sincro-border text-sincro-modal-text text-xs font-semibold hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 transition-all"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-status-cyan shrink-0" />
                Editar Equipe
              </button>
            )}
          </div>
        </div>

        {/* PAINEL DIREITO — Estatísticas */}
        <div className="w-full md:w-[380px] bg-sincro-modal-sidebar p-6 flex flex-col gap-4 border-t md:border-t-0 md:border-l border-sincro-border min-h-0 overflow-y-auto">
          {/* Estatísticas por Projetos */}
          <div className="p-4 rounded-xl border border-sincro-border bg-sincro-modal-bg flex flex-col gap-3">
            <h4 className="text-[11px] font-bold text-sincro-text-muted uppercase tracking-wider">Estatísticas por Projetos:</h4>
            <div className="flex flex-col gap-3">
              {equipe.projetos.map((proj, idx) => {
                const pct = (proj.completo / proj.total) * 100
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-sincro-modal-text">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${proj.urgente ? "bg-status-red" : "bg-status-cyan"}`} />
                        <span className="font-semibold">{proj.nome}</span>
                      </div>
                      <span className="font-bold">{proj.completo}/{proj.total}</span>
                    </div>
                    <div className="h-1.5 bg-sincro-text-secondary/20 rounded-full overflow-hidden">
                      <div className="h-full bg-status-green rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
              {equipe.projetos.length === 0 && (
                <p className="text-[11px] text-sincro-text-muted text-center py-2">Nenhum projeto associado.</p>
              )}
            </div>
          </div>

          {/* Atividade Semanal */}
          <div className="p-4 rounded-xl border border-sincro-border bg-sincro-modal-bg flex flex-col gap-3">
            <h4 className="text-[11px] font-bold text-sincro-text-muted uppercase tracking-wider">Atividade Semanal:</h4>
            <div className="h-24 bg-sincro-bg-input rounded-lg border border-sincro-border flex items-center justify-center text-sincro-text-secondary">
              <BarChart2 className="w-5 h-5 mr-2 opacity-70" />
              <span className="text-[11px] font-semibold">Gráfico de Atividade</span>
            </div>
          </div>

          {/* Botão Inferior Direito */}
          <div className="pt-1 flex justify-end">
            <button className="flex items-center gap-2 h-9 px-4 rounded-full border border-sincro-border text-sincro-modal-text text-xs font-semibold hover:bg-sincro-modal-bg active:scale-95 transition-all">
              <span className="w-2.5 h-2.5 rounded-full bg-status-cyan shrink-0" />
              Ver Relatório
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

interface CriarEquipeModalProps {
  isOpen: boolean
  onClose: () => void
  onCriar?: (equipe: { nome: string; gestores: string[]; descricao: string; setor: string; membros: { nome: string; status: string; ativo: boolean }[] }) => void
}

export function CriarEquipeModal({ isOpen, onClose, onCriar }: CriarEquipeModalProps) {
  const [nome, setNome] = useState("")
  const [gestores, setGestores] = useState<string[]>([])
  const [novoGestor, setNovoGestor] = useState("")
  const [descricao, setDescricao] = useState("")
  const [setor, setSetor] = useState("SEIOP")
  const [membros, setMembros] = useState<{ nome: string; status: string; ativo: boolean }[]>([])
  const [novoMembroNome, setNovoMembroNome] = useState("")
  const [touched, setTouched] = useState(false)
  const [setores, setSetores] = useState<{ id: number; nome: string }[]>([])

  useEffect(() => {
    if (isOpen) {
      setNome("")
      setGestores([])
      setNovoGestor("")
      setDescricao("")
      setSetor("SEIOP")
      setMembros([])
      setNovoMembroNome("")
      setTouched(false)
      try {
        const raw = localStorage.getItem("sincro-setores-data")
        if (raw) {
          const data = JSON.parse(raw)
          setSetores(data.map((s: { id: number; nome: string }) => ({ id: s.id, nome: s.nome })))
        }
      } catch {
        setSetores([{ id: 1, nome: "SEIOP" }])
      }
    }
  }, [isOpen])

  const nomeInvalido = touched && !nome.trim()

  const handleAddMembro = () => {
    if (!novoMembroNome.trim()) return
    setMembros(prev => [...prev, { nome: novoMembroNome.trim(), status: "Sem tarefas ativas", ativo: true }])
    setNovoMembroNome("")
  }

  const handleRemoveMembro = (idx: number) => {
    setMembros(prev => prev.filter((_, i) => i !== idx))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!nome.trim()) return
    onCriar?.({
      nome: nome.trim(),
      gestores: gestores.length > 0 ? gestores : ["Sem gestor"],
      descricao: descricao.trim(),
      setor: setor || "SEIOP",
      membros,
    })
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideClose
      className="w-[min(680px,92vw)] max-h-[90vh] flex flex-col overflow-hidden rounded-2xl"
    >
      <div className="flex flex-col text-sincro-modal-text flex-1 min-h-0 bg-sincro-modal-bg dark:bg-sincro-dark-gradient">
        <div className="flex items-center justify-between gap-4 px-7 py-5 border-b border-sincro-border shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-status-green-bg text-status-green shrink-0">
              <UserPlus className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xl font-extrabold leading-tight">Criar Nova Equipe</h2>
              <p className="text-xs text-sincro-text-secondary mt-0.5">Defina as informações iniciais da equipe</p>
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

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-7 py-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-sincro-modal-text uppercase tracking-wider">
                Nome da Equipe <span className="text-status-red">*</span>
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Equipe Dev"
                maxLength={100}
                className={`px-4 py-2.5 rounded-xl bg-sincro-bg-input border text-sincro-modal-text focus:outline-none transition-colors ${
                  nomeInvalido ? "border-status-red" : "border-sincro-border focus:border-sincro-text-primary"
                }`}
              />
              {nomeInvalido && (
                <span className="text-[11px] text-status-red font-semibold">O nome da equipe é obrigatório.</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-sincro-modal-text uppercase tracking-wider">
                Gestores da Equipe
              </label>
              <Combobox
                options={carregarUsuarios()}
                selected={gestores}
                onAdd={(v) => { if (!gestores.includes(v)) setGestores([...gestores, v]) }}
                onRemove={(v) => setGestores(gestores.filter(g => g !== v))}
                placeholder="Buscar gestor..."
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-sincro-modal-text uppercase tracking-wider">
                Descrição
              </label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descreva o propósito da equipe..."
                rows={3}
                maxLength={500}
                className="px-4 py-2.5 rounded-xl bg-sincro-bg-input border border-sincro-border text-sincro-modal-text focus:outline-none focus:border-sincro-text-primary transition-colors resize-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-sincro-modal-text uppercase tracking-wider">
                Setor
              </label>
              <select
                value={setor}
                onChange={(e) => setSetor(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-sincro-bg-input border border-sincro-border text-sincro-modal-text focus:outline-none focus:border-sincro-text-primary transition-colors"
              >
                {setores.map((s) => (
                  <option key={s.id} value={s.nome}>{s.nome}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-sincro-modal-text uppercase tracking-wider">
                Membros
              </label>
              <Combobox
                options={carregarUsuarios()}
                selected={membros.map(m => m.nome)}
                onAdd={(v) => {
                  if (!membros.find(m => m.nome === v)) {
                    setMembros(prev => [...prev, { nome: v, status: "Sem tarefas ativas", ativo: true }])
                  }
                }}
                onRemove={(v) => setMembros(prev => prev.filter(m => m.nome !== v))}
                placeholder="Buscar membro..."
              />
              {membros.length > 0 && (
                <div className="flex flex-col gap-1.5 mt-1">
                  {membros.map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl border border-sincro-border bg-sincro-modal-bg">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-sincro-bg-input flex items-center justify-center shrink-0">
                          <User className="w-3.5 h-3.5 text-sincro-modal-text" />
                        </div>
                        <span className="text-sm font-semibold text-sincro-modal-text truncate">{m.nome}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveMembro(idx)}
                        className="p-1.5 rounded-full text-status-red hover:bg-status-red-bg transition-colors"
                        aria-label="Remover membro"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 px-7 py-4 border-t border-sincro-border shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="border border-sincro-border text-sincro-modal-text rounded-full px-6 py-2 text-sm font-bold hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-status-green text-white rounded-full px-6 py-2 text-sm font-extrabold hover:brightness-110 active:scale-95 transition-all"
            >
              Criar Equipe
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
