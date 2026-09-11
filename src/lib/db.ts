import sql from "mssql";

const config: sql.config = {
  server: process.env.DB_SERVER || "localhost",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 1433,
  database: process.env.DB_NAME || "MuOnline",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    trustServerCertificate: process.env.DB_TRUST_CERT !== "false",
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let poolPromise: Promise<sql.ConnectionPool> | null = null;

export function getPool() {
  if (!poolPromise) {
    poolPromise = new sql.ConnectionPool(config)
      .connect()
      .catch((err) => {
        poolPromise = null;
        throw err;
      });
  }
  return poolPromise;
}

export async function query<T = Record<string, unknown>>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<T[]> {
  const pool = await getPool();
  const request = pool.request();
  let text = strings[0];
  values.forEach((val, i) => {
    request.input(`p${i}`, val as never);
    text += `@p${i}` + strings[i + 1];
  });
  const result = await request.query<T>(text);
  return result.recordset;
}

export { sql };
