"use client";

import { useState } from "react";
import { getClassIcon, getClassName } from "@/lib/mu-classes";
import Image from "next/image";
import type {
  DuelRankRow,
  GuildRankRow,
  KillerRankRow,
  PlayerRankRow,
} from "@/lib/rankings";

const TABS = [
  { key: "duelos", label: "Top Duelos" },
  { key: "guilds", label: "Top Guilds" },
  { key: "players", label: "Top Players" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function HomeRankingTabs({
  duelos,
  guilds,
  players,
  killers,
}: {
  duelos: DuelRankRow[];
  guilds: GuildRankRow[];
  players: PlayerRankRow[];
  killers: KillerRankRow[];
}) {
  const [tab, setTab] = useState<TabKey>("duelos");

  return (
    <div className="glow-border rounded-lg p-6">
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium ${
              tab === t.key
                ? "bg-accent text-background"
                : "border border-border text-muted hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tab === "duelos" && (
          <RankList
            rows={duelos}
            empty="Todavia no hay duelos registrados."
            render={(r, i) => (
              <Row key={r.Name} rank={i + 1} name={r.Name} value={`${r.WinScore}W / ${r.LoseScore}L`} />
            )}
          />
        )}
        {tab === "guilds" && (
          <RankList
            rows={guilds}
            empty="Todavia no hay guilds rankeadas."
            render={(r, i) => (
              <Row key={r.Name} rank={i + 1} name={r.Name} value={r.Score.toLocaleString("es-AR")} />
            )}
          />
        )}
        {tab === "players" && (
          <RankList
            rows={players}
            empty="Todavia no hay jugadores rankeados."
            render={(r, i) => (
              <Row key={r.Name} rank={i + 1} name={r.Name} value={r.Score.toLocaleString("es-AR")} />
            )}
          />
        )}
      </div>

      <div className="mt-8 border-t border-border pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Top Killers</p>
        {killers.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Sin datos todavia.</p>
        ) : (
          <div className="mt-3 space-y-2">
            {killers.map((k, i) => (
              <div key={k.Name} className="flex items-center gap-3">
                <span className="w-5 text-xs text-muted">#{i + 1}</span>
                {getClassIcon(k.Class) && (
                  <Image src={getClassIcon(k.Class)!} alt="" width={24} height={24} className="rounded" />
                )}
                <span className="flex-1 text-sm font-medium">{k.Name}</span>
                <span className="text-xs text-muted">{getClassName(k.Class)}</span>
                <span className="text-sm font-semibold text-accent">{k.Kills.toLocaleString("es-AR")}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RankList<T>({
  rows,
  empty,
  render,
}: {
  rows: T[];
  empty: string;
  render: (row: T, i: number) => React.ReactNode;
}) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted">{empty}</p>;
  }
  return <div className="space-y-1.5">{rows.map(render)}</div>;
}

function Row({ rank, name, value }: { rank: number; name: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-surface-2">
      <span className="flex items-center gap-3">
        <span className="w-5 text-xs text-muted">#{rank}</span>
        <span className="font-medium">{name}</span>
      </span>
      <span className="text-muted">{value}</span>
    </div>
  );
}
