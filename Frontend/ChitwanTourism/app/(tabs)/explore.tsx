import { StyleSheet } from 'react-native';

import HomeScreen from '../../components/Tourism/HomeScreen';

export default function TabTwoScreen() {
  return (
   <HomeScreen></HomeScreen>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
