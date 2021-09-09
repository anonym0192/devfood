import React, {useState, useEffect, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Modal from '../Modal';
import CheckOutArea from '../CheckOutArea';
import api from '../../services/api';
import {isObjectEmpty} from '../../util';
import { DefaultButton } from '../../AppStyled';

import {
    Title,
    CartArea,
    CartHeader, 
    CartBody, 
    CartIcon, 
    CartText, 
    CartDownIcon, 
    CartItemArea,
    CartItem,
    DeliverAddressArea,
    CupomCodeArea,
    PriceInfoArea,
    CheckOutButton
} from './style.js';


export default () => {

    const [show, setShow] = useState(true);
    const [modalStatus, setModalStatus] = useState(false);
    

    const [couponCode, setCouponCode] = useState(useSelector(state=>state.cart.coupon.code));
    const inputCoupon = useRef(null);
    const [couponStatusMsg, setCouponStatusMsg] = useState("");
    
    const user = useSelector(state=>state.user.userData);
    const token = useSelector(state=>state.user.token);
    
    const products = useSelector(state=>state.cart.products);
    const total = useSelector(state=>state.cart.total);
    const delivery = useSelector(state=>state.cart.delivery);
    const discount = useSelector(state=>state.cart.discount);
    const shipping = useSelector(state=>state.shipping.shippingData);
    
  
    
    const dispatch = useDispatch();

    const history = useHistory();

    
 

    useEffect(()=>{
        history.listen(()=>{
                cleanErrorMessage();
        })

        return () => cleanErrorMessage();
    },[]);

    const cleanErrorMessage = () => {
        dispatch({type: 'SET_ERROR', payload: {message: ''}});
        
    }
    

    const handleCartClick = ()=>{
        setShow(!show);
    }

    
    const handleClickPlus = (key)=>{
        dispatch({type: 'PRODUCT_PLUS', payload: {key}});
        dispatch({type: 'CALCULATE_TOTAL'});
    }

    const handleClickMinus = (key)=>{
        dispatch({type: 'PRODUCT_MINUS', payload: {key}});
        dispatch({type: 'CALCULATE_TOTAL'});
    }

    const handleClickEdit = (key)=>{
       setModalStatus(true);
    }

    const handleApplyCoupon = async (e)=>{
        
        if(couponCode){
            
            const res = await api.applyCoupon(couponCode);

            if(res.error){

                setCouponStatusMsg("Cupom invalido");
                setCouponCode("");

            } else if(res.coupon ){

                dispatch({type: 'APPLY_COUPON', payload: {coupon: res.coupon}});
                dispatch({type: 'CALCULATE_TOTAL'});

                setCouponStatusMsg("Cupom ativado");

                inputCoupon.current.setAttribute("disabled", "disabled");
            }
        }
       
    }

    const handleRemoveCoupon = (e) => {

        e.preventDefault();

        setCouponCode(''); 
        setCouponStatusMsg('');

        dispatch({type: 'REMOVE_COUPON'});
        dispatch({type: 'CALCULATE_TOTAL'});

        inputCoupon.current.removeAttribute("disabled");
    }

    const handleCheckOut = async ()=>{
        //Processo de pagamento

        if(!token || !user){
            history.push('/login')
            return;
        }

        if(!shipping || isObjectEmpty(shipping)){
            setModalStatus(true);
            return;
        }

        
        const items = [];

        for(let item of products){
            items.push({
                id: item.data.id,
                name: item.data.name,
                price: item.data.price,
                qt: item.qt
            });
        }
        
        const fData = {
                'currency':'BRL',                                  
                'products': items,
                'clientName': shipping.clientName,//user.name,
                //'senderAreaCode': shipping.senderAreaCode,
                //'senderPhone': shipping.senderPhone,//user.phone,
                'clientCPF': shipping.clientCPF,//user.cpf,
                //'senderBornDate':user.bornDate,
                //'senderEmail':user.email,
                'street':shipping.street,
                'number':shipping.number,
                'complement':shipping.complement,
                'district':shipping.district,
                'postalCode':shipping.postalCode,
                'city':shipping.city,
                'state':shipping.state,
                'country':shipping.country,
                //'extraAmount':'-0.01',
                'redirectURL':process.env.REACT_APP_URL,
                'notificationURL':process.env.REACT_APP_API_BASEURL+'/notify',
                'discount': discount,
                'deliveryCost': delivery
            };

        try{
            cleanErrorMessage();
            await api.doCheckOut(fData);
        }catch(e){

            dispatch({type: 'SET_ERROR', payload: {message: e.message}});
        }

       
    }

    return (
        <>
            <CartArea >
                <CartHeader onClick={handleCartClick}>
                    <CartIcon src="/assets/images/cart.png"/>
                    <CartText>Meu carrinho ({products?.length || 0})</CartText>
                    {show &&
                        <CartDownIcon src="/assets/images/down.png"/>
                    }
                </CartHeader>
                <CartBody show={show}>
                    <CartItemArea>
                        {products?.length > 0 &&
                            products.map((item, key)=>(
                                <CartItem key={key}>
                                    <div className="infoArea">
                                        <img alt={item.data.name} src={item.data.image} />
                                        <div className="descArea">
                                            <Title>{item.data.name}</Title>
                                            <span>R$ {(item.data.price * item.qt)?.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div className="qtArea">
                                        <img onClick={()=>handleClickMinus(key)} src="/assets/images/minus.png" />
                                        <span>{item.qt}</span>
                                        <img onClick={()=>handleClickPlus(key)} src="/assets/images/plus.png" />
                                    </div>
                                </CartItem>
                            ))             
                        }  
                    </CartItemArea>
                    <DeliverAddressArea>
                        <Title>Entrega</Title>
                        <div className="bodyArea">
                            <div className="addressInfo">
                                <span>{shipping.street}</span>
                                <span>{shipping.district}</span>
                                <span>{shipping.city}</span>
                            </div>
                            <img onClick={(e)=>handleClickEdit(e)} src="/assets/images/edit.png" />
                        </div>
                    </DeliverAddressArea>
                    <CupomCodeArea>
                        {couponStatusMsg &&
                            <span>{couponStatusMsg}</span>
                        }
                        <Title>Cupom de desconto</Title>
                        <input name="cupomcode" onChange={(e) => setCouponCode(e.target.value)} value={couponCode} ref={inputCoupon}/>
                        <DefaultButton height="35px" onClick={handleApplyCoupon}>Aplicar Cupom</DefaultButton>
                        <a href="#" onClick={handleRemoveCoupon}>Remover</a>
                    </CupomCodeArea>
                    <PriceInfoArea>
                        <Title>Desconto</Title> 
                        <span>- R$ {discount}</span>  
                    </PriceInfoArea>
                    <PriceInfoArea>
                        <Title>Taxa de entrega</Title>
                        <span>R$ {delivery}</span>  
                    </PriceInfoArea>
                    <PriceInfoArea>
                        <Title>Total</Title>
                        <span>R$ {total?.toFixed(2)}</span>  
                    </PriceInfoArea>
                    <CheckOutButton onClick={()=> handleCheckOut()}>Finalizar Compra</CheckOutButton>
                </CartBody>
            </CartArea>
            <Modal status={modalStatus} setModalStatus={setModalStatus}>
                <CheckOutArea setModalStatus={setModalStatus}/>
            </Modal>
            </>

    );
}