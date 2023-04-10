/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './src/redux/store';
const { store, persistor } = configureStore();

const Tab = createBottomTabNavigator();

import MainScene from './src/scenes/MainScene';
import ExhibitionListScene from './src/scenes/ExhibitionListScene';
import ArtistListScene from './src/scenes/ArtistListScene';
import SearchScene from './src/scenes/SearchScene';

function SettingsScreen(props) {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName;

                                if (route.name === '홈') {
                                    iconName = 'md-home';
                                } else if (route.name === '전시회') {
                                    iconName = 'md-easel';
                                } else if (route.name === '검색') {
                                    iconName = 'md-search';
                                } else if (route.name === '작가') {
                                    iconName = 'md-people';
                                } else if (route.name === 'Settings') {
                                    iconName = 'md-settings';
                                }

                                // You can return any component that you like here!
                                return (
                                    <IoniconsIcon
                                        name={iconName}
                                        size={size}
                                        color={color}
                                    />
                                );
                            },
                        })}
                        tabBarOptions={{
                            activeTintColor: '#F20505',
                            inactiveTintColor: 'gray',
                        }}>
                        <Tab.Screen name="홈" component={MainScene} />
                        <Tab.Screen
                            name="전시회"
                            component={ExhibitionListScene}
                        />
                        <Tab.Screen
                            name="작가"
                            component={ArtistListScene}
                        />
                        <Tab.Screen name="검색" component={SearchScene} />
                    </Tab.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
};

export default App;
