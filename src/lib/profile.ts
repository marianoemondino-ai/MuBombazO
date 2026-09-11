import { getPool, sql } from "@/lib/db";

export type CharacterProfile = {
  Name: string;
  cLevel: number;
  Class: number;
  Experience: number;
  ResetCount: number;
  MasterResetCount: number;
  Strength: number;
  Dexterity: number;
  Vitality: number;
  Energy: number;
  Leadership: number;
  Kills: number;
  Deads: number;
  PkCount: number;
  GuildName: string | null;
};

export async function getCharacterProfile(name: string): Promise<CharacterProfile | null> {
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("name", sql.VarChar(10), name)
      .query<CharacterProfile>(
        `SELECT
           c.Name, c.cLevel, c.Class, c.Experience, c.ResetCount, c.MasterResetCount,
           c.Strength, c.Dexterity, c.Vitality, c.Energy, c.Leadership,
           c.Kills, c.Deads, c.PkCount,
           gm.G_Name AS GuildName
         FROM Character c
         LEFT JOIN GuildMember gm ON gm.Name = c.Name
         WHERE c.Name = @name`
      );
    return result.recordset[0] ?? null;
  } catch (err) {
    console.error("[getCharacterProfile]", err);
    return null;
  }
}

export type GuildMemberRow = {
  Name: string;
  G_Level: number;
};

export type GuildProfile = {
  G_Name: string;
  G_Master: string;
  G_Score: number;
  MemberCount: number;
  GuildPoint: number;
  members: GuildMemberRow[];
};

export async function getGuildProfile(name: string): Promise<GuildProfile | null> {
  try {
    const pool = await getPool();
    const guildResult = await pool
      .request()
      .input("name", sql.VarChar(8), name)
      .query<{
        G_Name: string;
        G_Master: string;
        G_Score: number;
        MemberCount: number;
        GuildPoint: number;
      }>(
        `SELECT G_Name, G_Master, G_Score, MemberCount, GuildPoint
         FROM Guild
         WHERE G_Name = @name`
      );

    const guild = guildResult.recordset[0];
    if (!guild) return null;

    const membersResult = await pool
      .request()
      .input("name", sql.VarChar(8), name)
      .query<GuildMemberRow>(
        `SELECT Name, G_Level
         FROM GuildMember
         WHERE G_Name = @name
         ORDER BY G_Level DESC`
      );

    return { ...guild, members: membersResult.recordset };
  } catch (err) {
    console.error("[getGuildProfile]", err);
    return null;
  }
}
