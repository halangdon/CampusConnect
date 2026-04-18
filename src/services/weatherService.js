const API_KEY = 'dd7baae2e0d1fb0b090a64a83e048dbb';

export async function getWeather(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Mandaue&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error('API request failed');
    return await res.json();
  } catch (error) {
    console.warn("Weather API failed, returning mock data for demo.");
    return {
      name: city,
      main: { temp: 28.5 },
      weather: [{ main: 'Clear', description: 'clear sky' }]
    };
  }
}
