import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Settings, DollarSign, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface DetectionResult {
  disease: string;
  confidence: number;
  severity: string;
  description: string;
  treatment: string[];
  prevention: string[];
  estimatedCost: number;
  treatmentDuration: string;
}

interface TreatmentRecord {
  id: string;
  disease: string;
  date: string;
  cost: number;
  status: 'ongoing' | 'completed';
}

export const EnhancedDiseaseDetection = () => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
  
  const [images, setImages] = useState<string[]>([]);
  const [confidenceThreshold, setConfidenceThreshold] = useState([70]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<DetectionResult[]>([]);
  const [treatments, setTreatments] = useState<TreatmentRecord[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleBatchUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const analyzeBatch = async () => {
    if (!images.length || !genAI) return;
    
    setIsAnalyzing(true);
    const batchResults: DetectionResult[] = [];
    
    for (const image of images) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const base64String = image.split(',')[1];
        const mimeType = image.split(',')[0].split(':')[1].split(';')[0];
        
        const prompt = `Analyze this crop image and return JSON with disease, confidence (0-100), severity, description, treatment array, prevention array, estimatedCost (KES), and treatmentDuration. Focus on Kenya-specific solutions.`;
        
        const result = await model.generateContent([
          prompt,
          { inlineData: { data: base64String, mimeType } }
        ]);
        
        const response = JSON.parse(result.response.text().replace(/```json\n?/g, '').replace(/```\n?/g, ''));
        
        if (response.confidence >= confidenceThreshold[0]) {
          batchResults.push({
            disease: response.disease || "Unknown",
            confidence: response.confidence || 0,
            severity: response.severity || "Medium",
            description: response.description || "",
            treatment: Array.isArray(response.treatment) ? response.treatment : [response.treatment],
            prevention: Array.isArray(response.prevention) ? response.prevention : [response.prevention],
            estimatedCost: response.estimatedCost || 0,
            treatmentDuration: response.treatmentDuration || "1-2 weeks"
          });
        }
      } catch (error) {
        console.error("Analysis error:", error);
      }
    }
    
    setResults(batchResults);
    setIsAnalyzing(false);
    
    toast({
      title: "Batch Analysis Complete",
      description: `Analyzed ${images.length} images, found ${batchResults.length} issues above ${confidenceThreshold[0]}% confidence`,
    });
  };

  const startTreatment = (result: DetectionResult) => {
    const newTreatment: TreatmentRecord = {
      id: Date.now().toString(),
      disease: result.disease,
      date: new Date().toISOString().split('T')[0],
      cost: result.estimatedCost,
      status: 'ongoing'
    };
    setTreatments(prev => [...prev, newTreatment]);
    
    toast({
      title: "Treatment Started",
      description: `Tracking treatment for ${result.disease}`,
    });
  };

  const completeTreatment = (id: string) => {
    setTreatments(prev => 
      prev.map(t => t.id === id ? { ...t, status: 'completed' as const } : t)
    );
  };

  return (
    <div className="space-y-4">
      {/* Settings Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Detection Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Confidence Threshold: {confidenceThreshold[0]}%</label>
              <Slider
                value={confidenceThreshold}
                onValueChange={setConfidenceThreshold}
                max={100}
                min={50}
                step={5}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Batch Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Batch Disease Detection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-400"
              onClick={() => fileInputRef.current?.click()}
            >
              {images.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {images.slice(0, 6).map((img, idx) => (
                    <img key={idx} src={img} alt={`Crop ${idx + 1}`} className="h-20 w-20 object-cover rounded" />
                  ))}
                  {images.length > 6 && <div className="h-20 w-20 bg-gray-100 rounded flex items-center justify-center text-sm">+{images.length - 6}</div>}
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                  <p>Upload multiple crop images</p>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleBatchUpload}
              className="hidden"
            />
            
            <Button 
              onClick={analyzeBatch}
              disabled={!images.length || isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? "Analyzing..." : `Analyze ${images.length} Images`}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Detection Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((result, idx) => (
                <div key={idx} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{result.disease}</h3>
                    <div className="flex gap-2">
                      <Badge variant={result.confidence >= 80 ? "default" : "secondary"}>
                        {result.confidence}%
                      </Badge>
                      <Badge variant={result.severity === "High" ? "destructive" : "outline"}>
                        {result.severity}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{result.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm">KES {result.estimatedCost}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{result.treatmentDuration}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => startTreatment(result)}
                    size="sm"
                    className="w-full"
                  >
                    Start Treatment Tracking
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Treatment Tracking */}
      {treatments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Active Treatments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {treatments.map((treatment) => (
                <div key={treatment.id} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">{treatment.disease}</p>
                    <p className="text-sm text-gray-500">Started: {treatment.date} • KES {treatment.cost}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={treatment.status === 'completed' ? 'default' : 'secondary'}>
                      {treatment.status}
                    </Badge>
                    {treatment.status === 'ongoing' && (
                      <Button size="sm" onClick={() => completeTreatment(treatment.id)}>
                        Complete
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};