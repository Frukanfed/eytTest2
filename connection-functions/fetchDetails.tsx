const BASE_URL = "https://api.themoviedb.org/3";
const BEARER_TOKEN = process.env.EXPO_PUBLIC_BEARER_TOKEN;

type Props = {
  id: string | number;
  type: "movie" | "tv";
};

export const FetchDetails = async ({ id, type }: Props) => {
  const url = `${BASE_URL}/${type}/${id}?language=en-US`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.status_message || "Detay getirilemedi");
    }

    return json;
  } catch (error: any) {
    throw new Error(error.message || "Bilinmeyen hata");
  }
};
