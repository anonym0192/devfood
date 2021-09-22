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
    localStorage.removeItem('token');
}



const createOrder = async (fData) => {

    const headers = getAuthorizationHeader();
    const res = await api.post('/order', fData, {headers});

    if(res.data){
        return res.data;
    }
}

export default {

    refreshToken: async () => {

        if(!localStorage.getItem('token')) return ;

        const headers = getAuthorizationHeader();

        const res = await api.get('/refresh', {headers});

        if(!res.data.token){
            removeToken();
        }else{
            localStorage.setItem('token', res.data.token);
        } 
        
       
    },

    doLogin: async (formData) => {
       
        const res = await api.post('/login', formData);
       
        if(res.status == 422 || res.status == 401){
            return {error: "Usuário e/ou senha incorretos"};
        }

        if(res.status == 500){
            return {error: "Ocorreu um erro no servidor tente novamente mais tarde"};
        }

        if(res.data.token){
            localStorage.setItem('token', res.data.token);
           
        }

        return res.data;
           
    },

    doLogout: async () => {
       
      
        const headers = getAuthorizationHeader();

        const res = await api.get('/logout', {headers});

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
        const json = res.data;
        
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

        const json = res.data;
        
        return json;

    },

    getAvailableCities: async () => {

        const res = await api.get(`/cities`);
    
        //console.log(res.data)
        return res.data;
    
    },

    getAvailableDistricts: async (city) => {

        const queryString =  city ? `?city=${city}` : '';

        const res = await api.get('/districts' + queryString );
    
        //console.log(res.data)
        return res.data;
    
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

    getUserOrders: async (page) => {

        const headers = getAuthorizationHeader();


        const res = await api.get(`/orders?page=${page}`, {headers});

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


        //Se o usuario nao estiver logado manda pra pagina de login
        if(res.status == 401){
            window.location.href= "/login";
            return;
        }

        //Se ocorreu algum erro a execuçao e parada e a mensagem de erro e salva
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

                window.location.href = `/thankyou/${transactionCode}`;
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
            window.top.location="https://pagseguro.uol.com.br/v2/checkout/payment.html?code=" + code;
            console.log("Redirecionamento")
        }
        
    }, 

   applyCoupon: async (couponCode) => {

    const res = await api.get(`/coupon/${couponCode}`);

    return res.data;


   }

}
