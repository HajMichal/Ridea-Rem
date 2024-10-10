declare global {
  namespace PrismaJson {
    type PanelsType = {
      dwa: number;
      osiem: number;
      szesc: number;
      cztery: number;
      dwanascie: number;
      dwadziescia: number;
      trzydziesci: number;
      piecdziesiat: number;
    };

    type EnergyStoreType = Record<string, number>;
  }
}
export {};
