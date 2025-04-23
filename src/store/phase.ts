import { create } from "zustand";

type Phase = "select" | "loading" | "result";

interface PhaseStore {
  phase: Phase;
  selectedBillionaire: string;
  setPhase: (phase: Phase) => void;
  setBillionaire: (name: string) => void;
  reset: () => void;
}

export const usePhaseStore = create<PhaseStore>((set) => ({
  phase: "select",
  selectedBillionaire: "",
  setPhase: (phase) => set({ phase }),
  setBillionaire: (name) => set({ selectedBillionaire: name }),
  reset: () => set({ phase: "select", selectedBillionaire: "" }),
}));
