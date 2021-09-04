import React, {useState, useEffect} from 'react';
import {Container, Table, TableColumn, TableHead, TableRow} from './style.js';
import PaginationArea from '../../components/PaginationArea';
import Loading from '../../components/Loading';
import api from '../../services/api';
import {ErrorMessage, NotFoundMessage} from '../../AppStyled';
                               

export default  () =>{

    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(()=>{

        setLoading(true);

        api.getUserOrders(activePage)
            .then(res=>{

                
                if(res.error){
                    setError(res.error);
                    return;
                }
        
                if(res.orders){
                    console.log(res.orders);
                    setOrders(res.orders);
                    setTotalPages(res.total_pages);
     
                }

                setLoading(false);
            });
    }, [activePage]); 

  
    return (
    <Container>
        {error &&
            <ErrorMessage>{error}</ErrorMessage>
        }

        { loading && <Loading width="50" height="50"/> }

        {
            orders?.length > 0 && !loading &&
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
        }

        {orders.length > 0 && totalPages > 1 && !loading &&
                <PaginationArea totalPages={totalPages} activePage={activePage} setActivePage={setActivePage} />        
        }
        {
            orders?.length == 0 && !loading &&
                <NotFoundMessage>Nenhum pedido para mostrar</NotFoundMessage>
        }
        
    </Container>
    )
}