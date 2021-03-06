import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 738px;
    height: 375px;
    padding: 15px;

    @media screen and (max-width: 720px){
        width: 100%;
    }
`;

export const ProductArea = styled.div`
    display: flex;
   
    width: 100%;
    height: 226px;
    
    @media screen and (max-width: 425px){
        flex-direction: column;
    }
`;

export const ButtonsArea = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 5px;

    .btn{
        background-color: #073c06;
        color: #fff;
        border: 0;
        border-radius: 5px;
        font-weight: 600;
        box-shadow: 2px 3px 0 #00000038;
        margin-left: 15px;
        
    }
    .addButton{
        padding: 20px 20px;
        font-size: 21px;
    }

    .cancelButton{
        padding: 10px 20px;
        font-size: 15px;
    }

    @media screen and (max-width: 425px){

        justify-content: space-between;

        .btn{
            margin: 0;
        }
        .addButton, .cancelButton{
            padding: 10px 5px;
            font-size: 15px;
        }
    }
`;

export const ProductImage = styled.img`
    width: 312px;
    height: 226px;
    border-radius: 15px;
    margin-right: 10px;

    @media screen and (max-width: 425px){

        width: 190px;
        height: auto;
    }

    
`;
export const ProductInfo = styled.div`

    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    flex: 1;
    .descArea{
        color: #fff;
        h3{
            margin: 0;
            font-size: 22px;
        }
        span{
            display: block;
            font-size: 15px;
            margin-bottom: 7px;
        }
    }
    .priceArea{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        padding: 15px;
        background-color: #083c07;
        border-radius: 5px;
    }
    
    .price{
        font-size: 20px;
        font-weight: 600;
    }
    
    .qtArea{

        img{
            width: 15px;
            vertical-align: bottom;
        }
        span{
            font-weight: 600;
            margin: 0 10px;
        }
    }

    @media screen and (max-width: 425px){
        

        .priceArea{
            width: 260px;
            padding: 10px;
        }
    }


`;