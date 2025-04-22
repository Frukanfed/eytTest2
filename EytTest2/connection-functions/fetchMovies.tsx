const BASE_URL = "https://api.themoviedb.org/3";
const BEARER_TOKEN = process.env.EXPO_PUBLIC_BEARER_TOKEN;

export const FetchMovies = async ({
  endpoint,
  page,
  existingIds = new Set<number>(),
}: {
  endpoint: string;
  page: number;
  existingIds?: Set<number>;
}): Promise<any[]> => {
  const url = `${BASE_URL}${endpoint}${
    endpoint.includes("?") ? "&" : "?"
  }page=${page}&language=en-US`;

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

    // Duplicate ID kontrolü
    const uniqueItems = result.results.filter(
      (item: any) => !existingIds.has(item.id)
    );

    return uniqueItems;
  } catch (error: any) {
    throw new Error(error.message || "Bilinmeyen bir hata oluştu");
  }
};
