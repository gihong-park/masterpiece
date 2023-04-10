const INSERT = 'INSERT';
const REMOVE = 'REMOVE';
const CLEAR = 'CLEAR';

export const insert = data => ({
    type: INSERT,
    payload: data,
});
export const remove = index => ({
    type: REMOVE,
    payload: index,
});
export const clear = () => ({ type: CLEAR });

const initialState = {
    histories: [],
};

export default function search_history_manager(state = initialState, action) {
    switch (action.type) {
        case INSERT:
            if (state.histories.length >= 5) {
                while (state.histories.length !== 4) {
                    state.histories.pop();
                }
            }
            return {
                ...state,
                histories: [action.payload, ...state.histories],
            };
        case REMOVE:
            state.histories.splice(action.payload, 1);
            return {
                ...state,
                histories: [...state.histories],
            };
        case CLEAR:
            return {
                ...state,
                histories: [],
            };
        default:
            return state;
    }
}
