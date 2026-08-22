import backgroundData from "../../content/backgrounds/backgrounds.json";

export interface BackgroundMetadata {
    id: string;
    name: string;
    localName: string | false;
    lat: number;
    lon: number;
    url: string;
}

const imageModules = import.meta.glob("../../content/backgrounds/images/*", {
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

function shuffle<T>(items: T[]): T[] {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

let queue: BackgroundMetadata[] = [];

function refillQueue(excludeId?: string): void {
    queue = shuffle(backgrounds);
    if (excludeId && queue.length > 1 && queue[0].id === excludeId) {
        [queue[0], queue[1]] = [queue[1], queue[0]];
    }
}

export function getBackground(excludeId?: string): BackgroundMetadata {
    if (queue.length === 0) {
        refillQueue(excludeId);
    }
    return queue.shift()!;
}