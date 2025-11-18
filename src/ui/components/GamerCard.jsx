export function GamerCard({
  title,
  subtitle,
  children,
  className = '',
}) {
  return (
    <section className={`relative rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-[0_20px_45px_-15px_rgba(129,61,255,0.55)] backdrop-blur-md ${className}`}>
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-fuchsia-600/40 via-purple-600/20 to-indigo-700/40 blur-3xl" />
      <header>
        {title ? <h2 className="text-3xl font-semibold text-slate-100">{title}</h2> : null}
        {subtitle && <p className="mt-2 text-sm text-slate-400">{subtitle}</p>}
      </header>
      {children}
    </section>
  )
}