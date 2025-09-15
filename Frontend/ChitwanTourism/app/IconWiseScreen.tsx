import { RouteProp } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// Types
type Place = { id: string; name: string; desc: string; image: string };

type RootStackParamList = {
  Category: { label: string; color: string };
};

type CategoryScreenRouteProp = RouteProp<RootStackParamList, "Category">;

interface Props {
  route: CategoryScreenRouteProp;
}

// Dummy places
const initialPlaces: Place[] = [
  {
    id: "1",
    name: "Shivapuri National Park",
    desc: "Lush forest with rich biodiversity, great for hiking.",
    image: "https://images.unsplash.com/photo-1600774831067-bd2244b2051b?q=80&w=1333&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Phewa Lake",
    desc: "Beautiful lake in Pokhara with boating options.",
    image: "https://images.unsplash.com/photo-1647863234151-9a894a66dad2?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Everest Base Camp",
    desc: "World famous trekking destination in the Himalayas.",
    image: "https://images.unsplash.com/photo-1751931978323-cabb269cdc55?q=80&w=1170&auto=format&fit=crop",
  },
];

const IconWiseScreen: React.FC<Props> = ({ route }) => {
  
    // Use optional chaining and defaults
  const label = route?.params?.label || "Forest";
  const color = route?.params?.color || "#3498db";
  const [search, setSearch] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<FlatList<Place>>(null);

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % initialPlaces.length;
        carouselRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Filter places
  const filteredPlaces = initialPlaces.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Render Carousel Item
  const renderCarouselItem: ListRenderItem<Place> = ({ item }) => (
    <View style={styles.carouselCard}>
      <Image source={{ uri: item.image }} style={styles.carouselImage} />
      <View style={styles.carouselOverlay}>
        <Text style={styles.carouselText}>{item.name}</Text>
      </View>
    </View>
  );

  // Render Place List Item
  const renderPlaceItem: ListRenderItem<Place> = ({ item }) => (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.placeName}>{item.name}</Text>
        <Text style={styles.placeDesc}>{item.desc}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Title */}
      <Text style={[styles.title, { color }]}>{label}</Text>

      {/* Search */}
      <TextInput
        style={[styles.searchInput, { borderColor: color }]}
        placeholder="Search places..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Carousel */}
      <FlatList
        ref={carouselRef}
        data={initialPlaces}
        renderItem={renderCarouselItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 20 }}
        initialScrollIndex={currentIndex}
        getItemLayout={(_, index) => ({
          length: width * 0.9,
          offset: width * 0.9 * index,
          index,
        })}
        snapToAlignment="center"
        snapToInterval={width * 0.9}
        decelerationRate="fast"
      />

      {/* Places List */}
      <FlatList
        data={filteredPlaces}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={renderPlaceItem}
      />
    </ScrollView>
  );
};

export default IconWiseScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 12 },
  searchInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  carouselCard: {
    width: width * 0.9,
    borderRadius: 16,
    overflow: "hidden",
    marginHorizontal: width * 0.05 * 0.5,
    elevation: 4,
  },
  carouselImage: { width: "100%", height: 180 },
  carouselOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
  },
  carouselText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  card: {
    backgroundColor: "#fff",
    marginTop: 16,
    borderRadius: 12,
    borderLeftWidth: 6,
    overflow: "hidden",
    elevation: 3,
  },
  image: { width: "100%", height: 150 },
  cardContent: { padding: 12 },
  placeName: { fontSize: 20, fontWeight: "700", marginBottom: 6 },
  placeDesc: { fontSize: 14, color: "#555" },
});
