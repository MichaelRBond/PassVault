import axios from "axios";
import { AxiosInstance, AxiosResponse } from "axios";
import { Logger } from "../utils/logger";
import Password from "./password";

export default class Vault {
    private axiosClient: AxiosInstance;
    private logger: Logger;
    private username: string;

    public constructor(url: string) {
        this.axiosClient = axios.create({
            baseURL: `${url}/v1`,
        });
        this.logger = new Logger("vault-client");
    }

    public login(username: string, password: string): Promise<void> {
        return this.axiosClient.post(`/auth/userpass/login/${username}`, {password})
            .then((response) => {
                this.logger.info(`Logged in to vault as user ${username}`);
                this.token = response.data.auth.client_token;
                this.username = username;
            });
    }

    public read(path: string): Promise<AxiosResponse> {
        return this.axiosClient.get(`/${path}`);
    }

    public write(path: string, data?: any): Promise<AxiosResponse> {
        return this.axiosClient.post(`/${path}`, data);
    }

    public list(path: string): Promise<string[]> {
        return this.axiosClient.request({
            method: "LIST",
            url: `/${path}`,
        }).then((response) => {
            return response.data.data.keys;
        });
    }

    public getPassword(path: string): Promise<Password> {
        return this.read(path).then((response) => {
            return response.data.data;
        });
    }

    public savePassword(path: string, password: Password): Promise<AxiosResponse> {
        return this.write(path, password);
    }

    public listTotp(): Promise<string[]> {
        return this.list(`${this.username}-totp/keys`);
    }

    public addTotp(website: string, totpUrl: string): Promise<any> {
        return this.write(`${this.username}-totp/keys/${website}`, {url: totpUrl});
    }

    public getTotpCode(website: string): Promise<string> {
        return this.read(`${this.username}-totp/code/${website}`).then((response) => {
            return response.data.data.code;
        });
    }

    public set token(token: string) {
        this.axiosClient.defaults.headers.common["X-Vault-Token"] = token;
    }

    public get token(): string {
        return this.axiosClient.defaults.headers.common["X-Vault-Token"];
    }

    public static restore(url: string, token: string, username: string): Vault {
        const client = new Vault(url);
        client.token = token;
        client.username = username;

        return client;
    }
}
