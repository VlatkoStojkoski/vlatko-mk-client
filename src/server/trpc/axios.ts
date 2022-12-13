import { env } from 'process';

import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: env.NODE_ENV === 'development' ?
		'http://localhost:1337/api' :
		env.STRAPI_URI + '/api',
});

export default axiosInstance;