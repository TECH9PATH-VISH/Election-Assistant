import { create } from "zustand";

interface WizardState {
  step: number;
  data: {
    isRegistered: boolean | null;
    votingMethod: "in-person" | "mail" | null;
    hasId: boolean | null;
  };
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (data: Partial<WizardState["data"]>) => void;
  reset: () => void;
}

export const useWizardStore = create<WizardState>((set) => ({
  step: 1,
  data: {
    isRegistered: null,
    votingMethod: null,
    hasId: null,
  },
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
  updateData: (newData) =>
    set((state) => ({ data: { ...state.data, ...newData } })),
  reset: () =>
    set({
      step: 1,
      data: { isRegistered: null, votingMethod: null, hasId: null },
    }),
}));
