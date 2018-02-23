import { AxiosResponse } from "axios";
import { isNullOrUndefined } from "util";
import { isBlank } from "../utils/helpers";
import { HttpClient } from "../utils/http";
import { Logger } from "../utils/logger";

export interface Password {
    name: string;
    url?: string;
    username: string;
    password: string;
    notes?: string;
}

// TODO : Refactor the vault client so that the vault client is simply the client and all
// business logic is moved into a PassVault-model.
// FIXME: Remove all state from the client. State should be a map in the model, to allow for multiple vault
// connections, using the vault URL as the primary key.
export default class Vault {

  // TODO : Add an in memory cache here. Cache all requests for passwords with a TTL

    public static PREFERENCES_SECRET = "preferences";
    public static FOLDERS = "passwords";

    private username: string; // FIXME: See note above
    private token: string = null; // FIXME: See Note above TODO : Optional instead of null
    private url: string; // FIXME: See note above

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
    // TODO : this should take a generic and return Optional<T>
    public read(path: string): Promise<AxiosResponse> {
        // TODO : this request needs to be more tolerant of 404's and other potential errors.
        // When a 404 is returned this should return an empty optional
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

  // TODO : SHould return an optional
  public async getPassword(secretPath: string): Promise<Password> {
    // TODO : attempt to read from cache. if it is in the cache, return. Otherwise
    // call vault
    const path = `${Vault.FOLDERS}/${secretPath}`;
    const response = await this.read(path);
    // TODO : if we get null/optional absent back from this.read() return an empty optional
    return response.data.data;
  }

  // TODO : don't return axios response
  public savePassword(password: Password, folder: string): Promise<AxiosResponse> {
    if (isBlank(folder)) {
      folder = "default";
    }
    const path = `${Vault.FOLDERS}/${folder}/${password.name}`;
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
