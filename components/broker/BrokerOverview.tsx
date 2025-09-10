// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
// import { Phone, Mail, MessageCircle, CheckCircle, Clock } from "lucide-react";


// import { useState } from "react";
// import { Broker } from "@/lib/types";
// import { mockBroker, onboardingSteps } from "@/lib/data/mockData";

// interface BrokerOverviewProps {
//   broker?: Broker;
// }

// export function BrokerOverview({ broker = mockBroker }: BrokerOverviewProps) {
//   const [aiAssistantEnabled, setAiAssistantEnabled] = useState(false);

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   return (
//     <Card className="h-full">
//       <CardHeader>
//         <CardTitle>Broker Overview</CardTitle>
//       </CardHeader>

//       <CardContent className="space-y-6">
//         {/* Broker Info */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold">{broker.name}</h3>

//           {/* Stats */}
//           <div className="grid grid-cols-3 gap-4 text-center">
//             <div className="space-y-1">
//               <div className="text-2xl font-bold text-primary">
//                 {broker.deals}
//               </div>
//               <div className="text-xs text-muted-foreground">Deals</div>
//             </div>
//             <div className="space-y-1">
//               <div className="text-2xl font-bold text-success">
//                 {broker.approvalRate}%
//               </div>
//               <div className="text-xs text-muted-foreground">Approval Rate</div>
//             </div>
//             <div className="space-y-1">
//               <div className="text-2xl font-bold text-warning">
//                 {formatCurrency(broker.pending)}
//               </div>
//               <div className="text-xs text-muted-foreground">Pending</div>
//             </div>
//           </div>

//           {/* Contact Buttons */}
//           <div className="flex gap-2">
//             <Button variant="outline" size="sm" className="flex-1">
//               <Phone className="h-4 w-4 mr-2" />
//               Call
//             </Button>
//             <Button variant="outline" size="sm" className="flex-1">
//               <Mail className="h-4 w-4 mr-2" />
//               Email
//             </Button>
//             <Button variant="outline" size="sm" className="flex-1">
//               <MessageCircle className="h-4 w-4 mr-2" />
//               Chat
//             </Button>
//           </div>
//         </div>

//         {/* Onboarding Workflow */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold">Onboarding Workflow</h3>

//           <div className="space-y-3">
//             {onboardingSteps.map((step, index) => (
//               <div key={index} className="flex items-center gap-3">
//                 <div className="flex-shrink-0">
//                   {index < 3 ? (
//                     <CheckCircle className="h-5 w-5 text-success" />
//                   ) : index === 3 ? (
//                     <Clock className="h-5 w-5 text-warning" />
//                   ) : (
//                     <div className="h-5 w-5 border-2 border-muted-foreground rounded-full" />
//                   )}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm font-medium text-muted-foreground">
//                     {index + 1}.
//                   </span>
//                   <span
//                     className={`text-sm ${
//                       index < 3
//                         ? "text-foreground"
//                         : index === 3
//                         ? "text-warning font-medium"
//                         : "text-muted-foreground"
//                     }`}
//                   >
//                     {step}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* AI Assistant Toggle */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold">AI Assistant</h3>

//           <div className="flex items-center justify-between">
//             <Label htmlFor="ai-assistant" className="text-sm">
//               E Ardsassist
//             </Label>
//             <Switch
//               id="ai-assistant"
//               checked={aiAssistantEnabled}
//               onCheckedChange={setAiAssistantEnabled}
//             />
//           </div>

//           {aiAssistantEnabled && (
//             <div className="p-3 border border-info/20 rounded-lg bg-info/5">
//               <p className="text-sm text-info">
//                 AI Assistant is now active and will provide real-time
//                 recommendations.
//               </p>
//             </div>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MessageCircle, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

interface BrokerOverviewProps {
  broker: {
    name: string;
    deals: number;
    approval_rate: number | string;
    pending: number;
  } | null; // allow null
  onboardingSteps: string[];
}

export function BrokerOverview({
  broker,
  onboardingSteps,
}: BrokerOverviewProps) {
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(false);

  if (!broker) return <div>Loading Broker Info...</div>;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Broker Overview</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Broker Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{broker.name}</h3>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">
                {broker.deals}
              </div>
              <div className="text-xs text-muted-foreground">Deals</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-success">
                {broker.approval_rate}
              </div>
              <div className="text-xs text-muted-foreground">Approval Rate</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-warning">
                {formatCurrency(broker.pending)}
              </div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat
            </Button>
          </div>
        </div>

     
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Onboarding Workflow</h3>
          <div className="space-y-3">
            {onboardingSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {index < 3 ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : index === 3 ? (
                    <Clock className="h-5 w-5 text-warning" />
                  ) : (
                    <div className="h-5 w-5 border-2 border-muted-foreground rounded-full" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    {index + 1}.
                  </span>
                  <span
                    className={`text-sm ${
                      index < 3
                        ? "text-foreground"
                        : index === 3
                        ? "text-warning font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Assistant Toggle */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">AI Assistant</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-assistant" className="text-sm">
              E Ardsassist
            </Label>
            <Switch
              id="ai-assistant"
              checked={aiAssistantEnabled}
              onCheckedChange={setAiAssistantEnabled}
            />
          </div>

          {aiAssistantEnabled && (
            <div className="p-3 border border-info/20 rounded-lg bg-info/5">
              <p className="text-sm text-info">
                AI Assistant is now active and will provide real-time
                recommendations.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
