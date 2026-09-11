"use client";

import { useEffect, useState } from "react";

export default function OnlineIndicator() {
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

  const label = online === null ? "Verificando" : online ? "Online" : "Offline";
  const dot = online === null ? "bg-muted" : online ? "bg-success" : "bg-danger";

  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
      <span className={`h-2 w-2 rounded-full ${dot} ${online ? "animate-pulse" : ""}`} />
      <span className={online ? "text-success" : online === false ? "text-danger" : "text-muted"}>
        {label}
      </span>
    </span>
  );
}
