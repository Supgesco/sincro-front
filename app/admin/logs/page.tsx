"use client"

import { useState, useMemo } from "react"
import { Search, Filter, UserPlus, Edit, Trash2, LogIn, FolderPlus, Settings, AlertTriangle, Download } from "lucide-react"

type TipoAcao = "login" | "criar" | "editar" | "remover" | "config" | "alerta"

type Log = {
  id: number
  tipo: TipoAcao
  acao: string
  usuario: string
  alvo: string
  data: string
  ip: string
}

const logsIniciais: Log[] = [
  { id: 1, tipo: "login", acao: "Login realizado", usuario: "davi.silva@sincro.com", alvo: "—", data: "02/06/2026 14:32", ip: "192.168.1.10" },
  { id: 2, tipo: "criar", acao: "Criou projeto", usuario: "marcos.lima@sincro.com", alvo: "Migração Cloud", data: "02/06/2026 14:15", ip: "192.168.1.22" },
  { id: 3, tipo: "editar", acao: "Editou tarefa", usuario: "ana.santos@sincro.com", alvo: "Tarefa 12 — Revisão de Layout", data: "02/06/2026 13:48", ip: "192.168.1.18" },
  { id: 4, tipo: "config", acao: "Atualizou configurações de notificação", usuario: "davi.silva@sincro.com", alvo: "Sistema", data: "02/06/2026 13:20", ip: "192.168.1.10" },
  { id: 5, tipo: "criar", acao: "Adicionou membro à equipe", usuario: "lucas.oliveira@sincro.com", alvo: "Equipe Marketing", data: "02/06/2026 12:55", ip: "192.168.1.31" },
  { id: 6, tipo: "alerta", acao: "5 tentativas falhas de login", usuario: "desconhecido", alvo: "conta:carlos.silva@sincro.com", data: "02/06/2026 12:10", ip: "45.233.21.9" },
  { id: 7, tipo: "remover", acao: "Removeu tarefa", usuario: "rodrigo.lira@sincro.com", alvo: "Tarefa 4 — Backup Antigo", data: "02/06/2026 11:43", ip: "192.168.1.22" },
  { id: 8, tipo: "login", acao: "Logout", usuario: "mariana.souza@sincro.com", alvo: "—", data: "02/06/2026 11:30", ip: "192.168.1.27" },
  { id: 9, tipo: "editar", acao: "Alterou papel de usuário", usuario: "davi.silva@sincro.com", alvo: "camila.rocha → Gestor", data: "02/06/2026 10:58", ip: "192.168.1.10" },
  { id: 10, tipo: "criar", acao: "Criou equipe", usuario: "davi.silva@sincro.com", alvo: "Equipe Mobile", data: "02/06/2026 10:12", ip: "192.168.1.10" },
  { id: 11, tipo: "alerta", acao: "Senha expirada", usuario: "felipe.melo@sincro.com", alvo: "—", data: "02/06/2026 09:48", ip: "192.168.1.42" },
  { id: 12, tipo: "config", acao: "Desativou usuário", usuario: "davi.silva@sincro.com", alvo: "pedro.alvares@sincro.com", data: "01/06/2026 18:22", ip: "192.168.1.10" },
]

const tipoConfig: Record<TipoAcao, { icon: typeof LogIn; cor: string; label: string }> = {
  login: { icon: LogIn, cor: "bg-status-cyan-bg text-status-cyan", label: "Login" },
  criar: { icon: FolderPlus, cor: "bg-status-green-bg text-status-green", label: "Criação" },
  editar: { icon: Edit, cor: "bg-status-yellow-bg text-status-yellow", label: "Edição" },
  remover: { icon: Trash2, cor: "bg-status-red-bg text-status-red", label: "Remoção" },
  config: { icon: Settings, cor: "bg-sincro-bg-accent text-sincro-text-primary", label: "Config" },
  alerta: { icon: AlertTriangle, cor: "bg-status-orange-bg text-status-orange", label: "Alerta" },
}

