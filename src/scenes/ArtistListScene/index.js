/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    FlatList,
    Dimensions,
    Alert,
    SafeAreaView,
} from 'react-native';
import Header from '../../components/Header';
import ColorPallete from '../../common/styles/ColorPallete';

import ArtistDetailScene from '../ArtistDetailScene';
import WorkDetailScene from '../WorkDetailScene';
import ExhibitionDetailScene from '../ExhibitionDetailScene';


import { createStackNavigator } from '@react-navigation/stack';
import request from '../../common/api/conn';
import Footer from '../../components/Footer';
// import ListItem from './ListItem';
import ListItem from './NewListItem';
import { Font } from '../../common/styles';

/**
 * TODO : LOAD ANIMATION 추가 
 * https://medium.com/cool-things-with-react-native/flatlist-wave-like-animation-178f1f67802
 */

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const index = props => {
    const [refreshing, setRefreshing] = useState(false);
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const cnt = 5;

    const _evt = {
        fetch: async page => {
            page = page || 1;
            try {
                const result = await request({
                    path: '/api/artists',
                    method: 'get',
                    params: {
                        cnt: cnt,
                        page: page,
                    },
                });
                if (page === 1) {
                    setItems(result.data.data.data);
                } else {
                    setItems([...items, ...result.data.data.data]);
                }
                if (result.data.data.data.length === cnt) {
                    setCurrentPage(page + 1);
                }
                setRefreshing(false);
                return result;
            } catch (e) {
                Alert.alert(
                    '일시적인 오류가 발생했습니다. \n잠시 후 다시 시도해주세요',
                );
                console.log(e);
            }
        },
        hadleLoadMore: () => {
            if (items.length % cnt === 0) {
                setRefreshing(true);
                _evt.fetch(currentPage);
            }
        },
        handleRefresh: () => {
            _evt.fetch(1);
        },
    };
    //handling 함수

    //header 와 footer 컴포넌트
    // const renderHeader = () => {
    //     return <Header title={'Artist List'} />;
    // };
    const renderFooter = () => {
        return (
            <Footer
                color="#000"
                // eslint-disable-next-line react-native/no-inline-styles
                containerStyle={{
                    backgroundColor: '#eee',
                }}
            />
        );
    };

    useEffect(() => {
        _evt.fetch();
    }, []);

    return (
        <SafeAreaView style={styles.scrollWrapper}>
            <StatusBar barStyle="dark-content" />
            <FlatList
                // ListHeaderComponent={renderHeader}
                refreshing={refreshing}
                onRefresh={_evt.handleRefresh}
                onEndReachedThreshold={1}
                onEndReached={_evt.hadleLoadMore}
                data={items}
                keyExtractor={item => String(item.artist_id)}
                // numColumns={3}
                renderItem={({ item }) => (
                    <ListItem key={item.artist_id} data={item} />
				)}
				showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        width: screenWidth,
		height: (screenHeight / 3) * 2,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
		backgroundColor: ColorPallete.white,
    },
    scrollWrapper: {
		backgroundColor: ColorPallete.white,
		height: '100%',
    },
});

const ArtistListStack = createStackNavigator();

export default () => {
    return (
        <ArtistListStack.Navigator>
            <ArtistListStack.Screen
                name="List"
				component={index}
                options={{
                    title: 'List',
					headerTitle: '아티스트 목록',
					headerTitleStyle: {
                        fontFamily: Font.Regular,
                        fontSize: 19,
                    },
                }}
            />
            <ArtistListStack.Screen
                name="Details"
                component={ArtistDetailScene}
            />
            <ArtistListStack.Screen
                name="ArtistDetails"
                component={ArtistDetailScene}
            />
            <ArtistListStack.Screen
                name="WorkDetails"
                component={WorkDetailScene}
            />
            <ArtistListStack.Screen
                name="ExhibitionDetails"
                component={ExhibitionDetailScene}
            />
        </ArtistListStack.Navigator>
    );
};
