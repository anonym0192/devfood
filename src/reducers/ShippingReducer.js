const initialState = {
    shippingData: {}
};

export default (state = initialState, action) => {

    switch(action.type){     
        case 'SET_SHIPPING':
            return {...state, shippingData: action.payload.shipping}
    }
    return state;

}