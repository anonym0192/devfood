import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    border-radius: 5px;
    padding: 15px 12px;
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.57);

`; 

export const ProductImgArea = styled.div`

    width: 100px;
    height: auto;
    display: flex;
    align-items: center;
    img{
        width: 100%;
        border-radius: 5px;
    }
`; 

export const ProductInfoArea = styled.div`
    display: flex;
    align-items: start;
    flex-direction: column;
    flex: 1;
    color: #1d5e1c;
    margin-left: 20px;

    .name {
        font-size: 21px;
        font-weight: 600;
    }
    .price{
        margin-bottom: 3px;
    }

    .description {
        font-size: 13px;
    }
`; 

export const ProductButtonArea = styled.div`
    display: flex;
    align-items: center;
    img{
        width: 24px;
        height: auto;
    }
`; 