import { combineReducers } from 'redux';

import api from './api.reducer';
import com_search_history from './com.searchbar.reducer';

/**
 *  @description 리듀서가 추가되는 경우 현재 위치에 추가하도록 한다.
 */
const rootReducer = combineReducers({
    api,
    com_search_history,
});

export default rootReducer;
