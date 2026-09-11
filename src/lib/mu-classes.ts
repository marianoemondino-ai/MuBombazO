// Standard MU Online class-byte scheme (base class << 4 | evolution level).
// Stable across every Season/emulator - not a MuBombazo-specific value.
const CLASS_NAMES: Record<number, string> = {
  0: "Dark Wizard",
  1: "Soul Master",
  2: "Grand Master",
  16: "Dark Knight",
  17: "Blade Knight",
  18: "Blade Master",
  32: "Fairy Elf",
  33: "Muse Elf",
  34: "High Elf",
  48: "Magic Gladiator",
  49: "Duel Master",
  64: "Dark Lord",
  65: "Lord Emperor",
  80: "Summoner",
  81: "Bloody Summoner",
  82: "Dimension Master",
  96: "Rage Fighter",
  97: "Fist Master",
  112: "Grow Lancer",
  113: "Mirage Lancer",
  114: "Shining Lancer",
  128: "Rune Wizard",
  129: "Rune Spell Master",
  130: "Grand Rune Master",
};

export function getClassName(classByte: number): string {
  return CLASS_NAMES[classByte] ?? `Clase ${classByte}`;
}

// Icono disponible por familia de clase (basado en la evolucion base).
const CLASS_ICONS: Record<number, string> = {
  0: "/classes/sm.png",
  1: "/classes/sm.png",
  2: "/classes/sm.png",
  16: "/classes/bk.png",
  17: "/classes/bk.png",
  18: "/classes/bk.png",
  32: "/classes/elf.png",
  33: "/classes/elf.png",
  34: "/classes/elf.png",
  48: "/classes/mg.png",
  49: "/classes/mg.png",
  64: "/classes/dl.png",
  65: "/classes/dl.png",
  80: "/classes/sum.png",
  81: "/classes/sum.png",
  82: "/classes/sum.png",
  96: "/classes/rf.png",
  97: "/classes/rf.png",
};

export function getClassIcon(classByte: number): string | null {
  return CLASS_ICONS[classByte] ?? null;
}
