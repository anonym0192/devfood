const initialState = {
    searchValue: '',
};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'SET_SEARCH':
            return {...state, searchValue: action.payload.searchValue};
    }

    return state;
}