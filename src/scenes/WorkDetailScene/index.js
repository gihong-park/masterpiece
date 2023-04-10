/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Share,
    ScrollView,
    View,
    StyleSheet,
    Text,
    StatusBar,
    SafeAreaView,
	Image,
	TouchableOpacity,
} from 'react-native';

import { ColorPallete, Font } from '../../common/styles';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import request from '../../common/api/conn';
import Footer from '../../components/Footer';
import Indicator from '../../components/Indicator';

import Artist from './AritstSection';
import Divider from '../../components/Divider';

/**
 * TODO : 데이터를 불러와야 함. 레이아웃 PPT 참조
 */

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const index = props => {
    const [loading, setLoading] = useState(true);
    const [workDetails, setWorkDetails] = useState({});

	useEffect(() => {
		// 데이터를 불러오기 위한 work_id
		_header.init();
		_api.init(props.route.params.work_id);
    }, []);

	/**
     * Navigation Header 관련 함수 묶음
     */
	const _header = {
        left: () => {
            return (
                <TouchableOpacity
                    style={{
                        width: 60,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={props.navigation.goBack}>
                    <IoniconsIcon
                        name="ios-arrow-back"
                        size={25}
                        color={ColorPallete.highlight}
                    />
                </TouchableOpacity>
            );
        },
        title: () => {
            return (
                <SafeAreaView contentInsetAdjustmentBehavior="always">
                    <Text
                        style={{
                            fontFamily: Font.Regular,
                            fontSize: 17,
                            // marginTop: -15,
                        }}>
                        {props.route.params.work_title}
                    </Text>
                </SafeAreaView>
            );
        },
        init: () => {
            props.navigation.setOptions({
				title : workDetails.work_title,
                headerLeft: _header.left,
                headerTitle: _header.title,
            });
        },
    };


	/**
     * API 연결에 관계된 함수 묶음
     */
    const _api = {
        init: async key => {
            await _api.fetch.workDetails(key);
        },
        fetch: {
            workDetails: async key => {
                const result = await request({
                    path: '/api/works/' + key,
                    method: 'get',
                });
                setWorkDetails(result.data.data[0]);
				setLoading(false);
				console.log(result.data)
            },
        },
	};
	
    //공유 액션을 위한 함수
    //페이스북에서 제공하는 공유 기능
    //부족한 것 같다.
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentInsetAdjustmentBehavior="automatic">
                
                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <Indicator size="large" />
                        </View>
                    ) : (
						<>
                        <Image
                            style={styles.image}
                            source={{ uri: workDetails.work_img_uri }}
                        />
                    
						{/* <Text
							title="Share"
							style={styles.stackText}
							onPress={onShare}>
							공유하기
						</Text> */}
					<View style={ styles.descWrapper }>
						<View style={styles.textWrapper}>
							<Text style={styles.title}>
								{workDetails.work_title}
							</Text>
							<View style={styles.textWrapper}>
								<Text style={styles.content}>
									<Text style={styles.contentItem}>작업연도  </Text> 
									{workDetails.work_year}
								</Text>
								<Text style={styles.content}>
									<Text style={styles.contentItem}>기법  </Text> 
									{workDetails.work_type}
								</Text>
								<Text style={styles.content}>
									<Text style={styles.contentItem}>크기  </Text> 
									{workDetails.work_size}
								</Text>
							</View>
						</View>

						<Text style={styles.sectionTitle}>참여작가</Text>
						<Artist
							work_id={props.route.params.work_id}
						/>
						
						
					</View>
					</>
					)}
                <Footer color="#000" />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
	container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        width: screenWidth,
        backgroundColor: '#eee',
		flex: 1,
		// minHeight: screenHeight,
	},
	descWrapper: {
		backgroundColor: '#fff',
		paddingBottom: 50,
	},
    image: {
        flex: 1,
        width: screenWidth,
        height: screenWidth,
        // resizeMode: 'cover',
    },
    loadingContainer: {
        height: screenWidth,
        width: screenWidth,
	},
	textWrapper: {
        alignItems: 'center',
		// margin: 15,
		marginTop: 50,
		marginBottom: 20,
    },
    stackText: {
        position: 'absolute',
        fontSize: screenWidth / 25,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'flex-end',
        padding: 7.0,
    },
    title: {
        fontSize: screenWidth / 15,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
	},
	sectionTitle: {
		fontSize: screenWidth / 18,
        fontWeight: 'bold',
		alignSelf: 'center',
		textAlign: 'center',
		marginTop: 20,
	},
    content: {
		fontSize: screenWidth / 24,
		marginVertical: 5,
	},
	contentItem: {
		color: 'gray',
	},
});

export default index;
