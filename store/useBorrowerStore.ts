import { create } from "zustand";
import { Borrower } from "@/lib/types";

type BorrowerStore = {
  borrowers: Borrower[];
  selectedBorrower: Borrower | null;
  loading: boolean;
  setBorrowers: (list: Borrower[]) => void;
  setSelectedBorrower: (borrower: Borrower | null) => void;
};

export const useBorrowerStore = create<BorrowerStore>((set) => ({
  borrowers: [],
  selectedBorrower: null,
  loading: false,
  setBorrowers: (list) => set({ borrowers: list }),
  setSelectedBorrower: (borrower) => set({ selectedBorrower: borrower }),
}));
