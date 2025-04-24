const BASE_URL = "https://api.themoviedb.org/3";
const BEARER_TOKEN = process.env.EXPO_PUBLIC_BEARER_TOKEN;

export const FetchRandomShow = async (): Promise<any> => {
  const url = `${BASE_URL}/tv/popular?language=en-US&page=1`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.status_message || "Veri alınamadı");
    }

    const randomIndex = Math.floor(Math.random() * result.results.length);
    return result.results[randomIndex];
  } catch (error: any) {
    throw new Error(error.message || "Beklenmeyen bir hata oluştu");
  }
};
