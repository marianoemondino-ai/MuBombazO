import { getPool } from "@/lib/db";

export type PlayerRankRow = {
  Name: string;
  Score: number;
  Score_semanal: number;
};

export type GuildRankRow = {
  Name: string;
  Score: number;
  Score_semanal: number;
};

export type DuelRankRow = {
  Name: string;
  WinScore: number;
  LoseScore: number;
  WinScore_semanal: number;
};

export type KillerRankRow = {
  Name: string;
  cLevel: number;
  Class: number;
  Kills: number;
  Deads: number;
};

async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try {
    return await fn();
  } catch (err) {
    console.error("[rankings]", err);
    return [];
  }
}

export function getTopPlayers(limit = 10) {
  return safeQuery<PlayerRankRow>(async () => {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("limit", limit)
      .query<PlayerRankRow>(
        `SELECT TOP (@limit) Name, Score, Score_semanal
         FROM RankingKingPlayer
         ORDER BY Score DESC`
      );
    return result.recordset;
  });
}

export function getTopGuilds(limit = 10) {
  return safeQuery<GuildRankRow>(async () => {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("limit", limit)
      .query<GuildRankRow>(
        `SELECT TOP (@limit) Name, Score, Score_semanal
         FROM RankingKingGuild
         ORDER BY Score DESC`
      );
    return result.recordset;
  });
}

export function getTopDuelos(limit = 10) {
  return safeQuery<DuelRankRow>(async () => {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("limit", limit)
      .query<DuelRankRow>(
        `SELECT TOP (@limit) Name, WinScore, LoseScore, WinScore_semanal
         FROM RankingDuel
         ORDER BY WinScore DESC`
      );
    return result.recordset;
  });
}

export function getTopKillers(limit = 10) {
  return safeQuery<KillerRankRow>(async () => {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("limit", limit)
      .query<KillerRankRow>(
        `SELECT TOP (@limit) Name, cLevel, Class, Kills, Deads
         FROM Character
         ORDER BY Kills DESC`
      );
    return result.recordset;
  });
}
