// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
};

// TODO: Define a class for the Weather object
class Weather {
  cityName: string;
  date: string;
  icon: string;
  description: string;
  temperature: number;
  humidity: number;
  windSpeed: number;

  constructor(cityName: string, date: string, icon: string, description: string, temperature: number, humidity: number, windSpeed: number) {
    this.cityName = cityName;
    this.date = date;
    this.icon = icon;
    this.description = description;
    this.temperature = temperature;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
  }
}

// TODO: Complete the WeatherService class

class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  public baseURL: string;
  public apiKey: string;
  public cityName: string;

  constructor() {
    this.baseURL = process.env.baseURL || "https://api.openweathermap.org/data/2.5/forecast";
    this.apiKey = process.env.apiKey || "b2a6b4e866af7b332ea03ad29ab62223";
    this.cityName = '';
  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try {
      const response = await fetch(query);
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  // TODO: Create destructureLocationData method
  private async destructureLocationData(locationData: Coordinates) {
    const { lat, lon } = locationData;
    return { lat, lon };
  }

  // TODO: Create buildGeocodeQuery method
  private async buildGeocodeQuery(_coordinates: Coordinates): Promise <string> { 
    const { baseURL, apiKey, cityName } = this;
    const query = `${baseURL}/geocode/v1/json?q=${cityName}&apiKey=${apiKey}`;
    return query;
  }

  // TODO: Create buildWeatherQuery method
  private async buildWeatherQuery(coordinates: Coordinates): Promise<string> {     
    const { baseURL, apiKey } = this;
    const { lat, lon } = coordinates;
    const query = `${baseURL}&lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    return query;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(){
      const coordinates = await this.destructureLocationData(await this.fetchLocationData(this.cityName));
      const query = await this.buildGeocodeQuery(coordinates);
    const locationData = await this.fetchLocationData(query);
    return await this.destructureLocationData(locationData);
  } 
  
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    try {
      const query = await this.buildWeatherQuery(coordinates);
      const response = await fetch(query);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const { cityName } = response;
    const { date, weather, main, wind } = response;
    const { icon, description } = weather[0];
    const { temperature, humidity } = main;
    const { windspeed } = wind;
    return new Weather(cityName, date, icon, description, temperature, humidity, windspeed);
  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecastArray = weatherData.map((data) => {
      const { date, weather, main, wind } = data;
      const { icon, description } = weather[0];
      const { temp, humidity } = main;
      const { speed } = wind;
      return new Weather(currentWeather.cityName, date, icon, description, temp, humidity, speed);
    });
    return forecastArray;
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const currentWeatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(currentWeatherData);
    const forecastData = await this.fetchWeatherData(coordinates);
    const forecastArray = this.buildForecastArray(currentWeather, forecastData.list);
    return { currentWeather, forecastArray };
  }

};

export default new WeatherService();
