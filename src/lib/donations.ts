import { getPool, sql } from "@/lib/db";

export type DonationLogRow = {
  valor: number;
  data: string;
  tipo: number;
};

export async function getDonationHistory(accountId: string): Promise<DonationLogRow[]> {
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("login", sql.NVarChar, accountId)
      .query<DonationLogRow>(
        `SELECT TOP 20 valor, data, tipo
         FROM LOG_CREDITOS
         WHERE login = @login
         ORDER BY data DESC`
      );
    return result.recordset;
  } catch (err) {
    console.error("[getDonationHistory]", err);
    return [];
  }
}
