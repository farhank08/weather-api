import * as WeatherModel from '../models/weatherModel.js';

export const getWeather = async (req, res) => {
	try {
		const location = req.query.location;

		if (!location) {
			return res.status(400).json({
				success: false,
				message: 'BAD_REQUEST: Location query paramter missing',
			});
		}

		const data = await WeatherModel.getWeather(location);
		const message =
			data.source === 'cache'
				? 'Cache data retrieved successfully'
				: 'API data retrieved successfully';

		res.status(200).json({
			...data,
			message,
		});
	} catch (error) {
		const { message, status } = error;
		console.error(message);

		res.status(status || 500).json({
			success: false,
			message,
		});
	}
};
