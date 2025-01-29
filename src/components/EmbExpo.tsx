import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { WherebyEmbed, type WherebyWebView, WherebyEvent } from '@whereby.com/react-native-sdk/embed';
import { ROOM_URL } from '../constants';

// const EmbExpo_URL = ""; // Replace with your Whereby room URL

const EmbExpo: React.FC = () => {
  const wherebyRoomRef = useRef<WherebyWebView>(null);
  const scrollRef = useRef<ScrollView>(null);
  const [eventLogEntries, setEventLogEntries] = useState<WherebyEvent[]>([]);

  const handleWherebyEvent = (event: WherebyEvent) => {
    setEventLogEntries((prev) => [...prev, event]);
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView ref={scrollRef} style={styles.eventLog}>
        {eventLogEntries.map((entry, index) => (
          <Text key={index}>
            {entry.type} {entry.payload ? JSON.stringify(entry.payload) : ''}
          </Text>
        ))}
      </ScrollView>

      <Button
        onPress={() => {
          wherebyRoomRef.current?.knock();
        }}
        title="Knock"
      />
      <Button
        onPress={() => {
          wherebyRoomRef.current?.openSettings('advanced');
        }}
        title="Open Settings"
      />
      <Button
        onPress={() => {
          wherebyRoomRef.current?.toggleMicrophone();
        }}
        title="Toggle Microphone"
      />

      <View style={styles.embedWrapper}>
        <WherebyEmbed
          ref={wherebyRoomRef}
          style={styles.container}
          room={ROOM_URL}
          minimal
          skipMediaPermissionPrompt
          onWherebyMessage={handleWherebyEvent}
          onReady={() => console.log('Whereby ready')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  eventLog: {
    height: 50,
    flexGrow: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  embedWrapper: {
    flex: 1,
    height: '100%',
  },
  container: {
    flex: 1,
  },
});

export default EmbExpo;
