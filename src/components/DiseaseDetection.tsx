import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { DiseaseDetailsCard } from "./DiseaseDetailsCard";

interface AnalysisResult {
  disease: string;
  confidence: number;
  severity: string;
  description: string;
  treatment: string;
  prevention: string;
}

export const DiseaseDetection = () => {
  // Initialize Inflection AI
  const INFLECTION_API_KEY = import.meta.env.VITE_INFLECTION_API_KEY;
  const INFLECTION_API_URL = 'https://api.inflection.ai/external/api/inference';
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      toast({
        title: "API Configuration Error",
        description: "Gemini API key is not configured. Please check your environment variables.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Convert image to base64 for API
      const base64Image = selectedImage.split(',')[1];
      
      const prompt = `Analyze this crop image for diseases, pests, and health issues. Provide:
1. Disease/condition name
2. Confidence percentage (0-100)
3. Severity level (None/Low/Medium/High)
4. Detailed description of what you see
5. Treatment recommendations
6. Prevention measures

Focus on Kenyan crops like maize, beans, potatoes, tea, coffee. Be specific about visual symptoms you observe.`;
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: base64Image
                }
              }
            ]
          }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1000
          }
        })
      });
      
      if (!response.ok) {
        throw new Error(`Gemini Vision API failed: ${response.status}`);
      }
      
      const data = await response.json();
      const analysisText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!analysisText) {
        throw new Error('No analysis from Gemini Vision');
      }
      
      // Parse the response to extract structured data
      const parsedResult = parseAnalysisResponse(analysisText);
      
      setAnalysisResult(parsedResult);
      
      toast({
        title: "Analysis Complete",
        description: `Detected: ${parsedResult.disease} (${parsedResult.confidence}% confidence)`,
        variant: parsedResult.severity === "High" ? "destructive" : "default",
      });
      
    } catch (error) {
      console.error("Error analyzing image:", error);
      
      // Fallback to mock analysis
      const fallbackResult = {
        disease: "Analysis Unavailable",
        confidence: 0,
        severity: "Unknown" as const,
        description: "Unable to analyze image with AI. Please ensure good lighting and clear focus on affected plant parts.",
        treatment: "Consult local agricultural extension officer • Take clearer photos • Check internet connection",
        prevention: "Regular monitoring • Good photography practices • Stable internet connection"
      };
      
      setAnalysisResult(fallbackResult);
      
      toast({
        title: "Analysis failed",
        description: "Using offline mode. Check your internet connection.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Parse AI response into structured format
  const parseAnalysisResponse = (text: string): AnalysisResult => {
    const lines = text.split('\n').filter(line => line.trim());
    
    let disease = "Unknown Condition";
    let confidence = 50;
    let severity = "Medium";
    let description = "Analysis completed";
    let treatment = "Consult agricultural expert";
    let prevention = "Regular monitoring recommended";
    
    // Extract information from AI response
    for (const line of lines) {
      const lower = line.toLowerCase();
      if (lower.includes('disease') || lower.includes('condition')) {
        disease = line.replace(/^\d+\.\s*/, '').trim();
      } else if (lower.includes('confidence')) {
        const match = line.match(/(\d+)%?/);
        if (match) confidence = parseInt(match[1]);
      } else if (lower.includes('severity')) {
        if (lower.includes('high')) severity = "High";
        else if (lower.includes('low')) severity = "Low";
        else if (lower.includes('none')) severity = "None";
        else severity = "Medium";
      } else if (lower.includes('description') || lower.includes('symptoms')) {
        description = line.replace(/^\d+\.\s*/, '').replace(/description:?/i, '').trim();
      } else if (lower.includes('treatment')) {
        treatment = line.replace(/^\d+\.\s*/, '').replace(/treatment:?/i, '').trim();
      } else if (lower.includes('prevention')) {
        prevention = line.replace(/^\d+\.\s*/, '').replace(/prevention:?/i, '').trim();
      }
    }
    
    return { disease, confidence, severity, description, treatment, prevention };
  };

  // Format treatment and prevention strings to arrays
  const formatTextToArray = (text: string): string[] => {
    if (!text) return [];
    // Split by common delimiters and clean up
    return text.split(/[|•\n]/).map(item => item.trim()).filter(item => item.length > 0);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-green-600 text-white p-3 sm:p-4 lg:p-6">
          <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
            <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
            Disease Detection
          </CardTitle>
          <p className="text-green-100 text-xs sm:text-sm">
            Upload a photo of your crop to detect diseases
          </p>
        </CardHeader>
        
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <div className="space-y-3 sm:space-y-4">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 lg:p-8 text-center cursor-pointer hover:border-green-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {selectedImage ? (
                <img 
                  src={selectedImage} 
                  alt="Uploaded crop" 
                  className="max-h-48 sm:max-h-56 lg:max-h-64 mx-auto rounded-lg"
                />
              ) : (
                <div className="space-y-2">
                  <Upload className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto text-gray-400" />
                  <p className="text-gray-600 text-sm sm:text-base">Click to upload crop image</p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    JPG, PNG up to 10MB
                  </p>
                </div>
              )}
            </div>
            
            <label htmlFor="disease-image-upload" className="sr-only">
              Upload an image for disease detection
            </label>
            <input
              id="disease-image-upload"
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
              aria-label="Upload an image for disease detection"
            />
            
            <Button 
              onClick={analyzeImage}
              disabled={!selectedImage || isAnalyzing || !import.meta.env.VITE_GEMINI_API_KEY}
              className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base py-2 sm:py-2.5"
            >
              {isAnalyzing ? "Analyzing..." : !import.meta.env.VITE_GEMINI_API_KEY ? "API Not Configured" : "Analyze Image"}
            </Button>
            
            <div className="text-xs sm:text-sm text-gray-600 space-y-1">
              <p><strong>Tips for best results:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Take clear, well-lit photos</li>
                <li>Focus on affected leaves or stems</li>
                <li className="hidden sm:list-item">Include multiple angles if possible</li>
                <li>Avoid blurry or dark images</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {isAnalyzing ? (
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="text-center py-8 sm:py-12 lg:py-16">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 border-b-2 border-green-600 mx-auto mb-3 sm:mb-4"></div>
              <p className="text-gray-600 text-sm sm:text-base">Analyzing image...</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                Our AI is examining your crop for diseases and pests
              </p>
            </div>
          </CardContent>
        </Card>
      ) : analysisResult ? (
        <DiseaseDetailsCard
          diseaseName={analysisResult.disease}
          confidence={analysisResult.confidence}
          severity={analysisResult.severity as "High" | "Medium" | "Low" | "None"}
          description={analysisResult.description}
          treatment={formatTextToArray(analysisResult.treatment)}
          prevention={formatTextToArray(analysisResult.prevention)}
        />
      ) : (
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
              Analysis Results
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="text-center py-8 sm:py-12 lg:py-16 text-gray-500">
              <Camera className="w-8 h-8 sm:w-10 sm:w-10 lg:w-12 lg:h-12 mx-auto mb-2 sm:mb-3 opacity-50" />
              <p className="text-sm sm:text-base">Upload an image to get started</p>
              <p className="text-xs sm:text-sm mt-1">
                Our AI will analyze your crop and provide treatment recommendations
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
