import axios from "axios";

const urll = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "291fa4d5cda19204d3ac1050797439e8";

export const statistic = async (city) => {
  try {
    const { data } = await axios.get(urll + `q=${city}&appid=${apiKey}`);
    return data;
  } catch (error) {
    throw error;
  }
};
