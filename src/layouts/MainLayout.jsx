import { NavLink, Outlet } from "react-router-dom";
import { NAV_LINKS } from "../constants";
import { GamerButton } from "../ui/components/GamerButton";
import { useAuth } from "../modules/auth/hooks/useAuth";

export function MainLayout() {
  const { isAuthenticated, logout } = useAuth();

  return(
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#120731,#05060f)] text-slate-100">
      <header className="border-b border-white/10 bg=slate-950/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-fuchsia-400">Zona Gamer Hub</p>
            <h1 className="text-2xl font-semibold text-slate-50">{isAuthenticated ? 'Dashboard' : 'Acceso' }</h1>
          </div>
          <nav className="flex flex-wrap items-center gap-2">

            {(isAuthenticated ? [] : NAV_LINKS).map((link) => (
              <NavLink key={link.label} to={link.to}>
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

      <main>
        <Outlet />
      </main>

      <footer>
        Zona Gamer 2025 - Todos los derechos reservados
      </footer>
    </div>
  )
}