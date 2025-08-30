import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bell, CloudRain, TrendingUp, Calendar, AlertTriangle, X } from "lucide-react";

interface Notification {
  id: string;
  type: 'weather' | 'market' | 'seasonal' | 'disease';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  timestamp: string;
  read: boolean;
}

interface NotificationSettings {
  weather: boolean;
  market: boolean;
  seasonal: boolean;
  disease: boolean;
}

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "weather",
      title: "Heavy Rain Alert",
      message: "Heavy rainfall expected in next 24 hours. Protect young crops and ensure proper drainage.",
      priority: "high",
      timestamp: new Date().toISOString(),
      read: false
    },
    {
      id: "2",
      type: "market",
      title: "Maize Price Increase",
      message: "Maize prices up 15% at Nakuru market. Good time to sell if you have stock.",
      priority: "medium",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false
    },
    {
      id: "3",
      type: "seasonal",
      title: "Planting Season Reminder",
      message: "Optimal planting window for beans starts in 2 weeks. Prepare your seeds and soil.",
      priority: "medium",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: true
    }
  ]);

  const [settings, setSettings] = useState<NotificationSettings>({
    weather: true,
    market: true,
    seasonal: true,
    disease: true
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'weather': return <CloudRain className="w-4 h-4" />;
      case 'market': return <TrendingUp className="w-4 h-4" />;
      case 'seasonal': return <Calendar className="w-4 h-4" />;
      case 'disease': return <AlertTriangle className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const weatherConditions = ['Heavy Rain', 'Drought Warning', 'Frost Alert', 'Strong Winds'];
      const marketUpdates = ['Price Increase', 'New Buyer Available', 'Market Day Reminder'];
      const seasonalReminders = ['Planting Time', 'Harvest Season', 'Fertilizer Application'];
      
      if (Math.random() > 0.8) { // 20% chance every interval
        const types = ['weather', 'market', 'seasonal'] as const;
        const type = types[Math.floor(Math.random() * types.length)];
        
        let title = '';
        let message = '';
        
        switch (type) {
          case 'weather':
            title = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
            message = 'Check weather conditions and take appropriate action for your crops.';
            break;
          case 'market':
            title = marketUpdates[Math.floor(Math.random() * marketUpdates.length)];
            message = 'Market conditions have changed. Review current prices and opportunities.';
            break;
          case 'seasonal':
            title = seasonalReminders[Math.floor(Math.random() * seasonalReminders.length)];
            message = 'Important farming activity reminder based on current season.';
            break;
        }
        
        if (settings[type]) {
          const newNotification: Notification = {
            id: Date.now().toString(),
            type,
            title,
            message,
            priority: 'medium',
            timestamp: new Date().toISOString(),
            read: false
          };
          
          setNotifications(prev => [newNotification, ...prev]);
        }
      }
    }, 5000); // Check every 5 seconds
    
    return () => clearInterval(interval);
  }, [settings]);

  return (
    <div className="space-y-4">
      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Settings
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CloudRain className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Weather Alerts</span>
              </div>
              <Switch 
                checked={settings.weather}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, weather: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm">Market Prices</span>
              </div>
              <Switch 
                checked={settings.market}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, market: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span className="text-sm">Seasonal Reminders</span>
              </div>
              <Switch 
                checked={settings.seasonal}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, seasonal: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm">Disease Alerts</span>
              </div>
              <Switch 
                checked={settings.disease}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, disease: checked }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`border rounded-lg p-4 ${!notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-full ${
                        notification.type === 'weather' ? 'bg-blue-100 text-blue-600' :
                        notification.type === 'market' ? 'bg-green-100 text-green-600' :
                        notification.type === 'seasonal' ? 'bg-purple-100 text-purple-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {getIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      {!notification.read && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark Read
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => dismissNotification(notification.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};