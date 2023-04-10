import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import ColorPallete from '../common/styles/ColorPallete';


const Indicator = props => {
	// data.lenght == 0 이면 5초 이후 결과 없음 메시지 표시
	const [nulldata, setnulldata] = useState(false);
	
	useEffect(() => {
		setTimeout(() => {
			setnulldata(true);
		}, 5000);
	});		

    return (
        <View style={styles.container}>
			{ nulldata == true ? (
				<Text style={styles.text}>
					결과물이 없습니다.
				</Text>
			):(
				<ActivityIndicator
					color={props.color || ColorPallete.highlight}
					size={props.size || 'small'}
            	/>
			)}	
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
		height: '100%',
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
		minHeight: 100,
	},
	text: {
		fontSize: 18,
	}
});

export default Indicator;
