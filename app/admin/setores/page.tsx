"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Plus, Edit2, Trash2, X, Building2, Users, ChevronRight } from "lucide-react"

const SETORES_STORAGE_KEY = "sincro-setores-data"

const getSetoresStorage = () => {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(SETORES_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const saveSetoresStorage = (setores: Setor[]) => {
  if (typeof window === "undefined") return
  localStorage.setItem(SETORES_STORAGE_KEY, JSON.stringify(setores))
}

type Equipe = {
  id: number
  nome: string
}

type Setor = {
  id: number
  nome: string
  descricao: string
  equipes: Equipe[]
}

const setoresIniciais: Setor[] = [
  { id: 1, nome: "SEIOP", descricao: "Setor Geral — abrange todas as secretarias", equipes: [
    { id: 1, nome: "Equipe Administrativa" },
    { id: 2, nome: "Equipe de TI" },
  ]},
  { id: 2, nome: "Secretaria de Saúde", descricao: "Gestão de políticas de saúde pública", equipes: [
    { id: 1, nome: "Equipe Vigilância" },
  ]},
  { id: 3, nome: "Secretaria de Educação", descricao: "Gestão de políticas educacionais", equipes: [] },
  { id: 4, nome: "Secretaria de Obras", descricao: "Infraestrutura e obras públicas", equipes: [
    { id: 1, nome: "Equipe Projetos" },
    { id: 2, nome: "Equipe Fiscalização" },
  ]},
  { id: 5, nome: "Secretaria de Finanças", descricao: "Gestão financeira e orçamentária", equipes: [] },
  { id: 6, nome: "Secretaria de Administração", descricao: "Gestão administrativa e de pessoal", equipes: [] },
  { id: 7, nome: "Secretaria de Meio Ambiente", descricao: "Políticas ambientais e sustentabilidade", equipes: [] },
  { id: 8, nome: "Secretaria de Transporte", descricao: "Mobilidade e transporte público", equipes: [] },
]

const SEIOP_ID = 1

export default function SetoresPage() {
  const [setores, setSetores] = useState<Setor[]>(setoresIniciais)
  const [search, setSearch] = useState("")
  const [modalAberto, setModalAberto] = useState(false)
  const [editando, setEditando] = useState<Setor | null>(null)
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")

  const [setorSelecionado, setSetorSelecionado] = useState<Setor | null>(null)
  const [modalEquipesAberto, setModalEquipesAberto] = useState(false)
  const [equipeEditando, setEquipeEditando] = useState<Equipe | null>(null)
  const [nomeEquipe, setNomeEquipe] = useState("")

  const hasLoadedFromStorage = useRef(false)

  useEffect(() => {
    const saved = getSetoresStorage()
    if (saved) setSetores(saved.map((s: Setor) => ({ ...s, equipes: s.equipes || [] })))
  }, [])

  useEffect(() => {
    if (!hasLoadedFromStorage.current) {
      hasLoadedFromStorage.current = true
      return
    }
    saveSetoresStorage(setores)
  }, [setores])

  const abrirModalSetor = (setor?: Setor) => {
    if (setor) {
      setEditando(setor)
      setNome(setor.nome)
      setDescricao(setor.descricao)
    } else {
      setEditando(null)
      setNome("")
      setDescricao("")
    }
    setModalAberto(true)
  }

  const fecharModalSetor = () => {
    setModalAberto(false)
    setEditando(null)
    setNome("")
    setDescricao("")
  }

  const salvarSetor = () => {
    if (!nome.trim()) return
    if (editando) {
      setSetores(prev => prev.map(s => s.id === editando.id ? { ...s, nome, descricao } : s))
    } else {
      const novo: Setor = {
        id: Math.max(0, ...setores.map(s => s.id)) + 1,
        nome,
        descricao,
        equipes: [],
      }
      setSetores(prev => [...prev, novo])
    }
    fecharModalSetor()
  }

  const removerSetor = (id: number) => {
    if (id === SEIOP_ID) return
    setSetores(prev => prev.filter(s => s.id !== id))
  }

  const abrirEquipes = (setor: Setor) => {
    setSetorSelecionado(setor)
    setModalEquipesAberto(true)
  }

  const fecharEquipes = () => {
    setModalEquipesAberto(false)
    setSetorSelecionado(null)
    setEquipeEditando(null)
    setNomeEquipe("")
  }

  const abrirModalEquipe = (equipe?: Equipe) => {
    if (equipe) {
      setEquipeEditando(equipe)
      setNomeEquipe(equipe.nome)
    } else {
      setEquipeEditando(null)
      setNomeEquipe("")
    }
  }

  const salvarEquipe = () => {
    if (!nomeEquipe.trim() || !setorSelecionado) return
    if (equipeEditando) {
      setSetores(prev => prev.map(s => {
        if (s.id !== setorSelecionado.id) return s
        return { ...s, equipes: (s.equipes || []).map(e => e.id === equipeEditando.id ? { ...e, nome: nomeEquipe } : e) }
      }))
    } else {
      const nova: Equipe = {
        id: Math.max(0, ...(setorSelecionado.equipes || []).map(e => e.id), 0) + 1,
        nome: nomeEquipe,
      }
      setSetores(prev => prev.map(s => {
        if (s.id !== setorSelecionado.id) return s
        return { ...s, equipes: [...(s.equipes || []), nova] }
      }))
    }
    setEquipeEditando(null)
    setNomeEquipe("")
  }

  const removerEquipe = (equipeId: number) => {
    if (!setorSelecionado) return
    setSetores(prev => prev.map(s => {
      if (s.id !== setorSelecionado.id) return s
        return { ...s, equipes: (s.equipes || []).filter(e => e.id !== equipeId) }
    }))
  }

  const setoresFiltrados = setores.filter(s =>
    s.nome.toLowerCase().includes(search.toLowerCase()) ||
    s.descricao.toLowerCase().includes(search.toLowerCase())
  )

  const setorAtual = setores.find(s => s.id === setorSelecionado?.id)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-extrabold leading-none">Setores</h1>
          <p className="text-sm text-sincro-text-secondary mt-2">Gerencie os setores e equipes da plataforma.</p>
        </div>
        <button
          onClick={() => abrirModalSetor()}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-status-green text-white text-sm font-extrabold hover:brightness-110 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          Novo Setor
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 p-4 border border-sincro-border rounded-2xl bg-sincro-modal-sidebar">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-sincro-border flex-1 max-w-xs bg-white/5">
          <Search className="w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="Buscar setor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            maxLength={100}
            className="bg-transparent outline-none text-sm w-full text-sincro-text-primary"
          />
        </div>
      </div>

      <div className="border border-sincro-border rounded-2xl bg-sincro-modal-sidebar overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-sincro-bg-secondary">
              <tr className="text-left">
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-sincro-text-muted">Setor</th>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-sincro-text-muted">Descrição</th>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-sincro-text-muted">Equipes</th>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-sincro-text-muted text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {setoresFiltrados.map((setor) => (
                <tr
                  key={setor.id}
                  className="border-t border-sincro-border hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => abrirEquipes(setor)}
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full flex items-center justify-center bg-sincro-primary/20 text-sincro-primary shrink-0">
                        <Building2 className="w-4 h-4" />
                      </span>
                      <span className="font-bold">{setor.nome}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sincro-text-secondary">{setor.descricao}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-sincro-text-secondary">
                      <Users className="w-3.5 h-3.5" />
                      {setor.equipes?.length || 0}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={(e) => { e.stopPropagation(); abrirModalSetor(setor) }}
                        className="p-1.5 rounded-full hover:bg-white/10 text-sincro-text-primary transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      {setor.id !== SEIOP_ID && (
                        <button
                          onClick={(e) => { e.stopPropagation(); removerSetor(setor.id) }}
                          className="p-1.5 rounded-full hover:bg-status-red-bg text-status-red transition-colors"
                          title="Remover"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <ChevronRight className="w-4 h-4 text-sincro-text-muted" />
                    </div>
                  </td>
                </tr>
              ))}
              {setoresFiltrados.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-sincro-text-muted">
                    Nenhum setor encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md border border-sincro-border rounded-2xl bg-sincro-modal-bg shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-sincro-border">
              <h2 className="text-lg font-extrabold">{editando ? "Editar Setor" : "Novo Setor"}</h2>
              <button onClick={fecharModalSetor} className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary">Nome do Setor</label>
                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  maxLength={100}
                  className="h-10 px-4 rounded-full bg-white/10 border border-white/20 outline-none text-sm text-sincro-text-primary"
                  placeholder="Ex.: Secretaria de Saúde"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary">Descrição</label>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  rows={3}
                  maxLength={500}
                  className="h-24 px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none text-sm text-sincro-text-primary resize-none"
                  placeholder="Descreva o setor..."
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-5 border-t border-sincro-border">
              <button onClick={fecharModalSetor} className="px-4 py-2 rounded-full border border-sincro-border text-sm font-bold hover:bg-white/10 transition-all">
                Cancelar
              </button>
              <button
                onClick={salvarSetor}
                className="px-4 py-2 rounded-full bg-status-green text-white text-sm font-extrabold hover:brightness-110 active:scale-95 transition-all"
              >
                {editando ? "Salvar" : "Criar Setor"}
              </button>
            </div>
          </div>
        </div>
      )}

      {modalEquipesAberto && setorAtual && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg border border-sincro-border rounded-2xl bg-sincro-modal-bg shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-sincro-border">
              <div>
                <h2 className="text-lg font-extrabold">Equipes</h2>
                <p className="text-sm text-sincro-text-secondary mt-1">{setorAtual.nome}</p>
              </div>
              <button onClick={fecharEquipes} className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
              {(!setorAtual.equipes || setorAtual.equipes.length === 0) ? (
                <p className="text-sm text-sincro-text-muted text-center py-6">Nenhuma equipe neste setor.</p>
              ) : (
                (setorAtual.equipes || []).map((equipe) => (
                  <div
                    key={equipe.id}
                    className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-sincro-border bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full flex items-center justify-center bg-sincro-primary/20 text-sincro-primary shrink-0">
                        <Users className="w-4 h-4" />
                      </span>
                      <span className="font-bold text-sm">{equipe.nome}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => abrirModalEquipe(equipe)}
                        className="p-1.5 rounded-full hover:bg-white/10 text-sincro-text-primary transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removerEquipe(equipe.id)}
                        className="p-1.5 rounded-full hover:bg-status-red-bg text-status-red transition-colors"
                        title="Remover"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}

              <div className="flex items-center gap-2 mt-2">
                <input
                  value={nomeEquipe}
                  onChange={(e) => setNomeEquipe(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") salvarEquipe() }}
                  maxLength={100}
                  className="flex-1 h-10 px-4 rounded-full bg-white/10 border border-white/20 outline-none text-sm text-sincro-text-primary"
                  placeholder={equipeEditando ? "Editar nome da equipe..." : "Nova equipe..."}
                />
                <button
                  onClick={salvarEquipe}
                  disabled={!nomeEquipe.trim()}
                  className="h-10 px-4 rounded-full bg-status-green text-white text-sm font-extrabold hover:brightness-110 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {equipeEditando ? "Salvar" : "Adicionar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
