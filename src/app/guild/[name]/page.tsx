import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuildProfile } from "@/lib/profile";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  return { title: `Guild ${name} | MuBombazo` };
}

export default async function GuildProfilePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const guild = await getGuildProfile(decodeURIComponent(name));

  if (!guild) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="glow-border rounded-lg p-6">
        <h1 className="font-display text-3xl font-semibold">{guild.G_Name}</h1>
        <p className="mt-1 text-muted">
          Guild Master:{" "}
          <Link href={`/perfil/${encodeURIComponent(guild.G_Master)}`} className="text-accent hover:underline">
            {guild.G_Master}
          </Link>
        </p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <Stat label="Puntos" value={guild.G_Score.toLocaleString("es-AR")} />
        <Stat label="Miembros" value={guild.MemberCount} />
        <Stat label="Guild Points" value={guild.GuildPoint.toLocaleString("es-AR")} />
      </div>

      <h2 className="mt-10 font-display text-lg font-semibold">Miembros</h2>
      {guild.members.length === 0 ? (
        <p className="glow-border mt-4 rounded-lg p-6 text-center text-sm text-muted">
          Sin miembros registrados.
        </p>
      ) : (
        <div className="glow-border mt-4 overflow-x-auto rounded-lg">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted">Jugador</th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-muted">Rango</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {guild.members.map((m) => (
                <tr key={m.Name}>
                  <td className="px-4 py-3">
                    <Link href={`/perfil/${encodeURIComponent(m.Name)}`} className="hover:text-accent hover:underline">
                      {m.Name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-right text-muted">
                    {m.G_Level === 0 ? "Guild Master" : "Miembro"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="glow-border rounded-lg p-4 text-center">
      <p className="font-display text-lg font-semibold text-accent">{value}</p>
      <p className="mt-0.5 text-[11px] uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
}
