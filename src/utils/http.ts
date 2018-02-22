import axios, {AxiosPromise, AxiosRequestConfig} from "axios";

export class HttpClient implements HttpClient {
  public request(requestConfig: AxiosRequestConfig): AxiosPromise {
    return axios.request(requestConfig);
  }
}

export const ValidStatusCodes = {
  ALL: (status: number) => true,
  STATUS_2XX: (status: number) => status >= 200 && status < 300,
  STATUS_3XX: (status: number) => status >= 200 && status < 400,
  STATUS_4XX: (status: number) => status >= 200 && status < 500,
};
