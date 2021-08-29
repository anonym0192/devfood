import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import api from '../services/api';

export default () => {

    const dispatch = useDispatch();
    const history = useHistory();
    
    useEffect(() =>{
        
        api.doLogout();

        dispatch({ type: 'SET_TOKEN', payload: {token: null } });
        dispatch({ type: 'SET_USER', payload: {userData: null} });

        history.push('/login');

    },[]);

    return <></>
}