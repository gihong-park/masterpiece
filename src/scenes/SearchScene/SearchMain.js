/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Button,
    SafeAreaView,
} from 'react-native';
import SearchBar from '../../components/SearchBarWithHistory';
import HistoryList from './HistoryList';
import connection from '../../common/api/conn';
import SearchResult from './SearchResult';
import Indicator from '../../components/Indicator';
import { createStackNavigator } from '@react-navigation/stack';

const index = props => {
    const [keyword, setKeyword] = useState('');
    const [timeStamp, setTimeStamp] = useState(new Date());
    const [isSearched, setIsSearched] = useState(false);
    const [searchedExhibitions, setSearchedExhibitions] = useState([]);
    const [searchedArtists, setSearchedArtists] = useState([]);
    const [searchedWorks, setSearchedWorks] = useState([]);
    const [searchedExhibitionsResult, setSearchedExhibitionsResult] = useState(
        false,
    );
    const [searchedWorksResult, setSearchedWorksResult] = useState(false);
    const [searchedArtistsResult, setSearchedArtistsResult] = useState(false);

    const _util = {
        setSearchModeEnable: () => {
            setIsSearched(true);
        },
        setSearchModeDisable: () => {
            setIsSearched(false);
            setKeyword('');
            setSearchedExhibitions([]);
            setSearchedArtists([]);
            setSearchedWorks([]);
            setSearchedExhibitionsResult(false);
            setSearchedWorksResult(false);
            setSearchedArtistsResult(false);
        },
    };

    const _evt = {
        onSelect: obj => {
            console.log('[SearchMain] onSelect called!', obj);
            // 하위 컴포넌트에 이벤트를 일으키기 위해서 timestamp를 만듦
            setKeyword(obj.value);
            setTimeStamp(new Date());
            _util.setSearchModeEnable();
        },
        onSearch: (result, currentHistories) => {
            console.log(
                '[SearchMain] onSearch called!',
                result,
                currentHistories,
            );
            setKeyword(result);
            _util.setSearchModeEnable();
        },
        onCancel: () => {
            console.log('[SearchMain] onCancel called');
            _util.setSearchModeDisable();
        },
        onClear: () => {
            console.log('[SearchMain] onClear called');
            _util.setSearchModeDisable();
        },
    };

    useEffect(() => {
        if (isSearched) {
            _api.exhibition
                .search()
                .then(_api.artist.search)
                .then(_api.work.search)
                .then(() => {
                    console.log(
                        '[SearchMain] all data has fetched successfully',
                    );
                });
        }
    }, [isSearched]);

    const _api = {
        validation: {
            keyword: function() {
                if (keyword.trim() !== '') {
                    return true;
                } else {
                    return false;
                }
            },
        },
        exhibition: {
            search: async () => {
                if (_api.validation.keyword()) {
                    let result = await connection({
                        path: '/api/exhibitions/search',
                        method: 'get',
                        params: {
                            keyword: keyword,
                        },
                    });
                    if (result.data) {
                        if (result.data.data.length == 0) {
                            setSearchedExhibitionsResult(true);
                        } else {
                            setSearchedExhibitions(result.data.data);
                        }
                    }
                    return result.status;
                }
                return undefined;
            },
        },
        work: {
            search: async () => {
                if (_api.validation.keyword()) {
                    let result = await connection({
                        path: '/api/works/search',
                        method: 'get',
                        params: {
                            keyword: keyword,
                        },
                    });
                    if (result.data) {
                        if (result.data.data.length == 0) {
                            setSearchedWorksResult(true);
                        } else {
                            setSearchedWorks(result.data.data);
                        }
                    }
                    return result.status;
                }
                return undefined;
            },
        },
        artist: {
            search: async () => {
                if (_api.validation.keyword()) {
                    let result = await connection({
                        path: '/api/artists/search',
                        method: 'get',
                        params: {
                            keyword: keyword,
                        },
                    });
                    if (result.data) {
                        if (result.data.data.length == 0) {
                            setSearchedArtistsResult(true);
                        } else {
                            setSearchedArtists(result.data.data);
                        }
                    }
                    return result.status;
                }
                return undefined;
            },
        },
    };

    const _SearchUIWithState = () => {
        if (isSearched) {
            return (
                <SafeAreaView>
                    <SearchResult
                        searchedExhibitions={searchedExhibitions}
                        searchedArtists={searchedArtists}
                        searchedWorks={searchedWorks}
                        searchedExhibitionsResult={searchedExhibitionsResult}
                        searchedArtistsResult={searchedArtistsResult}
                        searchedWorksResult={searchedWorksResult}
                    />
                </SafeAreaView>
            );
        } else {
            return (
                <View style={styles.keywordContainer}>
                    <HistoryList
                        title="최근 검색어"
                        data={props.histories}
                        onSelectKeyword={_evt.onSelect}
                    />
                </View>
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <SearchBar
                timeStamp={timeStamp}
                value={keyword}
                onSubmit={_evt.onSearch}
                onCancel={_evt.onCancel}
                onClear={_evt.onClear}
            />
            {_SearchUIWithState()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    touchable: {
		// backgroundColor: '#654321',
		backgroundColor: 'white',
        height: '100%',
    },
    container: {
        flex: 1,
		// marginHorizontal: 10,
		backgroundColor: 'white',
    },
    keywordContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 30,
    },
});

// export default index;

const SearchListStack = createStackNavigator();

import ExhibitionDetailScene from '../ExhibitionDetailScene';
import ArtistDetailScene from '../ArtistDetailScene';
import WorkDetailScene from '../WorkDetailScene';
import ExhibitionXRScene from '../ExhibitionXRScene';

export default props => {
    return (
        <SearchListStack.Navigator>
			<SearchListStack.Screen name="Main" component={index}
			options={{
				title: 'Main',
				headerTitle: '',
				// headerTitleStyle: {
				// 	fontFamily: Font.Regular,
				// 	fontSize: 19,
				// },
				headerTransparent: 1,
			}}
			 />
            <SearchListStack.Screen
                name="ExhibitionDetails"
                component={ExhibitionDetailScene}
            />
            <SearchListStack.Screen
                name="ExhibitionXR"
                component={ExhibitionXRScene}
                options={{
                    headerTransparent: 1,
                }}
            />
            <SearchListStack.Screen
                name="ArtistDetails"
                component={ArtistDetailScene}
            />
            <SearchListStack.Screen
                name="WorkDetails"
                component={WorkDetailScene}
            />
        </SearchListStack.Navigator>
    );
};
