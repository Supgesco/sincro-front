"use client"

import { useState, useEffect } from "react"
import { Search, Plus, UserCheck, UserX, Shield, Edit2, Trash2, X } from "lucide-react"

type Perfil = "Admin" | "Gestor" | "Membro"

type Usuario = {
  id: number
  nome: string
  email: string
  perfil: Perfil
  equipe: string
  setor: string
  status: "Ativo" | "Inativo"
  ultimoAcesso: string
}

const USUARIOS_KEY = "sincro-usuarios-data"
const EQUIPES_KEY = "sincro-equipes-data"
const SETORES_KEY = "sincro-setores-data"

const usuariosSeed: Usuario[] = [
  { id: 1, nome: "Davi Silva", email: "davi.silva@sincro.com", perfil: "Admin", equipe: "Diretoria", setor: "SEIOP", status: "Ativo", ultimoAcesso: "Agora" },
  { id: 2, nome: "Ana Santos", email: "ana.santos@sincro.com", perfil: "Gestor", equipe: "Equipe Design", setor: "Secretaria de Saúde", status: "Ativo", ultimoAcesso: "Há 15 min" },
  { id: 3, nome: "Carlos Silva", email: "carlos.silva@sincro.com", perfil: "Membro", equipe: "Equipe Dev", setor: "Secretaria de Saúde", status: "Ativo", ultimoAcesso: "Há 1 h" },
  { id: 4, nome: "Mariana Souza", email: "mariana.souza@sincro.com", perfil: "Gestor", equipe: "Equipe QA", setor: "Secretaria de Educação", status: "Ativo", ultimoAcesso: "Há 2 h" },
  { id: 5, nome: "Rodrigo Lira", email: "rodrigo.lira@sincro.com", perfil: "Membro", equipe: "Equipe Dev", setor: "Secretaria de Finanças", status: "Inativo", ultimoAcesso: "Há 3 dias" },
  { id: 6, nome: "Sofia Mendes", email: "sofia.mendes@sincro.com", perfil: "Membro", equipe: "Equipe Design", setor: "Secretaria de Saúde", status: "Ativo", ultimoAcesso: "Há 30 min" },
  { id: 7, nome: "Lucas Oliveira", email: "lucas.oliveira@sincro.com", perfil: "Gestor", equipe: "Equipe Marketing", setor: "SEIOP", status: "Ativo", ultimoAcesso: "Há 4 h" },
  { id: 8, nome: "Pedro Álvares", email: "pedro.alvares@sincro.com", perfil: "Membro", equipe: "Equipe Ops", setor: "SEIOP", status: "Inativo", ultimoAcesso: "Há 1 sem" },
  { id: 9, nome: "Camila Rocha", email: "camila.rocha@sincro.com", perfil: "Gestor", equipe: "Equipe RH", setor: "Secretaria de Administração", status: "Ativo", ultimoAcesso: "Há 1 h" },
  { id: 10, nome: "Felipe Melo", email: "felipe.melo@sincro.com", perfil: "Membro", equipe: "Equipe Dados", setor: "Secretaria de Meio Ambiente", status: "Ativo", ultimoAcesso: "Há 20 min" },
]

