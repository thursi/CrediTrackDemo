import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertTriangle,
  FileText,
  Building,
  TrendingUp,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Borrower, AIFlag } from "@/lib/types";
import {
  requestDocuments,
  sendToValuer,
  approveLoan,
  escalateToCreditCommittee,
} from "@/services/borrowerService";
import { toast } from "sonner";

interface BorrowerDetailProps {
  borrower: Borrower | null;
  loading?: boolean;
}

export function BorrowerDetail({ borrower, loading }: BorrowerDetailProps) {
  const [actionLoading, setActionLoading] = useState(false);

  if (!borrower) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">
            Select a borrower to view details
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <p className="text-muted-foreground">Loading details...</p>
          </div>
        </CardContent>
      </Card>
    );
  }



const handleAction = async (
  action: "requestDocuments" | "sendToValuer" | "approveLoan" | "escalate"
) => {
  if (!borrower) return;
  setActionLoading(true);

  try {
    let result: { success: boolean; message: string } = {
      success: false,
      message: "",
    };

    switch (action) {
      case "requestDocuments":
        result = await requestDocuments(borrower.id);
        break;
      case "sendToValuer":
        result = await sendToValuer(borrower.id);
        break;
      case "approveLoan":
        result = await approveLoan(borrower.id);
        break;
      case "escalate":
        result = await escalateToCreditCommittee(borrower.id);
        break;
    }

    toast.success(result.message); // always show toast
  } catch (err) {
    toast.error("Action failed");
  } finally {
    setActionLoading(false);
  }
};



  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "outline";
      case "review":
        return "warning";
      case "approved":
        return "success";
      case "renew":
        return "outline";
      default:
        return "default";
    }
  };

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  const aiFlags: AIFlag[] = [];

  if (borrower.hasIncomeInconsistency) {
    aiFlags.push({
      type: "Income Inconsistency",
      severity: "high",
      description: "Reported income varies significantly across documents",
    });
  }

  if (borrower.debtToIncomeRatio && borrower.debtToIncomeRatio > 40) {
    aiFlags.push({
      type: "High Debt-to-Income Ratio",
      severity: "medium",
      description: `DTI ratio of ${borrower.debtToIncomeRatio}% exceeds recommended threshold`,
    });
  }

  if (borrower.aiFlags) {
    borrower.aiFlags.forEach((flag) => {
      if (
        flag === "Income Inconsistent with Bank statements" &&
        !aiFlags.some((f) => f.type === "Income Inconsistency")
      ) {
        aiFlags.push({
          type: "Income Inconsistency",
          severity: "high",
          description: "Income inconsistent with bank statements",
        });
      }
      if (
        flag === "High Debt-to-Income Ratio detected" &&
        !aiFlags.some((f) => f.type === "High Debt-to-Income Ratio")
      ) {
        aiFlags.push({
          type: "High Debt-to-Income Ratio",
          severity: "medium",
          description: "High debt-to-income ratio detected",
        });
      }
    });
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{borrower.name}</CardTitle>
            <div className="flex flex-col gap-1 mt-2">
              {borrower.email && (
                <span className="text-sm text-muted-foreground">
                  {borrower.email}
                </span>
              )}
              {borrower.phone && (
                <span className="text-sm text-muted-foreground">
                  {borrower.phone}
                </span>
              )}
              <span className="text-lg font-semibold">
                {formatAmount(borrower.amount)}
              </span>
            </div>
          </div>
          <Badge variant={getStatusVariant(borrower.status)}>
            {borrower.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="ai-explainability">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                AI Explainability
                {aiFlags.length > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {aiFlags.length} issues
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              {aiFlags.length > 0 ? (
                aiFlags.map((flag, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 border border-destructive/20 rounded-lg bg-destructive/5"
                  >
                    <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                    <div>
                      <h4 className="font-medium text-destructive">
                        {flag.type}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {flag.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-2 text-success">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">No issues detected</span>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button
                  className="bg-white text-black"
                  size="sm"
                  onClick={() => handleAction("requestDocuments")}
                  disabled={actionLoading}
                >
                  <FileText className="h-4 w-4 mr-2" /> Request Documents
                </Button>
                <Button
                  className="bg-white text-black"
                  variant="outline"
                  size="sm"
                  onClick={() => handleAction("sendToValuer")}
                  disabled={actionLoading}
                >
                  <Building className="h-4 w-4 mr-2" /> Send to Valuer
                </Button>
                <Button
                  className="bg-white text-black"

                  variant="outline"
                  size="sm"
                  onClick={() => handleAction("approveLoan")}
                  disabled={actionLoading}
                >
                  Approve
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {aiFlags.length > 0 || borrower.riskSignal ? (
          <div className="p-4 border border-warning/20 rounded-lg bg-warning/5">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
              <div>
                <h4 className="font-medium text-warning">
                  Risk Signal Detected
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {borrower.riskSignal ||
                    "This application requires additional review due to detected risk factors."}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <Button
          className="w-full bg-white text-black"
          size="lg"
          onClick={() => handleAction("escalate")}
          disabled={actionLoading}
        >
          Escalate to Credit Committee
        </Button>
      </CardContent>
    </Card>
  );
}
