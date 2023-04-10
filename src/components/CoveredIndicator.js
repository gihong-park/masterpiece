import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const mapStateToProps = state => ({ isRequested: state.api.isRequested });

const CoveredIndicator = props => {
    const { isRequested } = props;
    
    if (isRequested) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    } else {
        return <></>;
    }
};

const styles = StyleSheet.create({
    container: {
        height: screenHeight,
        position: 'absolute',
        top: 0,
        left: 0,
        width: screenWidth,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
});

export default connect(mapStateToProps)(CoveredIndicator);
