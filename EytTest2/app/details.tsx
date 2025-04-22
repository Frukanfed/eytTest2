import Header from "@/components/Header";
import { FetchDetails } from "@/connection-functions/fetchDetails";
import { formatDateLong } from "@/utils/FormatDate";
import { getDurationInfo } from "@/utils/FormatDurationInfo";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

export default function DetailsScreen() {
  const { id, type } = useLocalSearchParams();
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const data = await FetchDetails({
        id: id as string,
        type: type === "movie" ? "movie" : "tv",
      });
      setDetails(data);
    } catch (e) {
      console.error("Detay hatası:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && type) load();
  }, [id, type]);

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;
  if (!details)
    return <Text style={styles.errorText}>Detaylar bulunamadı 😢</Text>;

  const imagePath = details.backdrop_path || details.poster_path;

  return (
    <ScrollView style={styles.container}>
      <Header />
      {imagePath ? (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w780${imagePath}` }}
          style={styles.backdrop}
        />
      ) : (
        <View style={[styles.backdrop, styles.noImage]}>
          <Text style={styles.noImageText}>Görsel bulunamadı 😢</Text>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2}>
            {details.title || details.name}
          </Text>
          <Text style={styles.duration}>
            {getDurationInfo(type as "movie" | "tv", details)}
          </Text>
        </View>

        {details.tagline != "" && (
          <Text style={[{ fontWeight: "bold" }, styles.subtitle]}>
            🧵"{details.tagline}"
          </Text>
        )}
        <Text style={styles.subtitle}>🌟 {details.vote_average}/10</Text>
        <Text style={styles.overview}>
          {details.overview || "Açıklama bulunamadı."}
        </Text>
        <Text style={styles.releaseDate}>
          {formatDateLong(details.release_date || details.first_air_date)}
        </Text>
        <Text style={styles.releaseDate}>
          🎬 {details.production_companies[0].name}
        </Text>
        <View style={styles.genreRow}>
          {details.genres?.map((genre: { id: number; name: string }) => (
            <Text key={genre.id} style={styles.genre}>
              {genre.name}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  backdrop: {
    width: width,
    height: width * 0.56,
  },
  content: {
    padding: 16,
  },
  titleRow: {
    flexDirection: "row",
    marginBottom: 8,
  },

  title: {
    flexBasis: "60%",
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },

  duration: {
    flexBasis: "40%",
    fontSize: 14,
    textAlign: "right",
    color: "#ccc",
    paddingTop: 6,
  },

  subtitle: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 10,
  },
  overview: {
    color: "#ddd",
    fontSize: 15,
    lineHeight: 22,
  },
  noImage: {
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  noImageText: {
    color: "#aaa",
    fontSize: 14,
  },
  errorText: {
    color: "white",
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    height: "100%",
  },
  releaseDate: {
    color: "#ddd",
    fontSize: 15,
    lineHeight: 22,
    paddingTop: 20,
  },
  genreRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
    paddingTop: 20,
  },

  genre: {
    backgroundColor: "#222",
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 12,
  },
});
