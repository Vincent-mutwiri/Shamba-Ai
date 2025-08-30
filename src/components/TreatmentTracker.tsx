import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, DollarSign, CheckCircle, AlertCircle } from "lucide-react";

interface Treatment {
  id: string;
  disease: string;
  startDate: string;
  duration: number; // days
  totalCost: number;
  dailyCost: number;
  status: 'active' | 'completed' | 'paused';
  progress: number;
  notes: string[];
}

export const TreatmentTracker = () => {
  const [treatments, setTreatments] = useState<Treatment[]>([
    {
      id: "1",
      disease: "Leaf Blight",
      startDate: "2024-01-15",
      duration: 14,
      totalCost: 2500,
      dailyCost: 178,
      status: 'active',
      progress: 60,
      notes: ["Applied fungicide", "Removed affected leaves"]
    }
  ]);

  const updateProgress = (id: string, progress: number) => {
    setTreatments(prev => 
      prev.map(t => t.id === id ? { ...t, progress } : t)
    );
  };

  const completeTreatment = (id: string) => {
    setTreatments(prev => 
      prev.map(t => t.id === id ? { ...t, status: 'completed', progress: 100 } : t)
    );
  };

  const getTotalCost = () => treatments.reduce((sum, t) => sum + t.totalCost, 0);
  const getActiveTreatments = () => treatments.filter(t => t.status === 'active').length;

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{getActiveTreatments()}</div>
            <div className="text-sm text-gray-500">Active Treatments</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">KES {getTotalCost()}</div>
            <div className="text-sm text-gray-500">Total Investment</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {treatments.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-500">Completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Treatment List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Treatment Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {treatments.map((treatment) => (
              <div key={treatment.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">{treatment.disease}</h3>
                    <p className="text-sm text-gray-500">
                      Started: {treatment.startDate} • {treatment.duration} days
                    </p>
                  </div>
                  <Badge 
                    variant={
                      treatment.status === 'completed' ? 'default' : 
                      treatment.status === 'active' ? 'secondary' : 'outline'
                    }
                  >
                    {treatment.status}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{treatment.progress}%</span>
                    </div>
                    <Progress value={treatment.progress} className="h-2" />
                  </div>

                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>KES {treatment.totalCost} total</span>
                    </div>
                    <span>KES {treatment.dailyCost}/day</span>
                  </div>

                  {treatment.notes.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-1">Recent Notes:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {treatment.notes.slice(-2).map((note, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {treatment.status === 'active' && (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateProgress(treatment.id, Math.min(100, treatment.progress + 20))}
                      >
                        Update Progress
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => completeTreatment(treatment.id)}
                      >
                        Mark Complete
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};