/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import moment from 'moment';
import { ColorPallete, Font } from '../common/styles';

const RemainDateProgress = props => {
    const [remainPercentage, setRemainPercentage] = useState('0%');
    const [remainDateText, setRemainDateText] = useState('');

    const init = () => {
        if (props.start_date && props.finish_date) {
            const mStart = moment(props.start_date);
            const mFinish = moment(props.finish_date);
            const mCurrent = moment(new Date());
            const diffCurrentStart = mCurrent.diff(mStart);
            const diffCurrentFinish = mCurrent.diff(mFinish);

            // 아직 시작하지 않은 경우
            if (diffCurrentStart < 0) {
                setRemainPercentage('0%');
                setRemainDateText('open ' + mStart.fromNow());
            }
            // 진행 중인 경우
            else if (diffCurrentStart >= 0 && diffCurrentFinish < 0) {
                // setRemainPercentage()
                const diffFinishStart = mFinish.diff(mStart);
                const percentage = Math.floor(
                    (diffCurrentStart / diffFinishStart) * 100,
                );
                setRemainPercentage(percentage + '%');
                setRemainDateText('close ' + mFinish.fromNow());
            }
            // 이미 종료된 경우
            else {
                setRemainPercentage('100%');
                setRemainDateText('closed ' + mFinish.fromNow());
            }
        }
    };

    useEffect(() => {
        init();
    }, [props]);

    return (
        <View style={[styles.container, props.style || {}]}>
            <View style={[styles.progress, { width: remainPercentage }]} />
            <Text style={styles.displayText}>{remainDateText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: ColorPallete.white,
        borderWidth: 1,
        height: 5,
        width: '100%',
        marginTop: 20,
        flexDirection: 'column',
    },
    progress: {
        height: '100%',
        backgroundColor: ColorPallete.white,
    },
    displayText: {
        alignSelf: 'flex-end',
        fontSize: 10,
        color: ColorPallete.white,
        paddingTop: 5,
        position: 'absolute',
        fontFamily: Font.Regular,
        lineHeight: 14,
    },
});

export default RemainDateProgress;
