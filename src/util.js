export const isLogged = () =>{
    return localStorage.getItem('token') ? true : false;
}

export const formatError = (errorMessage) => {

    if(Array.isArray(errorMessage)){

        let formatedText = "";
        for(let line of errorMessage){
            formatedText += line + "<br/>";
        }
        return formatedText;

    }else if(typeof errorMessage === "object"){


        let formatedText = "";
        for(let prop in errorMessage){
            formatedText += `<strong>${prop}:</strong> ${errorMessage[prop]} <br/>`;
        }
        return formatedText;
    }else{
        return errorMessage;
    }
}; 


export const formatNumberToReal = (number) =>{
    return number?.toLocaleString("pt-BR", { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' });
}

export const resetPageScroll = () =>{
    document.getElementById("bodyPage").scrollTo(0,0);
}

export const isObjectEmpty = (obj) =>{
    for(let prop in obj){
        return false;
    }
    return true;
}

export const loadPagSeguroLib = () =>{
    
    let LIB_URL;
   
    if(process.env.REACT_APP_ENVIRONMENT == "DEVELOPMENT"){        
        LIB_URL = process.env.REACT_APP_PAGSEGURO_SANDBOX_URL;
    }else{
        LIB_URL = process.env.REACT_APP_PAGSEGURO_URL; 
    }

    const pagSeguroLib = document.createElement('script');
    pagSeguroLib.type = 'text/javascript';
    pagSeguroLib.src = LIB_URL;


    document.body.append(pagSeguroLib);

}
