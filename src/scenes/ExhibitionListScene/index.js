import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    StatusBar,
    FlatList,
    Alert,
} from 'react-native';

import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer';

import ExhibitionListItem from './ListItem';

import { StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import request from '../../common/api/conn';
import { Font } from '../../common/styles';

const ExhibitionListStack = createStackNavigator();

const ExhibitionListScene = props => {
    const AMOUNT_OF_ITEMS_PER_PAGE = 5;

    const [refreshing, setRefreshing] = useState(false);
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [scrollOffsetY, setScrollOffsetY] = useState(0);

    useEffect(() => {
        _evt.fetch();
    }, [_evt]);

    const _render = {
        footer: () => {
            return <Footer color={ColorPallete.black} />;
        },
        listItem: ({ item }) => {
            return (
                <ExhibitionListItem
                    key={item.exhibition_id}
                    data={item}
                    goToDetail={() => {
                        const action = StackActions.push('Details', {
                            exhibition_id: item.exhibition_id,
                            exhibition_ko_title: item.exhibition_ko_title,
                            exhibition_en_title: item.exhibition_en_title,
                        });
                        props.navigation.dispatch(action);
                    }}
                />
            );
        },
    };

    const _evt = {
        fetch: async page => {
            page = page || 1;
            try {
                const result = await request({
                    path: '/api/exhibitions',
                    method: 'get',
                    params: {
                        page: page,
                        cnt: AMOUNT_OF_ITEMS_PER_PAGE,
                    },
                });
                /**
                 * currentPage를 참조하지 않고 현재 받아온 페이지를 기반으로 판단,
                 * 첫 페이지라면 데이터를 덧붙이지 않고, 대체 함
                 */
                if (page === 1) {
                    setItems(result.data.data);
                } else {
                    setItems([...items, ...result.data.data]);
                }

                /**
                 *  @description
                 *  현재 불러온 데이터의 양이 페이지마다
                 *  불러올 아이템 양보다 작으면 페이지를 증가시키지 않음
                 * */
                if (result.data.data.length === AMOUNT_OF_ITEMS_PER_PAGE) {
                    setCurrentPage(page + 1);
                }
                setRefreshing(false);
                return result;
            } catch (e) {
                Alert.alert(
                    '일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요',
                );
                return e;
            }
        },
        onEndReached: () => {
            /**
             * 현재 데이터의 갯수가 불러올 데이터 양으로
             * 나누어 떨어질 떄만 추가 요청을 보내도록 함
             */
            if (items.length % AMOUNT_OF_ITEMS_PER_PAGE === 0) {
                setRefreshing(true);
                _evt.fetch(currentPage);
            } else {
                console.log('[COM.ExhibitionList] end of contents');
            }
        },
        onScroll: curEvt => {
            // 스크롤 시 현재 스크롤의 위치를 state에 저장.
            // 하위에서 전달 받아 애니메이션에 사용하도록 함
            setScrollOffsetY(curEvt.nativeEvent.contentOffset.y);
        },
        onRefresh: () => {
            _evt.fetch(1);
        },
    };

    return (
        <SafeAreaView style={styles.listContainer}>
            <StatusBar barStyle="dark-content" />
            <FlatList
                onScroll={_evt.onScroll}
                style={styles.listWrapper}
                // ListFooterComponent={_render.footer}
                onEndReachedThreshold={1}
                onEndReached={_evt.onEndReached}
                onRefresh={_evt.onRefresh}
                data={items}
                keyExtractor={item => item.exhibition_id + ''}
                refreshing={refreshing}
				renderItem={_render.listItem}
				showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: ColorPallete.white,
    },
    scroll: {
        minHeight: '100%',
    },
    listWrapper: {
        backgroundColor: ColorPallete.white,
		paddingHorizontal: 5,
		// marginTop: 15,
    },
});

import ExhibitionDetailScene from '../ExhibitionDetailScene';
import ExhibitionXRScene from '../ExhibitionXRScene';
import ColorPallete from '../../common/styles/ColorPallete';
import { useSafeArea } from 'react-native-safe-area-context';

export default () => {
    return (
        <ExhibitionListStack.Navigator>
            <ExhibitionListStack.Screen
                name="List"
                component={ExhibitionListScene}
                options={{
                    title: 'List',
                    headerTitle: '전시회 목록',
                    headerTitleStyle: {
                        fontFamily: Font.Regular,
                        fontSize: 19,
                    },
                    // headerTransparent: 1,
                }}
            />
            <ExhibitionListStack.Screen
                name="Details"
                component={ExhibitionDetailScene}
            />
            <ExhibitionListStack.Screen
                name="ExhibitionXR"
                component={ExhibitionXRScene}
            />
        </ExhibitionListStack.Navigator>
    );
};
