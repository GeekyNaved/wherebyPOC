import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
// import { WherebyEmbed } from '@whereby.com/react-native-sdk';
// import { createRoom } from './utils/createRoom'; // Import the room creation function
import axios from 'axios';
import { WherebyEmbed } from '@whereby.com/react-native-sdk/embed';

const EmbAxios = () => {
  const [roomUrl, setRoomUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmFwcGVhci5pbiIsImF1ZCI6Imh0dHBzOi8vYXBpLmFwcGVhci5pbi92MSIsImV4cCI6OTAwNzE5OTI1NDc0MDk5MSwiaWF0IjoxNzM4MDU5MTg5LCJvcmdhbml6YXRpb25JZCI6MzA5ODQ0LCJqdGkiOiI0NThlNWJkMC0yNGExLTQzZTYtYTMyYS04OWM4OWYyYjQ3YzUifQ.w3DoF5kTk76JE1fSABYX5jfS0j6lbGrzKxCsnPtNjEU'; // Replace with your API Key
  // const BASE_URL = 'https://poc11.whereby.com/demo-c6cb282b-2ff1-45fa-98fb-57533353f823?roomKey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5nSWQiOiI5NjA0NzM2OSIsInJvb21SZWZlcmVuY2UiOnsicm9vbU5hbWUiOiIvZGVtby1jNmNiMjgyYi0yZmYxLTQ1ZmEtOThmYi01NzUzMzM1M2Y4MjMiLCJvcmdhbml6YXRpb25JZCI6IjMwOTg0NCJ9LCJpc3MiOiJodHRwczovL2FjY291bnRzLnNydi53aGVyZWJ5LmNvbSIsImlhdCI6MTczODA2MzM0OSwicm9vbUtleVR5cGUiOiJtZWV0aW5nSG9zdCJ9.5asft8gdIYFB3N1NMVjn1jYs2E0vK0XwP_AMZseynl4';
//   const BASE_URL = 'https://poc11.whereby.com/second71efc9e6-5a0c-4fc3-9a8d-aa1473a758e0?roomKey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5nSWQiOiI5NjA1NTc1OCIsInJvb21SZWZlcmVuY2UiOnsicm9vbU5hbWUiOiIvc2Vjb25kNzFlZmM5ZTYtNWEwYy00ZmMzLTlhOGQtYWExNDczYTc1OGUwIiwib3JnYW5pemF0aW9uSWQiOiIzMDk4NDQifSwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5zcnYud2hlcmVieS5jb20iLCJpYXQiOjE3MzgwNjc2OTEsInJvb21LZXlUeXBlIjoibWVldGluZ0hvc3QifQ.obarm6L8LNapGpd_5J9OcoCn-taAsz3MYATe8mkXzmM';
  // const BASE_URL = 'https://poc11.whereby.com/checke864439f-c4a2-4d86-a503-351bacbcf553?roomKey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5nSWQiOiI5NjA1MTg3NCIsInJvb21SZWZlcmVuY2UiOnsicm9vbU5hbWUiOiIvY2hlY2tlODY0NDM5Zi1jNGEyLTRkODYtYTUwMy0zNTFiYWNiY2Y1NTMiLCJvcmdhbml6YXRpb25JZCI6IjMwOTg0NCJ9LCJpc3MiOiJodHRwczovL2FjY291bnRzLnNydi53aGVyZWJ5LmNvbSIsImlhdCI6MTczODA2Mzc1Nywicm9vbUtleVR5cGUiOiJtZWV0aW5nSG9zdCJ9.BU7eE6ic8CHf1JENPC43QdKQPeqkxwAlTs_qk4jgQOU';
//   const BASE_URL = 'https://api.whereby.dev/v1/rooms';

  const handleCreateRoom = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        BASE_URL,
        {
          fields: ['hostRoomUrl'],
          roomMode: 'normal', // "normal" or "group"
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      console.log('response?.data', response?.data)
      setRoomUrl(response.data.roomUrl);
      // return response.data.roomUrl;
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error creating room:', error?.response.data);
      // throw error;
    }
  };

  // const handleCreateRoom = async () => {
  //   setLoading(true);
  //   try {
  //     const url = await createRoom();
  //     setRoomUrl(url);
  //   } catch (error) {
  //     console.error('Failed to create room');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <View style={styles.container}>
      {!roomUrl ? (
        <>
          <Text style={styles.title}>Create a Whereby Room</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button title="Create Room" onPress={handleCreateRoom} />
          )}
        </>
      ) : (
        <WherebyEmbed
          roomUrl={roomUrl}
          style={styles.webview}
          options={{
            displayName: 'Your Name',
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  webview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default EmbAxios;
