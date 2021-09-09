import styled from 'styled-components';

export const Container = styled.div`

    display:flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props)=> props.isActive ? '#f4f4f4' : '#abe09a'};
    border-radius: 20px;
    margin-right: 15px;
    width: 83px;
    height: 83px;
    cursor: pointer;
    transition: all ease .4s;

    @media screen and (max-width: 425px){
        width: 45px;
        height: 45px;
    }
`;

export const ItemImage = styled.img`
    width: 53px;
    height: 53px;

    @media screen and (max-width: 425px){
        width: 30px;
        height: 30px;
    }

`;
