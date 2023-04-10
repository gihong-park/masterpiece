/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import moment from 'moment';
import { Font } from '../common/styles';

const RemainDateText = props => {
    const [displayText, setDisplayTest] = useState('');

    const init = () => {
        if (props.start_date && props.finish_date) {
            const mStart = moment(props.start_date);
            const mFinish = moment(props.finish_date);

            setDisplayTest(
                mStart.format('YYYY-MM-DD') +
                    ' ~ ' +
                    mFinish.format('YYYY-MM-DD'),
            );
        }
    };

    useEffect(() => {
        init();
    }, [props]);

    return (
        <Text style={[styles.initial, props.style || {}]}>{displayText}</Text>
    );
};

const styles = StyleSheet.create({
    initial: {
        fontFamily: Font.Regular,
        lineHeight: 25,
    },
});

export default RemainDateText;
