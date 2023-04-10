import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
    Alert,
} from 'react-native';
import { ColorPallete, Font } from '../common/styles';

const Footer = props => {
    const color = props.color || ColorPallete.highlight;
    const openURI = uri => {
        Linking.canOpenURL(uri)
            .then(() => {
                Linking.openURL(uri);
            })
            .catch(err => {
                Alert.alert(
                    '일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.',
                );
                console.log(err);
            });
    };
    return (
        <View style={[styles.container, props.containerStyle || {}]}>
            {/* <View style={[styles.companyWrapper, { borderBottomColor: color }]}>
                <Text
                    style={[
                        styles.companyName,
                        styles.textColor,
                        { color: color },
                    ]}>
                    OLDROOKIE CO., LTD.
                </Text>
            </View> */}
            <Text style={[styles.desc, styles.textColor, { color: color }]}>
				OLDROOKIE CO | 대표이사 : 한영석 {'\n'}
                사업자 등록 번호 : 263-87-01519 {'\n'}
                주소 : 서울특별시 노원구 화랑로 815,5022{'\n'}(공릉동,
                삼육대학교 창업보육센터)
            </Text>

            <TouchableOpacity
                onPress={() => openURI('mailto:contact@oldrookiecorp.com')}>
                <Text style={[styles.link, styles.textColor, { color: color }]}>
                    문의 메일 : contact@oldrookiecorp.com
                </Text>
            </TouchableOpacity>

            <View style={styles.infoContainer}>
                <TouchableOpacity
                    onPress={() => openURI('http://www.oldrookiecorp.com')}>
                    <Text
                        style={[
                            styles.info,
                            styles.textColor,
                            { color: color },
                        ]}>
                        이용약관
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => openURI('http://www.oldrookiecorp.com')}>
                    <Text
                        style={[
                            styles.info,
                            styles.textColor,
                            { color: color },
                        ]}>
                        개인정보처리방침
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => openURI('http://www.oldrookiecorp.com')}>
                    <Text
                        style={[
                            styles.info,
                            styles.textColor,
                            { color: color },
                        ]}>
                        청소년보호정책
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 25,
        paddingVertical: 30,
        justifyContent: 'space-evenly',
        minHeight: 300,
		marginBottom: 25,
		marginTop: 30
    },
    companyWrapper: {
        borderBottomWidth: 5,
        borderBottomColor: ColorPallete.highlight,
        paddingBottom: 15,
        marginBottom: 15,
    },
    companyName: {
        fontSize: 25,
        fontFamily: Font.Black,
        lineHeight: 55,
        marginTop: 20,
    },
    desc: {
        // textAlign: 'right',
        fontSize: 13,
		fontFamily: Font.Light,
		lineHeight: 25,
    },
    link: {
        // textAlign: 'right',
        textDecorationLine: 'underline',
        fontSize: 13,
        fontFamily: Font.Light,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 30,
    },
    info: {
        fontSize: 11,
        fontFamily: Font.Regular,
    },
    textColor: {
        color: ColorPallete.highlight,
    },
});

export default Footer;
