/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Pagination } from 'react-native-snap-carousel';
import { ColorPallete } from '../../../common/styles';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const PaginationContainer = props => {
    return (
        <Pagination
            dotsLength={0}
            activeDotIndex={props.activeSlide}
            containerStyle={styles.container}
            dotStyle={{
                width: 8,
                height: 8,
                borderRadius: 5,
                // marginHorizontal: 8,
                backgroundColor: 'rgba(255,255,255, 0.7)',
                // backgroundColor: ColorPallete.white,
            }}
            inactiveDotStyle={
                {
                    // Define styles for inactive dots here
                    // backgroundColor: 'rgba(255,255,255,.9)',
                }
            }
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        height: 65,
        marginTop: -65,
    },
});
export default PaginationContainer;
