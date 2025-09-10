// export interface Borrower {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   loanType: string;
//   amount: number;
//   status: "New" | "review" | "Approved";
//   creditScore: number;
//   employment: string;
//   existingLoan: string;
//   sourceOfFunds: string;
//   debtToIncomeRatio: number;
//   hasIncomeInconsistency: boolean;
// }

// export interface Broker {
//   id: string;
//   name: string;
//   deals: number;
//   approvalRate: number;
//   pending: number;
// }

// export interface AIFlag {
//   type: "Income Inconsistency" | "High Debt-to-Income Ratio";
//   severity: "high" | "medium" | "low";
//   description: string;
// }
export interface Borrower {
  id: string;
  name: string;
  loanType: string;
  amount: number;
  status: string;
  // Extended properties from detail API
  email?: string;
  phone?: string;
  employment?: string;
  income?: number;
  existingLoan?: number;
  creditScore?: number;
  sourceOfFunds?: string;
  riskSignal?: string | null;
  aiFlags?: string[];
  hasIncomeInconsistency?: boolean;
  debtToIncomeRatio?: number;
}

export interface AIFlag {
  type: string;
  severity: "low" | "medium" | "high";
  description: string;
}

export interface PipelineData {
  new: Borrower[];
  review: Borrower[];
  approved: Borrower[];
}
