import styled from 'styled-components';

export const  Container = styled.div`
height: 20%;
`;

export const Table = styled.table`

width: 100%;
margin-bottom: 1rem;
background-color: transparent;

@media screen and (max-width: 425px){
    font-size: 12px
}



`;

export const TableRow = styled.tr`

display: table-row;
vertical-align: inherit;
border-color: inherit;
background-color: white;

`;

export const TableHead = styled.th`

color: #fff;
background-color: #212529;
border-color: #32383e;
padding: .75rem;
vertical-align: top;
border-top: 1px solid #dee2e6;

@media screen and (max-width: 425px){
    padding: .20rem;
}

`;

export const TableColumn = styled.td`
padding: .75rem;
vertical-align: top;
border-top: 1px solid #dee2e6;

@media screen and (max-width: 425px){
    padding: .20rem;
}
`;




