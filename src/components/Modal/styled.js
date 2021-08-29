import styled from 'styled-components';

export const Container = styled.div`
    display: ${props=>props.status ? 'flex' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.7);
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

export const ModalBody = styled.div`

    background-image: url(assets/images/bg.png);
    background-color: #fff;
    max-width: 100vw;
    max-height: 95vh;
    overflow: auto;
    border-radius: 15px;
    box-shadow: 0 0 50px #000;
}

`;
