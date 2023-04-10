import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { ParallaxImage } from 'react-native-snap-carousel';
import { Font } from '../../../common/styles';
const CarouselItem = ({ item, index, pushStack }, parallaxProps) => {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            // onPress={pushStack}
        >
            <ParallaxImage
                source={{ uri: item.work_img_uri }}
                containerStyle={styles.parallaxContainer}
                style={styles.parallaxImage}
                parallaxFactor={0.3}
                {...parallaxProps}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.work_title}</Text>
                <Text style={styles.details_small}>
                    {item.work_year + ', ' + item.work_type}
                </Text>
                <Text style={styles.details}>{item.artist_ko_name}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    parallaxContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }),
        // Prevent a random Android rendering issue
        backgroundColor: 'white',
    },
    parallaxImage: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    infoContainer: {
        paddingTop: 15,
    },
    title: {
        fontFamily: Font.Medium,
        fontSize: 23,
        lineHeight: 26,
        marginBottom: 8,
    },
    details: {
        fontSize: 13,
        fontFamily: Font.Light,
        lineHeight: 16,
    },
    details_small: {
        fontSize: 11,
        fontFamily: Font.Light,
        lineHeight: 14,
    },
});

export default CarouselItem;
