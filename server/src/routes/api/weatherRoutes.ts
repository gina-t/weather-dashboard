import express from 'express';
const router = express.Router();
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST request with city name to retrieve weather data
// TODO: GET weather data from city name
// TODO: save city to search history
router.post('/weather', async (req, res) => {
  const cityName = req.body.city;
  if (!cityName) {
    res.status(400).json({ message: 'City name is required' });
    return;
  }
  try {
    const locationData = await WeatherService.destructureLocationData(`${WeatherService.baseUrl}/weather?q=${cityName}&appid=${WeatherService.apiKey}`);
    const weatherData = await WeatherService.getWeatherForCity(locationData);
    await HistoryService.addCity(cityName);
    res.json(weatherData);
  } catch (error) {
    console.error('Error getting weather data:', error);
    res.status(500).json({ message: 'Failed to fetch weather data' });
  }
});


// TODO: GET search history
router.get('/history', async (_, res) => {
  try {
    const history = await HistoryService.getCities();
    res.json(history);
  } catch (error) {
      console.error('Error reading search history:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ msg: 'State id is required' });
    }
    await HistoryService.removeCity(req.params.id);
    res.json({ message: 'City successfully removed from search history' });
  } catch (error) {
    res.status(400).json({ message: 'City not deleted' });
  }
});

export default router;
