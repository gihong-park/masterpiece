import React, { useEffect, useState } from 'react';
import { 
	View, 
	Text, 
	StyleSheet, 
	Dimensions, 
	ImageBackground,
    TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

// import connection from '../../../common/api/conn';
import { ColorPallete, Font } from '../../../common/styles';

// import Indicator from '../../../components/Indicator';
// import ListItem from './ListItem';

const { width: screenWidth } = Dimensions.get('window');

const CarouselItem = ({ item, index, pushStack }, parallaxProps) => {
    // const [artistData, setArtistData] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
	// const [alignment, setAlignment] = useState('start');
	
    // const _api = {
    //     fetch: async () => {
    //         setIsLoading(true);
    //         let result = await connection({
    //             path: '/api/artists/related/works/' + props.work_id,
    //             method: 'get',
    //         });
    //         if (result) {
    //             if (result.data.data.length <= 1) {
    //                 setAlignment('center');
    //             }
	// 			setArtistData(result.data.data);
    //         }
    //         setIsLoading(false);
    //     },
    // };

	// console.log('afsdfad : ', artistData);

    // useEffect(() => {
    //     _api.fetch();
    // }, []);

    return (
        <View style={styles.container}>
            {/* {isLoading ? (
                <Indicator color={ColorPallete.highlight} size="large" />
            ) : (
				<> */}
					{/* { artistData.map((item , idx)=>{
						return <ListItem key={item.work_id} data={item} />
					})} */}
					<View style={styles.container}>
						<TouchableOpacity
							style={styles.container}
							activeOpacity={1}
							// onPress={pushStack}
						>
							<ImageBackground
								accessibilityRole={'image'}
								style={styles.bgContainer}
								imageStyle={styles.bg}
								source={{ uri: item.artist_photo_uri || '' }}
							/>
						</TouchableOpacity>
						<Text style={styles.info}>{item.artist_ko_name}</Text>
					</View>
{/* 
					<View style={[styles.circleAvatar, styles.circleAvatar]} />
					<View style={styles.textWrapper}>
						<Text style={styles.content}>{props.data.artist_ko_name}</Text>
					</View> */}
				{/* </> */}
            {/* )} */}
        </View>
    );
};

const styles = StyleSheet.create({
	container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: 50,
        // backgroundColor: 'blue',
        width: 180,
    },
    bgContainer: {
        height: 170,
        width: 170,
        marginBottom: 20,
    },
    bg: {
        height: 170,
        width: 170,
        borderRadius: 90,
    },
    info: {
        fontFamily: Font.Regular,
        fontSize: 14,
    },
	
	
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

export default CarouselItem;
