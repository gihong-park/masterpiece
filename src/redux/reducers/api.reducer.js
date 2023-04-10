/**
 * @description api 요청 상태를 중앙 관리 하기 위해서 사용
 */
const IDLE = 'API_IDLE';
const REQUEST = 'API_REQUEST';

/**
 * @description 통신하지 않는 상태로 변경
 */
export const changeToIdle = () => ({ type: IDLE });
/**
 * @description 통신 상태로 변경
 */
export const changeToRequest = () => ({ type: REQUEST });

const initialState = {
    isRequested: false,
};

export default function changeAPIStatus(state = initialState, action) {
    switch (action.type) {
        case IDLE:
            return {
                ...state,
                isRequested: false,
            };
        case REQUEST:
            return {
                ...state,
                isRequested: true,
            };
        default:
            return state;
    }
}
