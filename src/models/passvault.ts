import { AxiosResponse } from "axios";
import Vault from "../vault/index";

export interface Password {
  url?: string;
  username: string;
  password: string;
  notes?: string;
}

export class VaultPassModel {

  public static PREFERENCES_SECRET = "/:username:/preferences";

  constructor(private vault: Vault) {

  }

  // TODO : Type better
  public getFavorites(username: string): any {
    //
  }

  public getPassword(path: string): Promise<Password> {
    return this.vault.read(path).then((response) => {
        return response.data.data;
    });
  }

  // TODO : don't return axios response
  public savePassword(path: string, password: Password): Promise<AxiosResponse> {
    return this.vault.write(path, password);
  }
}
