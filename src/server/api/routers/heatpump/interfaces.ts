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
    "Z-PRO53/4MitsubishiInv11-16": {
      cena: number;
      mnozik_prowizji: number;
    };
    "Z-PRO53/4MitsubishiIHO11-16": {
      cena: number;
      mnozik_prowizji: number;
    };
    "SAT63DanfossInv14-23": { cena: number; mnozik_prowizji: number };
    "SAT63DanfossIHO14-24": { cena: number; mnozik_prowizji: number };

    "SATELI82P19i17-29": { cena: number; mnozik_prowizji: number };
    "SATELI83P23i20-32": { cena: number; mnozik_prowizji: number };
    "SATELI83P26i23-34": { cena: number; mnozik_prowizji: number };
    "SATELI83P30i25-37": { cena: number; mnozik_prowizji: number };

    "SATELI82P19iHO25-35": { cena: number; mnozik_prowizji: number };
    "SATELI83P23iHO30-41": { cena: number; mnozik_prowizji: number };
    "SATELI83P26iHO35-45": { cena: number; mnozik_prowizji: number };
    "SATELI83P30iHO37-48": { cena: number; mnozik_prowizji: number };
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
    modernizacja_CO_CWU: number;
    pc: {
      prog1: number;
      prog2: number;
      prog3: number;
    };
  };
  oprocentowanie_kredytu: number;
}
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface EachMenagerHeatPump {
  [key: string]: HeatPumpDataToCalculationType;
}
export interface HeatPumpCalculatorType {
  kalkulator: EachMenagerHeatPump[];
}
