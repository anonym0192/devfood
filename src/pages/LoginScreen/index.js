import React, {useState} from 'react';
import {Container, ForgetPasswordLink, SignupLink, Prepend } from './style.js';
import {Link, useHistory} from 'react-router-dom';

import Form from '../../components/Form';
import FormGroup from '../../components/FormGroup';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import {useDispatch} from 'react-redux';
import api from '../../services/api';
import {ErrorMessage} from '../../AppStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser, faKey} from '@fortawesome/free-solid-svg-icons';

import {formatError, resetPageScroll} from '../../util';
                               

export default  () =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);


    const dispatch = useDispatch();
    const history = useHistory();

    const submitHandle = async (e) => {
        e.preventDefault();

        resetPageScroll();
        setLoading(true);

        const fData = new FormData();
        fData.append('email', email);
        fData.append('password', password);

        try{
            const res = await api.doLogin(fData);

            if(res.error){
                setError(formatError(res.error));
                return;
            }
    
            if(res.token){
               dispatch({ type: 'SET_TOKEN', payload: {token: res.token} });
    
               console.log(res.user);
               dispatch({ type: 'SET_USER', payload: {userData: res.user} });
    
               history.push('/');
            }
        }catch(e){
            setError('Ocorreu um erro, tente novamente mais tarde');
        }finally{
            setLoading(false);
        }
        
    }

    return (
    <Container>
        {error &&
            <ErrorMessage>{error}</ErrorMessage>
        }
        <Form title="Formulário de Login" submitHandle={submitHandle}>
            <FormGroup>
                <Prepend><FontAwesomeIcon icon={faUser} size="sm" /></Prepend>
                <FormInput setValue={e=>setEmail(e.target.value)} name="email" type="text" placeholder="E-mail" style={{borderRadius: "0px 5px 5px 0"}}/>
            </FormGroup>
            <FormGroup>
                <Prepend><FontAwesomeIcon icon={faKey} size="sm" /></Prepend>
                <FormInput setValue={e=>setPassword(e.target.value)} name="password" type="password" placeholder="Senha" style={{borderRadius: "0px 5px 5px 0"}}/>
            </FormGroup>
            <ForgetPasswordLink><a href="#">Esqueceu a senha?</a></ForgetPasswordLink>
            <FormButton text="Entrar" type="submit" loading={loading} />
            <SignupLink>Não tem conta? <Link to="/register">Cadastre-se agora</Link></SignupLink>
        </Form>
    </Container>
    )
}