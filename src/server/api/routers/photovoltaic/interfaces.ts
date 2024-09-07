import { type Photovoltaic } from "@prisma/client";

export interface PhotovoltaicDataToCalculation extends Photovoltaic {
  id: string;
  userId: string;
  userName: string;
  panels_small: {
    dwa: number;
    cztery: number;
    szesc: number;
    osiem: number;
    dwanascie: number;
    dwadziescia: number;
    trzydziesci: number;
    piecdziesiat: number;
  };
  panels_medium: {
    dwa: number;
    cztery: number;
    szesc: number;
    osiem: number;
    dwanascie: number;
    dwadziescia: number;
    trzydziesci: number;
    piecdziesiat: number;
  };
  panels_large: {
    dwa: number;
    cztery: number;
    szesc: number;
    osiem: number;
    dwanascie: number;
    dwadziescia: number;
    trzydziesci: number;
    piecdziesiat: number;
  };
  dotations: {
    magazynCiepla: number;
    menagerEnergii: number;
    mojPrad: number;
    mp_mc: number;
  };
  addons: {
    bloczki: number;
    tigo: number;
    ekierki: number;
    certyfikowaneEkierki: number;
    grunt: number;
    inwerterHybrydowy: number;
    magazynCiepla: number;
    ems: number;
    matebox: number;
    kableAC: number;
    przekopy: number;
  };
  boilers: {
    [boiler: string]: number;
  };
  energyStore: {
    [energyStoreElement: string]: number;
  };
  carPort: {
    stan1: number;
    stan2: number;
    stan4: number;
    stan6: number;
    stan8: number;
    stan10: number;
    stan12: number;
  };
  creditPercentage: number;
  electricityPrice: number;
}
/* eslint @typescript-eslint/consistent-indexed-object-style: ["error", "index-signature"] */
export interface EachMenagerPhotovoltaic {
  [key: string]: PhotovoltaicDataToCalculation;
}
export interface PhotovoltaicCalculatorType {
  kalkulator: EachMenagerPhotovoltaic[];
}
