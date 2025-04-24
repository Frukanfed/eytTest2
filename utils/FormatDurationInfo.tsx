export const getDurationInfo = (type: "movie" | "tv", details: any): string => {
  if (type === "movie") {
    const runtime = details.runtime;
    if (!runtime) return "Süre bilgisi yok";
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `🕐 ${hours > 0 ? `${hours} sa ` : ""}${minutes} dk`;
  } else {
    const seasons = details.number_of_seasons;
    const episodes = details.number_of_episodes;
    if (!seasons || !episodes) return "Bölüm bilgisi yok";
    return `📺 ${seasons} sezon, ${episodes} bölüm`;
  }
};
