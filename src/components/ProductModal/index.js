import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {Container, ProductArea, ButtonsArea, ProductImage, ProductInfo} from './styled.js';

export default ({data, status, setStatus})=>{
    
     const [qt, setQt]= useState(1);
     const dispatch = useDispatch();  
     
     const HandleClickCancel = () => {
        setStatus(false);
     }
     
     const HandleAddToCart = () => {

        dispatch({
            type: 'ADD_PRODUCT',
            payload: {
                data,
                qt
            }
        });

        dispatch({type: 'CALCULATE_TOTAL'});
        setStatus(false);

    }

     const HandleClickMinus = () => {
         if(qt > 1)
            setQt(qt - 1);
    }

    const HandleClickPlus = () => {
        if(qt < 50 )
         setQt(qt + 1);
    }

    useEffect(()=>{
        setQt(1);
    }, [status])

    return (
        <Container>
            <ProductArea>
                <ProductImage src={data.image} alt="Product Image"/>
                <ProductInfo>
                    <div className="descArea">
                        <h3 className="title">{data.name}</h3>
                        <span>{data.ingredients}</span>
                        <span>
                            {data.price &&
                            `Preço Unidade: R$ ${parseFloat(data.price).toFixed(2)}`
                            }
                        </span>
                    </div>
                    <div className="priceArea">
                        <div className="qtArea">
                            <img onClick={HandleClickMinus} src="/assets/images/minus.png" alt="minus icon" />
                            <span>{qt}</span>
                            <img onClick={HandleClickPlus} src="/assets/images/plus.png" alt="plus icon" />
                        </div>
                        <div className="price">{
                            data.price && 
                                `R$ ${(data.price * qt).toFixed(2)}`
                            }
                        </div>
                    </div>
                </ProductInfo>
            </ProductArea>
            <ButtonsArea>
                <button onClick={HandleClickCancel} className="btn cancelButton">Cancelar</button>
                <button onClick={HandleAddToCart} className="btn addButton">Adicionar ao carrinho</button>
            </ButtonsArea>
        </Container>
        )

}