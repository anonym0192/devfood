const initialState = {
    error: null,
    success: null
};

export default (state = initialState, action) => {

    switch(action.type){
        
        case 'SET_ERROR':
            return {error: action.payload.message}
        case 'SET_SUCCESS':
            return {success: action.payload.message}
    }

    return state;

}