export function GamerLoader({ size = 'md', label = 'Cargando...' }) {
  const sizeMap = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-10 w-10 border-[3px]'
  }

  const resolvedSize = sizeMap[size] ?? sizeMap.md

  return (
    <span className="flex items-center gap-2 text-xs font-medium text-slate-300">
      <span 
        className={`inline-flex animate-spin rounded-full border-fuchsia-400/80 border-t-transparent ${resolvedSize}`}
        aria-live="polite"
      />
      {label}
    </span>
  )
}