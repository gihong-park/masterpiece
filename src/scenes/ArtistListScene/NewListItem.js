import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    View,
    SafeAreaView,
} from 'react-native';
import { ColorPallete, Font } from '../../common/styles';

import { useNavigation, StackActions } from '@react-navigation/native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

const { width: screenWidth } = Dimensions.get('window');
const SPACE = { padding: 15, margin: 30 };

const ListItem = props => {
    const nav = useNavigation();

    const _ui = {
        featuredIcon: () => {
            if (props.data.artist_featured_seq) {
                return (
                    <View style={styles.featuredStarContainer}>
                        <IoniconsIcon
                            name="ios-star"
                            size={15}
                            color={ColorPallete.white}
                        />
                    </View>
                );
            }
        },
    };

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
            <ImageBackground
                imageStyle={styles.profileImage}
                style={styles.profileImageContainer}
                source={{ uri: props.data.artist_photo_uri }}>
                {_ui.featuredIcon()}
            </ImageBackground>
            <SafeAreaView style={styles.descContainer}>
                <Text style={styles.artistName}>
                    {props.data.artist_ko_name}
					{/* {_ui.featuredIcon()} */}
                </Text>
				
                <Text style={styles.detailInfo}>
                    {props.data.genre_ko_title}
                </Text>
				
                <View style={styles.bottomContainer}>
                    {/* <View style={styles.viewCountContainer}>
                        <IoniconsIcon
                            name="md-eye"
                            size={13}
                            color={ColorPallete.white}
                        />
                        <Text style={styles.viewCountNumber}>
                            {props.data.artist_hit_cnt}
                        </Text>
                    </View> */}
                    <View style={styles.hashtagContainer}>
                        <Text style={styles.hashtag}>#화려한</Text>
                        <Text style={styles.hashtag}>#2010년대</Text>
                        <Text style={styles.hashtag}>#회화</Text>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableOpacity>
    );
};

const PROFILE_PHOTO_DIAMETER = 90;

const styles = StyleSheet.create({
    // 전체를 감싸는 컨테이너 영역
    container: {
		marginVertical: 15,
        flex: 1,
        width: screenWidth,
        height: PROFILE_PHOTO_DIAMETER + SPACE.padding,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: SPACE.padding,
        // borderBottomColor: '#eee',
        // borderBottomWidth: 1,
    },
    // 프로필 이미지 영역
    profileImage: {
        borderRadius: PROFILE_PHOTO_DIAMETER / 2,
    },
    profileImageContainer: {
        width: PROFILE_PHOTO_DIAMETER,
        height: PROFILE_PHOTO_DIAMETER,
        alignSelf: 'center',
        // shadowOffset: { width: 1.32, height: 1.3 },
        // shadowColor: '#000',
        // shadowOpacity: 0.5,
    },
    // 작가 설명 영역
    descContainer: {
        flex: 1,
        alignSelf: 'center',
        paddingHorizontal: SPACE.padding,
    },
    artistName: {
        fontFamily: Font.Bold,
        fontSize: 20,
		lineHeight: 28,
    },
    info: {
        fontFamily: Font.Light,
        fontSize: 12,
    },
    detailInfo: {
        fontFamily: Font.Thin,
        fontSize: 15,
    },
    featuredStarContainer: {
        backgroundColor: ColorPallete.shadow,
        width: 20,
        height: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
		paddingLeft: 1,
        // shadowOffset: { width: 1.32, height: 1.3 },
        // shadowColor: '#000',
        // shadowOpacity: 0.5,
    },
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
        marginTop: 15,
    },
    viewCountContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
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
