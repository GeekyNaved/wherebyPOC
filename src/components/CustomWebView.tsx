import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { ROOM_URL } from '../constants';

export default function CustomWebView() {
  const [roomUrl, setRoomUrl] = useState('');

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
        if (
          granted[PermissionsAndroid.PERMISSIONS.CAMERA] === PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Camera and Audio permissions granted');
        } else {
          console.log('Permissions denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const createRoom = async () => {
    setRoomUrl(ROOM_URL);
  };

  return (
    <>
      {!roomUrl ? (
        <View style={styles.container}>
          <Text style={styles.title}>Create a Video Room</Text>
          <Button title="Create Room" onPress={createRoom} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Join the Meeting</Text>
          <WebView
            source={{ uri: roomUrl }}
            style={styles.webview}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onPermissionRequest={(event) => {
              console.log(event);
              event.grant(); // Grant permissions for WebRTC access
            }}

            onMessage={(event) => {
              const data = JSON.parse(event.nativeEvent.data);
              if (data.type == 'meeting_end' || data.type == 'leave') {
                console.log('User left the room, returning to main screen.');
                setRoomUrl('');
              }
            }}
          />
        </View>
      )}
    </>
  );
}

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
