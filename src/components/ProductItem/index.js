import React from 'react';
import {Container, ProductImgArea, ProductInfoArea, ProductButtonArea} from './styled.js';

export default ({data, onClick}) =>{

    const clickHandle = () =>{
        onClick(data);
    }

    return (
        <Container onClick={clickHandle}>
            <ProductImgArea>
                <img alt={data.name} src={data.image} />
            </ProductImgArea>
            <ProductInfoArea>
                <div className="name">{data.name}</div>
                <div className="price">{` R$ ${parseFloat(data.price).toFixed(2)}`}</div>
                <div className="description">{data.description}</div>
            </ProductInfoArea>
            <ProductButtonArea>
                <img alt="next button" src="/assets/images/next.png" />
            </ProductButtonArea>
        </Container>
    )

}