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
				path: '/api/works/related/artists/' + props.artist_id,
                method: 'get',
                params: {
                    cnt: 5,
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
                    height={CAROUSEL_HEIGHT}
                    itemWidth={screenWidth - 30}
                    data={carouselData}
                    renderItem={({ item, idx }, parallaxProps) => {
                        const pushStack = () =>
                            props.pushStack({
                                data: item.work_id,
                            });
                        return CarouselItem(
                            { item, idx, pushStack },
                            parallaxProps,
                        );
                    }}
                    hasParallaxImages={true}
                    layout={'default'}
                    activeSlideAlignment={'center'}
                    inactiveSlideScale={.9}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorPallete.white,
        paddingVertical: 15,
        minHeight: CAROUSEL_HEIGHT,
    },
});

export default index;
