/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import Divider from '../../../components/Divider';

import { ColorPallete, Font } from '../../../common/styles';

const component = props => {
    const evt = {
        onSelectKeyword: () => {
            props.onSelectKeyword(props.data);
            props.history_dispatch.insert({
                value: props.data.value,
                date: new Date(),
            });
        },
        remove: () => {
            props.history_dispatch.remove(props.index);
        },
    };

    return (
        <View style={styles.container}>
			<View style={styles.wrapper}>
				<TouchableOpacity
					style={styles.itemTextWrapper}
					onPress={evt.onSelectKeyword}>
					<Text style={styles.listItemTitle}>{props.data.value}</Text>
				</TouchableOpacity>
				{/* 삭제 버튼 */}
				<TouchableOpacity style={styles.deleteWrapper} onPress={evt.remove}>
					<IoniconsIcon name="md-close-circle" color="#ccc" size={15} />
				</TouchableOpacity>		
			</View>
            {/* 추가 검색 */}
			<Divider/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
		paddingHorizontal: 15,
        alignItems: 'center',
		width: '100%',
	},
	wrapper: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
    itemTextWrapper: {
        flexDirection: 'column',
		justifyContent: 'center',
    },
    listItemTitle: {
        fontSize: 18,
        fontFamily: Font.Regular,
		lineHeight: 25,
		paddingVertical: 15,
		borderBottomColor: 'gray',
		borderBottomWidth: 1,
    },
    deleteWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
    },
});

// state 변경

import {
    insert,
    remove,
    clear,
} from '../../../redux/reducers/com.searchbar.reducer';

const mapStateToProps = state => ({
    histories: state.com_search_history.histories,
});

const mapDispatchToProps = dispatch => ({
    history_dispatch: {
        insert: data => dispatch(insert(data)),
        remove: index => dispatch(remove(index)),
        clear: () => dispatch(clear),
    },
});

const KeywordHistoryListItem = connect(
    mapStateToProps,
    mapDispatchToProps,
)(component);

export default KeywordHistoryListItem;
