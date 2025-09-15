import React, { useState } from 'react';
import { Button, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Dummy Data
type Location = { id: string; name: string; description: string; details: string; image: string };
type Hotel = { id: string; name: string; rating: string; image: string };
type Itinerary = { id: string; date: string; location: string; activities: string[] };

// Dummy reviews
const randomReviews = [
  "Amazing place to visit! Loved every moment.",
  "A bit crowded, but the view is breathtaking!",
  "Worth the visit! A must-see when in Paris.",
  "The history is impressive, very educational!",
  "I recommend going in the evening for a great view.",
  "A beautiful spot! Would love to come back.",
];

const locations: Location[] = [
  { 
    id: '1', 
    name: 'Eiffel Tower', 
    description: 'Famous landmark in Paris', 
    details: 'Visit the Eiffel Tower for an amazing view of Paris.',
    image: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg' // Pexels image for Eiffel Tower
  },
  { 
    id: '2', 
    name: 'Colosseum', 
    description: 'Historic amphitheater in Rome', 
    details: 'Explore the ancient Colosseum, a wonder of Roman architecture.',
    image: 'https://images.pexels.com/photos/629142/pexels-photo-629142.jpeg' // Pexels image for Colosseum
  },
  { 
    id: '3', 
    name: 'Great Wall of China', 
    description: 'Ancient wall built to protect China', 
    details: 'Hike along one of the most famous landmarks in the world.',
    image: 'https://images.pexels.com/photos/1287089/pexels-photo-1287089.jpeg' // Pexels image for Great Wall of China
  },
];

const hotels: Hotel[] = [
  { id: '1', name: 'Hotel Paris', rating: '4.5', image: `https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg` },
  { id: '2', name: 'Rome Resort', rating: '5.0', image: `https://images.pexels.com/photos/30852843/pexels-photo-30852843.jpeg` },
];

const itinerary: Itinerary[] = [
  { id: '1', date: '2023-10-01', location: 'Eiffel Tower', activities: ['Sightseeing', 'Photography'] },
  { id: '2', date: '2023-10-05', location: 'Colosseum', activities: ['Guided Tour', 'Lunch'] },
];

// UserProfile Component
const UserProfile = () => {
  const [profilePic, setProfilePic] = useState('https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg');
  const [expandedItinerary, setExpandedItinerary] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState('https://images.pexels.com/photos/1234856/pexels-photo-1234856.jpeg');

  const handleLocationPress = (location: Location) => {
    alert(`Details for ${location.name}: ${location.details}`);
  };

  const handleItineraryToggle = (id: string) => {
    setExpandedItinerary(expandedItinerary === id ? null : id);
  };

  // Function to get a random review
  const getRandomReview = () => {
    return randomReviews[Math.floor(Math.random() * randomReviews.length)];
  };

  // Render Item for Locations
  const renderLocationItem = ({ item }: { item: Location }) => (
    <TouchableOpacity onPress={() => handleLocationPress(item)}>
      <View style={styles.locationCard}>
        <Text style={styles.locationTitle}>{item.name}</Text>
        <Text style={styles.locationDescription}>{item.description}</Text>
        <Image
          source={{ uri: item.image }} // Directly use the image property from the location object
          style={styles.locationImage}
        />
      </View>
    </TouchableOpacity>
  );

  // Render Item for Hotels
  const renderHotelItem = ({ item }: { item: Hotel }) => (
    <View style={styles.locationCard}>
      <Image source={{ uri: item.image }} style={styles.hotelImage} />
      <Text style={styles.locationTitle}>{item.name}</Text>
      <Text style={styles.locationDescription}>Rating: {item.rating}</Text>
    </View>
  );

  // Render Item for Itinerary
  const renderItineraryItem = ({ item }: { item: Itinerary }) => (
    <View style={styles.itineraryCard}>
      <Text style={styles.locationTitle}>Date: {item.date}</Text>
      <Text style={styles.locationDescription}>Location: {item.location}</Text>
      <Button title="..." onPress={() => handleItineraryToggle(item.id)} />
      {expandedItinerary === item.id && (
        <View style={styles.activityDetails}>
          <Text style={styles.locationDescription}>Activities: {item.activities.join(', ')}</Text>
        </View>
      )}
    </View>
  );

  // Render Item for Reviewed Locations with Random Review
  const renderReviewedLocation = ({ item }: { item: Location }) => (
    <View style={styles.locationCard}>
      <Text style={styles.locationTitle}>{item.name}</Text>
      <Text style={styles.locationDescription}>{getRandomReview()}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section with Cover Image */}
      <View style={styles.profileSection}>
        <Image source={{ uri: coverImage }} style={styles.coverImage} />
        <View style={styles.profileImageBackground}>
          <Image source={{ uri: profilePic }} style={styles.profilePic} />
        </View>
        <Text style={styles.username}>John Doe</Text>
        <Text style={styles.caption}>Traveler, Explorer, and Adventurer</Text>
      </View>

      {/* Itinerary Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Itinerary</Text>
        <FlatList
          data={itinerary}
          renderItem={renderItineraryItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* Favorite Hotels Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Favorite Hotels</Text>
        <FlatList
          data={hotels}
          renderItem={renderHotelItem}
          keyExtractor={(item) => item.id}
          horizontal
        />
      </View>

      {/* Bookmarked Locations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bookmarked Locations</Text>
        <FlatList
          data={locations}
          renderItem={renderLocationItem}
          keyExtractor={(item) => item.id}
          horizontal
        />
      </View>

      {/* Visited Locations (Horizontal Scroll) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Visited Locations</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FlatList
            data={locations}
            renderItem={renderLocationItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </ScrollView>
      </View>

      {/* Reviewed Locations with Random Review */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reviewed Locations</Text>
        <FlatList
          data={locations}
          renderItem={renderReviewedLocation}
          keyExtractor={(item) => item.id}
          horizontal
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  coverImage: {
    width: '100%',
    height: 150,  // Height of the cover image
    borderRadius: 10,
    marginBottom: -40,  // Overlapping effect with the profile picture
  },
  profileImageBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#000',
    marginTop: -40,  // Position the profile picture to overlap the cover image
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  caption: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
    color: '#333',
  },
  locationCard: {
    backgroundColor: '#fff',
    marginRight: 15,
    padding: 15,
    borderRadius: 12,
    width: 220,
    elevation: 5,
    marginBottom: 10,
  },
  hotelImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  locationImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginTop: 10,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  locationDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  itineraryCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 5,
  },
  activityDetails: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
  },
});

export default UserProfile;
