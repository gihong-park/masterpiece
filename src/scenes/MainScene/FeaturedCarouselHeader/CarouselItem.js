import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { ParallaxImage } from 'react-native-snap-carousel';
import { Font, ColorPallete } from '../../../common/styles';
import RemainDateText from '../../../components/RemainDateText';
const CarouselItem = ({ item, index, pushStack }, parallaxProps) => {
    const evt = {
        onPress: () => {
            pushStack();
        },
    };
    return (
        <View style={styles.container}>
            <ParallaxImage
                source={{ uri: item.exhibition_img_uri }}
                containerStyle={styles.parallaxContainer}
                style={styles.parallaxImage}
                parallaxFactor={0.3}
                {...parallaxProps}
            />
            <TouchableOpacity
                activeOpacity={1}
                style={styles.infoContainer}
                onPress={evt.onPress}>
                <View style={styles.vrIconContainer}>
                    <Text style={styles.vrIconText}>VR 전시회</Text>
                </View>
                <Text style={styles.title}>{item.exhibition_ko_title}</Text>
                <RemainDateText
                    style={styles.details}
                    start_date={item.exhibition_start_date}
                    finish_date={item.exhibition_finish_date}
                />
                <Text style={styles.details}>{item.gallery_en_name}</Text>
            </TouchableOpacity>
        </View>
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
		// height: '100%'
    },
    infoContainer: {
        paddingHorizontal: 20,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.4)',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingBottom: 60,
    },
    title: {
        fontFamily: Font.Medium,
        fontSize: 34,
        lineHeight: 38,
        marginBottom: 5,
        color: ColorPallete.white,
    },
    details: {
        fontSize: 15,
        fontFamily: Font.Light,
        lineHeight: 18,
        color: ColorPallete.white,
    },
    vrIconContainer: {
        backgroundColor: ColorPallete.shadow,
        marginBottom: 15,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 3,
        paddingHorizontal: 7,
    },
    vrIconText: {
        fontFamily: Font.Regular,
        fontSize: 13,
        color: ColorPallete.white,
		lineHeight: 18,
		fontWeight:"bold"
    },
});

export default CarouselItem;
