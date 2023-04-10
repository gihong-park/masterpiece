import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Dimensions,
    Button,
    TouchableOpacity,
} from 'react-native';
import { ColorPallete, Font } from '../../../common/styles';
import RemainDateText from '../../../components/RemainDateText';
import Indicator from '../../../components/Indicator';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CAROUSEL_HEIGHT = (screenHeight * 3) / 5;

/**
 * TODO : 추후 navigation Header와 합칠 수 있는 방안을 찾아보아야 함
 */

const index = props => {
    if (!props.info.exhibition_img_uri) {
        return (
            <View style={styles.container}>
                <Indicator color={ColorPallete.highlight} />
            </View>
        );
    } else {
        return (
            <ImageBackground
                accessibility={'image'}
                style={styles.container}
                source={{
                    uri: props.info.exhibition_img_uri,
                }}
                imageStyle={styles.bg}>
                <View style={styles.infoContainer}>
                    {props.info.exhibition_vr_address ? (
                        <View style={styles.vrIconContainer}>
                            <Text style={styles.vrIconText}>VR 전시회</Text>
                        </View>
                    ) : (
                        <></>
                    )}
                    <Text style={styles.title}>
                        {props.info.exhibition_ko_title}
                    </Text>
                    <RemainDateText
                        style={styles.details}
                        start_date={props.info.exhibition_start_date}
                        finish_date={props.info.exhibition_finish_date}
                    />
                    <Text style={styles.details}>
                        {props.info.gallery_en_name}
                    </Text>
                    {props.info.exhibition_vr_address ? (
                        <TouchableOpacity
                            style={styles.vrBtnContainer}
                            activeOpacity={0.9}
                            onPress={props.onOpenXR}>
                            <Text style={styles.vrBtnText}>VR 전시회 보기</Text>
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )}
                </View>
            </ImageBackground>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        height: CAROUSEL_HEIGHT,
        width: screenWidth,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bg: {
        opacity: 0.9,
        backgroundColor: ColorPallete.black,
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
        paddingBottom: 30,
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
    },
    vrBtnContainer: {
        alignSelf: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: ColorPallete.shadow,
        width: '100%',
        marginTop: 15,
        borderRadius: 5,
    },
    vrBtnText: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: Font.Regular,
        color: ColorPallete.white,
    },
});

export default index;
