import { type StateCreator } from "zustand";

export interface GeneralSlice {
  markupAmount: number;
  setMarkup: (amount: number) => void;

  // users can work on B2B or UoZ (Contract is equal to umowa zlecenie)
  hasContract: boolean;
  setHasContract: (val: boolean) => void;
}

export const generalSlice: StateCreator<GeneralSlice> = (set) => ({
  markupAmount: 0,
  setMarkup: (amount) => set(() => ({ markupAmount: amount })),

  hasContract: false,
  setHasContract: (val) => set(() => ({ hasContract: val })),
});
