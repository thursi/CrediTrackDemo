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
