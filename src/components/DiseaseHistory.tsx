import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp } from "lucide-react";

interface DiseaseRecord {
  id: string;
  disease: string;
  date: string;
  severity: "Low" | "Medium" | "High";
  treated: boolean;
}

export const DiseaseHistory = () => {
  const mockHistory: DiseaseRecord[] = [
    { id: "1", disease: "Leaf Blight", date: "2024-01-15", severity: "Medium", treated: true },
    { id: "2", disease: "Aphid Infestation", date: "2024-01-10", severity: "Low", treated: true }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Disease History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockHistory.map((record) => (
            <div key={record.id} className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">{record.disease}</p>
                <p className="text-sm text-gray-500">{record.date}</p>
              </div>
              <div className="flex gap-2">
                <Badge variant={record.severity === "High" ? "destructive" : "secondary"}>
                  {record.severity}
                </Badge>
                {record.treated && <Badge variant="outline">Treated</Badge>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};