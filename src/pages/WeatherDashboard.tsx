import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThermometerSun, Wind, Droplets, Sun, CloudRain, Clock, AlertTriangle } from "lucide-react";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FormattedMessage } from "@/components/FormattedMessage";
import { CountySelector } from "@/components/CountySelector";
import { getWeatherByLocation } from "@/data/complete-weather-data";

export const WeatherDashboard = () => {
  const INFLECTION_API_KEY = import.meta.env.VITE_INFLECTION_API_KEY;
  const INFLECTION_API_URL = 'https://api.inflection.ai/external/api/inference';
  
  const [loading, setLoading] = useState(false);
  const [farmingInsight, setFarmingInsight] = useState("");
  const [insightError, setInsightError] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("nairobi");
  const [selectedLocation, setSelectedLocation] = useState("");
  
  // Handle county change - reset location
  const handleCountyChange = (county: string) => {
    setSelectedCounty(county);
    setSelectedLocation("");
  };
  
  // Handle location change with debug
  const handleLocationChange = (location: string) => {
    console.log('Location changed to:', location);
    setSelectedLocation(location);
  };
  
  // Get weather data based on selected location
  const weatherData = useMemo(() => {
    const locationKey = selectedLocation || "default";
    const data = getWeatherByLocation(locationKey);
    return {
      current: data.current,
      forecast: data.forecast.map(day => ({
        ...day,
        icon: day.condition === 'sunny' ? Sun : day.condition === 'rainy' ? CloudRain : Sun
      }))
    };
  }, [selectedLocation]);
  
  // Generate farming insights based on weather conditions
  const getFarmingInsights = useCallback(() => {
    const locationName = selectedLocation || 'your area';
    const temp = weatherData.current.temperature;
    const condition = weatherData.current.condition;
    const humidity = weatherData.current.humidity;
    const wind = weatherData.current.windSpeed;
    
    let activities = [];
    let precautions = [];
    let irrigation = [];
    let risks = [];
    
    // Temperature-based advice
    if (temp > 30) {
      activities.push('Early morning or late evening farming activities');
      precautions.push('Protect workers from heat stress');
      irrigation.push('Increase watering frequency');
    } else if (temp < 18) {
      activities.push('Midday farming when temperatures are warmer');
      precautions.push('Protect sensitive crops from cold');
      irrigation.push('Reduce watering to prevent root rot');
    } else {
      activities.push('Optimal conditions for most farming activities');
      irrigation.push('Maintain regular watering schedule');
    }
    
    // Condition-based advice
    if (condition.toLowerCase().includes('rain')) {
      activities.push('Harvest mature crops before heavy rains');
      precautions.push('Ensure proper drainage in fields');
      irrigation.push('Reduce or stop irrigation');
      risks.push('Fungal diseases due to high moisture');
    } else if (condition.toLowerCase().includes('sunny')) {
      activities.push('Ideal for drying harvested crops');
      irrigation.push('Monitor soil moisture closely');
    }
    
    // Humidity-based advice
    if (humidity > 80) {
      risks.push('High disease pressure from humidity');
      precautions.push('Improve air circulation around crops');
    } else if (humidity < 50) {
      irrigation.push('Increase watering due to low humidity');
      precautions.push('Mulch to retain soil moisture');
    }
    
    // Wind-based advice
    if (wind > 20) {
      precautions.push('Avoid spraying pesticides in high winds');
      precautions.push('Stake tall crops to prevent damage');
    }
    
    const insight = `**Weather-Based Farming Advice for ${locationName}:**\n\n**Current Conditions:** ${temp}°C, ${condition}, ${humidity}% humidity, ${wind} km/h wind\n\n**Recommended Activities:**\n${activities.map(a => `• ${a}`).join('\n')}\n\n**Precautions:**\n${precautions.map(p => `• ${p}`).join('\n')}\n\n**Irrigation Advice:**\n${irrigation.map(i => `• ${i}`).join('\n')}${risks.length > 0 ? `\n\n**Pest & Disease Risks:**\n${risks.map(r => `• ${r}`).join('\n')}` : ''}`;
    
    setFarmingInsight(insight);
  }, [selectedLocation, weatherData]);
  
  // Get insights on load and location change
  useEffect(() => {
    getFarmingInsights();
  }, [getFarmingInsights]);



  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Weather Monitoring</h2>
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 mt-1">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Last updated: Just now</span>
          </div>
        </div>
        <div className="w-full sm:w-64">
          <CountySelector 
            value={selectedCounty} 
            onValueChange={handleCountyChange}
            placeholder="Select county for weather"
            showLocations={true}
            onLocationChange={handleLocationChange}
          />
        </div>
      </div>

      {/* Current Weather */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2 p-3 sm:p-4 lg:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-blue-800">
              Temperature
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
            <div className="flex items-center">
              <ThermometerSun className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-1 sm:mr-2" />
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900">
                {weatherData.current.temperature}°C
              </div>
            </div>
            <div className="text-xs sm:text-sm text-blue-600 mt-1">
              <span className="hidden sm:inline">{weatherData.current.condition}</span>
              <span className="sm:hidden">Partly Cloudy</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardHeader className="pb-2 p-3 sm:p-4 lg:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-emerald-800">
              Wind Speed
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
            <div className="flex items-center">
              <Wind className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mr-1 sm:mr-2" />
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-900">
                {weatherData.current.windSpeed} <span className="text-xs sm:text-sm">km/h</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2 p-3 sm:p-4 lg:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-purple-800">
              Humidity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
            <div className="flex items-center">
              <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mr-1 sm:mr-2" />
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-900">
                {weatherData.current.humidity}%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="pb-2 p-3 sm:p-4 lg:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-amber-800">
              UV Index
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
            <div className="flex items-center">
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mr-1 sm:mr-2" />
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-amber-900">
                {weatherData.current.uv}
              </div>
            </div>
            <div className="text-xs sm:text-sm text-amber-600 mt-1">Moderate</div>
          </CardContent>
        </Card>
      </div>

      {/* Weather Forecast */}
      <Card>
        <CardHeader className="p-3 sm:p-4 lg:p-6">
          <CardTitle className="text-base sm:text-lg">5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {weatherData.forecast.map((day, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-2 sm:p-3 lg:p-4 rounded-lg bg-gray-50"
              >
                <span className="text-xs sm:text-sm font-medium text-gray-600 text-center">
                  {day.day}
                </span>
                <day.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 my-2 text-gray-600" />
                <span className="text-sm sm:text-base lg:text-lg font-bold text-gray-800">
                  {day.temp}°C
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Weather Trend */}
      <Card>
        <CardHeader className="p-3 sm:p-4 lg:p-6">
          <CardTitle className="text-base sm:text-lg">30-Day Weather Trend</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <div className="h-64 sm:h-80">
            <div className="w-full h-full bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 relative overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Temperature line */}
                <polyline
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2"
                  points={Array.from({length: 30}, (_, i) => {
                    const baseTemp = weatherData.current.temperature;
                    const variation = Math.sin(i * 0.2) * 5 + Math.random() * 3 - 1.5;
                    const temp = baseTemp + variation;
                    const x = (i / 29) * 380 + 10;
                    const y = 180 - ((temp - 10) / 30) * 160;
                    return `${x},${y}`;
                  }).join(' ')}
                />
                
                {/* Humidity line */}
                <polyline
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2"
                  points={Array.from({length: 30}, (_, i) => {
                    const baseHumidity = weatherData.current.humidity;
                    const variation = Math.cos(i * 0.15) * 10 + Math.random() * 5 - 2.5;
                    const humidity = Math.max(30, Math.min(90, baseHumidity + variation));
                    const x = (i / 29) * 380 + 10;
                    const y = 180 - ((humidity - 20) / 70) * 160;
                    return `${x},${y}`;
                  }).join(' ')}
                />
                
                {/* Legend */}
                <g transform="translate(10, 10)">
                  <rect x="0" y="0" width="120" height="40" fill="white" fillOpacity="0.9" rx="4"/>
                  <line x1="10" y1="15" x2="25" y2="15" stroke="#dc2626" strokeWidth="2"/>
                  <text x="30" y="19" fontSize="12" fill="#374151">Temperature</text>
                  <line x1="10" y1="30" x2="25" y2="30" stroke="#2563eb" strokeWidth="2"/>
                  <text x="30" y="34" fontSize="12" fill="#374151">Humidity</text>
                </g>
                
                {/* Y-axis labels */}
                <text x="5" y="25" fontSize="10" fill="#6b7280" textAnchor="end">High</text>
                <text x="5" y="105" fontSize="10" fill="#6b7280" textAnchor="end">Med</text>
                <text x="5" y="185" fontSize="10" fill="#6b7280" textAnchor="end">Low</text>
                
                {/* X-axis labels */}
                <text x="10" y="195" fontSize="10" fill="#6b7280">Week 1</text>
                <text x="110" y="195" fontSize="10" fill="#6b7280">Week 2</text>
                <text x="210" y="195" fontSize="10" fill="#6b7280">Week 3</text>
                <text x="310" y="195" fontSize="10" fill="#6b7280">Week 4</text>
              </svg>
            </div>
            <div className="mt-2 text-xs text-gray-600 text-center">
              Monthly forecast shows temperature and humidity trends for {selectedLocation || 'your area'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader className="p-3 sm:p-4 lg:p-6">
          <CardTitle className="text-base sm:text-lg">Weather Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Flood Risk */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-blue-900">Flood Risk</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  weatherData.current.precipitation > 5 ? 'bg-red-100 text-red-800' :
                  weatherData.current.precipitation > 2 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {weatherData.current.precipitation > 5 ? 'HIGH' :
                   weatherData.current.precipitation > 2 ? 'MEDIUM' : 'LOW'}
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full ${
                    weatherData.current.precipitation > 5 ? 'bg-red-500' :
                    weatherData.current.precipitation > 2 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(100, (weatherData.current.precipitation / 10) * 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-blue-700">
                {weatherData.current.precipitation > 5 ? 'Heavy rainfall expected. Prepare drainage systems.' :
                 weatherData.current.precipitation > 2 ? 'Moderate rain. Monitor water levels.' :
                 'Low precipitation. Minimal flood risk.'}
              </p>
            </div>

            {/* Drought Risk */}
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-orange-900">Drought Risk</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  weatherData.current.humidity < 40 && weatherData.current.precipitation === 0 ? 'bg-red-100 text-red-800' :
                  weatherData.current.humidity < 60 && weatherData.current.precipitation < 2 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {weatherData.current.humidity < 40 && weatherData.current.precipitation === 0 ? 'HIGH' :
                   weatherData.current.humidity < 60 && weatherData.current.precipitation < 2 ? 'MEDIUM' : 'LOW'}
                </span>
              </div>
              <div className="w-full bg-orange-200 rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full ${
                    weatherData.current.humidity < 40 && weatherData.current.precipitation === 0 ? 'bg-red-500' :
                    weatherData.current.humidity < 60 && weatherData.current.precipitation < 2 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${weatherData.current.humidity < 40 && weatherData.current.precipitation === 0 ? '85%' :
                                          weatherData.current.humidity < 60 && weatherData.current.precipitation < 2 ? '60%' : '25%'}` }}
                ></div>
              </div>
              <p className="text-xs text-orange-700">
                {weatherData.current.humidity < 40 && weatherData.current.precipitation === 0 ? 'Very dry conditions. Increase irrigation.' :
                 weatherData.current.humidity < 60 && weatherData.current.precipitation < 2 ? 'Dry conditions. Monitor soil moisture.' :
                 'Adequate moisture levels. Low drought risk.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* AI-Powered Farming Insights */}
      <Card className="mt-4 sm:mt-6">
        <CardHeader className="p-3 sm:p-4 lg:p-6">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <span>AI-Powered Farming Insights</span>
            {loading && (
              <div className="inline-block h-3 w-3 sm:h-4 sm:w-4 animate-spin rounded-full border-2 border-solid border-green-600 border-r-transparent"></div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 lg:p-6">
          {insightError ? (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription className="text-sm">{insightError}</AlertDescription>
            </Alert>
          ) : loading ? (
            <div className="h-16 sm:h-24 flex items-center justify-center">
              <div className="text-xs sm:text-sm text-gray-500">Generating farming insights...</div>
            </div>
          ) : (
            <>
              <div className="prose prose-sm max-w-none">
                <FormattedMessage 
                  content={farmingInsight} 
                  className="text-gray-700"
                />
              </div>
              <div className="mt-3 sm:mt-4 text-right">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={getFarmingInsights}
                  disabled={loading}
                  className="text-green-600 border-green-600 hover:bg-green-50 text-xs sm:text-sm"
                >
                  {loading ? "Updating..." : "Update Insights"}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
