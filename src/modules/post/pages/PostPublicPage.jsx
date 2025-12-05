import { GamerButton } from "../../../ui/components/GamerButton";
import { GamerCard } from "../../../ui/components/GamerCard";
import { GamerLoader } from "../../../ui/components/GamerLoader";
import { usePosts } from "../hooks/usePosts";

export function PostPublicPage() {
  const { loading, error, posts } = usePosts();

  if (loading) {
    return (
      <div className="space-y-8">
        <GamerCard 
          title="Posts públicos"
          subtitle="Comparte noticias, guías y eventos con toda tu comunidad."
          className="text-left"
        >
          <div className="flex items-center justify-center py-12">
            <GamerLoader size="lg" label="Cargando posts..."/>
          </div>
        </GamerCard>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <GamerCard 
          title="Posts públicos"
          subtitle="Comparte noticias, guías y eventos con toda tu comunidad."
          className="text-left"
        >
          <div className="rounded-lg border border-red-500/60 bg-red-950/50 px-4 py-3 text-sm text-red-200">
            {error?.message}
          </div>
        </GamerCard>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <GamerCard 
        title="Posts públicos"
        subtitle="Comparte noticias, guías y eventos con toda tu comunidad."
        className="text-left"
      >
        <p className="text-sm text-slate-300">
          Aquí encuentras contenidos accesibles para toda la zona gamer. Destaca las novedades, comparte metas y
          mantén informados a tus seguidores.
        </p>
        {posts.length === 0 ? (
          <div className="mt-6 rounded-lg border border-slate-800 bg-slate-950/60 p-6 text-center text-slate-400">
            No hay posts disponibles.
          </div>
        ) : (
          <div className="mt-6 grid gap-4">
            {posts.map((post) => (
              <article key={post._id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5" >
                <div className="flex items-center justify-between text-fuchsia-300">
                  <span>{post?.tag ?? 'POST'}</span>
                  <span className="truncate">ID #{String(post._id).slice(0, 8)}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-slate-100">{post.title}</h3>
                <p className="mt-2 text-sm text-slate-400">
                  {post.excerpt}
                </p>
                <div className="mt-4">
                  <GamerButton>
                    Leer más
                  </GamerButton>
                </div>
              </article>
            ))}
          </div>
        )}
      </GamerCard>
    </div>
  )
}