import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import connection from '../../../common/api/conn';
import { ColorPallete, Font } from '../../../common/styles';

import Indicator from '../../../components/Indicator';
import CarouselItem from './CarouselItem';

const { width: screenWidth } = Dimensions.get('window');

const ArtistCarousel = props => {
    const [carouselData, setCarouselData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [alignment, setAlignment] = useState('start');
    const _api = {
        fetch: async () => {
            setIsLoading(true);
            let result = await connection({
                path: '/api/artists/related/exhibitions/' + props.exhibition_id,
                method: 'get',
            });
            if (result) {
                if (result.data.data.length <= 1) {
                    setAlignment('center');
                }
                setCarouselData(result.data.data);
            }
            setIsLoading(false);
        },
    };

    useEffect(() => {
        _api.fetch();
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <Indicator color={ColorPallete.highlight} size="large" />
            ) : (
                <Carousel
                    sliderWidth={screenWidth}
                    // height={300}
                    itemWidth={200}
                    data={carouselData}
                    renderItem={({ item, idx }, parallaxProps) => {
                        const pushStack = () =>
                            props.pushStack({
                                data: item.artist_id,
                            });
                        return CarouselItem({ item, idx, pushStack });
                    }}
                    hasParallaxImages={false}
                    layout={'default'}
                    activeSlideAlignment={'start'}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    // eslint-disable-next-line react-native/no-inline-styles
                    containerCustomStyle={{ paddingHorizontal: 20 }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorPallete.white,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        paddingBottom: 50,
        minHeight: 250,
    },
});

export default ArtistCarousel;
