import axios, { AxiosResponse } from 'axios';
import { Buffer } from 'buffer';
import { UserData, PateData } from '../util/types';
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

const getBaseUserData = async (token: string) : Promise<UserData | PateData> => {
  const response: AxiosResponse = await axios.get(`${API_ADDRESS}/user/userdata`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

const getPate = async (id:string) : Promise<PateData> => {
  const response : AxiosResponse = await axios.get(`${API_ADDRESS}/user/userdata/${id}`, {
    headers: {
      accept: 'application/json',
    },
  });

  return response.data;
}

const getUser = async (id:string) : Promise<UserData> => {
  const response : AxiosResponse = await axios.get(`${API_ADDRESS}/user/userdata/${id}`, {
    headers: {
      accept: 'application/json',
    },
  });

  return response.data;
}

const getEnums = async (route:string) : Promise<string[]> => {
  const response : AxiosResponse = await axios.get(`${API_ADDRESS}/get/enums/${route}`, {
    headers: {
      accept: 'application/json',
    },
  });

  return response.data;
}

const API = { getUserAvatar, getBaseUserData, getPate, getUser, getEnums };

export default API;
