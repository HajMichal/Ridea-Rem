export interface HeatPumpCalcType {
  id: string;
  userId: string;
  userName: string;

  bufory: Record<string, number>;
  heatPumps: Record<
    string,
    {
      cena: number;
      fee: number;
    }
  >;
  addons: {
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
  dotations: {
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
  electricityPrice: number;
  cop: number;

  createdAt: Date;
  editedAt: Date;
}
