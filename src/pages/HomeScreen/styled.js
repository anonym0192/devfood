import styled from 'styled-components';

export const Container = styled.div`

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

export const PaginationArea = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 25px;
    padding: 0 20px;
`;
export const PaginationItem = styled.div`

    background-color: ${(props=> props.active === props.current ? '#006505' : '#fff')};
    color: ${(props=> props.active === props.current ? '#fff' : '#000')};
    padding: 5px 10px;
    margin-right: 10px;
    border-radius: 3px;
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.57);
`;
