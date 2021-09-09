import styled from 'styled-components';

export const HeaderArea = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #006505;
    border-radius: 10px;
    padding: 25px 20px;

    @media screen and (max-width: 425px){
        flex-direction: column;
        padding: 20px 10px;
    }

`;
export const Logo = styled.img`
    width: auto;
    height: 70px;

    @media screen and (max-width: 425px){
        height: 45px;
        margin-bottom: 15px;
    }
`;
export const SearchInput = styled.input`

    width: ${props=>props.active ? '300px' : '0px'};
    height: 50px;
    padding-left: 50px;
    background-image: url(/assets/images/search.png);
    background-repeat: no-repeat;
    background-position: 15px center;
    background-size: 20px;
    outline: none;
    border: 0;
    border-radius: 50px;
    font-size: 15px;
    transition: all ease .2s;
    cursor: pointer;

    &:focus{
        cursor: text;
    }

    @media screen and (max-width: 425px){
        width: 100%;
        height: 35px;
    }

`;

export const UserMenu = styled.ul`

    display: flex;
    list-style: none;
    justify-content: flex-end;
    font-size: 17px;

    a{
        text-decoration: none;
        color: #fff;
        
    }

    li:first-child::after{
        content: "\\2502";
        color: #fff;
        margin: 0 10px;
    }

    @media screen and (max-width: 425px){
        font-size: 15px;
    }
`;