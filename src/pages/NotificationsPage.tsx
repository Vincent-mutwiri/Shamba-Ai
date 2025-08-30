import { DashboardLayout } from "@/components/DashboardLayout";
import { NotificationCenter } from "@/components/NotificationCenter";
import { SmartAlerts } from "@/components/SmartAlerts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Zap } from "lucide-react";

export default function NotificationsPage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Notifications & Alerts
          </h1>
          <p className="text-gray-600">
            Stay informed with smart notifications for weather, market prices, and farming activities
          </p>
        </div>
        
        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Smart Alerts
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notification Center
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="alerts">
            <SmartAlerts />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationCenter />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}