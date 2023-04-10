import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { Font } from '../../../common/styles';

import Divider from '../../../components/Divider';
import Indicator from '../../../components/Indicator';

import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';

const SearchResult = props => {
    const nav = useNavigation();

    const _evt = {
        SCENE_IDENTIFIER: {
            EXHIBITION_DETAIL: 'ExhibitionDetails',
            ARTIST_DETAIL: 'ArtistDetails',
            WORK_DETAIL: 'WorkDetails',
            EXHIBITION_XR: 'ExhibitionXR',
        },

        push: (identifier, data) => {
            console.log(data);
            const action = StackActions.push(identifier, data);
            nav.dispatch(action);
        },
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollview}
                showsVerticalScrollIndicator={false}>
                <Text style={styles.headerTitle}>전시회 검색 결과</Text>
                {props.searchedExhibitions == false ? (
                    <>
                        {props.searchedExhibitionsResult == true ? (
                            <Text style={styles.resultNone}>
                                검색결과가 없습니다.
                            </Text>
                        ) : (
                            <Indicator />
                        )}
                    </>
                ) : (
                    <View style={styles.exhibitionContainer}>
                        {props.searchedExhibitions.map((item, idx) => {
                            return (
                                <TouchableOpacity
                                    onPress={() =>
                                        _evt.push(
                                            _evt.SCENE_IDENTIFIER
                                                .EXHIBITION_DETAIL,
                                            {
                                                data: item.exhibition_id,
                                                exhibition_id:
                                                    item.exhibition_id,
                                                exhibition_ko_title:
                                                    item.exhibition_ko_title,
                                                exhibition_en_title:
                                                    item.exhibition_en_title,
                                            },
                                        )
                                    }>
                                    <View>
                                        <Text style={styles.resultText}>
                                            {item.exhibition_ko_title}
                                        </Text>
                                        <Divider />
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}
                <Text style={styles.headerTitle}>작가 검색 결과</Text>
                {props.searchedArtists == false ? (
                    <>
                        {props.searchedArtistsResult == true ? (
                            <Text style={styles.resultNone}>
                                검색결과가 없습니다.
                            </Text>
                        ) : (
                            <Indicator />
                        )}
                    </>
                ) : (
                    <View style={styles.exhibitionContainer}>
                        {props.searchedArtists.map((item, idx) => {
                            return (
                                <TouchableOpacity
                                    onPress={() =>
                                        _evt.push(
                                            _evt.SCENE_IDENTIFIER.ARTIST_DETAIL,
                                            {
                                                data: item.artist_id,
                                                artist_id: item.artist_id,
                                                artist_ko_name:
                                                    item.artist_ko_name,
                                                artist_en_name:
                                                    item.artist_en_name,
                                            },
                                        )
                                    }>
                                    <View>
                                        <Text style={styles.resultText}>
                                            {item.artist_ko_name}
                                        </Text>
                                        <Divider />
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}

                <Text style={styles.headerTitle}>작품 검색 결과</Text>
                {props.searchedWorks == false ? (
                    <>
                        {props.searchedWorksResult == true ? (
                            <Text style={styles.resultNone}>
                                검색결과가 없습니다.
                            </Text>
                        ) : (
                            <Indicator />
                        )}
                    </>
                ) : (
                    <View style={styles.exhibitionContainer}>
                        {props.searchedWorks.map((item, idx) => {
                            return (
                                <TouchableOpacity
                                    onPress={() =>
                                        _evt.push(
                                            _evt.SCENE_IDENTIFIER.WORK_DETAIL,
                                            {
                                                data: item.work_id,
                                                work_id: item.work_id,
                                                work_title: item.work_title,
                                            },
                                        )
                                    }>
                                    <View>
                                        <Text style={styles.resultText}>
                                            {item.work_title}
                                        </Text>
                                        <Divider />
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 10,
		marginBottom: 90,
	},
	scrollview: {
		width: '100%',
		height: '100%',
		// paddingBottom: 200,
	},
    headerTitle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        color: '#333',
		fontFamily: Font.Medium,
		fontWeight: 'bold',
		paddingHorizontal: 15,
		fontSize: 20,
		marginTop: 43,
		marginVertical: 20
	},
	exhibitionContainer: {
		paddingHorizontal: 15,
		alignSelf: 'flex-start',
		width: '100%',
	},
	textWrapper: {
		borderBottomColor: 'black',
		borderBottomWidth: 5,
		height: 30
	},
	resultText: {
		marginTop: 2,
		fontSize: 18,
		paddingVertical: 15,
		borderBottomColor: 'black',
		borderBottomWidth: 5,
	},
	resultNone: {
		paddingVertical: 15,
		fontSize: 18,
		alignSelf: 'center',
		marginTop: 20,
		marginBottom: 40,
	}
});

export default SearchResult;
