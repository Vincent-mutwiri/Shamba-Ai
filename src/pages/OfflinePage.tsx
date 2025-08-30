import { DashboardLayout } from "@/components/DashboardLayout";
import { OfflineDiseaseDetection } from "@/components/OfflineDiseaseDetection";
import { DataSync } from "@/components/DataSync";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WifiOff, Database, Scan } from "lucide-react";

export default function OfflinePage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Offline Capabilities
          </h1>
          <p className="text-gray-600">
            Access critical farming tools even without internet connection
          </p>
        </div>
        
        <Tabs defaultValue="detection" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="detection" className="flex items-center gap-2">
              <Scan className="w-4 h-4" />
              Offline Detection
            </TabsTrigger>
            <TabsTrigger value="sync" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Data Sync
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="detection">
            <OfflineDiseaseDetection />
          </TabsContent>
          
          <TabsContent value="sync">
            <DataSync />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}