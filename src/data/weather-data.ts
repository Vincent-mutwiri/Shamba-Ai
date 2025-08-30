export interface WeatherData {
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

export const LOCATION_WEATHER_DATA: Record<string, WeatherData> = {
  // Baringo
  "kabarnet": { current: { temperature: 22, condition: "Dry Highland", humidity: 55, windSpeed: 16, precipitation: 0, uv: 6 }, forecast: [{ day: "Today", temp: 22, condition: "sunny" }, { day: "Tomorrow", temp: 21, condition: "sunny" }, { day: "Wednesday", temp: 23, condition: "sunny" }, { day: "Thursday", temp: 20, condition: "cloudy" }, { day: "Friday", temp: 22, condition: "sunny" }] },
  "eldama ravine": { current: { temperature: 20, condition: "Cool Escarpment", humidity: 65, windSpeed: 18, precipitation: 1, uv: 5 }, forecast: [{ day: "Today", temp: 20, condition: "cloudy" }, { day: "Tomorrow", temp: 19, condition: "rainy" }, { day: "Wednesday", temp: 21, condition: "sunny" }, { day: "Thursday", temp: 18, condition: "rainy" }, { day: "Friday", temp: 20, condition: "cloudy" }] },
  "mogotio": { current: { temperature: 24, condition: "Semi-Arid", humidity: 50, windSpeed: 14, precipitation: 0, uv: 7 }, forecast: [{ day: "Today", temp: 24, condition: "sunny" }, { day: "Tomorrow", temp: 23, condition: "sunny" }, { day: "Wednesday", temp: 25, condition: "sunny" }, { day: "Thursday", temp: 22, condition: "cloudy" }, { day: "Friday", temp: 24, condition: "sunny" }] },
  "marigat": { current: { temperature: 26, condition: "Hot Lowland", humidity: 45, windSpeed: 12, precipitation: 0, uv: 8 }, forecast: [{ day: "Today", temp: 26, condition: "sunny" }, { day: "Tomorrow", temp: 25, condition: "sunny" }, { day: "Wednesday", temp: 27, condition: "sunny" }, { day: "Thursday", temp: 24, condition: "sunny" }, { day: "Friday", temp: 26, condition: "sunny" }] },
  "chemolingot": { current: { temperature: 28, condition: "Arid Hot", humidity: 40, windSpeed: 10, precipitation: 0, uv: 9 }, forecast: [{ day: "Today", temp: 28, condition: "sunny" }, { day: "Tomorrow", temp: 27, condition: "sunny" }, { day: "Wednesday", temp: 29, condition: "sunny" }, { day: "Thursday", temp: 26, condition: "sunny" }, { day: "Friday", temp: 28, condition: "sunny" }] },

  // Bomet
  "bomet": { current: { temperature: 18, condition: "Highland Cool", humidity: 75, windSpeed: 16, precipitation: 2, uv: 4 }, forecast: [{ day: "Today", temp: 18, condition: "cloudy" }, { day: "Tomorrow", temp: 17, condition: "rainy" }, { day: "Wednesday", temp: 19, condition: "cloudy" }, { day: "Thursday", temp: 16, condition: "rainy" }, { day: "Friday", temp: 18, condition: "sunny" }] },
  "sotik": { current: { temperature: 19, condition: "Tea Country", humidity: 80, windSpeed: 14, precipitation: 3, uv: 3 }, forecast: [{ day: "Today", temp: 19, condition: "rainy" }, { day: "Tomorrow", temp: 18, condition: "rainy" }, { day: "Wednesday", temp: 20, condition: "cloudy" }, { day: "Thursday", temp: 17, condition: "rainy" }, { day: "Friday", temp: 19, condition: "cloudy" }] },
  "longisa": { current: { temperature: 17, condition: "Misty Hills", humidity: 85, windSpeed: 12, precipitation: 4, uv: 2 }, forecast: [{ day: "Today", temp: 17, condition: "rainy" }, { day: "Tomorrow", temp: 16, condition: "rainy" }, { day: "Wednesday", temp: 18, condition: "cloudy" }, { day: "Thursday", temp: 15, condition: "rainy" }, { day: "Friday", temp: 17, condition: "cloudy" }] },
  "mulot": { current: { temperature: 16, condition: "Cold Highland", humidity: 82, windSpeed: 18, precipitation: 3, uv: 3 }, forecast: [{ day: "Today", temp: 16, condition: "cloudy" }, { day: "Tomorrow", temp: 15, condition: "rainy" }, { day: "Wednesday", temp: 17, condition: "cloudy" }, { day: "Thursday", temp: 14, condition: "rainy" }, { day: "Friday", temp: 16, condition: "cloudy" }] },
  "sigor": { current: { temperature: 15, condition: "Mountain Cold", humidity: 88, windSpeed: 20, precipitation: 5, uv: 2 }, forecast: [{ day: "Today", temp: 15, condition: "rainy" }, { day: "Tomorrow", temp: 14, condition: "rainy" }, { day: "Wednesday", temp: 16, condition: "cloudy" }, { day: "Thursday", temp: 13, condition: "rainy" }, { day: "Friday", temp: 15, condition: "cloudy" }] },

  // Bungoma
  "bungoma": { current: { temperature: 23, condition: "Tropical Highland", humidity: 70, windSpeed: 12, precipitation: 1, uv: 6 }, forecast: [{ day: "Today", temp: 23, condition: "sunny" }, { day: "Tomorrow", temp: 22, condition: "cloudy" }, { day: "Wednesday", temp: 24, condition: "sunny" }, { day: "Thursday", temp: 21, condition: "rainy" }, { day: "Friday", temp: 23, condition: "sunny" }] },
  "webuye": { current: { temperature: 24, condition: "Warm Valley", humidity: 68, windSpeed: 10, precipitation: 0, uv: 7 }, forecast: [{ day: "Today", temp: 24, condition: "sunny" }, { day: "Tomorrow", temp: 23, condition: "sunny" }, { day: "Wednesday", temp: 25, condition: "sunny" }, { day: "Thursday", temp: 22, condition: "cloudy" }, { day: "Friday", temp: 24, condition: "sunny" }] },
  "kimilili": { current: { temperature: 22, condition: "Pleasant", humidity: 72, windSpeed: 14, precipitation: 1, uv: 5 }, forecast: [{ day: "Today", temp: 22, condition: "cloudy" }, { day: "Tomorrow", temp: 21, condition: "rainy" }, { day: "Wednesday", temp: 23, condition: "sunny" }, { day: "Thursday", temp: 20, condition: "rainy" }, { day: "Friday", temp: 22, condition: "cloudy" }] },
  "sirisia": { current: { temperature: 25, condition: "Border Warm", humidity: 65, windSpeed: 8, precipitation: 0, uv: 7 }, forecast: [{ day: "Today", temp: 25, condition: "sunny" }, { day: "Tomorrow", temp: 24, condition: "sunny" }, { day: "Wednesday", temp: 26, condition: "sunny" }, { day: "Thursday", temp: 23, condition: "cloudy" }, { day: "Friday", temp: 25, condition: "sunny" }] },
  "tongaren": { current: { temperature: 23, condition: "Agricultural", humidity: 74, windSpeed: 11, precipitation: 2, uv: 5 }, forecast: [{ day: "Today", temp: 23, condition: "cloudy" }, { day: "Tomorrow", temp: 22, condition: "rainy" }, { day: "Wednesday", temp: 24, condition: "sunny" }, { day: "Thursday", temp: 21, condition: "rainy" }, { day: "Friday", temp: 23, condition: "cloudy" }] },

  // Nairobi
  "nairobi cbd": { current: { temperature: 24, condition: "Urban", humidity: 65, windSpeed: 12, precipitation: 0, uv: 5 }, forecast: [{ day: "Today", temp: 24, condition: "sunny" }, { day: "Tomorrow", temp: 23, condition: "rainy" }, { day: "Wednesday", temp: 25, condition: "sunny" }, { day: "Thursday", temp: 22, condition: "rainy" }, { day: "Friday", temp: 24, condition: "sunny" }] },
  "westlands": { current: { temperature: 22, condition: "Cloudy", humidity: 70, windSpeed: 8, precipitation: 2, uv: 3 }, forecast: [{ day: "Today", temp: 22, condition: "cloudy" }, { day: "Tomorrow", temp: 21, condition: "rainy" }, { day: "Wednesday", temp: 23, condition: "sunny" }, { day: "Thursday", temp: 20, condition: "rainy" }, { day: "Friday", temp: 22, condition: "cloudy" }] },
  "karen": { current: { temperature: 26, condition: "Sunny", humidity: 55, windSpeed: 15, precipitation: 0, uv: 7 }, forecast: [{ day: "Today", temp: 26, condition: "sunny" }, { day: "Tomorrow", temp: 25, condition: "sunny" }, { day: "Wednesday", temp: 27, condition: "sunny" }, { day: "Thursday", temp: 24, condition: "cloudy" }, { day: "Friday", temp: 26, condition: "sunny" }] },
  "kasarani": { current: { temperature: 23, condition: "Warm", humidity: 60, windSpeed: 10, precipitation: 0, uv: 6 }, forecast: [{ day: "Today", temp: 23, condition: "sunny" }, { day: "Tomorrow", temp: 22, condition: "cloudy" }, { day: "Wednesday", temp: 24, condition: "sunny" }, { day: "Thursday", temp: 21, condition: "rainy" }, { day: "Friday", temp: 23, condition: "sunny" }] },
  "embakasi": { current: { temperature: 25, condition: "Hot", humidity: 58, windSpeed: 14, precipitation: 0, uv: 7 }, forecast: [{ day: "Today", temp: 25, condition: "sunny" }, { day: "Tomorrow", temp: 24, condition: "sunny" }, { day: "Wednesday", temp: 26, condition: "sunny" }, { day: "Thursday", temp: 23, condition: "cloudy" }, { day: "Friday", temp: 25, condition: "sunny" }] },

  // Nakuru
  "nakuru": { current: { temperature: 20, condition: "Cool & Breezy", humidity: 75, windSpeed: 18, precipitation: 1, uv: 4 }, forecast: [{ day: "Today", temp: 20, condition: "cloudy" }, { day: "Tomorrow", temp: 19, condition: "rainy" }, { day: "Wednesday", temp: 21, condition: "cloudy" }, { day: "Thursday", temp: 18, condition: "rainy" }, { day: "Friday", temp: 20, condition: "sunny" }] },
  "naivasha": { current: { temperature: 18, condition: "Misty", humidity: 85, windSpeed: 10, precipitation: 3, uv: 2 }, forecast: [{ day: "Today", temp: 18, condition: "cloudy" }, { day: "Tomorrow", temp: 17, condition: "rainy" }, { day: "Wednesday", temp: 19, condition: "cloudy" }, { day: "Thursday", temp: 16, condition: "rainy" }, { day: "Friday", temp: 18, condition: "cloudy" }] },
  "gilgil": { current: { temperature: 19, condition: "Rift Valley", humidity: 70, windSpeed: 16, precipitation: 1, uv: 4 }, forecast: [{ day: "Today", temp: 19, condition: "cloudy" }, { day: "Tomorrow", temp: 18, condition: "rainy" }, { day: "Wednesday", temp: 20, condition: "sunny" }, { day: "Thursday", temp: 17, condition: "rainy" }, { day: "Friday", temp: 19, condition: "cloudy" }] },
  "molo": { current: { temperature: 16, condition: "Highland Cold", humidity: 80, windSpeed: 20, precipitation: 4, uv: 3 }, forecast: [{ day: "Today", temp: 16, condition: "rainy" }, { day: "Tomorrow", temp: 15, condition: "rainy" }, { day: "Wednesday", temp: 17, condition: "cloudy" }, { day: "Thursday", temp: 14, condition: "rainy" }, { day: "Friday", temp: 16, condition: "cloudy" }] },
  "njoro": { current: { temperature: 17, condition: "University Town", humidity: 78, windSpeed: 18, precipitation: 2, uv: 3 }, forecast: [{ day: "Today", temp: 17, condition: "cloudy" }, { day: "Tomorrow", temp: 16, condition: "rainy" }, { day: "Wednesday", temp: 18, condition: "cloudy" }, { day: "Thursday", temp: 15, condition: "rainy" }, { day: "Friday", temp: 17, condition: "sunny" }] },

  // Mombasa
  "mombasa": { current: { temperature: 32, condition: "Hot & Humid", humidity: 85, windSpeed: 20, precipitation: 0, uv: 9 }, forecast: [{ day: "Today", temp: 32, condition: "sunny" }, { day: "Tomorrow", temp: 31, condition: "sunny" }, { day: "Wednesday", temp: 33, condition: "sunny" }, { day: "Thursday", temp: 30, condition: "rainy" }, { day: "Friday", temp: 32, condition: "sunny" }] },
  "likoni": { current: { temperature: 30, condition: "Tropical", humidity: 80, windSpeed: 25, precipitation: 0, uv: 8 }, forecast: [{ day: "Today", temp: 30, condition: "sunny" }, { day: "Tomorrow", temp: 29, condition: "cloudy" }, { day: "Wednesday", temp: 31, condition: "sunny" }, { day: "Thursday", temp: 28, condition: "rainy" }, { day: "Friday", temp: 30, condition: "sunny" }] },
  "changamwe": { current: { temperature: 31, condition: "Industrial Hot", humidity: 82, windSpeed: 18, precipitation: 0, uv: 8 }, forecast: [{ day: "Today", temp: 31, condition: "sunny" }, { day: "Tomorrow", temp: 30, condition: "sunny" }, { day: "Wednesday", temp: 32, condition: "sunny" }, { day: "Thursday", temp: 29, condition: "rainy" }, { day: "Friday", temp: 31, condition: "sunny" }] },
  "jomba": { current: { temperature: 29, condition: "Coastal", humidity: 78, windSpeed: 22, precipitation: 1, uv: 7 }, forecast: [{ day: "Today", temp: 29, condition: "cloudy" }, { day: "Tomorrow", temp: 28, condition: "rainy" }, { day: "Wednesday", temp: 30, condition: "sunny" }, { day: "Thursday", temp: 27, condition: "rainy" }, { day: "Friday", temp: 29, condition: "sunny" }] },
  "kisauni": { current: { temperature: 28, condition: "Breezy Coast", humidity: 75, windSpeed: 24, precipitation: 0, uv: 7 }, forecast: [{ day: "Today", temp: 28, condition: "sunny" }, { day: "Tomorrow", temp: 27, condition: "cloudy" }, { day: "Wednesday", temp: 29, condition: "sunny" }, { day: "Thursday", temp: 26, condition: "rainy" }, { day: "Friday", temp: 28, condition: "sunny" }] },

  // Uasin Gishu
  "eldoret": { current: { temperature: 16, condition: "Cool Highland", humidity: 70, windSpeed: 22, precipitation: 2, uv: 3 }, forecast: [{ day: "Today", temp: 16, condition: "cloudy" }, { day: "Tomorrow", temp: 15, condition: "rainy" }, { day: "Wednesday", temp: 17, condition: "cloudy" }, { day: "Thursday", temp: 14, condition: "rainy" }, { day: "Friday", temp: 16, condition: "sunny" }] },
  "turbo": { current: { temperature: 17, condition: "Agricultural", humidity: 75, windSpeed: 20, precipitation: 3, uv: 3 }, forecast: [{ day: "Today", temp: 17, condition: "rainy" }, { day: "Tomorrow", temp: 16, condition: "rainy" }, { day: "Wednesday", temp: 18, condition: "cloudy" }, { day: "Thursday", temp: 15, condition: "rainy" }, { day: "Friday", temp: 17, condition: "cloudy" }] },
  "burnt forest": { current: { temperature: 15, condition: "Forest Cool", humidity: 85, windSpeed: 18, precipitation: 4, uv: 2 }, forecast: [{ day: "Today", temp: 15, condition: "rainy" }, { day: "Tomorrow", temp: 14, condition: "rainy" }, { day: "Wednesday", temp: 16, condition: "cloudy" }, { day: "Thursday", temp: 13, condition: "rainy" }, { day: "Friday", temp: 15, condition: "cloudy" }] },
  "ziwa": { current: { temperature: 18, condition: "Valley Warm", humidity: 68, windSpeed: 16, precipitation: 1, uv: 4 }, forecast: [{ day: "Today", temp: 18, condition: "cloudy" }, { day: "Tomorrow", temp: 17, condition: "rainy" }, { day: "Wednesday", temp: 19, condition: "sunny" }, { day: "Thursday", temp: 16, condition: "rainy" }, { day: "Friday", temp: 18, condition: "cloudy" }] },
  "soy": { current: { temperature: 16, condition: "Highland", humidity: 72, windSpeed: 19, precipitation: 2, uv: 3 }, forecast: [{ day: "Today", temp: 16, condition: "cloudy" }, { day: "Tomorrow", temp: 15, condition: "rainy" }, { day: "Wednesday", temp: 17, condition: "cloudy" }, { day: "Thursday", temp: 14, condition: "rainy" }, { day: "Friday", temp: 16, condition: "sunny" }] },

  // Kisumu
  "kisumu": { current: { temperature: 28, condition: "Lakeside Warm", humidity: 78, windSpeed: 14, precipitation: 1, uv: 6 }, forecast: [{ day: "Today", temp: 28, condition: "sunny" }, { day: "Tomorrow", temp: 27, condition: "cloudy" }, { day: "Wednesday", temp: 29, condition: "sunny" }, { day: "Thursday", temp: 26, condition: "rainy" }, { day: "Friday", temp: 28, condition: "sunny" }] },
  "ahero": { current: { temperature: 29, condition: "Rice Fields", humidity: 80, windSpeed: 12, precipitation: 2, uv: 6 }, forecast: [{ day: "Today", temp: 29, condition: "cloudy" }, { day: "Tomorrow", temp: 28, condition: "rainy" }, { day: "Wednesday", temp: 30, condition: "sunny" }, { day: "Thursday", temp: 27, condition: "rainy" }, { day: "Friday", temp: 29, condition: "sunny" }] },
  "maseno": { current: { temperature: 27, condition: "University", humidity: 75, windSpeed: 16, precipitation: 1, uv: 5 }, forecast: [{ day: "Today", temp: 27, condition: "sunny" }, { day: "Tomorrow", temp: 26, condition: "cloudy" }, { day: "Wednesday", temp: 28, condition: "sunny" }, { day: "Thursday", temp: 25, condition: "rainy" }, { day: "Friday", temp: 27, condition: "sunny" }] },
  "kondele": { current: { temperature: 28, condition: "Urban Lake", humidity: 77, windSpeed: 13, precipitation: 1, uv: 6 }, forecast: [{ day: "Today", temp: 28, condition: "sunny" }, { day: "Tomorrow", temp: 27, condition: "cloudy" }, { day: "Wednesday", temp: 29, condition: "sunny" }, { day: "Thursday", temp: 26, condition: "rainy" }, { day: "Friday", temp: 28, condition: "sunny" }] },
  "nyando": { current: { temperature: 30, condition: "Delta Hot", humidity: 82, windSpeed: 10, precipitation: 3, uv: 7 }, forecast: [{ day: "Today", temp: 30, condition: "rainy" }, { day: "Tomorrow", temp: 29, condition: "rainy" }, { day: "Wednesday", temp: 31, condition: "sunny" }, { day: "Thursday", temp: 28, condition: "rainy" }, { day: "Friday", temp: 30, condition: "cloudy" }] },

  // Meru
  "meru": { current: { temperature: 21, condition: "Highland Cool", humidity: 70, windSpeed: 14, precipitation: 0, uv: 5 }, forecast: [{ day: "Today", temp: 21, condition: "sunny" }, { day: "Tomorrow", temp: 20, condition: "cloudy" }, { day: "Wednesday", temp: 22, condition: "sunny" }, { day: "Thursday", temp: 19, condition: "rainy" }, { day: "Friday", temp: 21, condition: "sunny" }] },
  "maua": { current: { temperature: 17, condition: "Cold Highland", humidity: 80, windSpeed: 18, precipitation: 2, uv: 3 }, forecast: [{ day: "Today", temp: 17, condition: "cloudy" }, { day: "Tomorrow", temp: 16, condition: "rainy" }, { day: "Wednesday", temp: 18, condition: "cloudy" }, { day: "Thursday", temp: 15, condition: "rainy" }, { day: "Friday", temp: 17, condition: "cloudy" }] },
  "mikinduri": { current: { temperature: 19, condition: "Cool Mountain", humidity: 75, windSpeed: 16, precipitation: 1, uv: 4 }, forecast: [{ day: "Today", temp: 19, condition: "cloudy" }, { day: "Tomorrow", temp: 18, condition: "rainy" }, { day: "Wednesday", temp: 20, condition: "sunny" }, { day: "Thursday", temp: 17, condition: "rainy" }, { day: "Friday", temp: 19, condition: "cloudy" }] },
  "nkubu": { current: { temperature: 20, condition: "Market Town", humidity: 72, windSpeed: 15, precipitation: 1, uv: 4 }, forecast: [{ day: "Today", temp: 20, condition: "sunny" }, { day: "Tomorrow", temp: 19, condition: "cloudy" }, { day: "Wednesday", temp: 21, condition: "sunny" }, { day: "Thursday", temp: 18, condition: "rainy" }, { day: "Friday", temp: 20, condition: "sunny" }] },
  "timau": { current: { temperature: 14, condition: "Mountain Cold", humidity: 88, windSpeed: 22, precipitation: 5, uv: 2 }, forecast: [{ day: "Today", temp: 14, condition: "rainy" }, { day: "Tomorrow", temp: 13, condition: "rainy" }, { day: "Wednesday", temp: 15, condition: "cloudy" }, { day: "Thursday", temp: 12, condition: "rainy" }, { day: "Friday", temp: 14, condition: "cloudy" }] },
  
  // Default fallback
  "default": {
    current: { temperature: 24, condition: "Partly Cloudy", humidity: 65, windSpeed: 12, precipitation: 0, uv: 5 },
    forecast: [
      { day: "Today", temp: 24, condition: "sunny" },
      { day: "Tomorrow", temp: 23, condition: "rainy" },
      { day: "Wednesday", temp: 25, condition: "sunny" },
      { day: "Thursday", temp: 22, condition: "rainy" },
      { day: "Friday", temp: 24, condition: "sunny" }
    ]
  }
};

export const getWeatherByLocation = (location: string): WeatherData => {
  const key = location.toLowerCase();
  const weather = LOCATION_WEATHER_DATA[key] || LOCATION_WEATHER_DATA.default;
  console.log(`Weather for ${location}: ${weather.current.temperature}°C, ${weather.current.condition}`);
  return weather;
};