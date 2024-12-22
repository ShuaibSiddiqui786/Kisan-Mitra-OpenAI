export const API_CONFIG = {
  WEATHER_API: {
    key: process.env.VITE_WEATHER_API_KEY || '',
    baseUrl: 'https://api.openweathermap.org/data/2.5'
  },
  GEOCODING_API: {
    key: process.env.VITE_GEOCODING_API_KEY || '',
    baseUrl: 'https://maps.googleapis.com/maps/api/geocode'
  },
  TRANSLATION_API: {
    key: process.env.VITE_TRANSLATION_API_KEY || '',
    baseUrl: 'https://translation.googleapis.com/language/translate/v2'
  },
  MARKET_API: {
    key: process.env.VITE_MARKET_API_KEY || '',
    baseUrl: 'https://api.agmarknet.gov.in' // Example URL
  },
  CHAT_API: {
    key: process.env.VITE_OPENAI_API_KEY || '',
    baseUrl: 'https://api.openai.com/v1'
  }
};