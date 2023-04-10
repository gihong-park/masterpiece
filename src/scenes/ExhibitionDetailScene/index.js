/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Dimensions,
    Button,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import ColorPallete from '../../common/styles/ColorPallete';
import Footer from '../../components/Footer';
import request from '../../common/api/conn';

import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import RemainDateProgress from '../../components/RemainDateProgress';
import RemainDateText from '../../components/RemainDateText';
import Header from '../../components/Header';

import { StackActions } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import connection from '../../common/api/conn';

import DetailHeader from './DetailHeader';
import WorksCarousel from './WorksCarousel';
import ArtistsCarousel from './ArtistsCarousel';
import { Font } from '../../common/styles';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const ExhibitionDetailScene = props => {
    /**
     * TODO
     * 1) 데이터를 받아오기
     * 2) 헤더 만들기 - 1차 완료
     * 3) 전시회 상세 정보 표기 - 1차 완료
     * 4) 작가 상세 정보 표기 - 완료
     * 5) 관련 작품 표기 - 완료
     * 6) 지도 표기
     */
    const [exhibitionDetails, setExhibitionDetails] = useState({
        gallery_latitude: 37.335887,
        gallery_longitude: 126.584063,
    });
    console.log("test: ", props.route.params.exhibition_id);

    useEffect(() => {
        _header.init();
        _api.init(props.route.params.exhibition_id);
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
                        {props.route.params.exhibition_ko_title}
                    </Text>
                </SafeAreaView>
            );
        },
        init: () => {
            props.navigation.setOptions({
                title: props.route.params.exhibition_ko_title,
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
            await _api.fetch.exhibitionDetails(key);
            // await _api.fetch.works(key);
            // await _api.fetch.artists(key);
        },
        fetch: {
            exhibitionDetails: async key => {
                const result = await connection({
                    path: '/api/exhibitions/' + key,
                    method: 'get',
                });
                setExhibitionDetails(result.data.data[0]);
            },
        },
    };

    const _evt = {
        pushStack: () => {
            console.log(props);
            console.log('push..!');
        },
        openXR: () => {
            // console.log(props);
            // navigation.dispatch(StackActions.push('ExhibitionXR'));
            // console.log(props.navigation.dispat);
            props.navigation.dispatch(StackActions.push('ExhibitionXR'));
        },
    };
    console.log(exhibitionDetails);
    const GoogleMap = () => {
        return (
            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: parseFloat(exhibitionDetails.gallery_latitude),
                    longitude: parseFloat(exhibitionDetails.gallery_longitude),
                    latitudeDelta: 0.0022,
                    longitudeDelta: 0.0021,
                }}>
                <Marker
                    coordinate={{
                        latitude: parseFloat(
                            exhibitionDetails.gallery_latitude,
                        ),
                        longitude: parseFloat(
                            exhibitionDetails.gallery_longitude,
                        ),
                    }}
                    title="this is a marker"
                    description="this is a marker example"
                />
            </MapView>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scroll}>
                <DetailHeader info={exhibitionDetails} onOpenXR={_evt.openXR} />
                <Header
                    title="소개"
                    titleStyle={{ fontSize: 30, lineHeight: 35 }}
                    containerStyle={{ paddingTop: 25 }}
                />
                <View style={styles.descWrapper}>
                    <Text style={styles.info}>
                        {exhibitionDetails.exhibition_ko_desc}
                    </Text>
                </View>
                <Header
                    title="작품"
                    titleStyle={{ fontSize: 30, lineHeight: 35 }}
                    containerStyle={{ paddingTop: 25 }}
                />
                <WorksCarousel
                    exhibition_id={props.route.params.exhibition_id}
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
                    title="작가"
                    titleStyle={{ fontSize: 30, lineHeight: 35 }}
                    containerStyle={{ paddingTop: 25 }}
                />
                <ArtistsCarousel
                    exhibition_id={props.route.params.exhibition_id}
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
                    title="전시장"
                    titleStyle={{ fontSize: 30, lineHeight: 35 }}
                    containerStyle={{ paddingTop: 25 }}
                />
                <View style={styles.mapContainer}>
                    <GoogleMap />
                </View>
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
    info: {
        fontFamily: Font.Regular,
        fontSize: 14,
    },
    // 지도 관련
    mapContainer: {
        width: '100%',
        height: 300,
        backgroundColor: ColorPallete.white,
    },
});

export default ExhibitionDetailScene;
