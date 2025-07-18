import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MapScreen() {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    const loadHtmlWithLocation = async () => {
      try {
        // Ask for location permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.warn('Location permission not granted');
          return;
        }

        // Get current location
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // Load HTML from asset
        const asset = Asset.fromModule(require('../../assets/leafletjs/leaflet.html'));
        await asset.downloadAsync();
        const html = await FileSystem.readAsStringAsync(asset.localUri || '');

        // Inject coordinates into the HTML
        const finalHtml = html
          .replace('{{title}}', 'Leaflet Map')
          .replace('{{lat}}', latitude.toString())
          .replace('{{lng}}', longitude.toString());

        setHtmlContent(finalHtml);
      } catch (err) {
        console.error('Error loading map:', err);
      }
    };

    loadHtmlWithLocation();
  }, []);

  if (!htmlContent) return <ActivityIndicator size="large" />;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: htmlContent }}
      javaScriptEnabled
      domStorageEnabled
      style={{ flex: 1 }}
    />
  );
}
