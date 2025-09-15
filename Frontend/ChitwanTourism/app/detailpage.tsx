import { Entypo, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = 250;

const mockDestination = {
  id: 1,
  name: "Sauraha",
  country: "Nepal",
  rating: 4.8,
  reviews: 2847,
  images: [
    "https://images.unsplash.com/photo-1600774831067-bd2244b2051b?q=80&w=1333&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1633687087759-64d60bf9eb1e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1751931978323-cabb269cdc55?q=80&w=1170&auto=format&fit=crop"
  ],
  tags: ["Safari", "Beaches", "Sunset", "Island"],
  description: "Chitwan National Park",
  itinerary: [
    {
      day: 1,
      title: "Arrival & Oia Exploration",
      activities: [
        "Check into your hotel in Oia",
        "Explore the narrow streets",
        "Watch the sunset",
        "Dinner at a taverna"
      ]
    },
    {
      day: 2,
      title: "Safari & Jungle Tour",
      activities: [
        "Early morning safari",
        "Visit elephant breeding center",
        "Bird watching",
        "Evening cultural program"
      ]
    }
  ]
};

const mockReviews = [
  { id: 1, name: "Sarah Johnson", rating: 5, date: "2 weeks ago", comment: "Absolutely breathtaking!" },
  { id: 2, name: "Mark Lee", rating: 4, date: "1 month ago", comment: "Great experience, very well organized." }
];

const Detailpage = () => {
  const navigation = useNavigation();
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const scrollY = new Animated.Value(0);

  return (
    <View style={styles.container}>
      {/* Animated ScrollView */}
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {/* Top Image */}
        <Animated.Image
          source={{ uri: mockDestination.images[0] }}
          style={[
            styles.image,
            {
              height: scrollY.interpolate({
                inputRange: [0, IMAGE_HEIGHT],
                outputRange: [IMAGE_HEIGHT, 100], // shrink height
                extrapolate: 'clamp'
              }),
            },
          ]}
        />

        <View style={styles.content}>
          {/* Header overlay for back & like */}
          <View style={styles.headerOverlay}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.headerIcons}>
              <TouchableOpacity>
                <Feather name="share" size={22} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
                <Feather name="heart" size={22} color={isLiked ? 'red' : '#fff'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Title & Rating */}
          <Text style={styles.title}>{mockDestination.name}</Text>
          <Text style={styles.location}>
            <Entypo name="location-pin" size={16} /> {mockDestination.country}
          </Text>
          <Text>{mockDestination.rating} ★ ({mockDestination.reviews} reviews)</Text>

          {/* Tags */}
          <View style={styles.tags}>
            {mockDestination.tags.map(tag => <Text key={tag} style={styles.tag}>{tag}</Text>)}
          </View>

          {/* About */}
          <Text style={styles.sectionTitle}>About this place</Text>
          <Text style={styles.text}>{mockDestination.description}</Text>
          <Text>
                Since the end of the 19th century Chitwan used to be a favorite hunting ground for Nepal's ruling class during the cool winter seasons. Until the 1950s, the journey from Kathmandu to Nepal's south was arduous as the area could only be reached by foot and took several weeks. Comfortable camps were set up for the feudal big game hunters and their entourage, where they stayed for a couple of months shooting hundreds of tigers, rhinoceroses, elephant, leopards and sloth bears.[1]

In 1950, Chitwan's forest and grasslands extended over more than 2,600 km2 (1,000 sq mi) and were home to about 800 rhinos. When poor farmers from the mid-hills moved to the Chitwan Valley in search of arable land, the area was subsequently opened for settlement, and poaching of wildlife became rampant. In 1957, the country's first conservation law inured to the protection of rhinos and their habitat. Research of Chitwan was conducted by Edward Pritchard Gee during 1959 and 1963.[2][3]

By the end of the 1960s, 70% of Chitwan's jungles had been cleared, malaria eradicated using DDT, thousands of people had settled there, and only 95 rhinos remained. The dramatic decline of the rhino population and the extent of poaching prompted the government to institute the Gaida Gasti – a rhino reconnaissance patrol of 130 armed men and a network of guard posts all over Chitwan. To prevent the extinction of rhinos, the Chitwan National Park was gazetted in December 1970, with borders delineated the following year and established in 1973, initially encompassing an area of 544 km2 (210 sq mi).[4]

When the first protected areas were established in Chitwan, Tharu people were forced to relocate from their traditional lands. They were denied any right to own land and thus forced into a situation of landlessness and poverty. When the national park was designated, Nepalese soldiers destroyed the villages located inside the boundary of the park, burning down houses and trampling fields using elephants. The Tharu people were forced to leave at gunpoint.[5]
            </Text>
          {/* Itinerary */}
          <Text style={styles.sectionTitle}>Suggested Itinerary</Text>
          {mockDestination.itinerary.map(day => (
            <TouchableOpacity
              key={day.day}
              style={styles.itineraryCard}
              onPress={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
              activeOpacity={0.8}
            >
              <Text style={{ fontWeight: 'bold' }}>{`Day ${day.day}: ${day.title}`}</Text>
              {expandedDay === day.day && (
                <View style={styles.itineraryList}>
                  {day.activities.map((act, idx) => (
                    <Text key={idx} style={styles.activityItem}>• {act}</Text>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          ))}

          {/* Reviews */}
          <Text style={styles.sectionTitle}>Reviews</Text>
          {mockReviews.map(review => (
            <View key={review.id} style={styles.reviewCard}>
              <Text style={styles.reviewName}>{review.name}</Text>
              <Text>{'★'.repeat(review.rating)} {review.date}</Text>
              <Text style={styles.text}>{review.comment}</Text>
            </View>
          ))}

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.primaryButton}>
              <MaterialIcons name="calendar-today" size={16} color="white" />
              <Text style={styles.buttonText}>Add to Trip</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.outlineButton}>
              <Entypo name="map" size={16} color="#333" />
              <Text style={styles.outlineButtonText}>View on Map</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width, height: IMAGE_HEIGHT, resizeMode: 'cover' },
  headerOverlay: { position: 'absolute', top: 40, left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between', zIndex: 10 },
  headerIcons: { flexDirection: 'row', gap: 12 },
  content: { padding: 16, paddingTop: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  location: { color: 'gray', marginBottom: 8 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 8 },
  tag: { backgroundColor: '#eee', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  text: { color: 'gray', marginBottom: 8 },
  itineraryCard: { backgroundColor: '#f9f9f9', borderRadius: 8, padding: 12, marginBottom: 8 },
  itineraryList: { marginTop: 8 },
  activityItem: { color: 'gray', marginVertical: 2 },
  reviewCard: { backgroundColor: '#f1f1f1', borderRadius: 8, padding: 12, marginBottom: 8 },
  reviewName: { fontWeight: 'bold' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16, gap: 10 },
  primaryButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#2563eb', padding: 12, borderRadius: 8 },
  buttonText: { color: 'white', marginLeft: 8, fontWeight: '600' },
  outlineButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8 },
  outlineButtonText: { color: '#333', marginLeft: 8, fontWeight: '600' },
});

export default Detailpage;

export const options = { headerShown: false };
