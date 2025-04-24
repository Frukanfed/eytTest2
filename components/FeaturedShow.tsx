import { FetchRandomShow } from "@/connection-functions/fetchRandomShow";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";

const { width } = Dimensions.get("window");

type Props = {
  refreshTrigger?: number;
};

const FeaturedShow = ({ refreshTrigger }: Props) => {
  const [show, setShow] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const randomShow = await FetchRandomShow();
      setShow(randomShow);
    } catch (error) {
      console.error("Error fetching featured show:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [refreshTrigger]); // tetikleyici geldiğinde yeniden fetch

  if (loading || !show) {
    return <ActivityIndicator size="large" style={{ marginVertical: 30 }} />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w780${show.backdrop_path}`,
        }}
        style={styles.backdrop}
      />
      <View style={styles.textWrapper}>
        <Text style={styles.label}>Sizin İçin Önerilen</Text>
        <Text style={styles.title}>{show.name}</Text>
        <Text style={styles.overview} numberOfLines={4}>
          {show.overview}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  backdrop: {
    width: width,
    height: width * 0.56,
  },
  textWrapper: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  label: {
    color: "#E50914",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
  },
  overview: {
    color: "#ccc",
    fontSize: 14,
  },
});

export default FeaturedShow;
