import { type Turbines } from "@prisma/client";

export interface TurbinesData {
  "turbina 500": number;
  "turbina 1000": number;
  "turbina 1500": number;
  "turbina 3000": number;
}
export interface Addons {
  "podstawa dachowa": number;
  "podstawa dachowa3000": number;
  strunobeton: number;
  stalowy: {
    trzy: number;
    szesc: number;
    dziewiec: number;
    dwanascie: number;
  };
  maszt: number;
  "inwerter 3fazowy": number;
  "inwerter hybrydowy": number;
  "montaż bazowo": number;
  "montaż dodatkowo": number;
  wysylka: number;
  "podstawa inwertera": number;
  "instalacja powyzej 3kw": number;
}

export interface TurbineCalcData extends Turbines {
  id: string;
  userId: string;
  userName: string;
  turbines: TurbinesData;
  addons: Addons;
  energyStore: {
    "T30 controller": number;
    licznik: number;
    battery: {
      trzy: number;
      szesc: number;
      dziewiec: number;
      dwanascie: number;
    };
    matebox: number;
  };
}