function loadUsuarios(): Usuario[] {
  if (typeof window === "undefined") return usuariosSeed
  try {
    const raw = localStorage.getItem(USUARIOS_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return usuariosSeed
}

function saveUsuarios(u: Usuario[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(USUARIOS_KEY, JSON.stringify(u))
}

function loadEquipes(): string[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(EQUIPES_KEY)
    if (raw) return JSON.parse(raw).map((e: { nome: string }) => e.nome)
  } catch {}
  return []
}

function loadSetores(): string[] {
  if (typeof window === "undefined") return ["SEIOP"]
  try {
    const raw = localStorage.getItem(SETORES_KEY)
    if (raw) return JSON.parse(raw).map((s: { nome: string }) => s.nome)
  } catch {}
  return ["SEIOP"]
}

const perfilBadge: Record<Perfil, string> = {
  Admin: "bg-status-red",
  Gestor: "bg-status-cyan",
  Membro: "bg-sincro-text-secondary/40",
}

const perfilIcon: Record<Perfil, typeof Shield> = {
  Admin: Shield,
  Gestor: UserCheck,
  Membro: UserCheck,
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [equipes, setEquipes] = useState<string[]>([])
  const [setores, setSetores] = useState<string[]>([])
  const [search, setSearch] = useState("")
  const [filtroPerfil, setFiltroPerfil] = useState<"Todos" | Perfil>("Todos")
  const [filtroStatus, setFiltroStatus] = useState<"Todos" | "Ativo" | "Inativo">("Todos")
  const [modalAberto, setModalAberto] = useState(false)
  const [editando, setEditando] = useState<Usuario | null>(null)

  const [novoNome, setNovoNome] = useState("")
  const [novoEmail, setNovoEmail] = useState("")
  const [novoPerfil, setNovoPerfil] = useState<Perfil>("Membro")
  const [novaEquipe, setNovaEquipe] = useState("")
  const [novoSetor, setNovoSetor] = useState("")

  useEffect(() => {
    setUsuarios(loadUsuarios())
    setEquipes(loadEquipes())
    setSetores(loadSetores())
  }, [])

  useEffect(() => {
    if (usuarios.length > 0) saveUsuarios(usuarios)
  }, [usuarios])

  const abrirModal = (usuario?: Usuario) => {
    if (usuario) {
      setEditando(usuario)
      setNovoNome(usuario.nome)
      setNovoEmail(usuario.email)
      setNovoPerfil(usuario.perfil)
      setNovaEquipe(usuario.equipe)
      setNovoSetor(usuario.setor)
    } else {
      setEditando(null)
      setNovoNome("")
      setNovoEmail("")
      setNovoPerfil("Membro")
      setNovaEquipe("")
      setNovoSetor("")
    }
    setModalAberto(true)
  }

  const fecharModal = () => {
    setModalAberto(false)
    setEditando(null)
  }

  const salvarUsuario = () => {
    if (!novoNome.trim() || !novoEmail.trim()) return
    if (editando) {
      setUsuarios(prev => prev.map(u =>
        u.id === editando.id ? { ...u, nome: novoNome, email: novoEmail, perfil: novoPerfil, equipe: novaEquipe || "Sem equipe", setor: novoSetor || "SEIOP" } : u
      ))
    } else {
      const novo: Usuario = {
        id: Math.max(0, ...usuarios.map(u => u.id)) + 1,
        nome: novoNome,
        email: novoEmail,
        perfil: novoPerfil,
        equipe: novaEquipe || "Sem equipe",
        setor: novoSetor || "SEIOP",
        status: "Ativo",
        ultimoAcesso: "Nunca",
      }
      setUsuarios(prev => [...prev, novo])
    }
    fecharModal()
  }

  const alternarStatus = (id: number) => {
    setUsuarios(prev => prev.map(u =>
      u.id === id ? { ...u, status: u.status === "Ativo" ? "Inativo" : "Ativo" } : u
    ))
  }

  const removerUsuario = (id: number) => {
    setUsuarios(prev => prev.filter(u => u.id !== id))
  }

  const usuariosFiltrados = usuarios.filter(u => {
    const matchSearch = u.nome.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase())
    const matchPerfil = filtroPerfil === "Todos" || u.perfil === filtroPerfil
    const matchStatus = filtroStatus === "Todos" || u.status === filtroStatus
    return matchSearch && matchPerfil && matchStatus
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-extrabold leading-none">Usuários</h1>
          <p className="text-sm text-sincro-text-secondary mt-2">Gerencie contas, perfis e acessos à plataforma.</p>
        </div>
        <button
          onClick={() => abrirModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-status-green text-white text-sm font-extrabold hover:brightness-110 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          Novo Usuário
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="border border-sincro-border rounded-2xl p-4 bg-sincro-modal-sidebar">
          <p className="text-[11px] uppercase tracking-wider text-sincro-text-muted font-bold">Total</p>
          <p className="text-2xl font-extrabold mt-1">{usuarios.length}</p>
        </div>
        <div className="border border-sincro-border rounded-2xl p-4 bg-sincro-modal-sidebar">
          <p className="text-[11px] uppercase tracking-wider text-sincro-text-muted font-bold">Ativos</p>
          <p className="text-2xl font-extrabold mt-1 text-status-green">{usuarios.filter(u => u.status === "Ativo").length}</p>
        </div>
        <div className="border border-sincro-border rounded-2xl p-4 bg-sincro-modal-sidebar">
          <p className="text-[11px] uppercase tracking-wider text-sincro-text-muted font-bold">Inativos</p>
          <p className="text-2xl font-extrabold mt-1 text-status-red">{usuarios.filter(u => u.status === "Inativo").length}</p>
        </div>
        <div className="border border-sincro-border rounded-2xl p-4 bg-sincro-modal-sidebar">
          <p className="text-[11px] uppercase tracking-wider text-sincro-text-muted font-bold">Admins</p>
          <p className="text-2xl font-extrabold mt-1 text-status-cyan">{usuarios.filter(u => u.perfil === "Admin").length}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 p-4 border border-sincro-border rounded-2xl bg-sincro-modal-sidebar">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-sincro-border flex-1 max-w-xs bg-white/5">
          <Search className="w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="Pesquisar usuário..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            maxLength={100}
            className="bg-transparent outline-none text-sm w-full text-sincro-text-primary"
          />
        </div>
        <select
          value={filtroPerfil}
          onChange={(e) => setFiltroPerfil(e.target.value as "Todos" | Perfil)}
          className="px-4 py-2 rounded-full border border-sincro-border bg-transparent text-sm text-sincro-text-primary outline-none"
        >
          <option value="Todos">Todos os Perfis</option>
          <option value="Admin">Admin</option>
          <option value="Gestor">Gestor</option>
          <option value="Membro">Membro</option>
        </select>
        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value as "Todos" | "Ativo" | "Inativo")}
          className="px-4 py-2 rounded-full border border-sincro-border bg-transparent text-sm text-sincro-text-primary outline-none"
        >
          <option value="Todos">Todos os Status</option>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>
      </div>

      <p className="text-xs text-sincro-text-muted font-bold">{usuariosFiltrados.length} Usuário(s)</p>

      <div className="border border-sincro-border rounded-2xl bg-sincro-modal-sidebar overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-sincro-bg-secondary">
              <tr className="text-left">
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-sincro-text-muted">Usuário</th>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-sincro-text-muted">Perfil</th>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-sincro-text-muted">Equipe</th>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-sincro-text-muted">Setor</th>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-sincro-text-muted">Status</th>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-sincro-text-muted">Último Acesso</th>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-sincro-text-muted text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((u) => {
                const PerfilIcon = perfilIcon[u.perfil]
                return (
                  <tr key={u.id} className="border-t border-sincro-border hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-sincro-text-primary/20 flex items-center justify-center text-xs font-extrabold shrink-0">
                          {u.nome.split(" ").map(n => n[0]).slice(0, 2).join("")}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold truncate">{u.nome}</p>
                          <p className="text-[11px] text-sincro-text-secondary truncate">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] text-white font-bold uppercase tracking-wider ${perfilBadge[u.perfil]}`}>
                        <PerfilIcon className="w-3 h-3" />
                        {u.perfil}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sincro-text-secondary">{u.equipe}</td>
                    <td className="px-5 py-3 text-sincro-text-secondary text-xs">{u.setor}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${u.status === "Ativo" ? "text-status-green" : "text-status-red"}`}>
                        <span className={`w-2 h-2 rounded-full ${u.status === "Ativo" ? "bg-status-green" : "bg-status-red"}`} />
                        {u.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sincro-text-secondary text-xs">{u.ultimoAcesso}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => abrirModal(u)}
                          className="p-1.5 rounded-full hover:bg-white/10 text-sincro-text-primary transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => alternarStatus(u.id)}
                          className="p-1.5 rounded-full hover:bg-white/10 text-sincro-text-primary transition-colors"
                          title={u.status === "Ativo" ? "Desativar" : "Ativar"}
                        >
                          {u.status === "Ativo" ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => removerUsuario(u.id)}
                          className="p-1.5 rounded-full hover:bg-status-red-bg text-status-red transition-colors"
                          title="Remover"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {usuariosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sincro-text-muted">
                    Nenhum usuário encontrado com os filtros atuais.
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
              <h2 className="text-lg font-extrabold">{editando ? "Editar Usuário" : "Novo Usuário"}</h2>
              <button onClick={fecharModal} className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary">Nome</label>
                <input
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  maxLength={100}
                  className="h-10 px-4 rounded-full bg-white/10 border border-white/20 outline-none text-sm text-sincro-text-primary"
                  placeholder="Nome completo"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary">E-mail</label>
                <input
                  type="email"
                  value={novoEmail}
                  onChange={(e) => setNovoEmail(e.target.value)}
                  maxLength={100}
                  className="h-10 px-4 rounded-full bg-white/10 border border-white/20 outline-none text-sm text-sincro-text-primary"
                  placeholder="email@sincro.com"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary">Perfil</label>
                <select
                  value={novoPerfil}
                  onChange={(e) => setNovoPerfil(e.target.value as Perfil)}
                  className="h-10 px-4 rounded-full bg-white/10 border border-white/20 outline-none text-sm text-sincro-text-primary"
                >
                  <option value="Membro">Membro</option>
                  <option value="Gestor">Gestor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary">Setor</label>
                <select
                  value={novoSetor}
                  onChange={(e) => {
                    setNovoSetor(e.target.value)
                    setNovaEquipe("")
                  }}
                  className="h-10 px-4 rounded-full bg-white/10 border border-white/20 outline-none text-sm text-sincro-text-primary"
                >
                  <option value="">Selecione o setor...</option>
                  {setores.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary">Equipe</label>
                <select
                  value={novaEquipe}
                  onChange={(e) => setNovaEquipe(e.target.value)}
                  disabled={!novoSetor}
                  className="h-10 px-4 rounded-full bg-white/10 border border-white/20 outline-none text-sm text-sincro-text-primary disabled:opacity-40"
                >
                  <option value="">Selecione a equipe...</option>
                  {equipes.map(e => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-5 border-t border-sincro-border">
              <button
                onClick={fecharModal}
                className="px-4 py-2 rounded-full border border-sincro-border text-sm font-bold hover:bg-white/10 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={salvarUsuario}
                disabled={!novoNome.trim() || !novoEmail.trim()}
                className="px-4 py-2 rounded-full bg-status-green text-white text-sm font-extrabold hover:brightness-110 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {editando ? "Salvar Alterações" : "Criar Usuário"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
