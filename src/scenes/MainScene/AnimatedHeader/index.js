/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { ColorPallete } from '../../../common/styles';
// import { StackActions, useNavigation } from '@react-navigation/native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const index = props => {
    const [scrollState, setScrollState] = useState(new Animated.Value(0));

    useEffect(() => {
        // 스크롤 정보가 업데이트 되는 경우
        if (props.visibility) {
            if (scrollState !== 1) {
                Animated.timing(scrollState, {
                    toValue: 1,
                    duration: 200,
                    delay: 0,
                }).start();
            }
        } else {
            if (scrollState !== 0) {
                Animated.timing(scrollState, {
                    toValue: 0,
                    duration: 200,
                    delay: 0,
                }).start();
            }
        }
    }, [props, props.visibility, scrollState]);

    const _evt = {
        animated: {
            init: () => {},
            onScroll: () => {},
        },
        interpolate: {
            titleColor: (() => {
                return scrollState.interpolate({
                    inputRange: [0, 1],
                    outputRange: [ColorPallete.white, ColorPallete.shadow],
                });
            })(),
            bgColor: (() => {
                return scrollState.interpolate({
                    inputRange: [0, 1],
                    outputRange: [ColorPallete.clear, ColorPallete.white],
                });
            })(),
            borderWidth: (() => {
                return scrollState.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                });
            })(),
        },
        computedStyle: {
            container: () => {
                return {
                    borderBottomWidth: _evt.interpolate.borderWidth,
                    borderBottomColor: '#ccc',
                    backgroundColor: _evt.interpolate.bgColor,
                };
            },
            title: () => {
                return {
                    color: _evt.interpolate.titleColor,
                };
            },
        },
    };

    return (
        <Animated.View style={[styles.wrapper, _evt.computedStyle.container()]}>
            <StatusBar barStyle="dark-content" />
            <Animated.Text style={[styles.title, _evt.computedStyle.title()]}>
                Masterpiece
            </Animated.Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorPallete.white,
        // height:100
    },
    wrapper: {
        // height: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: ColorPallete.clear,
        top: 0,
        // marginTop: 43,
        left: 0,
        // height: 43,
		width: screenWidth,
		paddingTop: 43,
		paddingBottom: 10
    },
    title: {
        fontFamily: 'Cookie',
        fontSize: 30,
    },
});
export default index;
