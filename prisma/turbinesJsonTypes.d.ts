declare global {
  namespace PrismaJson {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    type Turbines = {
      "turbina 500": number;
      "turbina 1000": number;
      "turbina 1500": number;
      "turbina 3000": number;
    };

    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    type TurbinesAddons = {
      "podstawa dachowa": number;
      "podstawa dachowa3000": number;
      strunobeton: number;
      maszt: number;
      "inwerter 3fazowy": number;
      "inwerter hybrydowy": number;
      "montaż bazowo": number;
      "montaż dodatkowo": number;
      wysylka: number;
      "podstawa inwertera": number;
    };
  }
}
export {};
