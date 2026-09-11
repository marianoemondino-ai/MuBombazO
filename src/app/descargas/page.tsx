import { siteConfig } from "@/content/site";

export const metadata = { title: "Descargas | MuBombazo" };

export default function DescargasPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold">Descargas</h1>
      <p className="mt-3 text-muted">
        Descarga el cliente, instala y presiona JUGAR para entrar a MuBombazo.
      </p>

      <div className="mt-10 space-y-4">
        {siteConfig.downloads.map((d) => (
          <div key={d.label} className="glow-border flex items-center justify-between rounded-lg p-6">
            <div>
              <h3 className="font-display text-lg font-semibold">{d.label}</h3>
              <p className="mt-1 text-sm text-muted">{d.description}</p>
              <p className="mt-1 text-xs text-muted/70">Tamano: {d.size}</p>
            </div>
            <a
              href={d.url}
              className="shrink-0 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-background hover:brightness-110"
            >
              Descargar
            </a>
          </div>
        ))}
      </div>

      <div className="mt-10 glow-border rounded-lg p-6">
        <h3 className="font-display text-lg font-semibold">Instalacion</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted">
          <li>Descarga y descomprime el cliente en una carpeta sin espacios ni tildes.</li>
          <li>Ejecuta MuLauncherModern.exe.</li>
          <li>Espera a que el launcher termine de cargar.</li>
          <li>Presiona JUGAR para entrar al juego.</li>
        </ol>
      </div>
    </div>
  );
}
