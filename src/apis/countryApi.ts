import config from 'app/config';
import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import axiosClient from './axiosClient';

export type Country = {
  name: {
    common: string;
  };
  flags: { png: string; svg: string };
  population: string;
  capital: string;
  region: string;
  subregion: string;
};

export const countryApi = {
  get: (code: string): Promise<Country[]> => {
    const url = `/alpha/${code}`;
    return axiosClient.get(url, {
      baseURL: config.countryUrl,
    });
  },
};

export function useCountry<TData = Country[]>(
  code: string,
  options?: UseQueryOptions<Country[], AxiosError, TData, any>
) {
  return useQuery(['country', code], () => countryApi.get(code), {
    onError: (err) => {
      console.log(err.message);
    },
    ...options,
  });
}
