import path from 'path';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';

import { initRedis, redisClient } from './src/clients/redisClient.js';
import apiRouter from './src/routes/apiRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');

const port = process.env.PORT || 5000;

await initRedis();

const app = express();

// Convert response body to json when required
app.use(express.json());

// Serve static files
app.use(express.static(publicDir));

// Apply limiter to api routes
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // Miliseconds
	max: 50,
	standardHeaders: true,
	legacyHeaders: false,
	message: 'API request limit reached. Try again later.',
});
app.use('/api', limiter);

// API Routes
app.use('/api', apiRouter);

// GET index html route
app.get('/', (req, res, next) => {
	res.sendFile(path.join(publicDir, 'index.html'), (error) => {
		if (error) {
			return next();
		}
	});
});

// GET other html routes
app.use('/', (req, res, next) => {
	if (req.method === 'GET') {
		if (req.path.startsWith('/api')) next();

		const filePath = path.join(publicDir, `${req.path}.html`);
		res.sendFile(filePath, (error) => {
			if (error) {
				return next();
			}
		});
	}
	next();
});

// Unhandled routes
app.use((req, res) => {
	console.error('Unhandled route');
	res.status(404).json({
		success: false,
		message: 'Route not found',
	});
});

// Unhandled server error
app.use((req, res) => {
	console.error('Unhandled server error');
	res.status(500).json({
		success: false,
		message: 'Internal server error',
	});
});

const server = app.listen(port, () => {
	console.log(`Express server running on port:${port}`);
});

process.on('SIGINT', async () => {
	console.log('Shutting down server....');
	try {
		await new Promise((resolve) => server.close(resolve));
		console.log('Express server closed successfully');

		if (redisClient.isOpen) {
			await redisClient.close();
			console.log('Redis client closed successfully');
		}
	} catch (error) {
		console.error('Error closing: ', error.message);
	} finally {
		process.exit(0);
	}
});
