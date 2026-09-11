import Link from "next/link";
import OnlineIndicator from "@/components/OnlineIndicator";
import { getServerStats } from "@/lib/stats";
import { siteConfig } from "@/content/site";

export default async function ServerStatusPanel() {
  const stats = await getServerStats();

  return (
    <div className="glow-border w-full max-w-sm rounded-lg p-6 backdrop-blur">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-muted">
          Estado del Servidor
        </h3>
        <OnlineIndicator />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="font-display text-xl font-semibold text-accent">
            {stats.accounts.toLocaleString("es-AR")}
          </p>
          <p className="mt-0.5 text-[11px] text-muted">Cuentas</p>
        </div>
        <div>
          <p className="font-display text-xl font-semibold text-accent">
            {stats.characters.toLocaleString("es-AR")}
          </p>
          <p className="mt-0.5 text-[11px] text-muted">Personajes</p>
        </div>
        <div>
          <p className="font-display text-xl font-semibold text-accent">
            {stats.guilds.toLocaleString("es-AR")}
          </p>
          <p className="mt-0.5 text-[11px] text-muted">Guilds</p>
        </div>
      </div>

      <Link
        href="/descargas"
        className="mt-6 block rounded-md bg-accent py-3 text-center text-sm font-semibold text-background hover:brightness-110"
      >
        JUGAR AHORA
      </Link>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <QuickLink href="/donaciones" label="Donaciones" sub="Apoya al server" />
        <QuickLink href="/battlepass" label="Battle Pass" sub="Misiones y recompensas" />
        <QuickLink href={siteConfig.social.discord} label="Discord" sub="Comunidad" />
        <QuickLink href={siteConfig.social.guide} label="Guia" sub="Del juego" />
      </div>
    </div>
  );
}

function QuickLink({ href, label, sub }: { href: string; label: string; sub: string }) {
  return (
    <Link
      href={href}
      className="rounded-md border border-border px-3 py-2 hover:border-accent hover:text-accent"
    >
      <p className="font-medium">{label}</p>
      <p className="text-muted">{sub}</p>
    </Link>
  );
}
