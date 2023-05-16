import axios from 'axios';

const API_BASE_URL = 'https://assignments-ailabs.exus.ai';

const axiosInstance = axios.create({ baseURL: API_BASE_URL });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject((error.response && error.response.data) || 'SomethingWentWrong');
  }
);

export default axiosInstance;
