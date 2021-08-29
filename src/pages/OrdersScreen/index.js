import React, {useState, useEffect} from 'react';
import {Container, Table, TableColumn, TableHead, TableRow} from './style.js';
import {Link, useHistory} from 'react-router-dom';

import {useDispatch} from 'react-redux';
import api from '../../services/api';
import {ErrorMessage} from '../../AppStyled';


import {formatError, resetPageScroll} from '../../util';
                               

export default  () =>{

    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(()=>{

        api.getUserOrders()
            .then(res=>{

                
                if(res.error){
                    setError(res.error);
                    return;
                }
        
                if(res.orders){
                    console.log(res.orders);
                    setOrders(res.orders);

                   
                }
            });
    }, []); 

  
    return (
    <Container>
        {error &&
            <ErrorMessage>{error}</ErrorMessage>
        }
        <Table>
            <thead>
                <TableRow>
                    <TableHead>Nº pedido</TableHead>
                    <TableHead>Itens</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Pagamento</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </thead>
            <tbody>
                {orders.length > 0 &&
                    orders.map((item, key)=>(
                        <TableRow key={key}>
                            <TableColumn>{item.id}</TableColumn>
                            <TableColumn>
                                {item.products.map((prod, key) => (
                                    <div key={key}>  
                                        {`${prod.name} - R$${prod.price}`}
                                    </div>
                                    )
                                )}
                            </TableColumn>
                            <TableColumn> R$ {item.total}</TableColumn>
                            <TableColumn>{item.payment_type}</TableColumn>
                            <TableColumn>{item.status}</TableColumn>
                        </TableRow>
                    ))
                }
            </tbody>
          
        </Table>
        
    </Container>
    )
}