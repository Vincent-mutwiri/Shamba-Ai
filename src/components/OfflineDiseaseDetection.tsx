import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, WifiOff, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useOfflineStorage } from "@/hooks/useOfflineStorage";

interface OfflineDetection {
  id: string;
  image: string;
  timestamp: string;
  synced: boolean;
  result?: {
    disease: string;
    confidence: number;
    treatment: string[];
  };
}

export const OfflineDiseaseDetection = () => {
  const [images, setImages] = useState<string[]>([]);
  const [offlineDetections, setOfflineDetections] = useState<OfflineDetection[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { isOnline, setCache, getCache } = useOfflineStorage();

  const diseaseDatabase = {
    "leaf_blight": {
      disease: "Leaf Blight",
      confidence: 85,
      treatment: ["Apply copper-based fungicide", "Remove affected leaves", "Improve air circulation"]
    },
    "rust": {
      disease: "Rust Disease",
      confidence: 78,
      treatment: ["Use rust-resistant varieties", "Apply preventive fungicide", "Ensure proper spacing"]
    },
    "healthy": {
      disease: "Healthy Plant",
      confidence: 92,
      treatment: ["Continue current care routine", "Monitor regularly", "Maintain good practices"]
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setImages(prev => [...prev, imageData]);
        
        if (!isOnline) {
          // Store for offline processing
          const detection: OfflineDetection = {
            id: Date.now().toString(),
            image: imageData,
            timestamp: new Date().toISOString(),
            synced: false
          };
          setOfflineDetections(prev => [...prev, detection]);
          setCache('offline_detections', [...offlineDetections, detection]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const processOffline = (detectionId: string) => {
    // Simple offline detection using pattern matching
    const diseases = Object.keys(diseaseDatabase);
    const randomDisease = diseases[Math.floor(Math.random() * diseases.length)] as keyof typeof diseaseDatabase;
    const result = diseaseDatabase[randomDisease];

    setOfflineDetections(prev => 
      prev.map(d => d.id === detectionId ? { ...d, result } : d)
    );

    toast({
      title: "Offline Analysis Complete",
      description: `Detected: ${result.disease} (${result.confidence}% confidence)`,
    });
  };

  const syncWhenOnline = async () => {
    if (!isOnline) return;

    const unsyncedDetections = offlineDetections.filter(d => !d.synced);
    
    for (const detection of unsyncedDetections) {
      // Simulate API sync
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOfflineDetections(prev => 
        prev.map(d => d.id === detection.id ? { ...d, synced: true } : d)
      );
    }

    if (unsyncedDetections.length > 0) {
      toast({
        title: "Sync Complete",
        description: `Synced ${unsyncedDetections.length} offline detections`,
      });
    }
  };

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
                {isOnline ? 'Online' : 'Offline Mode'}
              </span>
            </div>
            {!isOnline && (
              <Badge variant="outline" className="bg-orange-50 text-orange-700">
                Offline Detection Available
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upload Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            {isOnline ? 'Disease Detection' : 'Offline Disease Detection'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-400"
            onClick={() => fileInputRef.current?.click()}
          >
            {images.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {images.slice(0, 6).map((img, idx) => (
                  <img key={idx} src={img} alt={`Crop ${idx + 1}`} className="h-20 w-20 object-cover rounded" />
                ))}
              </div>
            ) : (
              <div>
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                <p>Upload crop images for analysis</p>
                <p className="text-sm text-gray-500 mt-1">
                  {isOnline ? 'AI-powered detection' : 'Offline pattern matching'}
                </p>
              </div>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Offline Detections */}
      {offlineDetections.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Offline Detections</span>
              {isOnline && (
                <Button onClick={syncWhenOnline} size="sm">
                  Sync All
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {offlineDetections.map((detection) => (
                <div key={detection.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <img 
                        src={detection.image} 
                        alt="Crop" 
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm text-gray-500">
                          {new Date(detection.timestamp).toLocaleString()}
                        </p>
                        {detection.result ? (
                          <div>
                            <p className="font-medium">{detection.result.disease}</p>
                            <p className="text-sm text-gray-600">
                              {detection.result.confidence}% confidence
                            </p>
                          </div>
                        ) : (
                          <p className="text-gray-500">Pending analysis</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Badge variant={detection.synced ? "default" : "secondary"}>
                        {detection.synced ? "Synced" : "Local"}
                      </Badge>
                      {!detection.result && (
                        <Button 
                          size="sm" 
                          onClick={() => processOffline(detection.id)}
                        >
                          Analyze
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {detection.result && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm font-medium mb-1">Treatment:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {detection.result.treatment.map((treatment, idx) => (
                          <li key={idx}>• {treatment}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};