type FiltroTipo = "Todos" | TipoAcao

export default function LogsPage() {
  const [search, setSearch] = useState("")
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>("Todos")
  const [logs] = useState<Log[]>(logsIniciais)

  const logsFiltrados = useMemo(() => {
    return logs.filter(l => {
      const matchSearch =
        l.acao.toLowerCase().includes(search.toLowerCase()) ||
        l.usuario.toLowerCase().includes(search.toLowerCase()) ||
        l.alvo.toLowerCase().includes(search.toLowerCase())
      const matchTipo = filtroTipo === "Todos" || l.tipo === filtroTipo
      return matchSearch && matchTipo
    })
  }, [logs, search, filtroTipo])

  const contadores = useMemo(() => {
    const c: Record<TipoAcao, number> = { login: 0, criar: 0, editar: 0, remover: 0, config: 0, alerta: 0 }
    logs.forEach(l => { c[l.tipo]++ })
    return c
  }, [logs])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-extrabold leading-none">Logs de Auditoria</h1>
          <p className="text-sm text-sincro-text-secondary mt-2">Histórico de ações realizadas na plataforma.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-sincro-border text-sincro-text-primary text-sm font-bold hover:bg-white/5 active:scale-95 transition-all">
          <Download className="w-4 h-4" />
          Exportar CSV
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {(Object.keys(tipoConfig) as TipoAcao[]).map(t => {
          const cfg = tipoConfig[t]
          const Icon = cfg.icon
          return (
            <button
              key={t}
              onClick={() => setFiltroTipo(filtroTipo === t ? "Todos" : t)}
              className={`border rounded-2xl p-3 text-left transition-all ${
                filtroTipo === t ? "border-sincro-text-primary bg-sincro-bg-accent" : "border-sincro-border bg-sincro-modal-sidebar hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${cfg.cor}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sincro-text-muted">{cfg.label}</span>
              </div>
              <p className="text-2xl font-extrabold">{contadores[t]}</p>
            </button>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3 p-4 border border-sincro-border rounded-2xl bg-sincro-modal-sidebar">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-sincro-border flex-1 max-w-md bg-white/5">
          <Search className="w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="Pesquisar ação, usuário ou alvo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm w-full text-sincro-text-primary"
          />
        </div>
        <button
          onClick={() => setFiltroTipo("Todos")}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-sincro-border text-sm font-bold hover:bg-white/5 text-sincro-text-primary transition-all"
        >
          <Filter className="w-4 h-4" />
          {filtroTipo === "Todos" ? "Filtrando: Todos" : `Filtrando: ${tipoConfig[filtroTipo].label}`}
        </button>
      </div>

      <div className="border border-sincro-border rounded-2xl bg-sincro-modal-sidebar overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-sincro-bg-secondary">
              <tr className="text-left">
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-sincro-text-muted">Tipo</th>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-sincro-text-muted">Ação</th>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-sincro-text-muted">Usuário</th>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-sincro-text-muted">Alvo</th>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-sincro-text-muted">IP</th>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-sincro-text-muted text-right">Quando</th>
              </tr>
            </thead>
            <tbody>
              {logsFiltrados.map((l) => {
                const cfg = tipoConfig[l.tipo]
                const Icon = cfg.icon
                return (
                  <tr key={l.id} className="border-t border-sincro-border hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${cfg.cor}`}>
                        <Icon className="w-3 h-3" />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-semibold">{l.acao}</td>
                    <td className="px-5 py-3 text-sincro-text-secondary text-xs">{l.usuario}</td>
                    <td className="px-5 py-3 text-sincro-text-secondary text-xs">{l.alvo}</td>
                    <td className="px-5 py-3 text-sincro-text-muted text-xs font-mono">{l.ip}</td>
                    <td className="px-5 py-3 text-sincro-text-muted text-xs text-right whitespace-nowrap">{l.data}</td>
                  </tr>
                )
              })}
              {logsFiltrados.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-sincro-text-muted">Nenhum log encontrado com os filtros atuais.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
