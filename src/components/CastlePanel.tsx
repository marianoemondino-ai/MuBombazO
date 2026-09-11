import Link from "next/link";
import { getCastleInfo } from "@/lib/castle";

export default async function CastlePanel() {
  const castle = await getCastleInfo();

  return (
    <div className="glow-border rounded-lg p-6">
      <h3 className="font-display text-lg font-semibold">Castle Siege</h3>

      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted">Dueno del Castillo</dt>
          <dd className="font-medium">{castle?.ownerGuild ?? "-"}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted">Guild Master</dt>
          <dd className="font-medium">{castle?.guildMaster ?? "-"}</dd>
        </div>
      </dl>

      <Link
        href="/castle-siege"
        className="mt-6 block rounded-md border border-border py-2.5 text-center text-sm font-medium hover:border-accent hover:text-accent"
      >
        Informacion del Castillo
      </Link>
    </div>
  );
}
