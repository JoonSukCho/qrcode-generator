import { AxiosResponse } from 'axios';

export interface ShortUrlResponse extends AxiosResponse {
  message: string;
  code: string;
  result: {
    hash: string;
    url: string;
    orgUrl: string;
  };
}
