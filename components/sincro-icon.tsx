export function SincroIcon({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { width: 40, circle: 10, stroke: 2 },
    md: { width: 50, circle: 12, stroke: 2.5 },
    lg: { width: 60, circle: 14, stroke: 3 }
  }

  const s = sizes[size]

  return (
    <svg
      viewBox={`0 0 ${s.width} 30`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={size === "sm" ? "w-8 h-5" : size === "md" ? "w-10 h-6" : "w-12 h-7"}
    >
      <circle cx="15" cy="15" r={s.circle} stroke="#8B5CF6" strokeWidth={s.stroke} fill="none" />
      <circle cx={s.width - 15} cy="15" r={s.circle} stroke="white" strokeWidth={s.stroke} fill="none" />
    </svg>
  )
}
