// Contenido editable del sitio. Los valores marcados "TODO" no fueron
// confirmados contra la configuracion real del server y deben completarse
// a mano antes de publicar.
export const siteConfig = {
  name: "MuBombazo",
  tagline: "Season 6 Episodio 3",
  description:
    "Servidor privado de MU Online Season 6 Episodio 3. Progresion clasica, eventos activos y comunidad LATAM.",
  // Fecha real de apertura del server. Dejar en null oculta el contador de
  // "online desde" hasta que se complete.
  launchDate: null as string | null, // ej: "2026-08-22T20:00:00-03:00"
  version: "S6 EP3",
  rates: [
    { label: "Experiencia", value: "x200" },
    { label: "Master Experiencia", value: "x40" },
    { label: "Drop de Items", value: "40%" },
    { label: "Resets Acumulados", value: "TODO" },
  ],
  downloads: [
    {
      label: "Cliente Completo",
      description: "Cliente de juego completo, incluye el launcher.",
      url: "TODO: link de descarga (Mega, Google Drive, etc)",
      size: "TODO",
    },
  ],
  social: {
    discord: "TODO: link de Discord",
    whatsapp: "TODO: link de grupo de WhatsApp",
    guide: "TODO: link a guia del juego",
  },
};

export const rankingTabs = [
  { key: "duelos", label: "Top Duelos" },
  { key: "guilds", label: "Top Guilds" },
  { key: "players", label: "Top Players" },
  { key: "killers", label: "Top Killers" },
] as const;

// Roadmap de progresion. Completa fechas reales antes de publicar - si
// "date" es null el hito se muestra como "a definir".
export type RoadmapMilestone = {
  key: string;
  label: string;
  date: string | null; // ISO con horario, ej: "2026-09-12T20:00:00-03:00"
  shortDate: string; // ej: "12 SEP"
  description?: string;
};

export const roadmapTitle = "Rumbo al Castle Siege";
export const roadmapMilestones: RoadmapMilestone[] = [
  { key: "apertura", label: "Apertura", shortDate: "TODO", date: null },
  { key: "full-stats", label: "Full Stats", shortDate: "TODO", date: null },
  { key: "rey-del-mu", label: "Rey del MU", shortDate: "TODO", date: null },
  {
    key: "castle-siege",
    label: "Castle Siege",
    shortDate: "TODO",
    date: null,
    description: "Primera gran guerra de MuBombazo. Quien conquistara el castillo?",
  },
];
