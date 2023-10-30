export interface ForCompanyDataToCalcualtionType {
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
  koszty_dodatkowe: {
    bloczki: number;
    tigo: number;
    ekierki: number;
    grunt: number;
  };
  zbiorniki: {
    zbiornik_100L: number;
    zbiornik_140L: number;
    zbiornik_140L_z_wezem: number;
    zbiornik_200L: number;
    zbiornik_200L_z_wezem: number;
  };
  cena_skupu_pradu: number;
  prowizjaBiura: number;
  oprocentowanie_kredytu: number;
}

export interface EachMenagerForCompany {
  [key: string]: ForCompanyDataToCalcualtionType;
}
export interface ForCompanyCalculatorType {
  kalkulator: EachMenagerForCompany[];
}
