import axios, { CreateAxiosDefaults } from 'axios';
import { API_ADDRESS } from './env';

const useAxios = (config?: CreateAxiosDefaults<any>) => {
  const defaultConfig = {
    baseURL: config?.baseURL ?? API_ADDRESS,
    headers: {
      'Referrer-Policy': 'noreferrer',
      'Allow-Control-Allow-Origin': '*',
    },
  };
  return axios.create({
    ...defaultConfig,
    ...config,
  });
};

export default useAxios;
