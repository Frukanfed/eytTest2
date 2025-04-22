import { FetchDetails } from "@/connection-functions/fetchDetails";
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
        <Text style={styles.title}>{details.title || details.name}</Text>
        <Text style={styles.subtitle}>Puan: {details.vote_average}/10</Text>
        <Text style={styles.overview}>
          {details.overview || "Açıklama bulunamadı."}
        </Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
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
});
