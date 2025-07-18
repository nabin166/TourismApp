import React, { useEffect, useState } from 'react';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { WebView } from 'react-native-webview';
import { View, ActivityIndicator } from 'react-native';

export default function LeafletViewer() {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    const loadHTML = async () => {
      try {
        // Load the asset first
        const asset = Asset.fromModule(require('../assets/leafletjs/leaflet.html'));
        await asset.downloadAsync();

        // Read the content of the HTML file
        const content = await FileSystem.readAsStringAsync(asset.localUri || '');
        const replaced = content.replace('{{name}}', 'Hello from Expo');

        setHtmlContent(replaced);
      } catch (err) {
        console.error('Error loading HTML:', err);
      }
    };

    loadHTML();
  }, []);

  if (!htmlContent) {
    return <ActivityIndicator />;
  }

  return <WebView originWhitelist={['*']} source={{ html: htmlContent }} />;
}
