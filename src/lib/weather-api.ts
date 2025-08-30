interface WeatherData {
  current: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    uv: number;
  };
  forecast: Array<{
    day: string;
    temp: number;
    condition: string;
  }>;
}

const INFLECTION_API_KEY = import.meta.env.VITE_INFLECTION_API_KEY;
const INFLECTION_API_URL = 'https://api.inflection.ai/external/api/inference';

console.log('Inflection API Key available:', !!INFLECTION_API_KEY);

// Use hardcoded weather data that varies by location
const getLocationWeather = (location: string): WeatherData => {
  const locationKey = location.toLowerCase();
  
  // Coastal areas - hot and humid
  if (locationKey.includes('mombasa') || locationKey.includes('kilifi') || locationKey.includes('kwale')) {
    return {
      current: { temperature: 32, condition: "Hot & Humid", humidity: 85, windSpeed: 20, precipitation: 0, uv: 9 },
      forecast: [{ day: "Today", temp: 32, condition: "sunny" }, { day: "Tomorrow", temp: 31, condition: "sunny" }, { day: "Wednesday", temp: 33, condition: "sunny" }, { day: "Thursday", temp: 30, condition: "rainy" }, { day: "Friday", temp: 32, condition: "sunny" }]
    };
  }
  
  // Highland areas - cool
  if (locationKey.includes('eldoret') || locationKey.includes('meru') || locationKey.includes('nyeri')) {
    return {
      current: { temperature: 18, condition: "Cool Highland", humidity: 75, windSpeed: 18, precipitation: 2, uv: 4 },
      forecast: [{ day: "Today", temp: 18, condition: "cloudy" }, { day: "Tomorrow", temp: 17, condition: "rainy" }, { day: "Wednesday", temp: 19, condition: "cloudy" }, { day: "Thursday", temp: 16, condition: "rainy" }, { day: "Friday", temp: 18, condition: "sunny" }]
    };
  }
  
  // Lake regions - moderate
  if (locationKey.includes('kisumu') || locationKey.includes('homa bay')) {
    return {
      current: { temperature: 28, condition: "Lakeside Warm", humidity: 78, windSpeed: 14, precipitation: 1, uv: 6 },
      forecast: [{ day: "Today", temp: 28, condition: "sunny" }, { day: "Tomorrow", temp: 27, condition: "cloudy" }, { day: "Wednesday", temp: 29, condition: "sunny" }, { day: "Thursday", temp: 26, condition: "rainy" }, { day: "Friday", temp: 28, condition: "sunny" }]
    };
  }
  
  // Default - Nairobi-like
  return {
    current: { temperature: 24, condition: "Partly Cloudy", humidity: 65, windSpeed: 12, precipitation: 0, uv: 5 },
    forecast: [{ day: "Today", temp: 24, condition: "sunny" }, { day: "Tomorrow", temp: 23, condition: "rainy" }, { day: "Wednesday", temp: 25, condition: "sunny" }, { day: "Thursday", temp: 22, condition: "rainy" }, { day: "Friday", temp: 24, condition: "sunny" }]
  };
};

export const generateWeatherData = async (location: string): Promise<WeatherData> => {
  // Return location-specific weather immediately
  return getLocationWeather(location);
};

export const generateFarmingInsights = async (location: string, weatherData: WeatherData): Promise<string> => {
  if (!INFLECTION_API_KEY) {
    return 'API key not configured. Please check your environment variables.';
  }

  try {
    const prompt = `Agricultural advice for ${location}, Kenya. Weather: ${weatherData.current.temperature}°C, ${weatherData.current.condition}, ${weatherData.current.humidity}% humidity. Give farming recommendations in 150 words.`;

    console.log('Sending request to Inflection AI...');
    
    const response = await fetch(INFLECTION_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${INFLECTION_API_KEY}`
      },
      body: JSON.stringify({
        context: [{
          text: prompt,
          type: 'Human'
        }],
        config: 'Pi-3.1'
      })
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    
    const insights = data.text || data.response || data.message || 'No insights available';
    return insights;
  } catch (error) {
    console.error('Error generating farming insights:', error);
    return `Based on ${weatherData.current.temperature}°C and ${weatherData.current.condition} conditions in ${location}:\n\n**Recommended Activities:**\n• Monitor crop moisture levels\n• Adjust irrigation as needed\n\n**Precautions:**\n• Protect crops from weather changes\n\n**General Advice:**\n• Continue regular farm maintenance`;
  }
};