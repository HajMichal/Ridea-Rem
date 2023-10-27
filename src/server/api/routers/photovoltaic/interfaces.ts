export interface PhotovoltaicDataToCalculation {
  dane: {
    czterysta: {
      dwa: number;
      cztery: number;
      szesc: number;
      osiem: number;
      dwanascie: number;
      dwadziescia: number;
      trzydziesci: number;
      piecdziesiat: number;
    };
    czterysta_piecdziesiat: {
      dwa: number;
      cztery: number;
      szesc: number;
      osiem: number;
      dwanascie: number;
      dwadziescia: number;
      trzydziesci: number;
      piecdziesiat: number;
    };
    piecset: {
      dwa: number;
      cztery: number;
      szesc: number;
      osiem: number;
      dwanascie: number;
      dwadziescia: number;
      trzydziesci: number;
      piecdziesiat: number;
    };
  };
  dotacje: {
    magazynCiepla: number;
    menagerEnergii: number;
    mojPrad: number;
    mp_mc: number;
  };
  koszty_dodatkowe: {
    bloczki: number;
    tigo: number;
    ekierki: number;
    grunt: number;
    inwerterHybrydowy: number;
    solarEdge: number;
  };
  zbiorniki: {
    zbiornik_100L: number;
    zbiornik_140L: number;
    zbiornik_140L_z_wezem: number;
    zbiornik_200L: number;
    zbiornik_200L_z_wezem: number;
  };
  magazyn_energii_solax: {
    prog0: number;
    prog1: number;
    prog2: number;
    prog3: number;
    prog4: number;
    prog5: number;
    prog6: number;
    prog7: number;
    prog8: number;
  };
  magazyn_energii_hipontech: {
    prog0: number;
    prog1: number;
    prog2: number;
  };
  magazynCiepla: number;
  prowizjaBiura: number;
  oprocentowanie_kredytu: number;
  cena_skupu_pradu: number;
  ems: number;
}
/* eslint @typescript-eslint/consistent-indexed-object-style: ["error", "index-signature"] */
export interface EachMenagerPhotovoltaic {
  [key: string]: PhotovoltaicDataToCalculation;
}
export interface CalculatorType {
  kalkulator: EachMenagerPhotovoltaic[];
}
