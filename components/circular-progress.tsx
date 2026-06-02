"use client"

interface CircularProgressProps {
  percentage: number
  label: string
  value: string | number
  colors: string[]
  size?: number
}

export function CircularProgress({ 
  percentage, 
  label, 
  value, 
  colors,
  size = 120 
}: CircularProgressProps) {
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference
  
  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-white/15"
        />
        <defs>
          <linearGradient id={`gradient-${label.replace(/\s/g, "")}`} x1="0%" y1="0%" x2="100%" y2="0%">
            {colors.map((color, idx) => (
              <stop key={idx} offset={`${(idx / (colors.length - 1)) * 100}%`} stopColor={color} />
            ))}
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#gradient-${label.replace(/\s/g, "")})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[10px] leading-tight max-w-[80px] font-semibold uppercase tracking-wider text-sincro-text-secondary">{label}</span>
        <span className="text-2xl font-extrabold mt-1 text-sincro-text-primary">{value}</span>
      </div>
    </div>
  )
}

