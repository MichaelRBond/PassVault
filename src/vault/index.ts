import { AxiosResponse } from "axios";
import { HttpClient } from "../utils/http";
import { Logger } from "../utils/logger";

export default class Vault {

  private cache = new Map<string, VaultCache>();

  public constructor(
      private http: HttpClient,
      private logger: Logger = new Logger("vault-client"),
  ) { }

  // TODO: Return Optional<string>
  public async login(url: string, username: string, password: string): Promise<string> {
    const requestParams = {
      url: `${url}/v1/auth/userpass/login/${username}`,
      method: "POST",
      data: {password},
    };
    const result = await this.http.request(requestParams);
    // TODO : Check result.status, if not successful return Optional.empty()
    this.logger.info(`Logged in to vault as user ${username}`);
    return result.data.auth.client_token;
  }

  public async read<T>(url: string, token: string): Promise<T> {
    const cacheKey = Vault.getCacheKey("read", url);
    if (this.cache.has(cacheKey) && !this.cache.get(cacheKey).isExpired()) {
      return this.cache.get(cacheKey).value as T;
    }

    // TODO : this request needs to be more tolerant of 404's and other potential errors.
    // When a 404 is returned this should return an empty optional
    const result = await this.http.request({
      url,
      method: "GET",
      headers: {
          "X-Vault-Token": token,
      },
    });

    const secret = result.data.data;
    this.cache.set(cacheKey, new VaultCache(secret));

    return secret;
  }

  // TODO : These should not be axios response types. Return `result.data` and type
  // the return better
  public write(url: string, data: any, token: string): Promise<AxiosResponse> {
    // Clear the cache on writes so we can pull new folders/secrets
    this.cache.clear();
    return this.http.request({
      url,
      method: "POST",
      headers: {
          "X-Vault-Token": token,
      },
      data,
    });
  }

  public delete(url: string, token: string): Promise<AxiosResponse> {
    return this.http.request({
        url,
        method: "DELETE",
        headers: {
            "X-Vault-Token": token,
        },
    });
  }

  public async list(url: string, token: string): Promise<string[]> {
    const cacheKey = Vault.getCacheKey("list", url);
    if (this.cache.has(cacheKey) && !this.cache.get(cacheKey).isExpired()) {
      return this.cache.get(cacheKey).value as string[];
    }

    const result = await this.http.request({
      method: "LIST",
      url,
      headers: {
          "X-Vault-Token": token,
      },
    });

    const list = result.data.data.keys;
    this.cache.set(cacheKey, new VaultCache(list));

    return list;
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

  // Visible for testing
  public static getCacheKey(type: string, url: string): string {
    return `${type}--${url}`;
  }
}

class VaultCache {
  constructor(
    public value: any,
    private timestamp: number = Date.now(),
  ) {}

  public isExpired(ttlSeconds: number = 600): boolean {
    return (Date.now() - this.timestamp) > ttlSeconds;
  }
}
