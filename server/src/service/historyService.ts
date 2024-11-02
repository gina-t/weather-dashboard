import fs from 'fs/promises';

// TODO: Define a City class with name and cityID properties
class City {
  cityName: string;
  cityID: string;
  constructor(cityName: string, cityID: string) {
    this.cityName = cityName;
    this.cityID = cityID;
  }
};

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    try {
      const data = await fs.readFile('./db/searchHistory.json', 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
 
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    try {
      await fs.writeFile('./db/searchHistory.json', JSON.stringify(cities, null, 2));
    } catch (error) {
      console.error(error);
    }
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    return await this.read().then((cities) => {
      let parsedCities: City[];
      try {
        parsedCities = [].concat(JSON.parse(cities));
      } catch (err) {
        parsedCities = [];
      }
      return parsedCities;
    });
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(cityName: string) {
    const cities = await this.read();
    const newCity = new City(cityName, cities.length + 1);
    cities.push(newCity);
    await this.write(cities);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(cityID: string) {
    const cities = await this.read();
    const updatedCities = cities.filter((city: City) => city.cityID !== cityID);
    await this.write(updatedCities);
  }
}

export default new HistoryService();
