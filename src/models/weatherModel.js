import axios from 'axios';
import dotenv from 'dotenv';
import * as Cache from '../services/cache.js';

dotenv.config();

const weatherApiKey = process.env.WEATHER_KEY;

export const getWeather = async (location) => {
	const cached = await Cache.getCache(location);
	if (cached) {
		return {
			success: true,
			payload: cached,
			source: 'cache',
		};
	}

	if (!weatherApiKey) {
		const WeatherApiError = new Error(
			'Weather API key missing.\nGet your key at https://www.visualcrossing.com'
		);
		WeatherApiError.status = 401;
		throw WeatherApiError;
	}

	const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=metric&include=current,alerts,events&key=${weatherApiKey}&contentType=json`;

	const response = await axios.get(url);
	const data = response.data;
	if (!data) {
		const dataError = new Error('API data not found');
		dataError.status = 404;
		throw dataError;
	}

	await Cache.setCache(location, data, 60);

	return {
		success: true,
		payload: data,
		source: 'api',
	};
};
