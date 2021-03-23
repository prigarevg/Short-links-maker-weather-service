import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'Your_API_KEY';

export const fetchWeather = async (query, query1) => {
    const { data } = await axios.get(URL, {
        params: {
            lat: query,
            lon: query1,
            units: 'metric',
            APPID: API_KEY,
        }
    });

    return data;
}