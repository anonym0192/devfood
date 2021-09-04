import styled from 'styled-components';

export const Container = styled.div`
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
