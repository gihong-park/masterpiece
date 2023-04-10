import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ColorPallete, Font } from '../common/styles';

const Divider = props => {
    return (
        <View style={[styles.Divider, props.DividerStyle || {}]}></View>
    );
};

const styles = StyleSheet.create({
    Divider: {
	   borderColor: '#e2e5e9',
	   borderWidth: 0.5,
	   width: '100%',
    },
});

export default Divider;
