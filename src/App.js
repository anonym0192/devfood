import React from 'react';
import Header from './components/Header';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import {Container, Menu, BodyPage} from './AppStyled';
import MenuItem from './components/MenuItem';
import Cart from './components/Cart';
import ReactToolTip from 'react-tooltip';

import PrivateRoute from './components/PrivateRoute';

import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import SignupScreen from './pages/SignupScreen';
import ProfileScreen from './pages/ProfileScreen';
import LogoutScreen from './pages/LogoutScreen';
import OrdersScreen from './pages/OrdersScreen';
import ThankYouScreen from './pages/ThankYouScreen';

import { useSelector } from 'react-redux';
import {ErrorMessage, SuccessMessage} from './AppStyled';

import {loadPagSeguroLib} from './util';
import { useEffect } from 'react';

import api from './services/api';

export default () => {

    
    const error = useSelector(state=>state.statusMessage.error);
    const success = useSelector(state=>state.statusMessage.success);
    
    useEffect(()=>{
        loadPagSeguroLib();
        api.refreshToken();
    }, []);
    

    return (
        <BrowserRouter>

            <Container>

                <Menu>
                    <MenuItem title="Store" link="/" icon="/assets/images/store.png"/>
                    <MenuItem title="Order" link="/orders" icon="/assets/images/order.png"/>
                    <MenuItem title="My Profile" link="/profile" icon="/assets/images/profile.png"/>
                </Menu>

                <BodyPage id="bodyPage">
                    <Header />
                    {error &&
                        <ErrorMessage dangerouslySetInnerHTML={{__html: error }}></ErrorMessage>
                    }
                    {success &&
                        <SuccessMessage>{success}</SuccessMessage>
                    }
                    <Switch>                  
                        <Route path="/login">
                            <LoginScreen />
                        </Route>
                        <PrivateRoute path="/logout">
                            <LogoutScreen />
                        </PrivateRoute>
                        <PrivateRoute path="/orders">
                            <OrdersScreen />
                        </PrivateRoute>
                        <PrivateRoute path="/profile">
                            <ProfileScreen />
                        </PrivateRoute>
                        <Route path="/register">
                            <SignupScreen />
                        </Route>
                        <Route exact path="/">
                            <HomeScreen />
                        </Route>
                        <PrivateRoute path="/thankyou/:transaction">
                            <ThankYouScreen />
                        </PrivateRoute>
                        <Route path="*">
                            <Redirect to="/"/>
                        </Route>
                    </Switch>

                    <Cart />

                    <ReactToolTip id="tip-right" place="right" effect="solid"/>
                    <ReactToolTip id="tip-top" place="top" effect="solid"/>
               
                </BodyPage>   
            </Container>
        </BrowserRouter>
    );
}