"use client";

import { useEffect, useState } from "react";
import { BorrowerPipeline } from "@/components/borrower/BorrowerPipeline";
import { BorrowerDetail } from "@/components/borrower/BorrowerDetail";
import { BrokerOverview } from "@/components/broker/BrokerOverview";
import { Header } from "@/components/Layout/Header";
import {
  getBorrowerPipeline,
  getBorrowerDetail,
  getBrokerInfo,
  getOnboardingWorkflow,
} from "@/services/borrowerService";
import { Borrower } from "@/lib/types";
import { useBorrowerStore } from "@/store/useBorrowerStore";
import { useBrokerStore } from "@/store/useBrokerStore";

const Home = () => {
  const borrowers = useBorrowerStore((state) => state.borrowers);
  const selectedBorrower = useBorrowerStore((state) => state.selectedBorrower);
  const setBorrowers = useBorrowerStore((state) => state.setBorrowers);
  const setSelectedBorrower = useBorrowerStore(
    (state) => state.setSelectedBorrower
  );

  const [loadingDetail, setLoadingDetail] = useState(false);
  const broker = useBrokerStore((state) => state.broker);
  const onboardingSteps = useBrokerStore((state) => state.onboardingSteps);
  const setBroker = useBrokerStore((state) => state.setBroker);
  const setOnboardingSteps = useBrokerStore(
    (state) => state.setOnboardingSteps
  );
  const setLoading = useBrokerStore((state) => state.setLoading);

  useEffect(() => {
    const fetchBroker = async () => {
      setLoading(true);

      const brokerData = await getBrokerInfo("1");
      setBroker(brokerData);

      const onboardingData = await getOnboardingWorkflow();
      setOnboardingSteps(onboardingData.steps || []);

      setLoading(false);
    };

    fetchBroker();
  }, []);

  useEffect(() => {
    const fetchBorrowers = async () => {
      try {
        const data = await getBorrowerPipeline();

        const allBorrowers: Borrower[] = [
          ...(data.new || []),
          ...(data.review || []),
          ...(data.approved || []),
        ].map((b) => ({
          id: b.id,
          name: b.name,
          loanType: b.loan_type || b.loanType,
          amount: b.amount,
          status: b.status,
        }));

        setBorrowers(allBorrowers);
        if (allBorrowers.length > 0) {
          await handleBorrowerSelect(allBorrowers[0]);
        }
      } catch (error) {
        console.error("Error fetching borrowers:", error);
      }
    };

    fetchBorrowers();
  }, []);

  const handleBorrowerSelect = async (borrower: Borrower) => {
    setLoadingDetail(true);
    try {
      const detailData = await getBorrowerDetail(borrower.id);

      if (detailData) {
        const enrichedBorrower: Borrower = {
          ...borrower,
          email: detailData.email,
          phone: detailData.phone,
          amount: detailData.loan_amount || borrower.amount,
          employment: detailData.employment,
          income: detailData.income,
          existingLoan: detailData.existing_loan,
          creditScore: detailData.credit_score,
          sourceOfFunds: detailData.source_of_funds,
          riskSignal: detailData.risk_signal,
          aiFlags: detailData.ai_flags || [],
          hasIncomeInconsistency:
            detailData.ai_flags?.includes(
              "Income Inconsistent with Bank statements"
            ) || false,
          debtToIncomeRatio:
            detailData.existing_loan && detailData.income
              ? Math.round((detailData.existing_loan / detailData.income) * 100)
              : 0,
        };

        setSelectedBorrower(enrichedBorrower);
      }
    } catch (error) {
      console.error("Error fetching borrower details:", error);
      setSelectedBorrower(borrower);
    } finally {
      setLoadingDetail(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1">
            <BorrowerPipeline
              borrowers={borrowers}
              selectedBorrower={selectedBorrower}
              onSelectBorrower={handleBorrowerSelect}
            />
          </div>

          <div className="col-span-1">
            <BorrowerDetail
              borrower={selectedBorrower}
              loading={loadingDetail}
            />
          </div>

          <div className="col-span-1">
            <BrokerOverview broker={broker} onboardingSteps={onboardingSteps} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
