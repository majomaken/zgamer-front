export function GamerTextarea({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  rows = 4,
  className = '',
  required = false,
  error,
  ...props
}) {
  const hasError = Boolean(error)
  return (
    <label className="group block text-left">
      {label ? (
        <span className="text-xs font-semibold uppercase text-slate-400">
          {label}
        </span>
      ) : null}
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className={`mt-2 w-full rounded-xl border bg-slate-950/80 px-4 py-3 ${
          hasError ? 'border-red-500/70 focus:border-red-400 focus:ring-red-400/70' : 
          'text-sm text-slate-100 transition focus:outline-none focus:ring-2'
        }${className}`}
        {...props}
      />

      {hasError ? (
        <span id={`${id}-error`} className="mt-2 block text-xs font-medium text-red-300">
          {error}
        </span>
      ) : null}
    </label>
  )
}