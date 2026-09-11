import Image from "next/image";
import { getSession } from "@/lib/session";
import { getDonationHistory } from "@/lib/donations";
import { donationPackages } from "@/content/packages";

export const metadata = { title: "Donaciones | MuBombazo" };
export const dynamic = "force-dynamic";

const PACKAGE_ART = ["/shop/sword.png", "/shop/wings.png", "/shop/dragonset.png"];

export default async function DonacionesPage() {
  const session = await getSession();
  const history = session ? await getDonationHistory(session.accountId) : [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold">Donaciones</h1>
      <p className="mt-3 text-muted">
        Apoya al servidor y recibe creditos para canjear en la tienda del juego.
      </p>

      <div className="mt-10 rounded-lg border border-accent-2/40 bg-accent-2/10 px-5 py-4 text-sm text-accent-2">
        La pasarela de pago todavia no esta conectada. Cuando tengas tu proveedor
        elegido (Mercado Pago, PayPal, etc) y sus credenciales, se integra en esta
        pagina para procesar pagos reales.
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {donationPackages.map((pkg, i) => (
          <div
            key={pkg.credits}
            className={`glow-border relative overflow-hidden rounded-lg p-6 text-center ${
              pkg.highlight ? "border-accent" : ""
            }`}
          >
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
              <Image src={PACKAGE_ART[i % PACKAGE_ART.length]} alt="" width={120} height={120} />
            </div>
            <p className="relative font-display text-2xl font-semibold text-accent">
              {pkg.credits}
            </p>
            <p className="text-xs text-muted">Creditos</p>
            <p className="mt-4 text-lg font-semibold">${pkg.priceUsd} USD</p>
            <button
              disabled
              className="mt-4 w-full cursor-not-allowed rounded-md border border-border px-4 py-2 text-sm font-medium text-muted"
              title="Pasarela de pago pendiente de configurar"
            >
              Donar
            </button>
          </div>
        ))}
      </div>

      {session && (
        <div className="mt-12">
          <h2 className="font-display text-lg font-semibold">Tu Historial</h2>
          {history.length === 0 ? (
            <p className="glow-border mt-4 rounded-lg p-6 text-center text-sm text-muted">
              Todavia no registraste donaciones.
            </p>
          ) : (
            <div className="glow-border mt-4 overflow-x-auto rounded-lg">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted">Fecha</th>
                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-muted">Valor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {history.map((h, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3">{new Date(h.data).toLocaleString("es-AR")}</td>
                      <td className="px-4 py-3 text-right">{h.valor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
