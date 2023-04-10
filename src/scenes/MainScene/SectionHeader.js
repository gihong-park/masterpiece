import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ColorPallete, Font } from '../../common/styles';
const SectionHeader = props => {
    const evt = {
        moveToListPage: () => {
            if (typeof props.moveToListPage === 'function') {
                props.moveToListPage();
            }
        },
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            {typeof props.moveToListPage === 'function' ? (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={evt.moveToListPage}>
                    <Text>전체보기</Text>
                </TouchableOpacity>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'flex-end',
        backgroundColor: ColorPallete.white,
        paddingVertical: 20,
		paddingHorizontal: 15,
    },
    title: {
        fontFamily: Font.Bold,
        fontSize: 28,
    },
});

export default SectionHeader;
