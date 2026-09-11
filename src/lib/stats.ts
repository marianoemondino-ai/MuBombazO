import { getPool } from "@/lib/db";

export type ServerStats = {
  accounts: number;
  characters: number;
  guilds: number;
};

const EMPTY: ServerStats = { accounts: 0, characters: 0, guilds: 0 };

export async function getServerStats(): Promise<ServerStats> {
  try {
    const pool = await getPool();
    const result = await pool.request().query<{
      accounts: number;
      characters: number;
      guilds: number;
    }>(`
      SELECT
        (SELECT COUNT(*) FROM MEMB_INFO) AS accounts,
        (SELECT COUNT(*) FROM Character) AS characters,
        (SELECT COUNT(*) FROM Guild) AS guilds
    `);
    return result.recordset[0] ?? EMPTY;
  } catch (err) {
    console.error("[getServerStats]", err);
    return EMPTY;
  }
}
