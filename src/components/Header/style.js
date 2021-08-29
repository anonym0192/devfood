import styled from 'styled-components';

export const HeaderArea = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #006505;
    border-radius: 10px;
    padding: 25px 20px;

`;
export const Logo = styled.img`
    width: auto;
    height: 70px;
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
`;

export const UserMenu = styled.ul`

display: flex;
list-style: none;
justify-content: flex-end;

a{
    text-decoration: none;
    color: #fff;
    font-size: 17px;
}
li:first-child{

}

li:first-child::after{
    content: "\\2502";
    color: #fff;
    margin: 0 10px;
}
li:last-child{
    //margin-left: 10px;
}
`;