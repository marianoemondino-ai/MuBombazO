import Image from "next/image";
import { events } from "@/content/events";

export const metadata = { title: "Invasiones y Eventos | MuBombazo" };

const CATEGORY_STYLES: Record<string, string> = {
  PVE: "bg-success/15 text-success",
  PVP: "bg-danger/15 text-danger",
  INVASION: "bg-accent/15 text-accent",
  CASTLE: "bg-accent-2/15 text-accent-2",
};

export default function InvasionesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold">Invasiones y Eventos</h1>
      <p className="mt-3 text-muted">
        Horarios de todos los eventos activos en MuBombazo.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((ev) => (
          <div key={ev.name} className="glow-border overflow-hidden rounded-lg">
            {ev.image ? (
              <div className="relative aspect-[16/9] w-full">
                <Image src={ev.image} alt={ev.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              </div>
            ) : (
              <div className="flex aspect-[16/9] w-full items-center justify-center bg-surface-2">
                <span className="font-display text-xl text-muted">{ev.name}</span>
              </div>
            )}
            <div className="p-5">
              <div className="flex items-center gap-2">
                <h3 className="font-display font-semibold">{ev.name}</h3>
                <span className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase ${CATEGORY_STYLES[ev.category]}`}>
                  {ev.category}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">{ev.description}</p>
              <p className="mt-3 text-sm font-medium text-accent">{ev.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
