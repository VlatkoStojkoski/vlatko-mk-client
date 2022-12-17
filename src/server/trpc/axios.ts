import { env } from 'process';

import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: env.API_URI + '/api',
});

export default axiosInstance;