// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

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
  public baseUrl: string;
  public apiKey: string;
  public cityName: string = '';

  constructor() {
    this.baseUrl = process.env.BASE_URL || "https://api.openweathermap.org/data/2.5";
    this.apiKey = process.env.API_KEY || "9bed6f76e49a7250f6a24bbc90ca292f";
  }
  async fetchWeather() {
    const url = `${this.baseUrl}/weather?q=${this.cityName}&appid=${this.apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
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
  public async destructureLocationData(url: string): Promise<any> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to destructure location data');
      }
      const locationData = await response.json();
      return locationData;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
  // TODO: Create buildGeocodeQuery method
  private async buildGeocodeQuery(cityName: string): Promise<string> {
    const { baseUrl, apiKey } = this;
    const query = `${baseUrl}/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
    return query;
  }

  // TODO: Create buildWeatherQuery method
  private async buildWeatherQuery(coordinates: Coordinates): Promise<string> {     
    const { baseUrl, apiKey } = this;
    const { lat, lon } = coordinates;
    const query = `${baseUrl}&lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    return query;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(cityName: string) {
    const query = await this.buildGeocodeQuery(cityName);
    const locationData = await this.fetchLocationData(query);
    if (locationData && locationData.length > 0) {
      const { lat, lon } = locationData[0];
      return { lat, lon };
    } else {
      throw new Error('Location data not found');
    }
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
    const { temp: temperature, humidity } = main;
    const { speed: windSpeed } = wind;
      return new Weather(cityName, date, icon, description, temperature, humidity, windSpeed);
    }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    const forecastArray = weatherData.map((data) => {
      const { dt: date, weather, main, wind } = data;
      const { icon, description } = weather[0];
      const { temp, humidity } = main;
      const { speed } = wind;
      return new Weather(currentWeather.cityName, date, icon, description, temp, humidity, speed);
    });
    return forecastArray;
  }
  public async getWeatherForCity(cityName: string): Promise<Weather[]> {
    try {
      const coordinates = await this.fetchAndDestructureLocationData(cityName);
      const weatherData = await this.fetchWeatherData(coordinates);
      const currentWeather = this.parseCurrentWeather(weatherData);
      const forecastArray = this.buildForecastArray(currentWeather, weatherData.daily);
      return [currentWeather, ...forecastArray];
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return []; // Return an empty array or handle the error as needed
    }
  }
}

export default WeatherService;
