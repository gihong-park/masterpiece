import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ColorPallete, Font } from '../common/styles';

const VRBadge = props => {
    return (
        <View style={[styles.container, props.style || {}]}>
            <Text style={styles.title}>VR 전시회</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingVertical: 3,
        backgroundColor: ColorPallete.shadow,
    },
    title: {
        fontFamily: Font.Bold,
        fontSize: 13,
        lineHeight: 17,
        color: ColorPallete.white,
    },
});

export default VRBadge;
