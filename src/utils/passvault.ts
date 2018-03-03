export const favoritesDelimiter = "%%%";

export function buildFavoritesPath(folder: string, name: string): string {
  if (!/\/$/.test(folder)) {
    folder = folder + "/";
  }
  return `${folder}${favoritesDelimiter}${name}`;
}
