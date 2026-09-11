// Horarios editables. Completa "time" con el horario real de cada evento
// (Data/Event/*.dat en el server) antes de publicar.
export type GameEvent = {
  name: string;
  category: "PVE" | "PVP" | "INVASION" | "CASTLE";
  time: string;
  description: string;
  image?: string;
};

export const events: GameEvent[] = [
  {
    name: "Blood Castle",
    category: "PVE",
    time: "TODO",
    description: "Rescata a Archangel Michael de la fortaleza del mal.",
    image: "/events/blood-castle.png",
  },
  {
    name: "Devil Square",
    category: "PVE",
    time: "TODO",
    description: "Sobrevive oleadas de monstruos por experiencia y objetos.",
    image: "/events/devil-square.png",
  },
  {
    name: "Chaos Castle",
    category: "PVP",
    time: "TODO",
    description: "Ultimo jugador en pie se lleva la gloria.",
    image: "/events/chaos-castle.png",
  },
  {
    name: "Illusion Temple",
    category: "PVE",
    time: "TODO",
    description: "Evento cooperativo por equipos.",
  },
  {
    name: "Kalima",
    category: "PVE",
    time: "Permanente (entrada por Suspicious Scrap of Paper)",
    description: "Mazmorra por niveles, acceso mediante carta armada con 5 papeles sospechosos.",
  },
  {
    name: "Golden Invasion",
    category: "INVASION",
    time: "TODO",
    description: "Invasion de monstruos dorados en todo el mapa.",
    image: "/events/golden-invasion.png",
  },
  {
    name: "Silver Invasion (Aida)",
    category: "INVASION",
    time: "TODO",
    description: "Hero Mutant, Omega Wing y el boss Axl Hero recorren Aida.",
  },
  {
    name: "Kundun",
    category: "INVASION",
    time: "TODO",
    description: "El senor supremo de los No-Muertos invade el continente.",
    image: "/events/kundun.png",
  },
  {
    name: "Skeleton King",
    category: "INVASION",
    time: "TODO",
    description: "El rey esqueleto y su ejercito emergen a atacar.",
    image: "/events/skeleton-king.png",
  },
  {
    name: "Loren Deep",
    category: "INVASION",
    time: "TODO",
    description: "Evento final con el boss Erohim.",
  },
  {
    name: "Red Dragon",
    category: "INVASION",
    time: "TODO",
    description: "Invasion de dragones rojos.",
    image: "/events/red-dragon.png",
  },
  {
    name: "Castle Siege",
    category: "CASTLE",
    time: "TODO",
    description: "Guerra de guilds por el control del castillo. (Actualmente en preparacion, no habilitado)",
    image: "/events/castle-siege.png",
  },
];
