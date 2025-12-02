import { GamerCard } from "../../../ui/components/GamerCard";

export function HomePage() {
  return (
    <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
      <GamerCard 
        title="Bienvenido a la Zona Gamer Hub"
        subtitle="Tu portal para crear y compartir contenido gamer"
        className="overflow-hidden"
      />
    </div>
  )
}