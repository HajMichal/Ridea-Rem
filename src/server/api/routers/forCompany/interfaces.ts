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
      overpiecdziesiat: number;
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
      overpiecdziesiat: number;
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
      overpiecdziesiat: number;
    };
  };
  koszty_dodatkowe: {
    bloczki: number;
    tigo: number;
    ekierki: number;
    grunt: number;
  };
  cena_skupu_pradu: number;
  prowizjaBiura: number;
  oprocentowanie_kredytu: number;
}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface EachMenagerForCompany {
  [key: string]: ForCompanyDataToCalcualtionType;
}
export interface ForCompanyCalculatorType {
  kalkulator: EachMenagerForCompany[];
}
