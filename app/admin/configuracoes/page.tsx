"use client"

import { useState } from "react"
import { Building2, Bell, Lock, Palette, Globe, Save, Check } from "lucide-react"

type Secao = "organizacao" | "notificacoes" | "seguranca" | "aparencia" | "integracoes"

const secoes: { id: Secao; icon: typeof Building2; label: string; desc: string }[] = [
  { id: "organizacao", icon: Building2, label: "Organização", desc: "Dados institucionais e identidade" },
  { id: "notificacoes", icon: Bell, label: "Notificações", desc: "E-mails, pushes e alertas" },
  { id: "seguranca", icon: Lock, label: "Segurança", desc: "Senhas, sessões e autenticação" },
  { id: "aparencia", icon: Palette, label: "Aparência", desc: "Tema, logo e cores" },
  { id: "integracoes", icon: Globe, label: "Integrações", desc: "Serviços externos conectados" },
]

export default function ConfiguracoesPage() {
  const [secao, setSecao] = useState<Secao>("organizacao")
  const [salvo, setSalvo] = useState(false)

  const [nomeOrg, setNomeOrg] = useState("Sincro Tecnologia")
  const [cnpj, setCnpj] = useState("12.345.678/0001-90")
  const [emailContato, setEmailContato] = useState("contato@sincro.com")
  const [fuso, setFuso] = useState("America/Sao_Paulo")
  const [idioma, setIdioma] = useState("pt-BR")

  const [emailTarefa, setEmailTarefa] = useState(true)
  const [emailComentario, setEmailComentario] = useState(true)
  const [emailConvite, setEmailConvite] = useState(true)
  const [emailResumo, setEmailResumo] = useState(false)
  const [pushTarefa, setPushTarefa] = useState(true)
  const [pushMencao, setPushMencao] = useState(true)

  const [senhaMin, setSenhaMin] = useState(8)
  const [exigir2fa, setExigir2fa] = useState(false)
  const [expirarSessao, setExpirarSessao] = useState(60)
  const [tentativasLogin, setTentativasLogin] = useState(5)

  const [temaPadrao, setTemaPadrao] = useState<"claro" | "escuro" | "sistema">("escuro")
  const [corPrimaria, setCorPrimaria] = useState("#7A5BEF")
  const [densidade, setDensidade] = useState<"confortavel" | "compacto">("confortavel")

  const [slackAtivo, setSlackAtivo] = useState(false)
  const [googleAtivo, setGoogleAtivo] = useState(true)
  const [githubAtivo, setGithubAtivo] = useState(true)
  const [webhookUrl, setWebhookUrl] = useState("")

  const handleSalvar = () => {
    setSalvo(true)
    setTimeout(() => setSalvo(false), 2200)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-extrabold leading-none">Configurações</h1>
          <p className="text-sm text-sincro-text-secondary mt-2">Ajustes gerais da plataforma Sincro.</p>
        </div>
        <button
          onClick={handleSalvar}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-extrabold active:scale-95 transition-all ${
            salvo ? "bg-status-green text-white" : "bg-status-green text-white hover:brightness-110"
          }`}
        >
          {salvo ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {salvo ? "Salvo!" : "Salvar Alterações"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1 flex flex-col gap-2">
          {secoes.map((s) => {
            const Icon = s.icon
            const active = secao === s.id
            return (
              <button
                key={s.id}
                onClick={() => setSecao(s.id)}
                className={`flex items-start gap-3 p-3 rounded-xl text-left transition-all ${
                  active ? "bg-sincro-modal-sidebar border border-sincro-text-primary/40" : "border border-transparent hover:bg-white/5"
                }`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                  active ? "bg-sincro-text-primary text-sincro-bg" : "bg-sincro-modal-sidebar text-sincro-text-primary"
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-extrabold ${active ? "text-sincro-text-primary" : "text-sincro-text-primary"}`}>{s.label}</p>
                  <p className="text-[11px] text-sincro-text-secondary mt-0.5">{s.desc}</p>
                </div>
              </button>
            )
          })}
        </aside>

        <section className="lg:col-span-3 border border-sincro-border rounded-2xl bg-sincro-modal-sidebar p-6">
          {secao === "organizacao" && (
            <div className="flex flex-col gap-5">
              <h2 className="text-xl font-extrabold">Dados da Organização</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Nome da Organização" value={nomeOrg} onChange={setNomeOrg} />
                <Field label="CNPJ" value={cnpj} onChange={setCnpj} />
                <Field label="E-mail de Contato" value={emailContato} onChange={setEmailContato} type="email" />
                <div className="flex flex-col gap-1.5">
                  <Label>Fuso Horário</Label>
                  <select value={fuso} onChange={(e) => setFuso(e.target.value)} className="select">
                    <option value="America/Sao_Paulo">América/São Paulo (BRT)</option>
                    <option value="America/New_York">América/Nova York (EST)</option>
                    <option value="Europe/Lisbon">Europa/Lisboa (WET)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <Label>Idioma Padrão</Label>
                  <select value={idioma} onChange={(e) => setIdioma(e.target.value)} className="select">
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (United States)</option>
                    <option value="es-ES">Español (España)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {secao === "notificacoes" && (
            <div className="flex flex-col gap-5">
              <h2 className="text-xl font-extrabold">Preferências de Notificação</h2>

              <Subsecao titulo="E-mail">
                <Toggle label="Novas tarefas atribuídas" checked={emailTarefa} onChange={setEmailTarefa} />
                <Toggle label="Comentários em tarefas" checked={emailComentario} onChange={setEmailComentario} />
                <Toggle label="Convites para equipes" checked={emailConvite} onChange={setEmailConvite} />
                <Toggle label="Resumo diário de atividades" checked={emailResumo} onChange={setEmailResumo} />
              </Subsecao>

              <Subsecao titulo="Push (notificações no navegador)">
                <Toggle label="Atualizações em tarefas" checked={pushTarefa} onChange={setPushTarefa} />
                <Toggle label="Quando você for mencionado" checked={pushMencao} onChange={setPushMencao} />
              </Subsecao>
            </div>
          )}

          {secao === "seguranca" && (
            <div className="flex flex-col gap-5">
              <h2 className="text-xl font-extrabold">Políticas de Segurança</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label>Tamanho mínimo da senha</Label>
                  <input type="number" min={6} max={32} value={senhaMin} onChange={(e) => setSenhaMin(parseInt(e.target.value) || 0)} className="input" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Tentativas de login antes do bloqueio</Label>
                  <input type="number" min={3} max={20} value={tentativasLogin} onChange={(e) => setTentativasLogin(parseInt(e.target.value) || 0)} className="input" />
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <Label>Expirar sessão após (minutos)</Label>
                  <input type="number" min={15} max={480} value={expirarSessao} onChange={(e) => setExpirarSessao(parseInt(e.target.value) || 0)} className="input" />
                </div>
                <div className="md:col-span-2">
                  <Toggle label="Exigir autenticação em 2 fatores (2FA) para todos os usuários" checked={exigir2fa} onChange={setExigir2fa} />
                </div>
              </div>
            </div>
          )}

          {secao === "aparencia" && (
            <div className="flex flex-col gap-5">
              <h2 className="text-xl font-extrabold">Aparência</h2>
              <div className="flex flex-col gap-1.5">
                <Label>Tema Padrão</Label>
                <div className="flex gap-2">
                  {(["claro", "escuro", "sistema"] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setTemaPadrao(t)}
                      className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                        temaPadrao === t
                          ? "bg-sincro-text-primary text-sincro-bg border-sincro-text-primary"
                          : "border-sincro-border text-sincro-text-primary hover:bg-white/5"
                      }`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Cor Primária</Label>
                <div className="flex items-center gap-3">
                  <input type="color" value={corPrimaria} onChange={(e) => setCorPrimaria(e.target.value)} className="w-14 h-10 rounded-lg cursor-pointer bg-transparent" />
                  <input value={corPrimaria} onChange={(e) => setCorPrimaria(e.target.value)} className="input flex-1" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Densidade da Interface</Label>
                <div className="flex gap-2">
                  {(["confortavel", "compacto"] as const).map(d => (
                    <button
                      key={d}
                      onClick={() => setDensidade(d)}
                      className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                        densidade === d
                          ? "bg-sincro-text-primary text-sincro-bg border-sincro-text-primary"
                          : "border-sincro-border text-sincro-text-primary hover:bg-white/5"
                      }`}
                    >
                      {d.charAt(0).toUpperCase() + d.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {secao === "integracoes" && (
            <div className="flex flex-col gap-5">
              <h2 className="text-xl font-extrabold">Integrações</h2>
              <Subsecao titulo="Serviços Conectados">
                <Toggle label="Google Workspace (login SSO)" checked={googleAtivo} onChange={setGoogleAtivo} />
                <Toggle label="GitHub (sincronização de issues)" checked={githubAtivo} onChange={setGithubAtivo} />
                <Toggle label="Slack (notificações em canais)" checked={slackAtivo} onChange={setSlackAtivo} />
              </Subsecao>
              <div className="flex flex-col gap-1.5">
                <Label>Webhook personalizado</Label>
                <input value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} placeholder="https://exemplo.com/webhook" className="input" />
                <p className="text-[11px] text-sincro-text-muted">URL que receberá eventos da plataforma em formato JSON.</p>
              </div>
            </div>
          )}
        </section>
      </div>

      <style jsx>{`
        .input {
          height: 2.5rem;
          padding: 0 1rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          outline: none;
          font-size: 0.875rem;
          color: inherit;
        }
        .input:focus {
          border-color: rgba(255, 255, 255, 0.4);
        }
        .select {
          height: 2.5rem;
          padding: 0 1rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          outline: none;
          font-size: 0.875rem;
          color: inherit;
        }
      `}</style>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-[11px] font-bold uppercase tracking-wider text-sincro-text-secondary">{children}</label>
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="input" />
    </div>
  )
}

function Subsecao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 p-4 border border-sincro-border rounded-2xl bg-white/5">
      <p className="text-[11px] font-extrabold uppercase tracking-wider text-sincro-text-muted">{titulo}</p>
      {children}
    </div>
  )
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer py-1.5">
      <span className="text-sm text-sincro-text-primary">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-5 rounded-full transition-colors ${checked ? "bg-status-green" : "bg-sincro-text-secondary/40"}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`} />
      </button>
    </label>
  )
}
