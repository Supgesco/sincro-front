import { useState } from "react"

type TagListProps = {
  items: string[]
  max?: number
  color?: string
}

export function TagList({ items, max = 3, color = "bg-sincro-primary/15 text-sincro-primary" }: TagListProps) {
  const [expanded, setExpanded] = useState(false)

  if (items.length === 0) {
    <span className="text-[10px] text-sincro-text-muted">—</span>
  }

  const visible = expanded ? items : items.slice(0, max)
  const rest = items.length - max

  return (
    <div className="flex flex-wrap gap-1 items-center">
      {visible.map((item) => (
        <span
          key={item}
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${color} max-w-[140px] truncate`}
          title={item}
        >
          {item}
        </span>
      ))}
      {!expanded && rest > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sincro-text-secondary/20 text-sincro-text-secondary hover:bg-sincro-text-secondary/30 transition-colors"
          title={items.slice(max).join(", ")}
        >
          +{rest}
        </button>
      )}
      {expanded && items.length > max && (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sincro-text-secondary/20 text-sincro-text-secondary hover:bg-sincro-text-secondary/30 transition-colors"
        >
          ...
        </button>
      )}
    </div>
  )
}
