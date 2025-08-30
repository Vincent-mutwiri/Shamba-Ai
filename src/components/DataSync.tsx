import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Download, Upload, Database, WifiOff, CheckCircle } from "lucide-react";
import { useOfflineStorage } from "@/hooks/useOfflineStorage";
import { useToast } from "@/hooks/use-toast";

interface SyncItem {
  id: string;
  type: 'weather' | 'market' | 'disease' | 'chat';
  data: any;
  timestamp: string;
  synced: boolean;
}

export const DataSync = () => {
  const [syncItems, setSyncItems] = useState<SyncItem[]>([]);
  const [isSync, setIsSync] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const { isOnline, setCache, getCache, clearExpiredCache } = useOfflineStorage();
  const { toast } = useToast();

  useEffect(() => {
    loadCachedData();
    clearExpiredCache();
  }, []);

  const loadCachedData = () => {
    const cached = getCache<SyncItem[]>('sync_queue') || [];
    setSyncItems(cached);
  };

  const addToSyncQueue = (type: SyncItem['type'], data: any) => {
    const item: SyncItem = {
      id: Date.now().toString(),
      type,
      data,
      timestamp: new Date().toISOString(),
      synced: false
    };
    
    const updated = [...syncItems, item];
    setSyncItems(updated);
    setCache('sync_queue', updated);
  };

  const syncData = async () => {
    if (!isOnline) {
      toast({
        title: "No Internet Connection",
        description: "Please connect to the internet to sync data",
        variant: "destructive"
      });
      return;
    }

    setIsSync(true);
    setSyncProgress(0);
    
    const unsyncedItems = syncItems.filter(item => !item.synced);
    
    for (let i = 0; i < unsyncedItems.length; i++) {
      const item = unsyncedItems[i];
      
      // Simulate API sync
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mark as synced
      setSyncItems(prev => 
        prev.map(syncItem => 
          syncItem.id === item.id ? { ...syncItem, synced: true } : syncItem
        )
      );
      
      setSyncProgress(((i + 1) / unsyncedItems.length) * 100);
    }
    
    setIsSync(false);
    
    if (unsyncedItems.length > 0) {
      toast({
        title: "Sync Complete",
        description: `Successfully synced ${unsyncedItems.length} items`
      });
    }
  };

  const downloadCriticalData = async () => {
    setIsSync(true);
    
    // Simulate downloading critical data
    const criticalData = {
      weather: { temperature: 24, humidity: 65, forecast: "Partly cloudy" },
      market: { maize: 45, beans: 120, potatoes: 35 },
      diseases: ["Leaf Blight", "Rust", "Aphids"],
      treatments: {
        "Leaf Blight": ["Copper fungicide", "Remove affected leaves"],
        "Rust": ["Rust-resistant varieties", "Preventive spray"],
        "Aphids": ["Neem oil", "Beneficial insects"]
      }
    };
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setCache('critical_weather', criticalData.weather, 6);
    setCache('critical_market', criticalData.market, 12);
    setCache('critical_diseases', criticalData.diseases, 168);
    setCache('critical_treatments', criticalData.treatments, 168);
    
    setIsSync(false);
    
    toast({
      title: "Critical Data Downloaded",
      description: "Essential farming data cached for offline use"
    });
  };

  const getCacheSize = () => {
    let size = 0;
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('agrisenti_')) {
        size += localStorage.getItem(key)?.length || 0;
      }
    });
    return (size / 1024).toFixed(2); // KB
  };

  const unsyncedCount = syncItems.filter(item => !item.synced).length;

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isOnline ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <WifiOff className="w-5 h-5 text-orange-600" />
              )}
              <span className="font-medium">
                {isOnline ? 'Connected' : 'Offline'}
              </span>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">
                Cache: {getCacheSize()} KB
              </Badge>
              {unsyncedCount > 0 && (
                <Badge variant="destructive">
                  {unsyncedCount} Unsynced
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sync Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Data Synchronization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isSync && (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Syncing data...</span>
                  <span>{Math.round(syncProgress)}%</span>
                </div>
                <Progress value={syncProgress} />
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={syncData}
                disabled={!isOnline || isSync || unsyncedCount === 0}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Sync Data ({unsyncedCount})
              </Button>
              
              <Button 
                onClick={downloadCriticalData}
                disabled={!isOnline || isSync}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Critical Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sync Queue */}
      {syncItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Sync Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {syncItems.slice(-5).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <span className="font-medium capitalize">{item.type}</span>
                    <p className="text-sm text-gray-500">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <Badge variant={item.synced ? "default" : "secondary"}>
                    {item.synced ? "Synced" : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Storage Info */}
      <Card>
        <CardHeader>
          <CardTitle>Local Storage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Cached Data</p>
              <p className="text-gray-600">{getCacheSize()} KB used</p>
            </div>
            <div>
              <p className="font-medium">Offline Ready</p>
              <p className="text-gray-600">
                {Object.keys(localStorage).filter(k => k.startsWith('agrisenti_')).length} items
              </p>
            </div>
          </div>
          
          <Button 
            onClick={clearExpiredCache}
            variant="outline" 
            size="sm" 
            className="mt-4"
          >
            Clear Expired Cache
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};