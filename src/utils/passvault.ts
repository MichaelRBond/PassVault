export const favoritesDelimiter = "%%%";

export function buildFavoritesPath(folder: string, name: string): string {
  return `${folder}${favoritesDelimiter}${name}`;
}
