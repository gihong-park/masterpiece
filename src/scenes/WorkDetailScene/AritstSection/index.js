import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import connection from '../../../common/api/conn';
import { ColorPallete, Font } from '../../../common/styles';

import Indicator from '../../../components/Indicator';
import CarouselItem from './ListItem';
import ListItem from './ListItem';

const { width: screenWidth } = Dimensions.get('window');

const Artist = props => {
    const [artistData, setArtistData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
	const [alignment, setAlignment] = useState('start');

	useEffect(() => {
        _api.fetch();
    }, []);
	
    const _api = {
        fetch: async () => {
            setIsLoading(true);
            let result = await connection({
                path: '/api/artists/related/works/' + props.work_id,
                method: 'get',
            });
            if (result) {
                if (result.data.data.length <= 1) {
                    setAlignment('center');
                }
				setArtistData(result.data.data);
				// console.log('afsdfad : ', result.data.data);
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
					{ artistData.map((item , idx)=>{
						return <ListItem key={item.work_id} data={item} />
					})}

				{/* <Carousel
                    sliderWidth={screenWidth}
                    // height={300}
                    itemWidth={180}
                    data={artistData}
                    renderItem={({ item, idx }, parallaxProps) => {
                        const pushStack = () =>
                            props.pushStack({
                                // data: item.artist_id,
                                // artist_id: item.artist_id,
                                // artist_ko_name: item.artist_ko_name,
                                // artist_en_name: item.artist_en_name,
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
					contentContainerCustomStyle={{paddingRight: 10}}
                /> */}

				</>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
	textWrapper: {
        alignItems: 'center',
        margin: 15,
    },
    circleAvatar: {
        margin: 13,
        height: screenWidth / 2,
        width: screenWidth / 2,
        borderRadius: screenWidth,
        backgroundColor: '#cc0',
        alignSelf: 'center',
    },
});

export default Artist;
