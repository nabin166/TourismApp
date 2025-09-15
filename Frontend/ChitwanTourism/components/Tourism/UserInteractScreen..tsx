import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

type Category = { id: string; name: string; label: string };
type BottomIcon = { id: string; name: string; label: string };
type CarouselItem = { id: string; title: string; img: { uri: string } };

const categories: Category[] = [
  { id: "1", name: "leaf", label: "Forests" },
  { id: "2", name: "water", label: "Rivers & Lakes" },
  { id: "3", name: "paw", label: "Wildlife" },
  { id: "4", name: "trail-sign", label: "Trekking" },
  { id: "5", name: "sunny", label: "Viewpoints" },
  { id: "6", name: "people", label: "Temples" },
  { id: "7", name: "business", label: "Monasteries" },
  { id: "8", name: "boat", label: "Boating" },
  { id: "9", name: "restaurant", label: "Local Food" },
  { id: "10", name: "people", label: "Culture" },
  { id: "11", name: "flame", label: "Festivals" },
  { id: "12", name: "snow", label: "Mountains" },
  { id: "13", name: "bonfire", label: "Camping" },
  { id: "14", name: "camera", label: "Photography" },
  { id: "15", name: "storefront", label: "Markets" },
  { id: "16", name: "earth", label: "Heritage Sites" },
];

const bottomIcons: BottomIcon[] = [
  { id: "1", name: "bookmark", label: "Saved" },
  { id: "2", name: "notifications", label: "Alerts" },
  { id: "3", name: "help-circle", label: "Help" },
];

const carouselData: CarouselItem[] = [
  {
    id: "1",
    title: "Meghauli – Eco Tourism",
    img: { uri: "https://images.unsplash.com/photo-1647863234151-9a894a66dad2?q=80&w=1170&auto=format&fit=crop" },
  },
  {
    id: "2",
    title: "Sauraha – Wildlife Gateway",
    img: { uri: "https://images.unsplash.com/photo-1600774831067-bd2244b2051b?q=80&w=1333&auto=format&fit=crop" },
  },
  {
    id: "3",
    title: "Devghat – Spiritual Land",
    img: { uri: "https://images.unsplash.com/photo-1751931978323-cabb269cdc55?q=80&w=1170&auto=format&fit=crop" },
  },
  {
    id: "4",
    title: "Jagatpur – Adventure Spot",
    img: { uri: "https://images.unsplash.com/photo-1647863234151-9a894a66dad2?q=80&w=1170&auto=format&fit=crop" },
  },
];

const topCategories = categories.slice(0, 4);
const centerCategories = categories.slice(4, 12);
const bottomCategories = categories.slice(12, 16);

export default function UserInteractiveScreen() {
  const carouselRef = useRef<FlatList<CarouselItem>>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const router = useRouter(); // Expo Router hook

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % carouselData.length;
        carouselRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderCategory: ListRenderItem<Category> = ({ item }) => (
    <TouchableOpacity
      style={{ flex: 1, margin: 12, alignItems: "center" }}
      onPress={() => router.push('/IconWiseScreen')}

    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 15,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
          elevation: 3,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
      >
        <Ionicons name={item.name as any} size={28} color="#2c3e50" />
      </View>
      <Text style={{ fontSize: 12, marginTop: 6, textAlign: "center" }}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderBottom: ListRenderItem<BottomIcon> = ({ item }) => (
    <TouchableOpacity style={{ flex: 1, alignItems: "center", marginVertical: 12 }}>
      <Ionicons name={item.name as any} size={28} color="#2c3e50" />
      <Text style={{ fontSize: 12, marginTop: 4 }}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderCarouselItem: ListRenderItem<CarouselItem> = ({ item }) => (
    <View style={{ width, alignItems: "center" }}>
      <Image
        source={item.img}
        style={{ width: width * 0.9, height: 180, borderRadius: 15 }}
        resizeMode="cover"
      />
      <Text
        style={{
          position: "absolute",
          bottom: 15,
          left: 30,
          right: 30,
          color: "#fff",
          fontSize: 16,
          fontWeight: "bold",
          textShadowColor: "rgba(0,0,0,0.6)",
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 4,
        }}
      >
        {item.title}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#3498db" }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        {/* Header */}
        <View style={{ flexDirection: "row", alignItems: "center", padding: 10, backgroundColor: "#3498db" }}>
          <Image
            source={require("../../assets/images/tourism-committee-logo.png")}
            style={{ width: 50, height: 50 }}
            resizeMode="contain"
          />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              backgroundColor: "#fff",
              borderRadius: 20,
              paddingHorizontal: 10,
              alignItems: "center",
              marginHorizontal: 8,
            }}
          >
            <Ionicons name="search" size={18} color="#777" />
            <TextInput placeholder="Search places..." style={{ flex: 1, paddingVertical: 5, marginLeft: 5 }} />
          </View>
          <TouchableOpacity style={{ marginHorizontal: 6 }} onPress={() => router.push('/UserProfile')}>
            <Ionicons name="person-circle" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="settings" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Top 4 icons */}
        <FlatList<Category>
          data={topCategories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          numColumns={4}
          scrollEnabled={false}
          contentContainerStyle={{ padding: 10 }}
        />

        {/* Carousel */}
        <FlatList<CarouselItem>
          ref={carouselRef}
          data={carouselData}
          renderItem={renderCarouselItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 10 }}
        />

        {/* Center 8 icons */}
        <FlatList<Category>
          data={centerCategories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          numColumns={4}
          scrollEnabled={false}
          contentContainerStyle={{ padding: 10 }}
        />

        {/* Bottom 4 icons */}
        <FlatList<Category>
          data={bottomCategories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          numColumns={4}
          scrollEnabled={false}
          contentContainerStyle={{ padding: 10 }}
        />

        {/* Bottom 3 icons */}
        <FlatList<BottomIcon>
          data={bottomIcons}
          renderItem={renderBottom}
          keyExtractor={(item) => item.id}
          numColumns={3}
          scrollEnabled={false}
          contentContainerStyle={{ padding: 10 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
