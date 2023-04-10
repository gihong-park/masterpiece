// 스택 관련 컨테이너
import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { ColorPallete, Font } from '../../common/styles';

import ExhibitionDetailScene from '../ExhibitionDetailScene';
import ExhibitionXRScene from '../ExhibitionXRScene';
import ArtistDetailScene from '../ArtistDetailScene';
import WorkDetailScene from '../WorkDetailScene';

import MainScene from './MainScene';

const MainSceneStack = createStackNavigator();

const MainSceneStackContainer = props => {
    return (
        <MainSceneStack.Navigator>
            <MainSceneStack.Screen name="Main" component={MainScene} />
            <MainSceneStack.Screen
                name="ExhibitionDetails"
                component={ExhibitionDetailScene}
            />
            <MainSceneStack.Screen
                name="ExhibitionXR"
                component={ExhibitionXRScene}
                options={{
                    headerTransparent: 1,
                }}
            />
            <MainSceneStack.Screen
                name="ArtistDetails"
                component={ArtistDetailScene}
            />
            <MainSceneStack.Screen
                name="WorkDetails"
                component={WorkDetailScene}
            />
        </MainSceneStack.Navigator>
    );
};

export default MainSceneStackContainer;
