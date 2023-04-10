import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

const index = () => {
    return (
        <SafeAreaView style={styles.container}>
            <WebView
                originWhitelist={['*']}
                source={{
                    uri:
                        'https://masterpiece-aframe-demo.glitch.me/insta.p1.html?page=1',
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
});

export default index;
