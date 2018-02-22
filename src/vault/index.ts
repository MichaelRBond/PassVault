import { AxiosResponse } from "axios";
import { isNullOrUndefined } from "util";
import { HttpClient } from "../utils/http";
import { Logger } from "../utils/logger";

export interface Password {
    url?: string;
    username: string;
    password: string;
    notes?: string;
}

export default class Vault {
    public static PREFERENCES_SECRET = "preferences";
    public static FOLDERS = "passwords";

    // FIXME: Saving username state here will make it harder to have multiple valut servers configured
    private username: string;
    private token: string = null; // TODO : Optional
    private url: string; // can't pass into the constructor, because we create the object as
                         // react is starting up

    public constructor(
        private http: HttpClient,
        private logger: Logger = new Logger("vault-client"),
    ) { }

    public isAuthenticated(): boolean {
        return !isNullOrUndefined(this.token);
    }

    public async login(username: string, password: string): Promise<void> {
        const requestParams = {
            baseURL: `${this.url}/v1`,
            url: `/auth/userpass/login/${username}`,
            method: "POST",
            data: {password},
        };
        const result = await this.http.request(requestParams);
        this.logger.info(`Logged in to vault as user ${username}`);
        this.token = result.data.auth.client_token;
        this.username = username;
    }

    public getUsername(): string {
        return this.username;
    }

    // TODO : These should not be axios response types. Return `result.data` and type
    // the return better
    public read(path: string): Promise<AxiosResponse> {
        return this.http.request({
            baseURL: this.getBaseUrl(),
            url: `/${path}`,
            method: "GET",
            headers: {
                "X-Vault-Token": this.token,
            },
        });
    }

    // TODO : These should not be axios response types. Return `result.data` and type
    // the return better
    public write(path: string, data?: any): Promise<AxiosResponse> {
        return this.http.request({
            baseURL: this.getBaseUrl(),
            url: `/${path}`,
            method: "POST",
            headers: {
                "X-Vault-Token": this.token,
            },
            data,
        });
    }

    public async list(path: string): Promise<string[]> {
        const result = await this.http.request({
            baseURL: this.getBaseUrl(),
            method: "LIST",
            url: `/${path}`,
            headers: {
                "X-Vault-Token": this.token,
            },
        });
        return result.data.data.keys;
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

    public setUsername(username: string): void {
        this.username = username;
        return;
    }

    public setToken(token: string): void {
        this.token = token;
        return;
    }

    public getToken(): string {
        return this.token;
    }

    public setUrl(url: string): void {
        this.url = url;
        return;
    }

    public async testConnection(url: string): Promise<boolean> {
        try {
            await this.http.request({
                baseURL: `${url}/v1`,
                url: `/sys/health?standbyok`,
                method: "GET",
            });
            return true;
        } catch (err) {
            return false;
        }
    }

  public async getFavorites(): Promise<string[]> {
    const result = await this.read(Vault.PREFERENCES_SECRET);
    return result.data.data.favorites.split(/,/);
  }

  public async getFolders(): Promise<string[]> {
    const result = await this.list(Vault.FOLDERS);
    return(result);
  }

  public async getPassword(path: string): Promise<Password> {
    const response = await this.read(path);
    return response.data.data;
  }

  // TODO : don't return axios response
  public savePassword(path: string, password: Password): Promise<AxiosResponse> {
    return this.write(path, password);
  }

  private getBaseUrl(): string {
    return `${this.url}/v1/passvault/${this.username}`;
  }
}

export function restoreVaultClient(http: HttpClient, url: string, token: string, username: string): Vault {
    const vault = new Vault(http);
    vault.setUsername(username); // TODO : Remove state from client
    vault.setToken(token); // TODO : remove state from client
    return vault;
}
