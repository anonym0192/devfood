import React from 'react';
import { Container } from './styled';

export default ({width, height}) =>{

    const style = {
        margin: 'auto',
        display: 'flex'
    }

    return (
        <Container>
            <img src="/assets/images/loading.gif" alt="Loading" width={width} height={height} style={style} />
        </Container>
    );

}