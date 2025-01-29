import { WherebyEmbed, WherebyWebView } from '@whereby.com/react-native-sdk/embed';
import React, { useRef } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { ROOM_URL } from '../constants';

// const ROOM_URL = 'https://poc11.whereby.com/demo-c6cb282b-2ff1-45fa-98fb-57533353f823?roomKey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5nSWQiOiI5NjA0NzM2OSIsInJvb21SZWZlcmVuY2UiOnsicm9vbU5hbWUiOiIvZGVtby1jNmNiMjgyYi0yZmYxLTQ1ZmEtOThmYi01NzUzMzM1M2Y4MjMiLCJvcmdhbml6YXRpb25JZCI6IjMwOTg0NCJ9LCJpc3MiOiJodHRwczovL2FjY291bnRzLnNydi53aGVyZWJ5LmNvbSIsImlhdCI6MTczODA2NDI2OSwicm9vbUtleVR5cGUiOiJtZWV0aW5nSG9zdCJ9.qsYFYFMWkarUTaWninU3nfEiL501yO996EI8FdJM02A'; // Replace with your actual room URL

const EmbWebView = () => {
    const wherebyRoomRef = useRef<WherebyWebView>(null);

    return (
        <View style={styles.container}>
            <Button
                onPress={() => {
                    wherebyRoomRef.current?.toggleMicrophone();
                }}
                title="Toggle Microphone"
            />
            <View style={styles.embedContainer}>
                <WherebyEmbed
                    ref={wherebyRoomRef}
                    style={styles.embed}
                    room={ROOM_URL}
                    minimal
                    skipMediaPermissionPrompt
                    onWherebyMessage={(event) => {
                        console.log(event);
                    }}
                    onReady={() => {
                        console.log('Whereby ready');
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    embedContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    embed: {
        flex: 1,
    },
});

export default EmbWebView;
