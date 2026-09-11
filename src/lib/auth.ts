import { getPool, sql } from "@/lib/db";

export type RegisterInput = {
  id: string;
  password: string;
  name: string;
  email: string;
};

export type RegisterResult =
  | { ok: true }
  | { ok: false; error: "id_taken" | "invalid" | "server_error" };

const ID_RE = /^[a-zA-Z0-9]{4,10}$/;

function randomPersonalCode(): string {
  return Math.floor(Math.random() * 1e12)
    .toString()
    .padStart(12, "0");
}

export async function registerAccount(input: RegisterInput): Promise<RegisterResult> {
  const id = input.id.trim();
  const password = input.password;
  const name = input.name.trim() || id;
  const email = input.email.trim();

  if (!ID_RE.test(id) || password.length < 4 || password.length > 10) {
    return { ok: false, error: "invalid" };
  }

  try {
    const pool = await getPool();

    const existing = await pool
      .request()
      .input("id", sql.VarChar(10), id)
      .query("SELECT 1 FROM MEMB_INFO WHERE memb___id = @id");

    if (existing.recordset.length > 0) {
      return { ok: false, error: "id_taken" };
    }

    await pool
      .request()
      .input("id", sql.VarChar(10), id)
      .input("pwd", sql.VarChar(10), password)
      .input("name", sql.VarChar(10), name.slice(0, 10))
      .input("sno", sql.Char(18), randomPersonalCode())
      .input("mail", sql.VarChar(50), email)
      .query(`
        INSERT INTO MEMB_INFO
          (memb___id, memb__pwd, memb_name, sno__numb, mail_addr,
           bloc_code, ctl1_code, appl_days, mail_chek, AccountLevel,
           AccountExpireDate, Lock, ShowBanner, OnlineRewardTime1,
           OnlineRewardTime2, OnlineRewardTime3, WarehouseCount)
        VALUES
          (@id, @pwd, @name, @sno, @mail,
           '0', '0', GETDATE(), 0, 0,
           0, 0, 0, 0,
           0, 0, 0)
      `);

    return { ok: true };
  } catch (err) {
    console.error("[registerAccount]", err);
    return { ok: false, error: "server_error" };
  }
}

export async function verifyLogin(id: string, password: string): Promise<boolean> {
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("id", sql.VarChar(10), id)
      .query<{ memb__pwd: string; bloc_code: string }>(
        "SELECT memb__pwd, bloc_code FROM MEMB_INFO WHERE memb___id = @id"
      );

    const row = result.recordset[0];
    if (!row) return false;
    if (row.bloc_code && row.bloc_code.trim() !== "0") return false;

    return row.memb__pwd === password;
  } catch (err) {
    console.error("[verifyLogin]", err);
    return false;
  }
}

export type AccountCharacter = {
  Name: string;
  cLevel: number;
  Class: number;
  ResetCount: number;
  MasterResetCount: number;
};

export async function getAccountCharacters(accountId: string): Promise<AccountCharacter[]> {
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("id", sql.VarChar(10), accountId)
      .query<AccountCharacter>(
        `SELECT Name, cLevel, Class, ResetCount, MasterResetCount
         FROM Character
         WHERE AccountID = @id
         ORDER BY cLevel DESC`
      );
    return result.recordset;
  } catch (err) {
    console.error("[getAccountCharacters]", err);
    return [];
  }
}
