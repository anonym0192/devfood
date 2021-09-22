import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';

export default () => {

    const dispatch = useDispatch();
    const history = useHistory();
    
    useEffect(() =>{
        
        history.push('/');

        dispatch({
            type: 'SET_SUCCESS',
            payload: {message: 'Seu pedido foi feito, por favor aguarde!'}
        });
      
        dispatch({
            type: 'CLEAR_CART'
        });
    },[]);

    return <></>
}