/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';

import Carousel from 'react-native-snap-carousel';
import Indicator from '../../../components/Indicator';
import CarouselItem from './CarouselItem';

import { ColorPallete } from '../../../common/styles';

import api from '../../../common/api/conn';

const { width: screenWidth } = Dimensions.get('window');

const CAROUSEL_HEIGHT = screenWidth - 80;

const index = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [carouselData, setCarouselData] = useState([]);
    useEffect(() => {
        _api.fetch();
    }, []);

    const _api = {
        fetch: async () => {
            setIsLoading(true);
            const result = await api({
                path: '/api/exhibitions/featured',
                method: 'get',
                params: {
                    cnt: 4,
                },
            });

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
                <Carousel
                    sliderWidth={screenWidth}
                    scrollPadding={0}
                    height={CAROUSEL_HEIGHT}
                    // itemWidth={170}
                    itemWidth={screenWidth / 2.4}
                    // itemWidth={screenWidth - 30}
                    data={carouselData}
                    renderItem={({ item, idx }, parallaxProps) => {
                        const pushStack = () =>
                            props.pushStack({
                                data: item.exhibition_id,
                                exhibition_id: item.exhibition_id,
                            });
                        return CarouselItem(
                            { item, idx, pushStack },
                            parallaxProps,
                        );
                    }}
                    hasParallaxImages={true}
                    layout={'default'}
                    activeSlideAlignment={'start'}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    slideStyle={{ marginRight: 20 }}
                    contentContainerCustomStyle={{ paddingRight: 10 }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorPallete.white,
        paddingVertical: 15,
        paddingHorizontal: 15,
        minHeight: CAROUSEL_HEIGHT,
    },
});

export default index;
