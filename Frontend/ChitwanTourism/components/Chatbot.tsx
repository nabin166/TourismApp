import React, { useState } from 'react';
import {
    ActivityIndicator,
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const OPENAI_API_KEY = 'sk-...'
export default function HaikuGenerator() {
  const [haiku, setHaiku] = useState('');
  const [loading, setLoading] = useState(false);

  const generateHaiku = async () => {
    setLoading(true);
    setHaiku('');

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: 'Write a haiku about AI.' },
          ],
        }),
      });

      const data = await response.json();
      console.log('OpenAI response:', JSON.stringify(data, null, 2));

      if (response.ok && data.choices?.[0]?.message?.content) {
        setHaiku(data.choices[0].message.content.trim());
      } else if (data.error?.message) {
        setHaiku(`⚠️ API Error: ${data.error.message}`);
      } else {
        setHaiku('⚠️ AI did not return a valid response.');
      }
    } catch (error) {
      console.error('Network error:', error);
      setHaiku('❌ Network or server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Button title="Generate Haiku About AI" onPress={generateHaiku} />
        {loading ? (
          <ActivityIndicator style={{ marginTop: 20 }} size="large" />
        ) : (
          <Text style={styles.haiku}>{haiku}</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  haiku: {
    marginTop: 20,
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    color: '#333',
  },
});
