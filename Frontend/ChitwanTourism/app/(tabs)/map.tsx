import { StyleSheet } from 'react-native';
import MapScreen from '../../components/Tourism/mapscreen';


export default function HomeScreen() {
  return (
    <MapScreen></MapScreen>
  );
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
}


