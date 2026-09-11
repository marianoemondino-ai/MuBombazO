import net from "node:net";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function checkPort(host: string, port: number, timeoutMs = 2000): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let done = false;
    const finish = (ok: boolean) => {
      if (done) return;
      done = true;
      socket.destroy();
      resolve(ok);
    };
    socket.setTimeout(timeoutMs);
    socket.once("connect", () => finish(true));
    socket.once("timeout", () => finish(false));
    socket.once("error", () => finish(false));
    socket.connect(port, host);
  });
}

export async function GET() {
  const host = process.env.GAMESERVER_HOST || "127.0.0.1";
  const port = Number(process.env.GAMESERVER_PORT || 44405);

  const online = await checkPort(host, port);

  return NextResponse.json(
    { online },
    { headers: { "Cache-Control": "no-store" } }
  );
}
