export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-muted sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-display tracking-wide text-foreground">
            MU<span className="text-accent">BOMBAZO</span>
          </p>
          <p>
            MuBombazo no esta afiliado con Webzen. MU Online es una marca registrada
            de Webzen Inc.
          </p>
        </div>
        <p className="mt-4 text-center text-xs text-muted/70 sm:text-left">
          &copy; {new Date().getFullYear()} MuBombazo. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
