# 🌤️ Weather API

A clean, production-style **Node.js + Express** API that retrieves real-time weather data using the Visual Crossing API, with **Redis caching**, **rate limiting**, and a modular backend architecture.

---

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-RestAPI-lightgrey?style=for-the-badge&logo=express)
![Redis](https://img.shields.io/badge/Redis-Cache-red?style=for-the-badge&logo=redis)
![Axios](https://img.shields.io/badge/Axios-HTTP-blue?style=for-the-badge&logo=axios)
![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

</div>

---

## 📚 Table of Contents

1. Quick Start
2. Features
3. Project Structure
4. How It Works
5. API Documentation
6. Tech Stack
7. Environment Variables
8. License

---

## 🚀 Quick Start

```
npm install
```

Create a `.env` file:

```
WEATHER_KEY=your_visual_crossing_api_key
REDIS_PASS=your_redis_password
PORT=5000
```

Start the server:

```
npm start
```

API Base URL:
http://localhost:5000/api

---

## ✨ Features

- Fetch weather by location
- Redis caching to reduce API overhead
- Rate limiting for safety
- Clean controller/model/service structure
- Minimal UI for interacting with the API
- Robust error handling

---

## 📂 Project Structure

Weather API/
├─ public/
│ ├─ index.html
│ ├─ weather.html
│ ├─ scripts/
│ └─ styles/
├─ src/
│ ├─ clients/
│ ├─ controllers/
│ ├─ models/
│ ├─ routes/
│ └─ services/
├─ server.js
└─ package.json

---

## 🔧 How It Works

### Request Flow

Client → /api/weather → Controller → Model → Cache → External API

### Caching Strategy

- Checks Redis first
- If cached → returned immediately
- If not → fetch → store in cache → return

### Rate Limiting

Uses `express-rate-limit` to prevent API abuse.

---

# 📘 API Documentation

## GET /api/weather

| Parameter | Type   | Required | Description                   |
| --------- | ------ | -------- | ----------------------------- |
| location  | string | Yes      | Location name (e.g. "London") |

### Example

```
GET /api/weather?location=Sydney
```

### Example Response

```
{
  "success": true,
  "payload": {
    "resolvedAddress": "Sydney, NSW, Australia",
    "latitude": -33.87,
    "longitude": 151.21,
    "currentConditions": {
      "temp": 24.1,
      "conditions": "Clear"
    }
  },
  "source": "cache"
}
```

---

## 🧱 Tech Stack

| Layer       | Technology       |
| ----------- | ---------------- |
| Backend     | Node.js, Express |
| Cache       | Redis            |
| HTTP Client | Axios            |
| Config      | dotenv           |

---

## 🔐 Environment Variables

| Variable    | Description             |
| ----------- | ----------------------- |
| WEATHER_KEY | Visual Crossing API key |
| REDIS_PASS  | Redis password          |
| PORT        | Port (default 5000)     |

---

## 📜 License

MIT License — free for educational and portfolio use.
