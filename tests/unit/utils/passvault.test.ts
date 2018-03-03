import {buildFavoritesPath} from "../../../src/utils/passvault";

describe("buildFavoritesPath", () => {
  it("correctly builds a favorites path", () => {
    expect(buildFavoritesPath("my-folder", "my-secret")).toEqual("my-folder/%%%my-secret");
    expect(buildFavoritesPath("my-folder/", "my-secret")).toEqual("my-folder/%%%my-secret");
  });
});
