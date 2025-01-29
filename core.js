require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Middleware
router.use(express.json());

// Route: Real-time Weather Data
router.get('/weather', async (req, res) => {
    const { city } = req.query;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
        console.error('API Key is missing');
        return res.status(500).json({ error: 'API Key is missing' });
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        res.json({
            city: data.name,
            country: data.sys.country,
            coordinates: data.coord,
            temperature: data.main.temp,
            feels_like: data.main.feels_like,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind_speed: data.wind.speed,
            weather_description: data.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
            rain_volume: data.rain ? data.rain['3h'] || 0 : 0
        });
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

// Route: News Data
router.get('/news', async (req, res) => {
    const { city } = req.query;
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'API Key is missing' });
    }
    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(city)}&apiKey=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const articles = response.data.articles.map((article) => ({
            title: article.title,
            description: article.description,
            url: article.url,
            source: article.source.name,
        }));

        res.json({ city, articles });
    } catch (error) {
        console.error('Error fetching news data:', error.message);
        res.status(500).json({ error: 'Unable to fetch news data' });
    }
});

// Route: City Coordinates
router.get('/coordinates', async (req, res) => {
    const { city } = req.query;
    const apiKey = process.env.GEOPOSITION_API_KEY;

    if (!apiKey) {
        console.error("Error: Missing API Key!");
        return res.status(500).json({ error: 'API Key is missing' });
    }
    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        const url = `http://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${encodeURIComponent(city)}&limit=1`;
        console.log("Fetching data from:", url);

        const response = await axios.get(url);
        console.log("API Response:", response.data);

        if (!response.data || !response.data.data || response.data.data.length === 0) {
            console.error("City not found in API response");
            return res.status(404).json({ error: "City not found!" });
        }

        const location = response.data.data[0];
        return res.json({
            latitude: location.latitude,
            longitude: location.longitude,
            city: location.name || city,  
            country: location.country || "Unknown",  
            region: location.region || "Unknown",  
            country_code: location.country_code || "N/A",  
        });
    } catch (error) {
        console.error("Error fetching data from PositionStack:", error.message);
        return res.status(500).json({ error: 'Error fetching coordinates' });
    }
});


module.exports = router;
