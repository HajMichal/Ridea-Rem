declare global {
  namespace PrismaJson {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
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

    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/consistent-indexed-object-style
    type EnergyStoreType = {
      [name: string]: number;
    };
  }
}
export {};
