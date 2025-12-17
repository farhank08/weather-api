# Weather API

A Node.js **Weather API** that retrieves current weather data from a third‑party weather service and caches responses using **Redis** to improve performance and reduce external API calls. The application exposes JSON API endpoints and also serves simple HTML pages for user interaction.

Project from https://roadmap.sh/projects/weather-api-wrapper-service

## Prerequisites

- Node.js runtime
- Express framework
- Redis server (local or managed)

## Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd weather-api
```

2. **Install dependencies**

```bash
npm install
```

## Configuration

### Environment Variables

Create a `.env` file in the project root and configure the following variables:

```env
PORT=3000
WEATHER_API_KEY=your_weather_api_key
REDIS_HOST=localhost
```

- `PORT` – Port the server runs on
- `WEATHER_API_KEY` – API key for the external weather service
- `REDIS_HOST` – Redis server host

## Running the Application

Start the server:

```bash
npm start
```

Demo URL:
http://localhost:5000


## API Endpoints

### Weather

| Method | Endpoint                   | Description                         |
| ------ | -------------------------- | ----------------------------------- |
| GET    | `/api/weather?city=<city>` | Get current weather data for a city |

Responses are cached in Redis with a configurable TTL to reduce repeated external API requests.

## Caching Behavior

- Weather data is cached using Redis
- Cached responses expire after a default TTL (defined in the cache service)
- If Redis is unavailable, the API continues to function without caching

## Views

The server also serves basic HTML pages for interacting with the API:

- Home page
- Weather results page

These pages communicate with the API using client-side JavaScript.

## Notes

- Redis is optional but recommended for performance
- Cache logic is isolated in a dedicated service layer
- Designed as a simple example of API + caching + views

## License

This project is licensed under the ISC License.
