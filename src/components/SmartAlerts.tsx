import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CloudRain, TrendingUp, Calendar, AlertTriangle, Bell, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  type: 'weather' | 'market' | 'seasonal' | 'disease';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  action?: string;
  timestamp: Date;
  dismissed: boolean;
}

export const SmartAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "weather",
      severity: "high",
      title: "Heavy Rain Warning",
      message: "Heavy rainfall expected in next 24 hours. Protect crops and ensure drainage.",
      action: "Check weather dashboard",
      timestamp: new Date(),
      dismissed: false
    },
    {
      id: "2",
      type: "market",
      severity: "medium",
      title: "Maize Price Alert",
      message: "Maize prices increased 15%. Good time to sell if you have stock.",
      action: "View market dashboard",
      timestamp: new Date(Date.now() - 3600000),
      dismissed: false
    },
    {
      id: "3",
      type: "disease",
      severity: "critical",
      title: "Leaf Blight Outbreak",
      message: "Leaf blight cases reported in nearby farms. Inspect your crops immediately.",
      action: "Scan your crops",
      timestamp: new Date(Date.now() - 7200000),
      dismissed: false
    }
  ]);
  const { toast } = useToast();

  // Weather monitoring
  useEffect(() => {
    const checkWeather = () => {
      const conditions = [
        { condition: 'heavy_rain', severity: 'high' as const, title: 'Heavy Rain Warning', message: 'Heavy rainfall expected. Protect crops and ensure drainage.' },
        { condition: 'drought', severity: 'critical' as const, title: 'Drought Alert', message: 'Extended dry period detected. Consider irrigation options.' },
        { condition: 'frost', severity: 'high' as const, title: 'Frost Warning', message: 'Frost conditions expected tonight. Cover sensitive plants.' }
      ];
      
      if (Math.random() > 0.7) {
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        addAlert('weather', condition.severity, condition.title, condition.message, 'Check weather dashboard');
      }
    };

    const weatherInterval = setInterval(checkWeather, 5000);
    return () => clearInterval(weatherInterval);
  }, []);

  // Market price monitoring
  useEffect(() => {
    const checkMarketPrices = () => {
      const priceChanges = [
        { crop: 'Maize', change: '+15%', severity: 'medium' as const, message: 'Maize prices increased 15%. Good time to sell.' },
        { crop: 'Beans', change: '-8%', severity: 'low' as const, message: 'Bean prices dropped 8%. Consider holding stock.' },
        { crop: 'Potatoes', change: '+22%', severity: 'high' as const, message: 'Potato prices surged 22%. Excellent selling opportunity.' }
      ];
      
      if (Math.random() > 0.75) {
        const price = priceChanges[Math.floor(Math.random() * priceChanges.length)];
        addAlert('market', price.severity, `${price.crop} Price Alert`, price.message, 'View market dashboard');
      }
    };

    const marketInterval = setInterval(checkMarketPrices, 7000);
    return () => clearInterval(marketInterval);
  }, []);

  // Seasonal reminders
  useEffect(() => {
    const checkSeasonalTasks = () => {
      const tasks = [
        { task: 'Planting', severity: 'medium' as const, message: 'Optimal planting window for maize starts in 1 week.' },
        { task: 'Fertilizing', severity: 'high' as const, message: 'Time for second fertilizer application on your beans.' },
        { task: 'Harvesting', severity: 'critical' as const, message: 'Harvest window for wheat closes in 3 days.' }
      ];
      
      if (Math.random() > 0.8) {
        const task = tasks[Math.floor(Math.random() * tasks.length)];
        addAlert('seasonal', task.severity, `${task.task} Reminder`, task.message, 'View farming calendar');
      }
    };

    const seasonalInterval = setInterval(checkSeasonalTasks, 10000);
    return () => clearInterval(seasonalInterval);
  }, []);

  // Disease outbreak monitoring
  useEffect(() => {
    const checkDiseaseOutbreaks = () => {
      const outbreaks = [
        { disease: 'Leaf Blight', severity: 'high' as const, message: 'Leaf blight outbreak reported in nearby farms. Inspect your crops.' },
        { disease: 'Aphid Infestation', severity: 'medium' as const, message: 'Aphid activity increasing in the region. Monitor your plants.' },
        { disease: 'Root Rot', severity: 'critical' as const, message: 'Root rot cases rising due to wet conditions. Check soil drainage.' }
      ];
      
      if (Math.random() > 0.85) {
        const outbreak = outbreaks[Math.floor(Math.random() * outbreaks.length)];
        addAlert('disease', outbreak.severity, `${outbreak.disease} Alert`, outbreak.message, 'Scan your crops');
      }
    };

    const diseaseInterval = setInterval(checkDiseaseOutbreaks, 12000);
    return () => clearInterval(diseaseInterval);
  }, []);

  const addAlert = (type: Alert['type'], severity: Alert['severity'], title: string, message: string, action?: string) => {
    const newAlert: Alert = {
      id: Date.now().toString(),
      type,
      severity,
      title,
      message,
      action,
      timestamp: new Date(),
      dismissed: false
    };

    setAlerts(prev => [newAlert, ...prev.slice(0, 9)]); // Keep only 10 most recent

    // Show toast notification
    toast({
      title: title,
      description: message,
      variant: severity === 'critical' || severity === 'high' ? 'destructive' : 'default',
    });
  };

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, dismissed: true } : alert
    ));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'weather': return <CloudRain className="w-5 h-5" />;
      case 'market': return <TrendingUp className="w-5 h-5" />;
      case 'seasonal': return <Calendar className="w-5 h-5" />;
      case 'disease': return <AlertTriangle className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const activeAlerts = alerts.filter(alert => !alert.dismissed);
  const criticalAlerts = activeAlerts.filter(alert => alert.severity === 'critical');

  return (
    <div className="space-y-4">
      {/* Critical Alerts Banner */}
      {criticalAlerts.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-semibold">
                {criticalAlerts.length} Critical Alert{criticalAlerts.length > 1 ? 's' : ''}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Smart Alerts
            </div>
            <Badge variant="outline">
              {activeAlerts.length} Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeAlerts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No active alerts</p>
              <p className="text-sm">We're monitoring your farm conditions</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`border rounded-lg p-4 ${
                    alert.severity === 'critical' ? 'border-red-200 bg-red-50' :
                    alert.severity === 'high' ? 'border-orange-200 bg-orange-50' :
                    'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-full ${
                        alert.type === 'weather' ? 'bg-blue-100 text-blue-600' :
                        alert.type === 'market' ? 'bg-green-100 text-green-600' :
                        alert.type === 'seasonal' ? 'bg-purple-100 text-purple-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {getAlertIcon(alert.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{alert.title}</h4>
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-400">
                            {alert.timestamp.toLocaleString()}
                          </p>
                          {alert.action && (
                            <Button size="sm" variant="outline">
                              {alert.action}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => dismissAlert(alert.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};