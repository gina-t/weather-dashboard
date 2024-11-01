import express from 'express';
const router = express.Router();
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: GET request weather data from city name
router.get('/:city', async (req, res) => {
  const { city } = req.params;
  try {
    const weatherData = await WeatherService.getWeatherForCity(city);
    res.json(weatherData);
  } catch (error) {
    res.status(400).json({ message: 'City not found' });
  }
});

// TODO: POST request with city name to retrieve weather data
router.post('/:city', (req, res) => {
  const { city } = req.body;
  console.log(city);
  if (!city) {
    res.status(400).json({ message: 'City name is required' });
  } else {
    HistoryService.addCity(city);
    res.status(201).json({ message: 'City saved' });
  }
  
});

// TODO: GET search history
router.get('/history', async (_, res) => {
  try {
    await HistoryService.read();
  } catch (error) {
      console.error('Error reading search history:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  const {id} = req.params; 
  try {
    await HistoryService.removeCity(id);
    res.json({ message: 'City deleted' });
  } catch (error) {
    res.status(400).json({ message: 'City not deleted' });
  }
});

export default router;
