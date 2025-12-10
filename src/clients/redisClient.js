import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisPass = process.env.REDIS_PASS;

export const redisClient = createClient({
	username: 'default',
	password: redisPass,
	socket: {
		host: 'redis-17324.c60.us-west-1-2.ec2.cloud.redislabs.com',
		port: 17324,
	},
});

let redisAvailable = false;

redisClient.on('error', (error) => {
	console.error('Redis client error: ', error.message);
	redisAvailable = false;
});

export const initRedis = async () => {
	try {
		if (!redisClient.isOpen) {
			await redisClient.connect();
			redisAvailable = true;
			console.log('Reddis connected successfully');
		}
	} catch (error) {
		console.error('Failed to connect to Redis\nRunning without cache\nError: ', error.message);
		redisAvailable = false;
	}
};

export const isRedisAvailable = () => redisAvailable;
