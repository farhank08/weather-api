import { Router } from 'express';
import * as WeatherController from '../controllers/weatherController.js';

const router = Router();

router.get('/weather', WeatherController.getWeather);

export default router;
