import Image from "next/image";
import Link from "next/link";
import { getClassIcon, getClassName } from "@/lib/mu-classes";
import {
  getEventRanking,
  getTopDuelos,
  getTopGuilds,
  getTopKillers,
  getTopPlayers,
  type EventRankingKey,
} from "@/lib/rankings";
import { rankingTabs } from "@/content/site";

export const metadata = { title: "Ranking | MuBombazo" };
export const dynamic = "force-dynamic";

type TabKey = (typeof rankingTabs)[number]["key"];

function isTabKey(value: string): value is TabKey {
  return rankingTabs.some((t) => t.key === value);
}

const EVENT_TABS: TabKey[] = ["bloodcastle", "chaoscastle", "devilsquare", "illusiontemple"];

export default async function RankingPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const params = await searchParams;
  const tab: TabKey = params.tab && isTabKey(params.tab) ? params.tab : "players";

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold">Ranking</h1>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-border pb-4">
        {rankingTabs.map((t) => (
          <Link
            key={t.key}
            href={`/ranking?tab=${t.key}`}
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              tab === t.key
                ? "bg-accent text-background"
                : "border border-border text-muted hover:text-foreground"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      <div className="mt-6">
        {tab === "players" && <PlayersTable />}
        {tab === "guilds" && <GuildsTable />}
        {tab === "duelos" && <DuelosTable />}
        {tab === "killers" && <KillersTable />}
        {EVENT_TABS.includes(tab) && <EventTable eventKey={tab as EventRankingKey} />}
      </div>
    </div>
  );
}

function Empty() {
  return (
    <p className="glow-border rounded-lg p-6 text-center text-sm text-muted">
      No hay datos disponibles todavia.
    </p>
  );
}

function Th({ children, right }: { children: React.ReactNode; right?: boolean }) {
  return (
    <th className={`px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted ${right ? "text-right" : "text-left"}`}>
      {children}
    </th>
  );
}

function Td({ children, right }: { children: React.ReactNode; right?: boolean }) {
  return <td className={`px-4 py-3 ${right ? "text-right" : "text-left"}`}>{children}</td>;
}

function PlayerLink({ name }: { name: string }) {
  return (
    <Link href={`/perfil/${encodeURIComponent(name)}`} className="hover:text-accent hover:underline">
      {name}
    </Link>
  );
}

function GuildLink({ name }: { name: string }) {
  return (
    <Link href={`/guild/${encodeURIComponent(name)}`} className="hover:text-accent hover:underline">
      {name}
    </Link>
  );
}

async function PlayersTable() {
  const rows = await getTopPlayers();
  if (rows.length === 0) return <Empty />;
  return (
    <div className="glow-border overflow-x-auto rounded-lg">
      <table className="w-full text-sm">
        <thead className="border-b border-border">
          <tr>
            <Th>#</Th>
            <Th>Jugador</Th>
            <Th right>Puntos</Th>
            <Th right>Semanal</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r, i) => (
            <tr key={r.Name}>
              <Td>{i + 1}</Td>
              <Td><PlayerLink name={r.Name} /></Td>
              <Td right>{r.Score.toLocaleString("es-AR")}</Td>
              <Td right>{r.Score_semanal.toLocaleString("es-AR")}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

async function GuildsTable() {
  const rows = await getTopGuilds();
  if (rows.length === 0) return <Empty />;
  return (
    <div className="glow-border overflow-x-auto rounded-lg">
      <table className="w-full text-sm">
        <thead className="border-b border-border">
          <tr>
            <Th>#</Th>
            <Th>Guild</Th>
            <Th right>Puntos</Th>
            <Th right>Semanal</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r, i) => (
            <tr key={r.Name}>
              <Td>{i + 1}</Td>
              <Td><GuildLink name={r.Name} /></Td>
              <Td right>{r.Score.toLocaleString("es-AR")}</Td>
              <Td right>{r.Score_semanal.toLocaleString("es-AR")}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

async function DuelosTable() {
  const rows = await getTopDuelos();
  if (rows.length === 0) return <Empty />;
  return (
    <div className="glow-border overflow-x-auto rounded-lg">
      <table className="w-full text-sm">
        <thead className="border-b border-border">
          <tr>
            <Th>#</Th>
            <Th>Jugador</Th>
            <Th right>W</Th>
            <Th right>L</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r, i) => (
            <tr key={r.Name}>
              <Td>{i + 1}</Td>
              <Td><PlayerLink name={r.Name} /></Td>
              <Td right>{r.WinScore}</Td>
              <Td right>{r.LoseScore}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

async function KillersTable() {
  const rows = await getTopKillers();
  if (rows.length === 0) return <Empty />;
  return (
    <div className="glow-border overflow-x-auto rounded-lg">
      <table className="w-full text-sm">
        <thead className="border-b border-border">
          <tr>
            <Th>#</Th>
            <Th>Jugador</Th>
            <Th>Clase</Th>
            <Th right>Kills</Th>
            <Th right>Deads</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r, i) => (
            <tr key={r.Name}>
              <Td>{i + 1}</Td>
              <Td><PlayerLink name={r.Name} /></Td>
              <Td>
                <span className="inline-flex items-center gap-2">
                  {getClassIcon(r.Class) && (
                    <Image
                      src={getClassIcon(r.Class)!}
                      alt=""
                      width={20}
                      height={20}
                      className="rounded"
                    />
                  )}
                  {getClassName(r.Class)}
                </span>
              </Td>
              <Td right>{r.Kills.toLocaleString("es-AR")}</Td>
              <Td right>{r.Deads.toLocaleString("es-AR")}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

async function EventTable({ eventKey }: { eventKey: EventRankingKey }) {
  const rows = await getEventRanking(eventKey);
  if (rows.length === 0) return <Empty />;
  return (
    <div className="glow-border overflow-x-auto rounded-lg">
      <table className="w-full text-sm">
        <thead className="border-b border-border">
          <tr>
            <Th>#</Th>
            <Th>Jugador</Th>
            <Th right>Puntos</Th>
            <Th right>Semanal</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r, i) => (
            <tr key={r.Name}>
              <Td>{i + 1}</Td>
              <Td><PlayerLink name={r.Name} /></Td>
              <Td right>{r.Score.toLocaleString("es-AR")}</Td>
              <Td right>{r.Score_semanal.toLocaleString("es-AR")}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
