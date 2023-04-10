/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';

import Carousel from 'react-native-snap-carousel';
import Indicator from '../../../components/Indicator';
import CarouselItem from './CarouselItem';
import Pagination from './Pagination';

import { ColorPallete } from '../../../common/styles';

import api from '../../../common/api/conn';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CAROUSEL_HEIGHT = (screenHeight * 3) / 5;

const index = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [carouselData, setCarouselData] = useState([]);
    const [activeSlide, setActiveSlide] = useState(0);
    useEffect(() => {
        _api.fetch();
        // console.log(props);
    }, []);

    const _api = {
        fetch: async () => {
            setIsLoading(true);
            const result = await api({
                path: '/api/exhibitions/featured',
                method: 'get',
            });
            // console.log(result);
            if (result.data.data) {
                setCarouselData(result.data.data);
            }
            setIsLoading(false);
        },
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <Indicator color={ColorPallete.highlight} size="large" />
            ) : (
                <>
                    <Carousel
                        sliderWidth={screenWidth}
                        height={CAROUSEL_HEIGHT}
                        itemWidth={screenWidth}
                        data={carouselData}
                        renderItem={({ item, idx }, parallaxProps) => {
                            const pushStack = () =>
                                props.pushStack({
                                    exhibition_id: item.exhibition_id,
                                    exhibition_ko_title:
                                        item.exhibition_ko_title,
                                    exhibition_en_title:
                                        item.exhibition_en_title,
                                });
                            return CarouselItem(
                                { item, idx, pushStack },
                                parallaxProps,
                            );
                        }}
                        hasParallaxImages={true}
                        layout={'default'}
                        onSnapToItem={idx => setActiveSlide(idx)}
                        autoplay={true}
                        autoplayInterval={4000}
                        loop={true}
                        inactiveSlideScale={1}
                    />
                    <Pagination data={carouselData} activeSlide={activeSlide} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: ColorPallete.highlight,
        // paddingVertical: 15,
        width: '100%',
		minHeight: CAROUSEL_HEIGHT,
		bottom: 50,
		marginBottom: -50,
    },
});

export default index;
