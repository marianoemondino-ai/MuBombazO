import { getPool } from "@/lib/db";

export type CastleInfo = {
  ownerGuild: string | null;
  guildMaster: string | null;
  occupied: boolean;
  siegeStart: string | null;
  siegeEnd: string | null;
};

export async function getCastleInfo(): Promise<CastleInfo | null> {
  try {
    const pool = await getPool();
    const result = await pool.request().query<{
      CASTLE_OCCUPY: boolean;
      OWNER_GUILD: string | null;
      SIEGE_START_DATE: string | null;
      SIEGE_END_DATE: string | null;
    }>(`SELECT TOP 1 CASTLE_OCCUPY, OWNER_GUILD, SIEGE_START_DATE, SIEGE_END_DATE FROM MuCastle_DATA`);

    const row = result.recordset[0];
    if (!row) return null;

    let guildMaster: string | null = null;
    if (row.OWNER_GUILD) {
      const guildResult = await pool
        .request()
        .input("name", row.OWNER_GUILD)
        .query<{ G_Master: string }>("SELECT G_Master FROM Guild WHERE G_Name = @name");
      guildMaster = guildResult.recordset[0]?.G_Master ?? null;
    }

    return {
      ownerGuild: row.CASTLE_OCCUPY ? row.OWNER_GUILD : null,
      guildMaster: row.CASTLE_OCCUPY ? guildMaster : null,
      occupied: Boolean(row.CASTLE_OCCUPY),
      siegeStart: row.SIEGE_START_DATE,
      siegeEnd: row.SIEGE_END_DATE,
    };
  } catch (err) {
    console.error("[getCastleInfo]", err);
    return null;
  }
}
