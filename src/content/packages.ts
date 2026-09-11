// Paquetes de donacion editables. Ajusta precios y cantidad de creditos.
export type DonationPackage = {
  credits: number;
  priceUsd: number;
  highlight?: boolean;
};

export const donationPackages: DonationPackage[] = [
  { credits: 100, priceUsd: 5 },
  { credits: 250, priceUsd: 10, highlight: true },
  { credits: 600, priceUsd: 20 },
  { credits: 1500, priceUsd: 45 },
];
