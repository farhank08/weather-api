import { redisClient, isRedisAvailable } from '../clients/redisClient.js';

export const getCache = async (key) => {
	if (!isRedisAvailable()) return null;

	try {
		const data = await redisClient.get(key);
		if (!data) return null;
		return JSON.parse(data);
	} catch (error) {
		console.error('Redis GET error: ', error.message);
		return null;
	}
};

export const setCache = async (key, value, ttlSeconds = 300) => {
	if (!isRedisAvailable()) return;

	try {
		await redisClient.set(key, JSON.stringify(value), {
			EX: ttlSeconds,
		});
	} catch (error) {
		console.error('Redis SET error: ', error.message);
	}
};
