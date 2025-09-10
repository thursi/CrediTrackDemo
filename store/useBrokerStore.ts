import { create } from "zustand";

export type Broker = {
  id?: string;
  name: string;
  deals: number;
  approval_rate: number | string;
  pending: number;
};

type BrokerStore = {
  broker: Broker | null;
  onboardingSteps: string[];
  loading: boolean;
  setBroker: (broker: Broker) => void;
  setOnboardingSteps: (steps: string[]) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
};

export const useBrokerStore = create<BrokerStore>((set) => ({
  broker: null,
  onboardingSteps: [],
  loading: false,
  setBroker: (broker) => set({ broker }),
  setOnboardingSteps: (steps) => set({ onboardingSteps: steps }),
  setLoading: (loading) => set({ loading }),
  reset: () => set({ broker: null, onboardingSteps: [], loading: false }),
}));
