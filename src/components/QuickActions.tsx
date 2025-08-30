import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, MessageCircle, CloudRain, TrendingUp, Bell, Users } from "lucide-react";

export const QuickActions = () => {
  const actions = [
    { icon: Camera, label: "Scan Crop", color: "bg-green-500" },
    { icon: MessageCircle, label: "Ask AI", color: "bg-blue-500" },
    { icon: CloudRain, label: "Weather", color: "bg-sky-500" },
    { icon: TrendingUp, label: "Market", color: "bg-orange-500" },
    { icon: Bell, label: "Alerts", color: "bg-red-500" },
    { icon: Users, label: "Community", color: "bg-purple-500" }
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-20 flex-col gap-2 hover:scale-105 transition-transform"
            >
              <action.icon className={`w-6 h-6 text-white p-1 rounded ${action.color}`} />
              <span className="text-xs">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};