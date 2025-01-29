import React, { useState } from 'react';
import { View, Button, StyleSheet, PermissionsAndroid, Platform, Alert, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { ROOM_URL } from '../constants';

export default function CustomWebView() {
  const [roomUrl, setRoomUrl] = useState('');

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const cameraPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
        const audioPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);

        if (cameraPermission && audioPermission) {
          console.log('Camera and Audio permissions already granted');
          createRoom(); // If permissions granted, proceed to create room
        } else {
          // Request permissions if not granted
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);

          if (
            granted[PermissionsAndroid.PERMISSIONS.CAMERA] === PermissionsAndroid.RESULTS.GRANTED &&
            granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('Camera and Audio permissions granted');
            createRoom(); // Proceed after permissions are granted
          } else {
            Alert.alert(
              'Permissions Required',
              'To continue, please grant camera and audio permissions in the app settings.',
              [
                {
                  text: 'Go to Settings',
                  onPress: () => Linking.openSettings(),
                },
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
              ]
            );
          }
        }
      } catch (err) {
        console.warn(err);
      }
    } else if (Platform.OS === 'ios') {
      // Handle iOS permissions here if needed
      createRoom(); // Assume permissions are handled via native iOS APIs
    }
  };

  const createRoom = async () => {
    setRoomUrl(ROOM_URL);
  };

  return (
    <>
      {!roomUrl ? (
        <View style={styles.container}>
          <Button title="Start call" onPress={requestPermissions} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
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
