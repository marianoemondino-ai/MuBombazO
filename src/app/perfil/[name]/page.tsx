import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCharacterProfile } from "@/lib/profile";
import { getClassIcon, getClassName } from "@/lib/mu-classes";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  return { title: `${name} | MuBombazo` };
}

export default async function CharacterProfilePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const character = await getCharacterProfile(decodeURIComponent(name));

  if (!character) notFound();

  const stats = [
    { label: "Fuerza", value: character.Strength },
    { label: "Agilidad", value: character.Dexterity },
    { label: "Vitalidad", value: character.Vitality },
    { label: "Energia", value: character.Energy },
    { label: "Liderazgo", value: character.Leadership },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="glow-border flex items-center gap-5 rounded-lg p-6">
        {getClassIcon(character.Class) && (
          <Image
            src={getClassIcon(character.Class)!}
            alt=""
            width={64}
            height={64}
            className="h-16 w-16 shrink-0 rounded"
          />
        )}
        <div>
          <h1 className="font-display text-3xl font-semibold">{character.Name}</h1>
          <p className="mt-1 text-muted">{getClassName(character.Class)}</p>
          {character.GuildName && (
            <Link
              href={`/guild/${encodeURIComponent(character.GuildName)}`}
              className="mt-1 inline-block text-sm text-accent hover:underline"
            >
              Guild: {character.GuildName}
            </Link>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Nivel" value={character.cLevel} />
        <Stat label="Reset" value={character.ResetCount} />
        <Stat label="Master Reset" value={character.MasterResetCount} />
        <Stat label="Experiencia" value={character.Experience.toLocaleString("es-AR")} />
      </div>

      <h2 className="mt-10 font-display text-lg font-semibold">Estadisticas</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
        {stats.map((s) => (
          <Stat key={s.label} label={s.label} value={s.value} />
        ))}
      </div>

      <h2 className="mt-10 font-display text-lg font-semibold">PvP</h2>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <Stat label="Kills" value={character.Kills.toLocaleString("es-AR")} />
        <Stat label="Deads" value={character.Deads.toLocaleString("es-AR")} />
        <Stat label="PK Count" value={character.PkCount} />
      </div>
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
