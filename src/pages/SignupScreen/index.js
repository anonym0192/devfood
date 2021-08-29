import React, {useState} from 'react';
import { Container} from './styled';

import Form from '../../components/Form';
import FormGroup from '../../components/FormGroup';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import api from '../../services/api';
import {ErrorMessage, SuccessMessage} from '../../AppStyled';

import {formatError, resetPageScroll} from '../../util';



export default () => {

    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [areacode, setAreacode] = useState();
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');
    const [bornDate, setBornDate] = useState('');
    //const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const submitHandle = async (e) => {

        e.preventDefault();
        resetPageScroll();

        if(password !== passwordConfirm){
            setError('As duas senhas não batem');
            return;
        }
        setError('');
        setLoading(true);

        const fData = new FormData();
        fData.append('name', name);
        fData.append('email', email);
        fData.append('phone', phone);
        fData.append('areacode', areacode);
        fData.append('cpf', cpf);
        fData.append('bornDate', bornDate);
        fData.append('password', password);
        //fData.append('username', username);
        fData.append('password', password);
        fData.append('password_confirmation', passwordConfirm);

        try{
            const res = await api.createUser(fData);

            if(res.error){
                setError(formatError(res.error));
                return;
            }

            
            if(res.token){
               dispatch({ type: 'SET_TOKEN', payload: {token: res.token} });
               dispatch({ type: 'SET_USER', payload: {userData: res.user} });

               /*Gambiarra*/

               localStorage.setItem('token', res.token);
               
    
               history.push('/');
            }
        }catch(e){

            console.error(e.slack);
            setError('Ocorreu um erro, tente novamente mais tarde');
        }finally{
            setLoading(false);
        }
    
    }

    return (
        
        <Container>
            {error &&
                <ErrorMessage dangerouslySetInnerHTML={{__html: error }}></ErrorMessage>
            }
            <Form title="Cadastrar novo usuário" submitHandle={submitHandle}>
                
                <FormGroup>
                    <FormInput setValue={e=>setName(e.target.value)} name="name" type="text" placeholder="Nome Completo"/>
                </FormGroup>
                <FormGroup>
                    <FormInput setValue={e=>setEmail(e.target.value)} name="email" type="email" placeholder="E-mail"/>
                </FormGroup>
                <FormGroup>
                    <FormInput setValue={e=>setCpf(e.target.value)} name="cpf" type="text" placeholder="CPF"/>
                </FormGroup>
                <FormGroup>
                    <FormInput setValue={e=>setBornDate(e.target.value)} name="borndate" type="date" placeholder="Data de Nascimento"/>
                </FormGroup>
                <FormGroup>
                    <FormInput setValue={e=>setAreacode(e.target.value)} name="areacode" type="text" placeholder="Area" style={{width: '20%'}} />
                    <FormInput setValue={e=>setPhone(e.target.value)} name="phone" type="text" placeholder="Telefone"/>
                </FormGroup>
                
                <FormGroup>
                    <FormInput setValue={e=>setPassword(e.target.value)} name="password" type="password" placeholder="Senha"/>
                </FormGroup>
                <FormGroup>
                    <FormInput setValue={e=>setPasswordConfirm(e.target.value)} name="password_confirm" type="password" placeholder="Confirmação de Senha"/>
                </FormGroup>
                <FormButton text="Cadastrar" type="submit"/>
            </Form>
        </Container>
    );
}