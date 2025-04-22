import { FetchMovies } from "@/connection-functions/fetchMovies";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

type Props = {
  title: string;
  fetchUrl: string;
  refreshTrigger?: number;
};

export default function CategorySection({
  title,
  fetchUrl,
  refreshTrigger,
}: Props) {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const existingIds = new Set(data.map((item) => item.id));
      const newItems = await FetchMovies({
        endpoint: fetchUrl,
        page,
        existingIds,
      });

      setData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    } catch (error: any) {
      Alert.alert("Hata", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [refreshTrigger]);

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w300${item.poster_path}`,
              }}
              style={styles.image}
            />
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        onEndReached={loadData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" /> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginBottom: 8,
    color: "white",
  },
  item: {
    marginHorizontal: 8,
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
});
