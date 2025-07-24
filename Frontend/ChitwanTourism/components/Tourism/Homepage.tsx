import React from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';


const { width } = Dimensions.get('window');
const videoHeight = (width * 9) / 16;

// Define the type for video items
interface VideoItem {
  id: string;
  title: string;
  url: string;
}

const videoData: VideoItem[] = [
  {
    id: '1',
    title: '🌿 Chitwan National Park - Sauraha',
    url: 'https://archive.org/embed/mmm_20250722',
  },
  {
    id: '2',
    title: '🐊 Gharial Conservation - Chitwan',
    url: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
  },
  {
    id: '3',
    title: '🎥 Narayani River Viewpoint',
    url: 'https://archive.org/download/BigBuckBunny_328/BigBuckBunny_512kb.mp4',
  },
];

export default function homepage() {
  const renderItem: ListRenderItem<VideoItem> = ({ item }) => (
    <View style={styles.card}>
      <WebView
        source={{ uri: item.url }}
        style={styles.video}
        javaScriptEnabled
        allowsFullscreenVideo
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>Video ID: {item.id}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <Text style={styles.header}>🎬 Video Newsfeed</Text>
      <FlatList
        data={videoData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafa',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    padding: 16,
    textAlign: 'center',
    color: '#222',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  video: {
    width: '100%',
    height: videoHeight,
    backgroundColor: '#000',
  },
  textContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#888',
  },
});
