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
    "Z-PRO.5.3/4.Mitsubishi.Inv.11-16": {
      cena: number;
      mnozik_prowizji: number;
    };
    "Z-PRO.5.3/4.Mitsubishi.IHO.11-16": {
      cena: number;
      mnozik_prowizji: number;
    };
    "SAT.6.3.Danfoss.Inv.14-23": { cena: number; mnozik_prowizji: number };
    "SAT.6.3.Danfoss.IHO.14-24": { cena: number; mnozik_prowizji: number };

    "SAT.ELI.8.2.P19i.17-29": { cena: number; mnozik_prowizji: number };
    "SAT.ELI.8.3.P23i.20-32": { cena: number; mnozik_prowizji: number };
    "SAT.ELI.8.3.P26i.23-34": { cena: number; mnozik_prowizji: number };
    "SAT.ELI.8.3.P30i.25-37": { cena: number; mnozik_prowizji: number };

    "SAT.ELI.8.2.P19iHO.25-35": { cena: number; mnozik_prowizji: number };
    "SAT.ELI.8.3.P23iHO.30-41": { cena: number; mnozik_prowizji: number };
    "SAT.ELI.8.3.P26iHO.35-45": { cena: number; mnozik_prowizji: number };
    "SAT.ELI.8.3.P30iHO.37-48": { cena: number; mnozik_prowizji: number };
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
}
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface EachMenagerHeatPump {
  [key: string]: HeatPumpDataToCalculationType;
}
export interface HeatPumpCalculatorType {
  kalkulator: EachMenagerHeatPump[];
}
