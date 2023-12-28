export interface HeatPumpDataToCalculationType {
  bufory: {
    bufory100l: {
      przylaczeSchemat17: number;
      przylaczeSchemat24: number;
      przylaczeSchemat34: number;
    };
    bufory300l: {
      przylaczeSchemat17: number;
      przylaczeSchemat24: number;
      przylaczeSchemat34: number;
    };
    bufory500l: {
      przylaczeSchemat17: number;
      przylaczeSchemat24: number;
      przylaczeSchemat34: number;
    };
  };
  pompy_ciepla: {
    "JGB2-PC10KW": {
      cena: number;
      mnozik_prowizji: number;
    };
    "JGB2-PC15KW": {
      cena: number;
      mnozik_prowizji: number;
    };
    "LAZAR-HTi20V8KW": { cena: number; mnozik_prowizji: number };
    "LAZAR-HTi20V12KW": { cena: number; mnozik_prowizji: number };

    "LAZAR-HTi20V16KW": { cena: number; mnozik_prowizji: number };
    "ZEO-VCP-PRO10KW": { cena: number; mnozik_prowizji: number };
    "ZEO-VCP-PRO15KW": { cena: number; mnozik_prowizji: number };
    "ZEO-VCP-H4516KW": { cena: number; mnozik_prowizji: number };

    "ZEO-SATELLITE16KW": { cena: number; mnozik_prowizji: number };
    "POMPACIEPLA-czystepowietrze": { cena: number; mnozik_prowizji: number };
  };
  dodatki: {
    kolejna_kaskada: number;
    posadowienie_rozsaczanie: number;
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
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface EachMenagerHeatPump {
  [key: string]: HeatPumpDataToCalculationType;
}
export interface HeatPumpCalculatorType {
  kalkulator: EachMenagerHeatPump[];
}
