require('dotenv').config();
const axios = require('axios');

// Получение API ключа из переменной окружения
const apiKey = process.env.GEOPOSITION_API_KEY;

const getCoordinates = async (city) => {
  try {
      const url = `http://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${encodeURIComponent(city)}`;
      const response = await axios.get(url);

      if (response.data.data && response.data.data.length > 0) {
          const location = response.data.data[0];
          return {
              latitude: location.latitude,
              longitude: location.longitude,
              city: location.name,  // Название города
              country: location.country,  // Страна
              region: location.region,  // Регион
              country_code: location.country_code,  // Код страны
          };
      } else {
          console.log("City not found!");
          return null;
      }
  } catch (error) {
      console.error("Error fetching data from PositionStack:", error);
      return null;
  }
};



