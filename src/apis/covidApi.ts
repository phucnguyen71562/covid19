import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import axiosClient from './axiosClient';

export type GlobalData = {
  Date: string;
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
};

export type CovidCountry = {
  Country: string;
  CountryCode: string;
  Date: string;
  ID: string;
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  Premium: {};
  Slug: string;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
};

export type SummaryResponse = {
  Global: GlobalData;
  Countries: CovidCountry[];
  Date: string;
};

export type CovidDataByCountry = {
  Active: number;
  City: string;
  CityCode: string;
  Confirmed: number;
  Country: string;
  CountryCode: string;
  Date: string;
  Deaths: number;
  ID: string;
  Lat: string;
  Lon: string;
  Province: string;
  Recovered: number;
};

export const covidApi = {
  getSummary: (): Promise<SummaryResponse> => {
    const url = '/summary';
    return axiosClient.get(url);
  },
  byCountry: (name: string): Promise<CovidDataByCountry[]> => {
    const url = `/country/${name}`;
    return axiosClient.get(url);
  },
};

export function useCovidSummary<TData = SummaryResponse>(
  options?: UseQueryOptions<SummaryResponse, AxiosError, TData, any>
) {
  return useQuery('covid-summary', () => covidApi.getSummary(), {
    onError: (err) => {
      console.log(err.message);
    },
    ...options,
  });
}

export function useCovidByCountry<TData = CovidDataByCountry[]>(
  name: string,
  options?: UseQueryOptions<CovidDataByCountry[], AxiosError, TData, any>
) {
  return useQuery(['covid-country', name], () => covidApi.byCountry(name), {
    onError: (err) => {
      console.log(err.message);
    },
    ...options,
  });
}
