"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { X, Search } from "lucide-react"

type ComboboxOption = {
  label: string
  sublabel?: string
}

type ComboboxProps = {
  options: ComboboxOption[]
  selected: string[]
  onAdd: (value: string) => void
  onRemove: (value: string) => void
  placeholder?: string
  maxTags?: number
  disabled?: boolean
}

function highlightMatch(text: string, query: string) {
  if (!query) return <>{text}</>
  const lower = text.toLowerCase()
  const q = query.toLowerCase()
  const idx = lower.indexOf(q)
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <span className="font-extrabold text-sincro-primary">{text.slice(idx, idx + q.length)}</span>
      {text.slice(idx + q.length)}
    </>
  )
}

export function Combobox({
  options,
  selected,
  onAdd,
  onRemove,
  placeholder = "Buscar...",
  maxTags,
  disabled = false,
}: ComboboxProps) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [highlightIdx, setHighlightIdx] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(query.toLowerCase()) &&
      !selected.includes(opt.label)
  )

  const visibleOptions = maxTags ? filtered.slice(0, maxTags) : filtered

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [handleClickOutside])

  useEffect(() => {
    setHighlightIdx(-1)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightIdx((prev) => Math.min(prev + 1, visibleOptions.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightIdx((prev) => Math.max(prev - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (highlightIdx >= 0 && highlightIdx < visibleOptions.length) {
        onAdd(visibleOptions[highlightIdx].label)
        setQuery("")
        setOpen(false)
      }
    } else if (e.key === "Escape") {
      setOpen(false)
    } else if (e.key === "Backspace" && query === "" && selected.length > 0) {
      onRemove(selected[selected.length - 1])
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={`flex flex-wrap items-center gap-1.5 min-h-[40px] px-3 py-1.5 rounded-xl border bg-sincro-bg-input transition-colors cursor-text ${
          open ? "border-sincro-text-muted" : "border-sincro-border"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => {
          if (!disabled) {
            inputRef.current?.focus()
            setOpen(true)
          }
        }}
      >
        {selected.map((s) => (
          <span
            key={s}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-sincro-primary/20 text-sincro-primary text-[11px] font-bold shrink-0"
          >
            {s}
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onRemove(s)
                }}
                className="hover:text-status-red transition-colors"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            )}
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => !disabled && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={selected.length === 0 ? placeholder : ""}
          disabled={disabled}
          className="flex-1 min-w-[80px] bg-transparent outline-none text-sm text-sincro-text-primary placeholder:text-sincro-text-muted"
        />
      </div>

      {open && visibleOptions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 max-h-52 overflow-y-auto rounded-xl border border-sincro-border bg-sincro-modal-bg shadow-2xl">
          {visibleOptions.map((opt, i) => (
            <button
              key={opt.label}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault()
                onAdd(opt.label)
                setQuery("")
                setOpen(false)
              }}
              onMouseEnter={() => setHighlightIdx(i)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm transition-colors ${
                i === highlightIdx ? "bg-sincro-primary/20" : "hover:bg-white/5"
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-sincro-text-primary/15 flex items-center justify-center text-[10px] font-extrabold text-sincro-text-secondary shrink-0">
                {opt.label.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sincro-text-primary truncate">
                  {highlightMatch(opt.label, query)}
                </p>
                {opt.sublabel && (
                  <p className="text-[10px] text-sincro-text-muted truncate">{opt.sublabel}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {open && query && visibleOptions.length === 0 && (
        <div className="absolute z-50 w-full mt-1 py-3 text-center text-xs text-sincro-text-muted rounded-xl border border-sincro-border bg-sincro-modal-bg shadow-2xl">
          Nenhum resultado para &quot;{query}&quot;
        </div>
      )}
    </div>
  )
}
