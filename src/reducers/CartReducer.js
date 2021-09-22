const initialState = {
    products: [],
    discount: 0,
    delivery: 0,
    coupon: {},
    total: 0
}


export default (state = initialState, action) => {

    let products = Array.isArray(state.products) ? [...state.products] : [];
    let index = null;


    switch(action.type){
        case 'ADD_PRODUCT':

            let id = action.payload.data.id;

            index = products.findIndex(product => product.data.id === id);

            if(index !== -1){
                products[index].qt += action.payload.qt;  
            }else{
                products.push({
                    data: action.payload.data,
                    qt: action.payload.qt
                });
            }
            
            console.log(products);

            return {...state, products};
            
        case 'REMOVE_PRODUCT':
            
            products.splice(action.payload);
       
            return {...state, products}
            

        case 'PRODUCT_MINUS':
            index = action.payload.key;

            if(products[index]){
                products[index].qt -= 1;  
                if(products[index].qt <= 0){
                    products.splice(index, 1);
                }
            }
            return {...state, products};
            

        case 'PRODUCT_PLUS':
            index = action.payload.key;
            if(products[index] && products[index].qt <= 50){
                products[index].qt += 1;
            };
            return {...state, products};

        case 'CALCULATE_TOTAL':

            const subtotal = state.products.reduce((acc, item)=> acc + (item.data.price * item.qt) , 0);

            let total;

            if(subtotal > 0){
                total = parseFloat(subtotal) + parseFloat(state.delivery) - parseFloat(state.discount);
            }else{
                total = 0;
            }
            
            return {...state, total: total};

        case 'CLEAR_CART':
            return {...state, products: [], total: 0};

        case 'APPLY_COUPON':

            
            const coupon = action.payload.coupon;

            const discount = coupon.value;

            return {...state, coupon ,discount};

        case 'REMOVE_COUPON':

            return {...state, coupon: {} , discount: 0};

        case 'SET_DELIVERY_COST':

            //console.log(typeof state.discount)
            return {...state, delivery: action.payload.delivery };
    }

    return state;

}

