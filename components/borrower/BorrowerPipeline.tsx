"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Borrower } from "@/lib/types";
import React from "react";

interface BorrowerPipelineProps {
  borrowers: Borrower[];
  selectedBorrower: Borrower | null;
  onSelectBorrower: (borrower: Borrower) => void;
}

export function BorrowerPipeline({
  borrowers,
  selectedBorrower,
  onSelectBorrower,
}: BorrowerPipelineProps) {
  const [activeTab, setActiveTab] = React.useState("new");
  const [radioValue, setRadioValue] = React.useState("f-sanitised");

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
    }).format(amount);

  const getFilteredBorrowers = (statusKey: string) => {
    const statusMap: Record<string, string[]> = {
      new: ["New", "Renew"],
      review: ["Review"],
      approved: ["Approved"],
    };
      console.log("borrowers", borrowers);

    let filtered = borrowers.filter((b) =>
      statusMap[statusKey]?.some(
        (status) => b.status.toLowerCase() === status.toLowerCase()
      )
    );
    if (radioValue === "f-sanitised") {
      filtered = filtered.filter((b) =>
        b.loanType.toLowerCase().includes("home")
      );
    }
      console.log("filtered", filtered);

    return filtered;
  };

  const getTabCount = (statusKey: string) => {
    return getFilteredBorrowers(statusKey).length;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Borrower Pipeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="new">New ({getTabCount("new")})</TabsTrigger>
            <TabsTrigger value="review">
              Review ({getTabCount("review")})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({getTabCount("approved")})
            </TabsTrigger>
          </TabsList>

          {["new", "review", "approved"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-3 mt-4">
              <div className="max-h-96 overflow-y-auto space-y-3">
                {getFilteredBorrowers(tab).length > 0 ? (
                  getFilteredBorrowers(tab).map((borrower) => (
                    <BorrowerCard
                      key={borrower.id}
                      borrower={borrower}
                      isSelected={selectedBorrower?.id === borrower.id}
                      onSelect={() => onSelectBorrower(borrower)}
                      formatAmount={formatAmount}
                      getStatusVariant={getStatusVariant}
                    />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No borrowers in this stage
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            F-SANITISED ACTIVE
          </h3>
          <RadioGroup value={radioValue} onValueChange={setRadioValue}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="f-sanitised" id="f-sanitised" />
              <Label htmlFor="f-sanitised">Enable F-Sanitised Mode</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="standard" />
              <Label htmlFor="standard">Standard Mode</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}

interface BorrowerCardProps {
  borrower: Borrower;
  isSelected: boolean;
  onSelect: () => void;
  formatAmount: (amount: number) => string;
  getStatusVariant: (
    status: string
  ) =>
    | "info"
    | "warning"
    | "success"
    | "secondary"
    | "default"
    | "destructive"
    | "outline"
    | null
    | undefined;
}

function BorrowerCard({
  borrower,
  isSelected,
  onSelect,
  formatAmount,
  getStatusVariant,
}: BorrowerCardProps) {
  return (
    <div
      className={cn(
        "p-4 border rounded-lg cursor-pointer transition-colors hover:bg-accent/50",
        isSelected && "bg-accent border-primary"
      )}
      onClick={onSelect}
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium">{borrower.name}</h4>
        <span className="text-sm font-medium">
          {formatAmount(borrower.amount)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          {borrower.loanType}
        </span>
        <Badge variant={getStatusVariant(borrower.status)}>
          {borrower.status}
        </Badge>
      </div>
    </div>
  );
}
