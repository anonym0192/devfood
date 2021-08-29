const initialState = {
    userData: null,
    token: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'SET_USER':
            return {...state, userData: action.payload.userData};
        case 'SET_TOKEN':
            return {...state, token: action.payload.token};
    }

    return state;
}