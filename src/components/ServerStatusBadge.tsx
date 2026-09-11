"use client";

import { useEffect, useState } from "react";

export default function ServerStatusBadge() {
  const [online, setOnline] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        const res = await fetch("/api/status", { cache: "no-store" });
        const data = await res.json();
        if (!cancelled) setOnline(Boolean(data.online));
      } catch {
        if (!cancelled) setOnline(false);
      }
    }

    check();
    const id = setInterval(check, 30000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const label =
    online === null ? "Verificando..." : online ? "Servidor Online" : "Servidor Offline";
  const dot =
    online === null ? "bg-muted" : online ? "bg-success" : "bg-danger";

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm">
      <span className={`h-2 w-2 rounded-full ${dot} ${online ? "animate-pulse" : ""}`} />
      <span className="text-muted">{label}</span>
    </div>
  );
}
