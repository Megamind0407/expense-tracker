// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case 'RESET_EXPENSES':
            return {
                ...state,
                expenses: [],
            };
        case 'RESET_INCOME':
            return {
                ...state,
                income: [],
            };
        case 'SET_EXPENSES':
            return {
                ...state,
                expenses: action.payload,
            };
        case 'SET_INCOME':
            return {
                ...state,
                income: action.payload,
            };
        default:
            return state;
    }
};
