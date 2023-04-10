/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import { ColorPallete, Font } from '../../common/styles';

import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import connection from '../../common/api/conn';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DetailHeader from './DetailHeader';
import WorksCarousel from './WorksCarousel';
import ExhibitionCarousel from './ExhibitionCarousel';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ArtistDetailScene = props => {
    const [artistDetails, setArtistDetails] = useState({});

    useEffect(() => {
        _header.init();
        _api.init(props.route.params.artist_id);
	}, []);

    /**
     * Navigation Header 관련 함수 묶음
     */
    const _header = {
        left: () => {
            return (
                <TouchableOpacity
                    style={{
                        width: 60,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={props.navigation.goBack}>
                    <IoniconsIcon
                        name="ios-arrow-back"
                        size={25}
                        color={ColorPallete.highlight}
                    />
                </TouchableOpacity>
            );
        },
        title: () => {
            return (
                <SafeAreaView contentInsetAdjustmentBehavior="always">
                    <Text
                        style={{
                            fontFamily: Font.Regular,
                            fontSize: 17,
                            // marginTop: -15,
                        }}>
                        {props.route.params.artist_ko_name}
                    </Text>
                </SafeAreaView>
            );
        },
        init: () => {
            props.navigation.setOptions({
                title: artistDetails.artist_ko_name,
                headerLeft: _header.left,
                headerTitle: _header.title,
            });
        },
    };

    /**
     * API 연결에 관계된 함수 묶음
     */
    const _api = {
        init: async key => {
            await _api.fetch.artistDetails(key);
        },
        fetch: {
            artistDetails: async key => {
                const result = await connection({
                    path: '/api/artists/' + key,
                    method: 'get',
                });
                setArtistDetails(result.data.data[0]);
            },
        },
    };

    const _evt = {
        pushStack: () => {
            console.log('push..!');
        },
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                contentInsetAdjustmentBehavior="automatic">
                <DetailHeader info={artistDetails} />

                <Header
                    title="소개"
                    titleStyle={{ fontSize: 30, lineHeight: 35 }}
                    containerStyle={{ paddingTop: 25 }}
                />
                <View style={styles.descWrapper}>
                    <Text style={styles.info}>
                        {artistDetails.artist_ko_desc}
                    </Text>
                </View>

                <Header
                    title="작품"
                    titleStyle={{ fontSize: 30, lineHeight: 35 }}
                    containerStyle={{ paddingTop: 25 }}
                />

                <WorksCarousel
                    artist_id={props.route.params.artist_id}
                    pushStack={
                        data =>
                            _evt.pushStack(
                                _evt.SCENE_IDENTIFIER.WORK_DETAIL,
                                data,
                            )
                        // _evt.pushStack('', data)
                    }
                />

                <Header
                    title="전시전"
                    titleStyle={{ fontSize: 30, lineHeight: 35 }}
                    containerStyle={{ paddingTop: 25 }}
                />

                <ExhibitionCarousel
                    artist_id={props.route.params.artist_id}
                    pushStack={data =>
                        _evt.pushStack(
                            _evt.SCENE_IDENTIFIER.EXHIBITION_DETAIL,
                            data,
                        )
                    }
                />

                <Footer
                    color={ColorPallete.black}
                    borderBottomColor={ColorPallete.black}
                    backgroundColor={'#eee'}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scroll: {
        width: screenWidth,
    },
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        width: screenWidth,
        backgroundColor: '#eee',
    },
    // description 관련
    descWrapper: {
        paddingHorizontal: 15,
        backgroundColor: ColorPallete.white,
    },
});

export default ArtistDetailScene;
