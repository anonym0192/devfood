import React, {useEffect, useState} from 'react';
import { Container } from './styled';
import Form from '../../components/Form';
import FormGroup from '../../components/FormGroup';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import {useHistory} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import api from '../../services/api';
import {ErrorMessage, SuccessMessage} from '../../AppStyled';
import {formatError, resetPageScroll} from '../../util';


export default () => {

    const id = useSelector(state=>state.user.userData.id);
    const [name, setName] = useState(useSelector(state=>state.user.userData.name));
    const [email, setEmail] = useState(useSelector(state=>state.user.userData.email));
    const [areacode, setAreacode] = useState(useSelector(state=>state.user.userData.area_code));
    const [phone, setPhone] = useState(useSelector(state=>state.user.userData.phone));
    const [cpf, setCpf] = useState(useSelector(state=>state.user.userData.cpf));
    const [bornDate, setBornDate] = useState(useSelector(state=>state.user.userData.born_date));
   // const [username, setUsername] = useState(useSelector(state=>state.user.userData.username));
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const user = useSelector(state=>state.user.userData);
    const dispatch = useDispatch();
    const history = useHistory();
    
    
    const cleanPasswordForm = () => {
        setPassword('');
        setPasswordConfirm('');
        document.getElementById("passForm").reset();
    }

    const submitHandle = async (e) => {

        e.preventDefault();
        resetPageScroll();


        const isPasswordUpdate = e.target.id == "passForm" ? true : false;

        setError('');
        setLoading(true);

        const fData = new URLSearchParams();

        if(!isPasswordUpdate){
            fData.append('email', email);
            fData.append('name', name);
            fData.append('phone', phone);
            fData.append('area_code', areacode);
            fData.append('cpf', cpf);
            fData.append('born_date', bornDate);
           // fData.append('username', username);
        }else{

            if(password !== passwordConfirm){
                setError('As duas senhas n??o batem');
                cleanPasswordForm();
                return;
            }

            fData.append('password', password);
            fData.append('password_confirmation', passwordConfirm); 

            cleanPasswordForm();

        }

        try{
            const res = await api.updateUser(fData, id);

            if(res.error){
                setError(formatError(res.error));
                return;
            }
            //console.log(res.user);
            if(res.user){
                dispatch({ type: 'SET_USER', payload: {userData: res.user} });
                setSuccess( isPasswordUpdate ? 'Senha atualizada com sucesso!' : 'Informa????es atualizadas com sucesso!' );
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
                <ErrorMessage dangerouslySetInnerHTML={{__html: error }}></ErrorMessage>
            }
            {success && !error &&
                <SuccessMessage>{success}</SuccessMessage>
            }
            
            <Form title="Perfil de Usu??rio" submitHandle={(e)=>submitHandle(e)} id="infoForm">
                
                <FormGroup>
                    <FormInput setValue={e=>setName(e.target.value)} value={name} name="name" type="text" placeholder="Nome Completo" required/>
                </FormGroup>
                <FormGroup>
                    <FormInput setValue={e=>setEmail(e.target.value)} value={email} name="email" type="email" placeholder="E-mail" required/>
                </FormGroup>
                <FormGroup>
                    <FormInput setValue={e=>setCpf(e.target.value)} value={cpf} name="cpf" type="text" placeholder="CPF"/>
                </FormGroup>
                <FormGroup>
                    <FormInput setValue={e=>setBornDate(e.target.value)} value={bornDate} name="borndate" type="date" placeholder="Data de Nascimento"/>
                </FormGroup>
                <FormGroup>
                    <FormInput setValue={e=>setAreacode(e.target.value)} value={areacode} name="areacode" type="text" placeholder="Area" style={{width: '20%'}}/>
                    <FormInput setValue={e=>setPhone(e.target.value)} value={phone} name="phone" type="text" placeholder="Telefone"/>
                </FormGroup>
                
                <FormButton text="Atualizar Dados" type="submit"/>
            </Form>

            <Form title="Altera????o de Senha" submitHandle={(e)=>submitHandle(e)} id="passForm">
                <FormGroup>
                    <FormInput setValue={e=>setPassword(e.target.value)} name="password" type="password" placeholder="Senha" required/>
                </FormGroup>
                <FormGroup>
                    <FormInput setValue={e=>setPasswordConfirm(e.target.value)} name="password_confirm" type="password" placeholder="Confirma????o de Senha" required/>
                </FormGroup>
                <FormButton  text="Mudar Senha" type="submit"/>
            </Form>

            <div style={{margin: '100px 0'}}></div>
            
        </Container>
    );
}