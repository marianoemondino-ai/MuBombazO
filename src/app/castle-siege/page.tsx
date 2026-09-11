import { getCastleInfo } from "@/lib/castle";

export const metadata = { title: "Castle Siege | MuBombazo" };
export const dynamic = "force-dynamic";

export default async function CastleSiegePage() {
  const castle = await getCastleInfo();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold">Castle Siege</h1>
      <p className="mt-3 text-muted">
        Guerra de guilds por el control del castillo. Evento actualmente en
        preparacion.
      </p>

      <div className="glow-border mt-8 rounded-lg p-6">
        <dl className="space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-muted">Dueno del Castillo</dt>
            <dd className="font-medium">{castle?.ownerGuild ?? "-"}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted">Guild Master</dt>
            <dd className="font-medium">{castle?.guildMaster ?? "-"}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted">Estado</dt>
            <dd className="font-medium">
              {castle?.occupied ? "Castillo ocupado" : "Sin duenos"}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
