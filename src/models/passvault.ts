import { AxiosResponse } from "axios";
import { isNullOrUndefined } from "util";
import { isBlank } from "../utils/helpers";
import Vault from "../vault";

export interface Secret {
  name: string;
  url?: string;
  username: string;
  password: string;
  notes?: string;
}

export class PassVaultModel {

  public static PREFERENCES_SECRET = "preferences";
  public static FOLDERS = "passwords";

  private token: string = null;
  private url: string;
  private username: string;

  constructor(private vault: Vault) {
  }

  public async login(username: string, password: string): Promise<boolean> {
    const token = await this.vault.login(this.url, username, password);
    this.username = username;
    this.token = token;
    // TODO : if toekn is empty, return false
    return true;
  }

  public isAuthenticated(): boolean {
    return !isNullOrUndefined(this.token);
  }

  public async getFavorites(): Promise<string[]> {
    const result = await this.vault.read(`${this.getBaseUrl()}/${PassVaultModel.PREFERENCES_SECRET}`, this.token);
    return result.data.data.favorites.split(/,/);
  }

  public async getFolders(): Promise<string[]> {
    const result = await this.vault.list(`${this.getBaseUrl()}/${PassVaultModel.FOLDERS}`, this.token);
    return(result);
  }

  public async getSecretNamesFromFolder(folder: string): Promise<string[]> {
    return this.vault.list(`${this.getBaseUrl()}/${PassVaultModel.FOLDERS}/${folder}`, this.token);
  }

  // TODO : SHould return an optional
  public async getPassword(secretPath: string): Promise<Secret> {
    // TODO : attempt to read from cache. if it is in the cache, return. Otherwise
    // call vault
    const url = `${this.getBaseUrl()}/${PassVaultModel.FOLDERS}/${secretPath}`;
    const response = await this.vault.read(url, this.token);
    // TODO : if we get null/optional absent back from this.read() return an empty optional
    return response.data.data;
  }

  // TODO : don't return axios response
  public savePassword(password: Secret, folder: string): Promise<AxiosResponse> {
    if (isBlank(folder)) {
      folder = "default";
    }
    const url = `${this.getBaseUrl()}/${PassVaultModel.FOLDERS}/${folder}/${password.name}`;
    return this.vault.write(url, password, this.token);
  }

  public deletePassword(password: string, folder: string): Promise<AxiosResponse> {
    if (isBlank(folder)) {
      folder = "default";
    }
    const url = `${this.getBaseUrl()}/${PassVaultModel.FOLDERS}/${folder}/${password}`;
    return this.vault.delete(url, this.token);
  }

  public listTotp(): Promise<string[]> {
    return this.vault.list(`${this.getBaseUrl()}/${this.username}-totp/keys`, this.token);
  }

  public addTotp(website: string, totpUrl: string): Promise<any> {
      return this.vault.write(`${this.getBaseUrl()}/${this.username}-totp/keys/${website}`, {url: totpUrl}, this.token);
  }

  public async getTotpCode(website: string): Promise<string> {
      const response = await this.vault.read(`${this.getBaseUrl()}/${this.username}-totp/code/${website}`, this.token);
      return response.data.data.code;
  }

  public setUsername(username: string) {
    this.username = username;
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

  private getBaseUrl(): string {
    return `${this.url}/v1/passvault/${this.username}`;
  }
}
