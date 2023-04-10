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

import RemainDateText from '../../components/RemainDateText';
import VRBadge from '../../components/VRBadge';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

const { width: screenWidth } = Dimensions.get('window');
const SPACE = { padding: 15, margin: 20 };

const ListItem = props => {
    return (
        // 모두 감싸는 요소
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.container}
            onPress={props.goToDetail}>
            {/* 이미지 영역 */}
            <ImageBackground
                accessibilityRole={'image'}
                style={headerStyle.bg}
                imageStyle={headerStyle.bgImg}
                source={{ uri: props.data.exhibition_img_uri }}>
                {/* 헤더 이미지 안의 내용 */}
                {props.data.exhibition_vr_address ? (
                    <VRBadge style={headerStyle.badge} />
                ) : (
                    <></>
                )}
                <Text style={headerStyle.title}>
                    {props.data.exhibition_en_title}
                    {/* Exhibition Name */}
                </Text>
                <RemainDateText
                    style={headerStyle.dueDate}
                    start_date={props.data.exhibition_start_date}
                    finish_date={props.data.exhibition_finish_date}
                />
                <Text style={headerStyle.location}>
                    {props.data.gallery_ko_name}
                </Text>
                {/* <Text style={headerStyle.artists}>
                    {props.data.artist_ko_name}
                </Text> */}
                <View style={bottomStyles.bottomContainer}>
                    {/* <View style={bottomStyles.viewCountContainer}>
                        <IoniconsIcon
                            name="md-eye"
                            size={13}
                            color={ColorPallete.white}
                        />
                        <Text style={bottomStyles.viewCountNumber}>
                            {props.data.exhibition_hit_cnt}
                        </Text>
                    </View> */}
                    <View style={bottomStyles.hashtagContainer}>
                        <Text style={bottomStyles.hashtag}>#화려한</Text>
                        <Text style={bottomStyles.hashtag}>#2010년대</Text>
                        <Text style={bottomStyles.hashtag}>#회화</Text>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorPallete.black,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
		marginBottom: SPACE.margin,
		marginTop: 6,
        // shadowColor: ColorPallete.black,
        // shadowOpacity: 1,
        // shadowOffset: { width: 3, height: 5 },
        // shadowRadius: 1,
    },
});

const headerStyle = StyleSheet.create({
    bg: {
        backgroundColor: ColorPallete.black,
        height: screenWidth - SPACE.padding * 2,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingHorizontal: SPACE.padding,
		paddingBottom: 25,
    },
    bgImg: {
        opacity: 0.7,
    },
    container: {
        backgroundColor: ColorPallete.white,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
		paddingVertical: 15,
    },
    title: {
        color: ColorPallete.white,
        // fontWeight: '800',
        fontFamily: Font.Black,
        fontSize: 35,
        textAlign: 'left',
        lineHeight: 38,
    },
    location: {
        color: ColorPallete.white,
        fontSize: 13,
        lineHeight: 25,
        fontFamily: Font.Regular,
        marginTop: 5,
    },
    artists:{
        color: ColorPallete.white,
        fontSize: 13,
        lineHeight: 16,
        fontFamily: Font.Regular,
        // marginBottom: 3,
        marginTop: -2,
    },
    dueDate: {
        color: ColorPallete.white,
        fontSize: 13,
        // marginBottom : 3,
        marginBottom: -13,
    },
    desc: {
        color: ColorPallete.white,
        fontFamily: Font.Regular,
        fontSize: 11,
    },
    progress: {
        marginBottom: 10,
    },
    badge: {
        marginBottom: 15,
    },
});

const bottomStyles = StyleSheet.create({
    // 해시태그 관련
    hashtagContainer: {
        marginTop: -1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    hashtag: {
        fontFamily: Font.Regular,
        fontSize: 11,
        lineHeight: 16,
        marginRight: 5,
        backgroundColor: ColorPallete.shadow,
        color: ColorPallete.white,
        paddingHorizontal: 5,
        alignSelf: 'center',
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
    viewCountContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#ccc',
        borderColor: ColorPallete.white,
        borderWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 8,
    },
    viewCountNumber: {
        marginLeft: 5,
        fontFamily: Font.Regular,
        fontSize: 11,
        lineHeight: 14,
        color: ColorPallete.white,
    },
});
export default ListItem;
