import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export const getBorrowerPipeline = async () => {
  try {
    const response = await axiosInstance.get("/api/borrowers/pipeline");
    return response.data;
  } catch (error) {
    toast.error("API failed, using mock data");
    return {
      new: [
        {
          id: "1",
          name: "Sarah Dunn",
          loan_type: "Home Loan",
          amount: 300000,
          status: "Renew",
        },
        {
          id: "3",
          name: "Lisa Carter",
          loan_type: "Home Loan",
          amount: 450000,
          status: "New",
        },
      ],
      review: [
        {
          id: "2",
          name: "Alan Matthews",
          loan_type: "Personal Loan",
          amount: 20000,
          status: "Review",
        },
      ],
      approved: [
        {
          id: "4",
          name: "DD Dunn",
          loan_type: "Home Loan",
          amount: 30000,
          status: "Approved",
        },
      ],
    };
  }
};

export const getBorrowerDetail = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/borrowers/${id}`);
    return response.data;
  } catch (error) {
    // toast.error("API failed, using mock data");

    const mockDetails = {
      "1": {
        id: "1",
        name: "Sarah Dunn",
        email: "sarah.dunn@example.com",
        phone: "(355)123-4557",
        loan_amount: 300000,
        status: "Renew",
        employment: "At Tech Company",
        income: 120000,
        existing_loan: 240000,
        credit_score: 720,
        source_of_funds: "Declared",
        risk_signal: "Missing Source of Funds declaration",
        ai_flags: [
          "Income Inconsistent with Bank statements",
          "High Debt-to-Income Ratio detected",
        ],
      },
      "2": {
        id: "2",
        name: "Alan Matthews",
        email: "alan.matthews@example.com",
        phone: "(355)987-6543",
        loan_amount: 20000,
        status: "Review",
        employment: "Self Employed",
        income: 75000,
        existing_loan: 15000,
        credit_score: 680,
        source_of_funds: "Business Income",
        risk_signal: null,
        ai_flags: [],
      },
      "3": {
        id: "3",
        name: "Lisa Carter",
        email: "lisa.carter@example.com",
        phone: "(355)456-7890",
        loan_amount: 450000,
        status: "New",
        employment: "Manager at Corp",
        income: 150000,
        existing_loan: 0,
        credit_score: 750,
        source_of_funds: "Salary",
        risk_signal: null,
        ai_flags: [],
      },
      "4": {
        id: "4",
        name: "DD Dunn",
        email: "DD.dunn@example.com",
        phone: "(389)082-4557",
        loan_amount: 350000,
        status: "Approved",
        employment: "At Tech Company",
        income: 120900,
        existing_loan: 240900,
        credit_score: 720,
        source_of_funds: "Declared",
        risk_signal: "Missing Source of Funds declaration",
        ai_flags: [
          "Income Inconsistent with Bank statements",
          "High Debt-to-Income Ratio detected",
        ],
      },
    };

    return mockDetails[id as keyof typeof mockDetails] || null;
  }
};

export const requestDocuments = async (id: string) => {
  try {
    const response = await axiosInstance.post(
      `/api/borrowers/${id}/request-documents`
    );
    return response.data;
  } catch (error) {
    return { success: true, message: "Documents requested (mock)" };
  }
};

export const sendToValuer = async (id: string) => {
  try {
    const response = await axiosInstance.post(
      `/api/borrowers/${id}/send-valuer`
    );
    return response.data;
  } catch (error) {
    return { success: true, message: "Valuer notified (mock)" };
  }
};

export const approveLoan = async (id: string) => {
  try {
    const response = await axiosInstance.post(`/api/borrowers/${id}/approve`);
    return response.data;
  } catch (error) {
    return { success: true, message: "Loan approved (mock)" };
  }
};

export const escalateToCreditCommittee = async (id: string) => {
  try {
    const response = await axiosInstance.post(`/api/borrowers/${id}/escalate`);
    return response.data;
  } catch (error) {
    return { success: true, message: "Escalated to Credit Committee (mock)" };
  }
};

export const getBrokerInfo = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/broker/${id}`);
    return response.data;
  } catch (error) {
    // toast.error("Get Broker Info API failed");
    return {
      name: "Robert Turner",
      deals: 16,
      approval_rate: "75%",
      pending: 7660,
    };
  }
};

// Onboarding API
export const getOnboardingWorkflow = async () => {
  try {
    const response = await axiosInstance.get("/api/onboarding/workflow");
    return response.data;
  } catch (error) {
    // toast.error("Get Onboarding Workflow API failed");
    return {
      steps: [
        "Deal Intake",
        "IDV & Credit Check",
        "Document Upload",
        "AI Validation",
        "Credit Committee",
        "Approval & Docs",
        "Funder Syndication",
      ],
    };
  }
};
