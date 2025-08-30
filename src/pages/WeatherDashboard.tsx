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
