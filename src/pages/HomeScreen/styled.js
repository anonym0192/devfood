import styled from 'styled-components';

export const Container = styled.div`
height: 10%;

`;

export const NotFoundMessage = styled.div`
font-size: 19px;
color: #fff;
margin: 50px 15px;
}
`;

export const Titulo = styled.h1``;

export const CategoryArea = styled.div`
padding: 0px 30px;
margin-top: 22px;
color: #fff;
`;

export const CategoryList = styled.div`
display: flex;
margin-top: 11px;
`;

export const ProductArea = styled.div`
margin-top: 35px;
padding: 0 20px;
`;

export const ProductList = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-gap: 20px;

@media only screen and (max-width: 995px){
    grid-template-columns: repeat(2, 1fr);
} 

@media only screen and (max-width: 425px){
    grid-template-columns: repeat(1, 1fr);
} 
`;

