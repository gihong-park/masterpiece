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
import RemainDateText from '../../../components/RemainDateText';
const CarouselItem = ({ item, index, pushStack }, parallaxProps) => {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPress={pushStack}>
            <ParallaxImage
                source={{ uri: item.exhibition_img_uri }}
                containerStyle={styles.parallaxContainer}
                style={styles.parallaxImage}
                parallaxFactor={0.3}
                {...parallaxProps}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.exhibition_ko_title}</Text>
				<Text style={styles.details}>{item.gallery_en_name}</Text>
                <RemainDateText
                    style={styles.details}
                    start_date={item.exhibition_start_date}
                    finish_date={item.exhibition_finish_date}
                />     
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
		height: '100%',
        flexDirection: 'column',
		justifyContent: 'flex-start',
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
        marginBottom: 10,
    },
    details: {
        fontSize: 13,
        fontFamily: Font.Light,
		lineHeight: 16,
		color: 'gray'
    },
});

export default CarouselItem;
