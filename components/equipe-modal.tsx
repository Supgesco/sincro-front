"use client"

import { useState } from "react"
import { Modal } from "./modal"
import { X, User, BarChart2 } from "lucide-react"

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
  gestor: string
  descricao?: string
  membros: Membro[]
  projetos: ProjetoEst[]
}

interface EquipeModalProps {
  isOpen: boolean
  onClose: () => void
  equipe: Equipe
  onSave?: (equipe: Equipe) => void
}

const PURPLE_GRADIENT = "linear-gradient(90deg, #5A3E99 0%, #7A5BEF 100%)"

export function EquipeModal({ isOpen, onClose, equipe, onSave }: EquipeModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editNome, setEditNome] = useState(equipe.nome)
  const [editGestor, setEditGestor] = useState(equipe.gestor)
  const [editDescricao, setEditDescricao] = useState(equipe.descricao || "")
  const [editMembros, setEditMembros] = useState<Membro[]>(equipe.membros)

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
      gestor: editGestor,
      descricao: editDescricao,
      membros: editMembros,
    }

    // In-place updates fallback
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
      {/* Cabeçalho — 60px, gradiente roxo principal */}
      <div 
        className="relative h-[60px] px-6 flex items-center justify-center border-b border-white/10 shrink-0"
        style={{ background: PURPLE_GRADIENT }}
      >
        {isEditing ? (
          <input
            type="text"
            value={editNome}
            onChange={(e) => setEditNome(e.target.value)}
            className="text-lg font-bold text-white bg-white/10 border border-white/30 rounded px-2 py-0.5 focus:outline-none focus:border-white/60 text-center"
            placeholder="Nome da Equipe"
          />
        ) : (
          <h2 className="text-[22px] font-bold text-white leading-none">{equipe.nome}</h2>
        )}
        <button 
          onClick={onClose}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full hover:bg-white/15 active:scale-90 flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Conteúdo principal */}
      <div className="flex flex-col md:flex-row h-full flex-1 min-h-0 text-sincro-modal-text bg-sincro-modal-bg dark:bg-sincro-dark-gradient">
        {/* PAINEL ESQUERDO — Gestor & Membros */}
        <div className="flex-1 px-6 py-5 flex flex-col gap-4 overflow-y-auto">
          {/* Perfil Gestor — card padronizado */}
          <div 
            className="flex items-center gap-3 p-3 rounded-xl border border-white/15"
            style={{ background: PURPLE_GRADIENT }}
          >
            <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-white/80 font-bold uppercase">Gestor:</span>
                  <input
                    type="text"
                    value={editGestor}
                    onChange={(e) => setEditGestor(e.target.value)}
                    className="text-xs font-bold text-white bg-white/15 border border-white/30 rounded px-2 py-0.5 w-full focus:outline-none"
                  />
                </div>
              ) : (
                <>
                  <h3 className="text-sm font-bold text-white leading-tight">{equipe.gestor}</h3>
                  <p className="text-[11px] text-white/80">Gestor de Equipe</p>
                </>
              )}
            </div>
          </div>

          {/* Descrição da Equipe */}
          <div className="flex flex-col gap-1.5 p-3 rounded-xl border border-white/15 bg-white/5">
            <h4 className="text-[11px] font-bold text-white/70 uppercase tracking-wider">Descrição:</h4>
            {isEditing ? (
              <textarea
                value={editDescricao}
                onChange={(e) => setEditDescricao(e.target.value)}
                className="w-full text-xs text-white bg-transparent border-none focus:outline-none resize-none min-h-[50px] placeholder-white/40"
                placeholder="Insira a descrição da equipe..."
              />
            ) : (
              <p className="text-xs text-white/90 leading-relaxed">
                {equipe.descricao || "Esta equipe coordena projetos e gerencia as principais tarefas associadas."}
              </p>
            )}
          </div>

          {/* Lista de Membros — cards compactos, gap pequeno */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-[11px] font-bold text-white/70 uppercase tracking-wider">Membros:</h4>
            <div className="flex flex-col gap-2">
              {editMembros.map((membro, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-2.5 rounded-xl border border-white/15 bg-white/5 gap-2"
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                      <User className="w-3.5 h-3.5 text-white opacity-80" />
                    </div>
                    {isEditing ? (
                      <div className="flex gap-2 flex-1 min-w-0">
                        <input
                          type="text"
                          value={membro.nome}
                          onChange={(e) => handleMembroChange(idx, "nome", e.target.value)}
                          className="text-xs font-semibold text-white bg-white/10 border border-white/20 rounded px-1.5 py-0.5 focus:outline-none w-1/2"
                          placeholder="Nome"
                        />
                        <input
                          type="text"
                          value={membro.status}
                          onChange={(e) => handleMembroChange(idx, "status", e.target.value)}
                          className="text-[10px] text-white/80 bg-white/10 border border-white/20 rounded px-1.5 py-0.5 focus:outline-none w-1/2"
                          placeholder="Status"
                        />
                      </div>
                    ) : (
                      <span className="text-xs font-semibold text-white truncate">{membro.nome}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {isEditing ? (
                      <>
                        <input
                          type="checkbox"
                          checked={membro.ativo}
                          onChange={(e) => handleMembroChange(idx, "ativo", e.target.checked)}
                          className="rounded text-[#5EE86B]"
                        />
                        <button
                          onClick={() => handleRemoveMembro(idx)}
                          className="text-status-red hover:text-red-500 font-bold text-xs px-1"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <>
                        <span className={`w-2 h-2 rounded-full shrink-0 ${membro.ativo ? "bg-status-green" : "bg-status-yellow"}`} />
                        <span className="text-[10px] text-white/70">{membro.status}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {isEditing && (
                <div className="flex flex-col gap-2 p-2 rounded-xl border border-dashed border-white/30 bg-white/5 mt-2">
                  <span className="text-[10px] font-bold text-white/70">Adicionar Membro</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Nome do Membro"
                      value={novoMembroNome}
                      onChange={(e) => setNovoMembroNome(e.target.value)}
                      className="text-xs text-white bg-white/10 border border-white/20 rounded px-2 py-1 w-1/2 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Status/Cargo"
                      value={novoMembroStatus}
                      onChange={(e) => setNovoMembroStatus(e.target.value)}
                      className="text-xs text-white bg-white/10 border border-white/20 rounded px-2 py-1 w-1/2 focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <label className="flex items-center gap-1 text-[10px] text-white/80 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={novoMembroAtivo}
                        onChange={(e) => setNovoMembroAtivo(e.target.checked)}
                        className="rounded"
                      />
                      Ativo
                    </label>
                    <button
                      onClick={handleAddMembro}
                      className="h-7 px-3 bg-[#5A3E99] border border-white/30 text-white rounded text-[10px] font-bold hover:bg-[#7A5BEF]"
                    >
                      Adicionar
                    </button>
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
                  className="px-5 py-2 bg-status-green text-white rounded-full text-xs font-bold hover:brightness-110"
                >
                  Salvar
                </button>
                <button
                  onClick={handleCancel}
                  className="px-5 py-2 border border-white/40 text-white rounded-full text-xs font-bold hover:bg-white/10"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 h-9 px-4 rounded-full border border-white/40 bg-transparent text-white text-xs font-semibold hover:bg-white/10 active:scale-95 transition-all"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-white shrink-0" />
                Editar Equipe
              </button>
            )}
          </div>
        </div>

        {/* DIVISOR VERTICAL SUTIL */}
        <div className="hidden md:block w-px bg-white/10 flex-shrink-0 my-4" />

        {/* PAINEL DIREITO — Estatísticas & Gráfico (compacto) */}
        <div className="flex-1 px-6 py-5 bg-sincro-modal-sidebar flex flex-col gap-4 overflow-y-auto border-t md:border-t-0 border-sincro-border">
          {/* Estatísticas por Projetos — card padronizado */}
          <div 
            className="p-3 rounded-xl border border-white/15"
            style={{ background: PURPLE_GRADIENT }}
          >
            <h4 className="text-[11px] font-bold text-white/90 uppercase tracking-wider mb-2">Estatísticas por Projetos:</h4>
            <div className="flex flex-col gap-2">
              {equipe.projetos.map((proj, idx) => {
                const pct = (proj.completo / proj.total) * 100
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-white">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${proj.urgente ? "bg-status-red" : "bg-status-cyan"}`} />
                        <span className="font-semibold">{proj.nome}</span>
                      </div>
                      <span className="font-bold">{proj.completo}/{proj.total}</span>
                    </div>
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-status-green rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Atividade Semanal — card compacto */}
          <div 
            className="p-3 rounded-xl border border-white/15"
            style={{ background: PURPLE_GRADIENT }}
          >
            <h4 className="text-[11px] font-bold text-white/90 uppercase tracking-wider mb-2">Atividade Semanal:</h4>
            <div className="h-20 bg-white/10 rounded-lg border border-white/15 flex items-center justify-center text-white/80">
              <BarChart2 className="w-5 h-5 mr-1.5 opacity-70" />
              <span className="text-[11px] font-semibold">Gráfico de Atividade</span>
            </div>
          </div>

          {/* Botão Inferior Direito */}
          <div className="pt-1 flex justify-end">
            <button className="flex items-center gap-2 h-9 px-4 rounded-full border border-white/40 bg-transparent text-white text-xs font-semibold hover:bg-white/10 active:scale-95 transition-all">
              <span className="w-2.5 h-2.5 rounded-full bg-white shrink-0" />
              Ver Relatório
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
