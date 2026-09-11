"use client";

import { useEffect, useState } from "react";

function diffParts(ms: number) {
  const abs = Math.max(0, ms);
  const days = Math.floor(abs / 86400000);
  const hours = Math.floor((abs % 86400000) / 3600000);
  const minutes = Math.floor((abs % 3600000) / 60000);
  const seconds = Math.floor((abs % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

export function useCountdown(target: string, mode: "until" | "since") {
  const [parts, setParts] = useState(() => {
    const targetMs = new Date(target).getTime();
    const now = Date.now();
    return diffParts(mode === "until" ? targetMs - now : now - targetMs);
  });

  useEffect(() => {
    const targetMs = new Date(target).getTime();
    const tick = () => {
      const now = Date.now();
      setParts(diffParts(mode === "until" ? targetMs - now : now - targetMs));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target, mode]);

  return parts;
}

export default function Countdown({
  target,
  mode = "until",
  size = "md",
}: {
  target: string;
  mode?: "until" | "since";
  size?: "sm" | "md";
}) {
  const { days, hours, minutes, seconds } = useCountdown(target, mode);
  const boxClass =
    size === "sm"
      ? "px-2.5 py-1.5 text-base"
      : "px-4 py-2.5 text-2xl sm:text-3xl";

  const units = [
    { value: days, label: "Dias" },
    { value: hours, label: "Horas" },
    { value: minutes, label: "Min" },
    { value: seconds, label: "Seg" },
  ];

  return (
    <div className="flex items-center gap-2">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-2">
          <div className={`rounded-md border border-border bg-surface text-center font-display font-semibold text-foreground ${boxClass}`}>
            {String(u.value).padStart(2, "0")}
            <div className="mt-0.5 text-[9px] font-sans font-normal uppercase tracking-wide text-muted">
              {u.label}
            </div>
          </div>
          {i < units.length - 1 && <span className="text-muted">:</span>}
        </div>
      ))}
    </div>
  );
}
