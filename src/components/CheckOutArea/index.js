import  React, {useState} from 'react';
import {Container} from './styled';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Form from '../Form';
import FormInput from '../FormInput';
import FormGroup from '../FormGroup';
import FormButton from '../FormButton';

export default ({setModalStatus}) =>{
    
    //const history = useHistory()
    const dispatch = useDispatch();
    const shipping = useSelector(state=>state.shipping.shippingData);

    const [clientName, setClientName] = useState(shipping.clientName);
    //const [senderAreaCode, setSenderAreaCode] = useState(shipping.senderAreaCode);
    //const [senderPhone, setSenderPhone] = useState(shipping.senderPhone);
    const [clientCPF, setClientCPF] = useState(shipping.clientCPF);
    //const [senderBornDate, setSenderBornDate] = useState('');

    const [street, setStreet] = useState(shipping.street);
    const [number, setNumber] = useState(shipping.number);
    const [complement, setComplement] = useState(shipping.complement);
    const [district, setDistrict] = useState(shipping.district);
    const [postalCode, setPostalCode] = useState(shipping.postalCode);
    const [city, setCity] = useState('São Paulo');
    const [state, setState] = useState('SP');
    const [country, setCountry] = useState('BRA');

    
    const submitHandle = (e)=>{
        
       e.preventDefault();


       const shipping =  {
            clientName,
            clientCPF,
            street,
            number,
            complement,
            district,
            postalCode,
            city,
            state,
            country
        };
        
        dispatch({
            type: 'SET_SHIPPING',
            payload: {
                shipping
            }
        });
        
        console.log("Salvando endereço de checkout");
        console.log(shipping);

        setModalStatus(false);
    }

    return ( 
        <Container >

            <Form title="Dados de Entrega" submitHandle={submitHandle}>
                <FormGroup>
                    <label htmlFor="name">Nome do Comprador</label>
                    <FormInput id="name" setValue={e=>setClientName(e.target.value)}  value={clientName}  required  />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="cpf">CPF</label>
                    <FormInput id="cpf" setValue={e=>setClientCPF(e.target.value)}  value={clientCPF}  required  />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="street">Logradouro</label>
                    <FormInput id="street" setValue={e=>setStreet(e.target.value)}  value={street}  required  />
                </FormGroup>
                <FormGroup rowWidth={70}>
                    <label htmlFor="complement">Complemento</label>
                    <FormInput id="complement" setValue={e=>setComplement(e.target.value)}  value={complement}  />
                </FormGroup>

                <FormGroup rowWidth={30}>
                    <label htmlFor="number">Número</label>
                    <FormInput id="number" setValue={e=>setNumber(e.target.value)}  value={number}  required />
                </FormGroup>
            
                <FormGroup rowWidth={70}>
                    <label htmlFor="district">Bairro</label>
                    <FormInput id="district" setValue={e=>setDistrict(e.target.value)}  value={district}   required />
                </FormGroup>

                <FormGroup rowWidth={30}>
                    <label htmlFor="postalCode">CEP</label>
                    <FormInput id="postalCode" setValue={e=>setPostalCode(e.target.value)}  value={postalCode}  required />
                </FormGroup>
                
                <FormGroup rowWidth={70}>
                    <label htmlFor="city">Cidade</label>
                    <select aria-readonly readOnly id="city"  value={city}  required >
                        <option>{city}</option>
                    </select>
                </FormGroup>
                <FormGroup rowWidth={30}>
                    <label htmlFor="estado">Estado</label>
                    <select  aria-readonly readOnly name="state"  value={state}  required>
                        <option>{state}</option>
                    </select>
                </FormGroup>
               
                <FormButton type="submit" text="Salvar" style={{marginTop: '20px'}} />
                
            </Form>
            
        </Container>
    );
}
