import { NavLink, Outlet } from "react-router-dom";
import { AUTH_NAV_LINKS, NAV_LINKS } from "../constants";
import { GamerButton } from "../ui/components/GamerButton";
import { useAuth } from "../modules/auth/hooks/useAuth";

export function MainLayout() {
  const { isAuthenticated, logout } = useAuth();

  function resolveNavClass(isActive) {
    console.log('isActive', isActive);
    return [
      'rounded-full px-4 py-2 text-sm font-semibold transition',
      isActive
        ? 'bg-fuchsia-600/80 text-white shadow-[0_10px_25px_-10px_rgba(129,61,255,0.75)]'
        : 'text-slate-300 hover:text-white hover:bg-slate-800/80',
    ].join(' ')
  }

  return(
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#120731,#05060f)] text-slate-100">
      <header className="border-b border-white/10 bg=slate-950/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-fuchsia-400">Zona Gamer Hub</p>
            <h1 className="text-2xl font-semibold text-slate-50">{isAuthenticated ? 'Dashboard' : 'Acceso' }</h1>
          </div>
          <nav className="flex flex-wrap items-center gap-2">

            {(isAuthenticated ? AUTH_NAV_LINKS : NAV_LINKS).map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) => resolveNavClass(isActive) }
              >
                {link.label}
              </NavLink>
            ))}

            {isAuthenticated && (
              <GamerButton type="button" variant="secondary" onClick={logout}>
                Cerrar Sesión
              </GamerButton>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-12">
        <Outlet />
      </main>

      <footer className="border-t border-white/10 bg-slate-950/40 py-6 text-center text-xs text-slate-500">
        Zona Gamer 2025 - Todos los derechos reservados
      </footer>
    </div>
  )
}