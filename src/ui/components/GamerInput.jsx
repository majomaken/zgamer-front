export function GamerInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
  className = '',
  required = false,
  ...props
}) {
  return (
    <label className="group block text-left">
      {label && <span className="text-xs font-semibold uppercase tracking-wide text-slate-400" >{label}</span>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className={`mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 transition focus:border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/70 ${className}`}
        {...props} 
      />
    </label>
  )
}