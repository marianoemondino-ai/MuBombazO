import { getTopBattlePass } from "@/lib/battlepass";

export const metadata = { title: "Battle Pass | MuBombazo" };
export const dynamic = "force-dynamic";

export default async function BattlePassPage() {
  const rows = await getTopBattlePass();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold">
        Battle Pass <span className="ml-2 align-middle text-sm font-semibold text-accent-2">NUEVO</span>
      </h1>
      <p className="mt-3 text-muted">
        Junta estrellas jugando y canjealas por recompensas exclusivas.
      </p>

      <h2 className="mt-10 font-display text-lg font-semibold">Top Estrellas</h2>
      {rows.length === 0 ? (
        <p className="glow-border mt-4 rounded-lg p-6 text-center text-sm text-muted">
          Todavia nadie junto estrellas.
        </p>
      ) : (
        <div className="glow-border mt-4 overflow-x-auto rounded-lg">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted">#</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted">Jugador</th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-muted">Estrellas</th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-muted">Usadas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r, i) => (
                <tr key={r.Name}>
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3">{r.Name}</td>
                  <td className="px-4 py-3 text-right">{r.StarCount}</td>
                  <td className="px-4 py-3 text-right">{r.StarUsed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
