import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// ✅ Replace this with your API key from https://makersuite.google.com/app/apikey
const GEMINI_API_KEY = 'AIzaSyD-eHY712-0F3YHPNVZaVGU0tTPEhnU29o';

export default function Chatbot() {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    setAiResponse('');

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent ?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: userInput }],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log('Gemini response:', JSON.stringify(data, null, 2));

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (response.ok && text) {
        setAiResponse(text);
      } else if (data.error?.message) {
        setAiResponse(`⚠️ API Error: ${data.error.message}`);
      } else {
        setAiResponse('⚠️ AI did not return a valid response.');
      }
    } catch (error) {
      console.error('Network error:', error);
      setAiResponse('❌ Network or server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Ask Gemini AI</Text>

        <TextInput
          placeholder="Type your message..."
          value={userInput}
          onChangeText={setUserInput}
          style={styles.input}
          multiline
        />

        <Button title="Send to Gemini" onPress={sendMessage} />

        {loading ? (
          <ActivityIndicator style={{ marginTop: 20 }} size="large" />
        ) : (
          <Text style={styles.response}>{aiResponse}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    minHeight: 60,
  },
  response: {
    marginTop: 20,
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
    color: '#333',
  },
});
