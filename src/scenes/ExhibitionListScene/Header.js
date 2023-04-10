import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ColorPallete from '../../common/styles/ColorPallete';

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Exhibitions{'\n'}
                    List
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorPallete.white,
        paddingHorizontal: 15,
        paddingTop: 15,
    },
    title: {
        fontSize: 50,
        color: ColorPallete.black,
        fontWeight: '800',
    },
    wrapper: {
        flexDirection: 'column',
        height: 135,
        borderBottomColor: ColorPallete.black,
        borderBottomWidth: 5,
        marginBottom: 20,
    },
});

export default Header;
