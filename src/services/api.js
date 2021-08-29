import axios from 'axios';
//import {product_list, categories} from '../test_data';
import {isObjectEmpty, formatError} from '../util';

const BASE = process.env.REACT_APP_API_BASEURL;

const api = axios.create({
    baseURL: BASE,
    validateStatus: function (status){
                return true//status >= 200 && status <= 401 ;
    },
    headers: {
        'Access-Control-Allow-Origin': '*',
        //'Content-type': 'application/json',
        //'Accept': 'application/json'
     }
});



const getAuthorizationHeader = ()=>{
    let token = localStorage.getItem('token');
    
    if(token){
        return {Authorization : "Bearer "+token} 
    }

    return {};
}

const removeToken = ()=>{

    let token = localStorage.getItem('token');
    
    if(token){
        localStorage.removeItem('token');
    }
}



const createOrder = async (fData) => {

    const headers = getAuthorizationHeader();
    const res = await api.post('/order', fData, {headers});

    if(res.data){
        return res.data;
    }
}

export default {

    isLogged: async () => {

    },

    doLogin: async (formData) => {
       
        const res = await api.post('/login', formData);
       
        if(res.status == 401){
            return {error: "Usuário e/ou senha incorretos"};
        }

        if(res.data.token){
            localStorage.setItem('token', res.data.token);
           
        }

        return res.data;
           
    },

    doLogout: async () => {
       
      
        const headers = getAuthorizationHeader();

        const res = await api.get('/logout', {headers});

        //delete api.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
        
            
        if(res.status == 401){
            removeToken();
            return {error: "Usuário não logado"};
        }
        return res.data;
        

    },
    createUser: async (formData) => {

        const res = await api.post('/register', formData);

        return res.data;
       
    },

    updateUser: async (formData, id) => {

        const headers = getAuthorizationHeader();
        
 
        const res = await api.put(`/user/${id}`, formData, {headers});

        if(res.status == 401){

            removeToken();
            return {error: "Usuário não logado"};
        }

        return res.data; 
       
    },

    getCategories: async ()=>{

        const res = await api.get('/categories');
        const json = res.data;//categories;
        
        return json;
    },
    getProducts: async (category, page, search)=>{

        let fields = {};
        
        if(category !== '' ){
            fields.category = category;
        }
        if(page > 1){
            fields.page = page;
        }
        if(search){
            fields.search = search;
        }
        
        let queryString = '';

        if(!isObjectEmpty(fields)){
            queryString = '?'+ new URLSearchParams(fields).toString();    
        } 
        
        const res = await api.get('products'+queryString);

        const json = res.data;//product_list; 
        
        return json;

    },


    getCart: async () =>{

        const headers = getAuthorizationHeader();

        const res = await api.get(`/cart`, {headers});

        return res.data;
    },

    updateCart: async (formData) =>{

        const headers = getAuthorizationHeader();

        const res = await api.put(`/cart`, formData, {headers});
    },

    getUserOrders: async () => {

        const headers = getAuthorizationHeader();

        const res = await api.get(`/orders`, {headers});

        if(res.status == 401){
            
            removeToken();
            window.location.href = "/login";
            
            return {error: "Usuário não logado"};
        }

        return res.data;

    },

    doCheckOut: async (fData) =>{

        const headers = getAuthorizationHeader();
        const res = await api.post(`/checkout`, fData ,{headers});

        if(res.data.error){    
            const errorMsg = formatError(res.data.error);
            throw new Error(errorMsg);     
        }
        if(!res.data.code){
            throw new Error("Ocorreu um erro, tente novamente mais tarde!");
        }

        //Insira o código de checkout gerado no Passo 1
        var code = res.data.code;
        var callback = {
            success : async function(transactionCode) {
                //Insira os comandos para quando o usuário finalizar o pagamento. 
                //O código da transação estará na variável "transactionCode"
                fData.transactionCode = transactionCode;
                fData.paymentType = 1;

                await createOrder(fData);

                console.log("Compra feita com sucesso, código de transação: " + transactionCode);

                window.location.href(`/thankyou/${transactionCode}`);
            },
            abort : function() {
                //Insira os comandos para quando o usuário abandonar a tela de pagamento.
                console.log("abortado");
            }
        };
        //Chamada do lightbox passando o código de checkout e os comandos para o callback
        var isOpenLightbox = window.PagSeguroLightbox(code, callback);
        // Redireciona o comprador, caso o navegador não tenha suporte ao Lightbox
        if (!isOpenLightbox){
            window.location.href="https://pagseguro.uol.com.br/v2/checkout/payment.html?code=" + code;
            console.log("Redirecionamento")
        }
        
    }, 

   /* addCartItem: async (id) =>{

        const headers = getAuthorizationHeader();

        const res = await api.put(`/cart/plus/${id}`, {headers});

        if(!res.data.error){
            return res.data;       
        }else{
            console.error(res.data.error);  
            throw new Error("Ocorreu um erro no servidor!");
        }
          
    },

    cleanCart: async () =>{

        const headers = getAuthorizationHeader();

        const res = await api.delete(`/cart/clean`, {headers});

        if(res.status == 200){
            return res.data;
        }
    },

    cartItemPlus: async (id) =>{

        const headers = getAuthorizationHeader();

        const res = await api.put(`/cart/plus/${id}`, {headers});

        if(!res.data.error){
            return res.data;       
        }else{
            console.error(res.data.error);  
            //throw new Error("Ocorreu um erro no servidor!");
        }

    },

    cartItemMinus: async (id) =>{

        const headers = getAuthorizationHeader();

        const res = await api.put(`/cart/minus/${id}`, {headers});

        if(!res.data.error){
            return res.data;       
        }else{
            console.error(res.data.error);  
            //throw new Error("Ocorreu um erro no servidor!");
        }

    },

    removeCartItem: async (id) =>{

        const headers = getAuthorizationHeader();

        const res = await api.delete(`/cart/delete/${id}`, {headers});

        if(!res.data.error){
            return res.data;       
        }else{
            console.error(res.data.error);  
           // throw new Error("Ocorreu um erro no servidor!");
        }
    },
    */
    
    
}
