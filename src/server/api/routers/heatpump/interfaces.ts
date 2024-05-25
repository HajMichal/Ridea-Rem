/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
export interface HeatPumpDataToCalculationType {
  bufory: {
    bufory100l: {
      przylaczeSchemat24: number;
      przylaczeSchemat34: number;
    };
  };
  pompy_ciepla: {
    [serieName: string]: {
      cena: number;
      mnozik_prowizji: number;
    };
  };
  dodatki: {
    kolejna_kaskada: number;
    przewierty: number;
    poprowadzenie_instalacji_wierzchu: number;
    rura_preizolowana: number;
    dodatkowe_rury_preizolowane: number;
    cyrkulacja_cwu: number;
    demontaz_kotla: number;
    posprzatanie: number;
    przeniesienie_zasobnika: number;
    wykonanie_przylacza: number;
    spiecie_bufora: number;
    zamkniecie_ukladu_otwartego: number;
    audyt: number;
  };
  dotacje: {
    modernizacja_CO_CWU: {
      prog1: number;
      prog2: number;
      prog3: number;
      mojPrad: number;
    };
    pc: {
      prog1: number;
      prog2: number;
      prog3: number;
      mojPrad: number;
    };
  };
  oprocentowanie_kredytu: number;
  cena1kWh: number;
  cop: number;
}

export interface EachMenagerHeatPump {
  [key: string]: HeatPumpDataToCalculationType;
}
export interface HeatPumpCalculatorType {
  kalkulator: EachMenagerHeatPump[];
}
