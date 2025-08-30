import { serve } from "../deps.ts";
import "https://deno.land/std@0.204.0/dotenv/load.ts";
import { corsHeaders } from "../_shared/cors.ts";

const OPENWEATHER_API_KEY = Deno.env.get("OPENWEATHER_API_KEY")!;
const INFLUX_API_KEY = Deno.env.get("INFLUX_API_KEY")!;

// Fallback coordinates for Kenyan counties
const COUNTY_COORDS: Record<string, { lat: number; lon: number }> = {
  Nairobi: { lat: -1.2864, lon: 36.8172 },
  // add the rest of your counties...
};

// Compute daily min/max/avg
function computeDailyAverages(list: any[]) {
  const daily: Record<
    string,
    { min: number; max: number; sum: number; count: number }
  > = {};

  list.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0];
    const temp = entry.main.temp;
    if (!daily[date])
      daily[date] = { min: temp, max: temp, sum: temp, count: 0 };

    daily[date].min = Math.min(daily[date].min, temp);
    daily[date].max = Math.max(daily[date].max, temp);
    daily[date].sum += temp;
    daily[date].count += 1;
  });

  return Object.entries(daily).map(([date, stats]) => ({
    date,
    min: stats.min,
    max: stats.max,
    avg: stats.sum / stats.count,
  }));
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS")
    return new Response("ok", { headers: corsHeaders });

  try {
    const { location } = (await req.json()) as { location: string };
    if (!location) throw new Error("Location is required");

    let lat: number | null = null;
    let lon: number | null = null;
    let name = location;

    // OpenWeather geocoding
    const geoRes = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location},KE&limit=1&appid=${OPENWEATHER_API_KEY}`
    );
    const geoData = await geoRes.json();
    if (geoData && geoData.length > 0) {
      lat = geoData[0].lat;
      lon = geoData[0].lon;
      name = geoData[0].name;
    } else if (COUNTY_COORDS[location]) {
      lat = COUNTY_COORDS[location].lat;
      lon = COUNTY_COORDS[location].lon;
    } else {
      throw new Error("Location not found");
    }

    // OpenWeather 5-day forecast
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    const forecastData = await forecastRes.json();
    if (!forecastData.list) throw new Error("No forecast data available");

    const dailyForecasts = computeDailyAverages(forecastData.list).slice(0, 5);

    let weatherSummary = `Weather forecast for ${name}:\n`;
    dailyForecasts.forEach((d, i) => {
      weatherSummary += `Day ${i + 1} (${d.date}): min ${d.min.toFixed(
        1
      )}°C, max ${d.max.toFixed(1)}°C, avg ${d.avg.toFixed(1)}°C\n`;
    });

    // AI Advice via Influx
    let aiAdvice = "No AI advice generated (Influx key missing).";
    if (INFLUX_API_KEY) {
      const prompt = `You are an agricultural advisor in Kenya. Forecast for ${name}:\n${weatherSummary}\nGive practical advice for smallholder farmers.`;

      const influxRes = await fetch("https://api.influx.ai/v1/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${INFLUX_API_KEY}`,
        },
        body: JSON.stringify({
          prompt,
          model: "influx-model-1",
        }),
      });

      const influxData = await influxRes.json();
      aiAdvice = influxData.response?.text || aiAdvice;
    }

    return new Response(
      JSON.stringify({ weather: dailyForecasts, advice: aiAdvice }),
      {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 200,
      }
    );
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 400,
    });
  }
});
