import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Calculator, TrendingUp } from "lucide-react";

interface CostBreakdown {
  pesticides: number;
  labor: number;
  equipment: number;
  followUp: number;
  total: number;
}

interface TreatmentOption {
  name: string;
  type: 'organic' | 'chemical' | 'biological';
  cost: CostBreakdown;
  effectiveness: number;
  duration: string;
}

export const CostEstimator = () => {
  const [farmSize, setFarmSize] = useState("");
  const [disease, setDisease] = useState("");
  const [severity, setSeverity] = useState("");
  const [estimates, setEstimates] = useState<TreatmentOption[]>([]);

  const treatmentDatabase: Record<string, TreatmentOption[]> = {
    "Leaf Blight": [
      {
        name: "Chemical Treatment",
        type: 'chemical',
        cost: { pesticides: 1500, labor: 800, equipment: 200, followUp: 300, total: 2800 },
        effectiveness: 90,
        duration: "7-10 days"
      },
      {
        name: "Organic Treatment",
        type: 'organic',
        cost: { pesticides: 800, labor: 1200, equipment: 100, followUp: 400, total: 2500 },
        effectiveness: 75,
        duration: "14-21 days"
      }
    ],
    "Aphid Infestation": [
      {
        name: "Biological Control",
        type: 'biological',
        cost: { pesticides: 600, labor: 400, equipment: 50, followUp: 200, total: 1250 },
        effectiveness: 85,
        duration: "10-14 days"
      }
    ]
  };

  const calculateCosts = () => {
    if (!disease || !farmSize) return;
    
    const baseOptions = treatmentDatabase[disease] || [];
    const sizeMultiplier = parseFloat(farmSize) || 1;
    const severityMultiplier = severity === "High" ? 1.5 : severity === "Medium" ? 1.2 : 1;
    
    const scaledOptions = baseOptions.map(option => ({
      ...option,
      cost: {
        pesticides: Math.round(option.cost.pesticides * sizeMultiplier * severityMultiplier),
        labor: Math.round(option.cost.labor * sizeMultiplier),
        equipment: Math.round(option.cost.equipment * sizeMultiplier),
        followUp: Math.round(option.cost.followUp * sizeMultiplier),
        total: Math.round(option.cost.total * sizeMultiplier * severityMultiplier)
      }
    }));
    
    setEstimates(scaledOptions);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Treatment Cost Estimator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium">Farm Size (acres)</label>
              <Input 
                value={farmSize}
                onChange={(e) => setFarmSize(e.target.value)}
                placeholder="e.g., 2.5"
                type="number"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Disease/Pest</label>
              <Select value={disease} onValueChange={setDisease}>
                <SelectTrigger>
                  <SelectValue placeholder="Select disease" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Leaf Blight">Leaf Blight</SelectItem>
                  <SelectItem value="Aphid Infestation">Aphid Infestation</SelectItem>
                  <SelectItem value="Root Rot">Root Rot</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="text-sm font-medium">Severity Level</label>
            <Select value={severity} onValueChange={setSeverity}>
              <SelectTrigger>
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={calculateCosts} className="w-full">
            Calculate Treatment Costs
          </Button>
        </CardContent>
      </Card>

      {estimates.length > 0 && (
        <div className="space-y-4">
          {estimates.map((option, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{option.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-green-600">
                      KES {option.cost.total}
                    </span>
                    <span className="text-sm text-gray-500">
                      {option.effectiveness}% effective
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Pesticides/Materials:</span>
                      <span className="font-medium">KES {option.cost.pesticides}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Labor:</span>
                      <span className="font-medium">KES {option.cost.labor}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Equipment:</span>
                      <span className="font-medium">KES {option.cost.equipment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Follow-up:</span>
                      <span className="font-medium">KES {option.cost.followUp}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-sm text-gray-600">Duration: {option.duration}</span>
                  <Button size="sm">
                    Select Treatment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};