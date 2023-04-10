import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { ColorPallete, Font } from '../../../common/styles';

const CarouselItem = ({ item, index, pushStack }, parallaxProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.container}
                activeOpacity={1}
                onPress={pushStack}>
                <ImageBackground
                    accessibilityRole={'image'}
                    style={styles.bgContainer}
                    imageStyle={styles.bg}
					source={{ uri: item.artist_photo_uri }}
					{...parallaxProps}
                />
            </TouchableOpacity>
            <Text style={styles.info}>{item.artist_ko_name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: 50,
        // backgroundColor: 'blue',
        width: 150,
    },
    bgContainer: {
        height: 150,
        width: 150,
        marginBottom: 20,
    },
    bg: {
        height: 150,
        width: 150,
        borderRadius: 90,
    },
    info: {
        fontFamily: Font.Regular,
        fontSize: 15,
    },
});

export default CarouselItem;
