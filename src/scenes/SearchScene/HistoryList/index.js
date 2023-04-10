/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { ColorPallete, Font } from '../../../common/styles';
import KeywordHistoryListItem from './KeywordHistoryListItem';
import Divider from '../../../components/Divider';

const HistoryList = props => {
    if (!props.data || !props.data.map ) {
        return <></>;
    }
    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>{props.title}</Text>
            <View style={styles.listWrapper}>
                {props.data.map((item, idx) => {
                    return (
                        <KeywordHistoryListItem
                            key={idx}
                            data={item}
                            index={idx}
                            onSelectKeyword={props.onSelectKeyword}
                        />
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
		alignItems: 'flex-start',
		width: '100%',
		backgroundColor: 'white',
    },
    headerTitle: {
        color: '#333',
		fontFamily: Font.Medium,
		fontWeight: 'bold',
		paddingHorizontal: 25,
		fontSize: 20,
		marginVertical: 10
    },
    listWrapper: {
        width: '100%',
		paddingVertical: 10,
		paddingHorizontal: 10,
        flexDirection: 'column',
        justifyContent: 'center',
		alignItems: 'center',
		// marginHorizontal: 10,
	},
});

export default HistoryList;
