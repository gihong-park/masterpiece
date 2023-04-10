import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ColorPallete, Font } from '../common/styles';

const Header = props => {
    return (
        <View style={[styles.container, props.containerStyle || {}]}>
            <View style={[styles.wrapper, props.wrapperStyle || {}]}>
                <Text style={[styles.title, props.titleStyle || {}]}>
                    {props.title}
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
        fontFamily: Font.Black,
        lineHeight: 60,
    },
    wrapper: {
        flexDirection: 'column',
        // height : 135,
        borderBottomColor: ColorPallete.black,
        borderBottomWidth: 5,
        paddingBottom: 10,
        marginBottom: 20,
    },
});

export default Header;
