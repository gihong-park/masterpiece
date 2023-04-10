import { createStore } from 'redux';
import rootReducer from '../reducers';
import { persistStore, persistReducer } from 'redux-persist';

import asyncStorage from '@react-native-community/async-storage';

const persistConfig = {
    // 설정 값
    key: 'root',
    storage: asyncStorage,
};

// 기기 재 부팅에도 현재 값을 유지하도록 함
const enhancedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    const store = createStore(enhancedReducer);
    const persistor = persistStore(store);
    return { store, persistor };
};
