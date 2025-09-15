
import LoadingScreen from '@/components/Tourism/LoadingScreen';
import UserInteractiveScreen from '@/components/Tourism/UserInteractScreen.';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Assuming you're using React Navigation


export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    // Fake loading (4 seconds)
    setTimeout(() => setIsLoading(false), 4000);
  }, []);

  // If it's loading, hide the bottom navigation
  useEffect(() => {
    if (isLoading) {
      navigation.setOptions({
        tabBarStyle: { display: 'none' }, // Hides the bottom tab bar
      });
    } else {
      navigation.setOptions({
        tabBarStyle: { display: 'flex' }, // Shows the bottom tab bar again
      });
    }
  }, [isLoading, navigation]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <UserInteractiveScreen />;
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
