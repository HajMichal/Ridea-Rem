declare global {
  namespace PrismaJson {
    type HeatPumps = Record<string, { cena: number; fee: number }>;

    type Buffors = Record<string, number>;

    type Addons = {
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

    type Dotation = {
      prog1: number;
      prog2: number;
      prog3: number;
      mojPrad: number;
    };

    type Dotations = {
      modernizacja_CO_CWU: Dotation;
      pc: Dotation;
    };
  }
}
