import axios, { AxiosResponse } from 'axios';
import { Buffer } from 'buffer';
import { BaseUserData, NormalUserData, PateData } from '../util/types';
import { API_ADDRESS } from './env';

const getUserAvatar = async (id:string) => {
  const response: AxiosResponse = await axios.get(`${API_ADDRESS}/user/avatar/${id}`, {
    params: {
      image: 'false',
    },
    headers: {
      accept: '*/*',
    },
  });

  if (response.status === 200) {
    const bufferImage = Buffer.from(response.data.data).toString('base64');
    return `data:image/jpeg;base64,${bufferImage}`;
  }

  return '';
};

const getBaseUserData = async (token: string) :
Promise<PateData | NormalUserData | BaseUserData> => {
  const response: AxiosResponse = await axios.get(`${API_ADDRESS}/user/userdata`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.baseUserData;
};
const API = { getUserAvatar, getBaseUserData };

export default API;
