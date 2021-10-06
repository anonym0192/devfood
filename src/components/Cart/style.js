import styled from 'styled-components';

export const CartArea = styled.div`
position: fixed;
background-color: #006505;
bottom: 0;
right: 30px;
width: 360px;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
cursor: pointer;


@media screen and (max-width: 425px){
    width: 90%;
`;

export const CartIcon = styled.img`
width: 23px;
height: auto;
margin-left: 20px;
margin-right: 15px;
`;

export const CartText = styled.span`
color: #fff;
font-size: 17px;
flex: 1;
`;

export const CartHeader = styled.div`
display: flex;
align-items: center;    
height: 50px;
border: #bebebe38 1px solid;
cursor: pointer;
`;

export const CartBody = styled.div`
display: block;
padding: 0 10px;
color: #fff;
height: ${props=>props.show ? '583px' : '0'};
transition: all ease 1s;
overflow-y: auto;

@media screen and (max-width: 425px){
    //height: 100%;
}
`;

export const CartDownIcon = styled.img`
width: 15px;
margin-right: 15px;
`;

export const CartItemArea = styled.div`
margin-top: 20px;
`;

export const CartItem = styled.div`
margin-bottom: 10px;
display: flex;
.infoArea{
    display: flex;
    align-items: center;
    flex: 1;

    img{
        width: 65px;
        height: auto;
        margin-right: 15px;
        border-radius: 10px;
    }

    .descArea{
        color: #fff;
        h3{
            margin: 0;
            margin-bottom: 4px;
            font-size: 17px;
        }
    }
}
.qtArea{
    display: flex;
    align-items: center;
    color: #fff;
    margin-right: 10px;

    img{
        width: 15px;
    }

    span{
        font-size: 16px;
        margin: 0 12px;
    }
}
`;

export const Title = styled.h3`
margin: 0;
margin-bottom: 10px;
font-size: 17px;

`;

export const DeliverAddressArea = styled.div`

margin: 25px 0;

.bodyArea {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.addressInfo{
    display: flex;
    flex-direction: column;  
}

img{
    width: 25px;
    height: 25px;
}
`;
export const CupomCodeArea = styled.div`

margin: 25px 0;

span{
    color: #e4dfe1;
    font-size: 12px;
}

input{
    width: 60%;
    height: 35px;
    border: none;
    border-radius: 10px;
    padding: 0px 10px;
    font-size: 17px;
}

a, a:visited{
    font-size: 13px;
    color: #fff;
}

`;
export const PriceInfoArea = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;

`;

export const CheckOutButton = styled.button`

background-color: #073c06;
color: #fff;
border: 0;
border-radius: 10px;
font-weight: 600;
box-shadow: 2px 3px 0 #00000038;
height: 45px;
font-size: 18px;
width: 100%;
margin: 20px 0;
}

`;



