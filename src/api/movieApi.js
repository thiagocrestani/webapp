import axios from 'axios';

const BASE_URL = 'https://tools.texoit.com/backend-java/api/movies';


export const getAllMovies = async (page, pageSize, year, winner) => {
    try {
      const response = await axios.get(`${BASE_URL}?page=${page-1}&size=${pageSize}&year=${year ? year : ''}&winner=${winner ? winner : ''}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };


export const getYearsWithMultipleWinners = async () => {
  try {
    const response = await axios.get(`${BASE_URL}?projection=years-with-multiple-winners`);
    return response.data.years;
  } catch (error) {
    throw error;
  }
};


export const getStudiosWithWinCount = async () => {
  try {
    const response = await axios.get(`${BASE_URL}?projection=studios-with-win-count`);
    return response.data.studios;
  } catch (error) {
    throw error;
  }
};


export const getMaxMinWinIntervalForProducers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}?projection=max-min-win-interval-for-producers`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getWinnersByYear = async (year) => {
  try {
    const response = await axios.get(`${BASE_URL}?winner=true&year=${year}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};