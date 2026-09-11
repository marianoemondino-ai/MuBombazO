import Image from "next/image";
import Link from "next/link";
import RoadmapSection from "@/components/RoadmapSection";
import ServerStatusPanel from "@/components/ServerStatusPanel";
import CastlePanel from "@/components/CastlePanel";
import HomeRankingTabs from "@/components/HomeRankingTabs";
import { siteConfig } from "@/content/site";
import { events } from "@/content/events";
import {
  getTopDuelos,
  getTopGuilds,
  getTopKillers,
  getTopPlayers,
} from "@/lib/rankings";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featured = events.filter((e) => e.image).slice(0, 4);

  const [duelos, guilds, players, killers] = await Promise.all([
    getTopDuelos(5),
    getTopGuilds(5),
    getTopPlayers(5),
    getTopKillers(5),
  ]);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <Image src="/hero-bg.jpg" alt="" fill priority className="object-cover opacity-40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_10%,rgba(52,217,232,0.18),transparent)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <span className="inline-block rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
              {siteConfig.version} · Progresion Activa
            </span>

            <h1 className="mt-6 font-display text-6xl font-semibold leading-none tracking-wide text-glow sm:text-7xl">
              MU<span className="text-accent">BOMBAZO</span>
            </h1>
            <p className="mt-3 text-lg text-muted">{siteConfig.tagline}</p>
            <p className="mt-4 max-w-xl text-balance text-muted">{siteConfig.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {siteConfig.rates.map((rate) => (
                <div key={rate.label} className="glow-border rounded-md px-4 py-2 text-center">
                  <p className="font-display text-lg font-semibold text-accent">{rate.value}</p>
                  <p className="text-[10px] uppercase tracking-wide text-muted">{rate.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Link
                href="/descargas"
                className="glow-border rounded-lg p-4 transition-colors hover:border-accent"
              >
                <p className="font-display font-semibold">Descargar</p>
                <p className="text-xs text-muted">Cliente actualizado</p>
              </Link>
              <Link
                href="/registro"
                className="glow-border rounded-lg p-4 transition-colors hover:border-accent"
              >
                <p className="font-display font-semibold">Crear Cuenta</p>
                <p className="text-xs text-muted">Entra en segundos</p>
              </Link>
              <Link
                href={siteConfig.social.discord}
                className="glow-border rounded-lg p-4 transition-colors hover:border-accent"
              >
                <p className="font-display font-semibold">Discord</p>
                <p className="text-xs text-muted">Comunidad oficial</p>
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <ServerStatusPanel />
          </div>
        </div>
      </section>

      <RoadmapSection />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-semibold">Castillo y Ranking</h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
          <CastlePanel />
          <HomeRankingTabs duelos={duelos} guilds={guilds} players={players} killers={killers} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold">Eventos Destacados</h2>
          <Link href="/invasiones" className="text-sm text-accent hover:underline">
            Ver todos
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {featured.map((ev) => (
            <Link
              key={ev.name}
              href="/invasiones"
              className="group relative aspect-square overflow-hidden rounded-lg border border-border"
            >
              <Image
                src={ev.image!}
                alt={ev.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <span className="absolute bottom-2 left-2 right-2 font-display text-xs font-semibold text-white sm:text-sm">
                {ev.name}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
