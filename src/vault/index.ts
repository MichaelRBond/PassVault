import axios from "axios";
import { AxiosInstance } from "axios";
import { Logger } from "../utils/logger";
import Password from "./password";

export default class Vault {
    private axiosClient: AxiosInstance;
    private logger: Logger;

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
            });
    }

    public listSecrets(path: string): Promise<string[]> {
        return this.axiosClient.request({
            method: "LIST",
            url: `/${path}`,
        }).then((response) => {
            return response.data.data.keys;
        });
    }

    public getPassword(path: string): Promise<Password> {
        return this.axiosClient.get(`/${path}`).then((response) => {
            return response.data.data;
        });
    }

    public set token(token: string) {
        this.axiosClient.defaults.headers.common["X-Vault-Token"] = token;
    }

    public get token(): string {
        return this.axiosClient.defaults.headers.common["X-Vault-Token"];
    }

    public static restore(url: string, token: string): Vault {
        const client = new Vault(url);
        client.token = token;

        return client;
    }
}
