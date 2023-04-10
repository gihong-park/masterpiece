import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { ColorPallete, Font } from '../../common/styles';
import { useNavigation, StackActions } from '@react-navigation/native';

import Footer from '../../components/Footer';
import SectionHeader from './SectionHeader';
import ExhibitionCarousel from './ExhibitionCarousel';
import WorkCarousel from './WorkCarousel';
import ArtistCarousel from './ArtistCarousel';
import FeaturedCarouselHeader from './FeaturedCarouselHeader';

import AnimatedHeader from './AnimatedHeader';

const MainScene = props => {
    // 헤더의 Visibility를 결정하는 state
    const [headerVisiblity, setHeaderVisibility] = useState(false);
    // 헤더 관리에 관여하는 객체
    const _header = {
        render: () => {
            //
            props.navigation.setOptions({
                header: () => <AnimatedHeader visibility={headerVisiblity} />,
            });
        },
    };
    
    const nav = useNavigation();
    const _evt = {
        SCENE_IDENTIFIER: {
            EXHIBITION_LIST: '전시회',
            ARTISTS_LIST: '작가',
            EXHIBITION_DETAIL: 'ExhibitionDetails',
            ARTIST_DETAIL: 'ArtistDetails',
            WORK_DETAIL: 'WorkDetails',
            EXHIBITION_XR: 'ExhibitionXR',
        },
        pushStack: (identifier, data) => {
            const action = StackActions.push(identifier, data);
            nav.dispatch(action);
        },
        changeTab: identifier => {
            props.navigation.jumpTo(identifier);
        },
        onScroll: evt => {
            // 스크롤 전체의 1/10을 기준으로 HEADER의 생성을 관리 함
            if (
                evt.nativeEvent.contentOffset.y >=
                    evt.nativeEvent.contentSize.height / 10 &&
                !headerVisiblity
            ) {
                setHeaderVisibility(true);
            } else if (
                evt.nativeEvent.contentOffset.y <
                    evt.nativeEvent.contentSize.height / 10 &&
                headerVisiblity
            ) {
                setHeaderVisibility(false);
            }
        },
    };

    useEffect(() => {
        _header.render();
    }, [_header]);

    return (
        // <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scroll}
                scrollEventThrottle={1}
                onScroll={_evt.onScroll}>
                <FeaturedCarouselHeader
                    pushStack={data =>
                        _evt.pushStack(
                            _evt.SCENE_IDENTIFIER.EXHIBITION_DETAIL,
                            data,
                        )
                    }
                />
                <SectionHeader
                    title="전시"
                    moveToListPage={() =>
                        _evt.changeTab(_evt.SCENE_IDENTIFIER.EXHIBITION_LIST)
                    }
                />
                <ExhibitionCarousel
                    pushStack={data =>
                        _evt.pushStack(
                            _evt.SCENE_IDENTIFIER.EXHIBITION_DETAIL,
                            data,
                        )
                    }
                />
                <SectionHeader title="작품" />
                <WorkCarousel
                    pushStack={data =>
                        _evt.pushStack(_evt.SCENE_IDENTIFIER.WORK_DETAIL, data)
                    }
                />
                <SectionHeader
                    title="작가"
                    moveToListPage={() =>
                        _evt.changeTab(_evt.SCENE_IDENTIFIER.ARTISTS_LIST)
                    }
                />
                <ArtistCarousel
                    pushStack={data =>
                        _evt.pushStack(
                            _evt.SCENE_IDENTIFIER.ARTIST_DETAIL,
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
        // </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: ColorPallete.white,
    },
    scroll: {
        width: '100%',
        paddingVertical: 0,
		backgroundColor: '#eee',
		// bottom: 50,
		// marginBottom: -50
		// paddingTop: 0
		// marginTop: 0 
    },
});

export default MainScene;
