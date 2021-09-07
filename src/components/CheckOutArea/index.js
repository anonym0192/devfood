import  React, {useState, useEffect} from 'react';
import {Container} from './styled';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Form from '../Form';
import FormInput from '../FormInput';
import FormGroup from '../FormGroup';
import FormButton from '../FormButton';
import api from '../../services/api';

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
    const [city, setCity] = useState(shipping.city);
    const [state, setState] = useState(shipping.state);
    const [country, setCountry] = useState('BRA');

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);



    useEffect(() => {

        const getCities = async () => {

            const res = await api.getAvailableCities();

            setCities(res.cities || []);
            
            console.log(res.cities);
        }

        getCities();

    }, []);

    useEffect(() => {

        const getDistricts = async () => {

            const selectedCity = cities.find(c => c.name == city  );

            if(!selectedCity)  return; 
            
            setState(selectedCity?.state || '');    

            const res = await api.getAvailableDistricts( selectedCity?.id );
            setDistricts(res.districts || []);

           
        }

        getDistricts();

    }, [city]);
    
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
                    <select id="city"  value={district}  onChange={e => setDistrict(e.target.value)} required>
                        <option>{district}</option>
                        {
                            districts.map(district=>(
                                <option key={district.id}>{district.name}</option>
                        ))}
                    </select>
                </FormGroup>

                <FormGroup rowWidth={30}>
                    <label htmlFor="postalCode">CEP</label>
                    <FormInput id="postalCode" setValue={e=>setPostalCode(e.target.value)}  value={postalCode}  required />
                </FormGroup>
                
                <FormGroup rowWidth={70}>
                    <label htmlFor="city">Cidade</label>
                    <select id="city"  value={city} onChange={e => setCity(e.target.value)} required>
                        <option>{city}</option>
                        {
                            cities.map(city=>(
                                <option key={city.id}>{city.name}</option>
                        ))}
                    </select>
                </FormGroup>

                <FormGroup rowWidth={30}>
                    <label htmlFor="estado">Estado</label>
                    <select aria-readonly readOnly name="state"  value={state} disabled required>
                        <option>{state}</option>
                    </select>
                </FormGroup>
               
                <FormButton type="submit" text="Salvar" style={{marginTop: '20px'}} />
                
            </Form>
            
        </Container>
    );
}
