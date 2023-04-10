/*
 *  Author: YKS
 *  CreateDate: 2020-02-01
 *  Description: 데이터 통신을 한군데서 관리하기 위한 파일
 */
import axios from 'axios';
import { CurrentHost } from './hosts';

import configureStore from '../../redux/store';

// redux 사용을 위해 로드
const { store } = configureStore();

/**
 *  @description 실제 요청을 실행하는 함수
 *  @param {object} 실제 axios 요청에 필요한 파라미터들을 넘겨받음
 *  @returns {Promise} 요청 후 생성된 axios 요청 객체
 */
const request = async options => {
    if (!options.path) {
        throw new Error('path not passed');
    }

    console.log('[API] REQUEST CALLED | uri : ' + CurrentHost + options.path);

    // REQUEST 상황으로 상태 변경을 요청함.
    store.dispatch({ type: 'API_REQUEST' });
    let result;

    try {
        result = await axios({
            url: CurrentHost + options.path,
            ...options,
        });
        store.dispatch({ type: 'API_IDLE' });

        // IDLE 상황으로 상태 변경을 요청함.
        console.log('[API] REQUEST SUCCESS');
    } catch (e) {
        store.dispatch({ type: 'API_IDLE' });

        // IDLE 상황으로 상태 변경을 요청함.
        console.log('[API] ERROR OCCURRED!');
        console.log(e);
    } finally {
        return result;
    }
};

export default request;
