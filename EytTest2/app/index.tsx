import React, { useState } from "react";
import { ScrollView, StyleSheet, RefreshControl } from "react-native";
import Header from "@/components/Header";
import FeaturedShow from "@/components/FeaturedShow";
import CategorySection from "@/components/CategorySection";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // tüm alt bileşenlere tetikleyici

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshTrigger((prev) => prev + 1); // tetikleyici state'i değiştir
    setTimeout(() => setRefreshing(false), 1000); // sahte bekleme
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressViewOffset={50}
        />
      }
      style={styles.container}
    >
      <Header />
      <FeaturedShow refreshTrigger={refreshTrigger} />

      <CategorySection
        title="Popüler Filmler"
        fetchUrl="/movie/popular"
        refreshTrigger={refreshTrigger}
      />
      <CategorySection
        title="En Yüksek Puanlı Filmler"
        fetchUrl="/movie/top_rated"
        refreshTrigger={refreshTrigger}
      />
      <CategorySection
        title="Aksiyon Filmleri"
        fetchUrl="/discover/movie?with_genres=28"
        refreshTrigger={refreshTrigger}
      />
      <CategorySection
        title="Komedi Filmleri"
        fetchUrl="/discover/movie?with_genres=35"
        refreshTrigger={refreshTrigger}
      />
      <CategorySection
        title="Popüler Diziler"
        fetchUrl="/tv/popular"
        refreshTrigger={refreshTrigger}
      />
      <CategorySection
        title="En Yüksek Puanlı Diziler"
        fetchUrl="/tv/top_rated"
        refreshTrigger={refreshTrigger}
      />
      <CategorySection
        title="Komedi Dizileri"
        fetchUrl="/discover/tv?with_genres=35"
        refreshTrigger={refreshTrigger}
      />
      <CategorySection
        title="Bilim Kurgu Dizileri"
        fetchUrl="/discover/tv?with_genres=10765"
        refreshTrigger={refreshTrigger}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Netflix vibe 😎
  },
});
