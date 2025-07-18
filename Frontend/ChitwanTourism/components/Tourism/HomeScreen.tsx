import { Feather, Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import Detailpage from '../../app/detailpage';

import {
  FlatList,
  Image,
  ImageBackground,
  ImageStyle,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

// Define your destination type
type Destination = {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  tags: string[];
  country: string;
};

// Define navigation type
type RootStackParamList = {
  Home: undefined;
  Details: { destinationId: number };
};

const destinations: Destination[] = [
  {
    id: 1,
    name: 'Sauraha',
    image: 'https://images.unsplash.com/photo-1600774831067-bd2244b2051b?q=80&w=1333&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.8,
    reviews: 2847,
    tags: ['Romantic', 'Beaches', 'Sunset'],
    country: '🇬🇷 Greece',
  },
  {
    id: 2,
    name: 'Narayani Riverside',
    image: 'https://images.unsplash.com/photo-1633687087759-64d60bf9eb1e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.9,
    reviews: 3291,
    tags: ['Cultural', 'Heritage', 'Temples'],
    country: '🇯🇵 Japan',
  },
  {
    id: 3,
    name: 'Golaghat',
    image: 'https://images.unsplash.com/photo-1751931978323-cabb269cdc55?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.7,
    reviews: 1876,
    tags: ['Adventure', 'Mountains', 'Skiing'],
    country: '🇨🇭 Switzerland',
  },
  {
    id: 4,
    name: 'Upper Dhangadi',
    image: 'https://images.unsplash.com/photo-1647863234151-9a894a66dad2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.6,
    reviews: 4582,
    tags: ['Tropical', 'Beaches', 'Culture'],
    country: '🇮🇩 Indonesia',
  },
];

export default function HomeScreen() {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % destinations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const filteredDestinations = destinations.filter((dest) =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderItem = ({ item }: { item: Destination }) => (
    <TouchableOpacity 
      onPress={() => router.push('/detailpage')}
      style={styles.card}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage}  />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color="#facc15" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.reviewText}>{item.reviews} reviews</Text>
        <View style={styles.tags}>
          {item.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{ uri: destinations[currentImageIndex].image }}
        style={styles.hero}
      >
        <View style={styles.overlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Discover Your Next Adventure</Text>
          <Text style={styles.heroSubtitle}>Explore the world's most beautiful destinations</Text>
          <View style={styles.searchContainer}>
            <Feather name="search" size={18} color="gray"  />
            <TextInput
              style={styles.searchInput}
              placeholder="Search destinations..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      </ImageBackground>

      <FlatList
        data={filteredDestinations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </ScrollView>
  );
}

// Styles using React Native's StyleSheet
const styles = StyleSheet.create<{
  container: ViewStyle;
  hero: ViewStyle;
  overlay: ViewStyle;
  heroContent: ViewStyle;
  heroTitle: TextStyle;
  heroSubtitle: TextStyle;
  searchContainer: ViewStyle;
  searchIcon: ViewStyle;
  searchInput: TextStyle;
  listContainer: ViewStyle;
  card: ViewStyle;
  cardImage: ImageStyle;
  cardContent: ViewStyle;
  cardHeader: ViewStyle;
  cardTitle: TextStyle;
  rating: ViewStyle;
  ratingText: TextStyle;
  reviewText: TextStyle;
  tags: ViewStyle;
  tag: ViewStyle;
  tagText: TextStyle;
}>({
  container: { flex: 1, backgroundColor: '#f0f9ff' },
  hero: { height: 250, justifyContent: 'flex-end' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  heroContent: { padding: 16 },
  heroTitle: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  heroSubtitle: { color: 'white', marginTop: 4, marginBottom: 10 },
  searchContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16 },
  listContainer: { padding: 16 },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  cardImage: { width: '100%', height: 150 },
  cardContent: { padding: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  rating: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { marginLeft: 4, fontSize: 14 },
  reviewText: { fontSize: 12, color: '#555' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 },
  tag: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: { fontSize: 12, color: '#374151' },
});
