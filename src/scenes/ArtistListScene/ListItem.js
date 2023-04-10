import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    View,
} from 'react-native';
// import ColorPallete from '../../common/styles/ColorPallete';
import { ColorPallete, Font } from '../../common/styles';

import { useNavigation, StackActions } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');
const SPACE = { padding: 15, margin: 20 };

const ListItem = props => {
    const nav = useNavigation();

    const _evt = {
        push: () => {
            const action = StackActions.push('ArtistDetails', {
                data: props.data.artist_id,
                artist_id: props.data.artist_id,
                artist_ko_name: props.data.artist_ko_name,
                artist_en_name: props.data.artist_en_name,
            });
            nav.dispatch(action);
        },
    };
    return (
        // 모두 감싸는 요소
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.container}
            onPress={_evt.push}>
            <View style={styles.imgContainer}>
                {/* 이미지 영역 */}
                <ImageBackground
                    accessibilityRole={'image'}
                    style={headerStyle.bg}
                    imageStyle={headerStyle.bgImg}
                    source={{ uri: props.data.artist_photo_uri || '_blank' }}>
                    {/* 헤더 이미지 안의 내용 */}
                </ImageBackground>
            </View>
            <Text style={headerStyle.title}>
                {props.data.artist_en_name}
                {/* Exhibition Name */}
            </Text>
            {/* <Text style={headerStyle.desc}>{props.data.artist_email}</Text> */}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: SPACE.padding,
        width: screenWidth / 3 - SPACE.padding * 2,
    },
});

const headerStyle = StyleSheet.create({
    bg: {
        backgroundColor: ColorPallete.black,
        borderRadius: screenWidth,
        width: screenWidth / 3 - SPACE.padding * 2,
        height: screenWidth / 3 - SPACE.padding * 2,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: SPACE.padding,
        paddingVertical: 30,
    },
    imgContainer: {
        height: screenWidth / 3 - SPACE.padding * 2,
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 5,
    },
    bgImg: {
        opacity: 0.7,
        borderRadius: screenWidth,
        resizeMode: 'cover',
    },
    container: {
        backgroundColor: ColorPallete.white,
        height: screenWidth / 3 - SPACE.padding * 2,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexWrap: 'wrap',
    },
    title: {
        marginTop: 10,
        color: ColorPallete.black,
        fontFamily: Font.Regular,
        fontSize: 12,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    location: {
        color: ColorPallete.white,
        fontSize: 13,
        marginBottom: 3,
    },
    dueDate: {
        color: ColorPallete.white,
        fontSize: 13,
        // marginBottom : 3,
        marginBottom: -13,
    },
    desc: {
        color: ColorPallete.black,
        fontSize: 11,
    },
    progress: {
        marginBottom: 10,
    },
});
export default ListItem;
