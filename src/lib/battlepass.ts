import { getPool } from "@/lib/db";

export type BattlePassRow = {
  Name: string;
  StarCount: number;
  StarUsed: number;
};

export async function getTopBattlePass(limit = 10): Promise<BattlePassRow[]> {
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("limit", limit)
      .query<BattlePassRow>(
        `SELECT TOP (@limit) Name, StarCount, StarUsed
         FROM CustomBattlePassData
         ORDER BY StarCount DESC`
      );
    return result.recordset;
  } catch (err) {
    console.error("[battlepass]", err);
    return [];
  }
}
