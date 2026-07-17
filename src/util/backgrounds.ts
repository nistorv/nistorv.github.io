import backgroundData from "../content/backgrounds.json";

export interface BackgroundMetadata {
  id: string;
  name: string;
  localName: string | false;
  lat: number;
  lon: number;
  url: string;
}

const imageModules = import.meta.glob("../assets/backgrounds/*", {
  eager: true,
  import: "default",
}) as {
  [path: string]: string
};

const imagesByBaseName: Record<string, string> = Object.fromEntries(
  Object.entries(imageModules).map(([path, url]) => {
    const fileName = path.split("/").pop() ?? "";
    const baseName = fileName.substring(0, fileName.lastIndexOf("."));
    return [baseName, url];
  })
);

function getImageUrl(id: string): string | undefined {
  return imagesByBaseName[id];
}

export const backgrounds: BackgroundMetadata[] = backgroundData
  .map((entry) => ({ ...entry, url: getImageUrl(entry.id) }))
  .filter((entry): entry is BackgroundMetadata => entry.url !== undefined);

export function getBackground(excludeId?: string): BackgroundMetadata {
  const pool = backgrounds.filter((bg) => bg.id !== excludeId);
  return pool[Math.floor(Math.random() * pool.length)];
}