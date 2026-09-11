import Countdown from "@/components/Countdown";
import { roadmapMilestones, roadmapTitle } from "@/content/site";

function formatFullDate(iso: string) {
  return new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export default function RoadmapSection() {
  const now = Date.now();
  const withDates = roadmapMilestones.filter((m) => m.date);
  const reached = withDates.filter((m) => new Date(m.date!).getTime() <= now);
  const next = withDates.find((m) => new Date(m.date!).getTime() > now);
  const progress = roadmapMilestones.length
    ? Math.round((reached.length / roadmapMilestones.length) * 100)
    : 0;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">
        Roadmap Oficial
      </p>
      <h2 className="mt-2 font-display text-3xl font-semibold">{roadmapTitle}</h2>
      <p className="mt-2 text-sm text-muted">
        Desbloqueos automaticos segun el cronograma del servidor.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="glow-border rounded-lg p-6">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>PROGRESO</span>
            <span>{progress}% COMPLETADO</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          {next ? (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Proximo Desbloqueo
              </p>
              <p className="mt-1 font-display text-xl font-semibold text-accent">
                {next.label}
              </p>
              <p className="mt-1 text-sm text-muted">{formatFullDate(next.date!)}</p>
              <div className="mt-4">
                <Countdown target={next.date!} mode="until" size="sm" />
              </div>
            </div>
          ) : (
            <p className="mt-6 text-sm text-muted">
              Fechas del roadmap pendientes de confirmar.
            </p>
          )}
        </div>

        <div className="glow-border rounded-lg p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Camino de Progresion
          </p>
          <ol className="relative mt-6 flex flex-col gap-6 sm:flex-row sm:justify-between sm:gap-2">
            <div className="absolute left-2 top-2 hidden h-px w-[calc(100%-1rem)] bg-border sm:block" />
            {roadmapMilestones.map((m) => {
              const done = m.date ? new Date(m.date).getTime() <= now : false;
              return (
                <li key={m.key} className="relative flex items-start gap-3 sm:flex-col sm:items-center sm:text-center">
                  <span
                    className={`relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full border-2 ${
                      done ? "border-accent bg-accent" : "border-border bg-surface"
                    }`}
                  />
                  <div>
                    <p className="text-xs font-medium text-muted">{m.shortDate}</p>
                    <p className="font-display text-sm font-semibold">{m.label}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
