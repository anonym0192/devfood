const product_list = {"total":4,"page":1,"pages":1,"products":[{"id":1,"id_cat":1,"name":"Torta de Chocolate","image":"https://api.b7web.com.br/devsfood/media/products/tortachocolate.jpg","price":93,"ingredients":"algo, outro, tipo","points":1},{"id":3,"id_cat":2,"name":"Donut de Flocos","image":"https://api.b7web.com.br/devsfood/media/products/donutflocos.jpg","price":0.8,"ingredients":"sal, frango","points":1},{"id":2,"id_cat":1,"name":"Torta de Morango","image":"https://api.b7web.com.br/devsfood/media/products/tortamorango.jpg","price":128.12,"ingredients":null,"points":0},{"id":4,"id_cat":2,"name":"Donut de Chocolate","image":"https://api.b7web.com.br/devsfood/media/products/donutchocolate.jpg","price":1.5,"ingredients":"sal, frango","points":0}]};

const categories = {"error":"","categories":[{"id":1,"name":"Tortas","image":"https://api.b7web.com.br/devsfood/media/categories/pie.png"},{"id":2,"name":"Donuts","image":"https://api.b7web.com.br/devsfood/media/categories/donut.png"},{"id":3,"name":"Cookies","image":"https://api.b7web.com.br/devsfood/media/categories/cookies.png"}]};

const orders ={"error": "", "orders": [{
    "id": 1,
    "total": "260.00",
    "user_id": 1,
    "created_at": "2021-06-10T15:59:45.000000Z",
    "updated_at": "2021-06-10T15:59:45.000000Z",
    "products": [
        {
            "id": 1,
            "name": "Camisa Teste",
            "description": "Uma camisa qualquer",
            "price": "15.00",
            "category_id": 1,
            "created_at": "2021-02-10T00:00:00.000000Z",
            "updated_at": null
        },
        {
            "id": 2,
            "name": "Validator test",
            "description": "Lorem ipsum dollor",
            "price": "35.00",
            "category_id": 1,
            "created_at": "2021-05-04T00:00:00.000000Z",
            "updated_at": "2021-06-09T06:20:41.000000Z"
        }
    ]
},
{
    "id": 2,
    "total": "0.00",
    "user_id": 1,
    "created_at": "2021-06-10T15:59:55.000000Z",
    "updated_at": "2021-06-10T15:59:55.000000Z",
    "products": []
},
{
    "id": 3,
    "total": "0.00",
    "user_id": 1,
    "created_at": "2021-06-10T15:59:56.000000Z",
    "updated_at": "2021-06-10T15:59:56.000000Z",
    "products": []
},
{
    "id": 4,
    "total": "260.00",
    "user_id": 1,
    "created_at": "2021-06-10T16:01:29.000000Z",
    "updated_at": "2021-06-10T16:01:29.000000Z",
    "products": [
        {
            "id": 1,
            "name": "Camisa Teste",
            "description": "Uma camisa qualquer",
            "price": "15.00",
            "category_id": 1,
            "created_at": "2021-02-10T00:00:00.000000Z",
            "updated_at": null
        },
        {
            "id": 2,
            "name": "Validator test",
            "description": "Lorem ipsum dollor",
            "price": "35.00",
            "category_id": 1,
            "created_at": "2021-05-04T00:00:00.000000Z",
            "updated_at": "2021-06-09T06:20:41.000000Z"
        }
    ]
},
{
    "id": 5,
    "total": "260.00",
    "user_id": 1,
    "created_at": "2021-06-10T16:01:56.000000Z",
    "updated_at": "2021-06-10T16:01:56.000000Z",
    "products": [
        {
            "id": 1,
            "name": "Camisa Teste",
            "description": "Uma camisa qualquer",
            "price": "15.00",
            "category_id": 1,
            "created_at": "2021-02-10T00:00:00.000000Z",
            "updated_at": null
        },
        {
            "id": 2,
            "name": "Validator test",
            "description": "Lorem ipsum dollor",
            "price": "35.00",
            "category_id": 1,
            "created_at": "2021-05-04T00:00:00.000000Z",
            "updated_at": "2021-06-09T06:20:41.000000Z"
        }
    ]
},
{
    "id": 6,
    "total": "135.00",
    "user_id": 1,
    "created_at": "2021-06-10T16:06:40.000000Z",
    "updated_at": "2021-06-10T16:06:40.000000Z",
    "products": [
        {
            "id": 1,
            "name": "Camisa Teste",
            "description": "Uma camisa qualquer",
            "price": "15.00",
            "category_id": 1,
            "created_at": "2021-02-10T00:00:00.000000Z",
            "updated_at": null
        },
        {
            "id": 2,
            "name": "Validator test",
            "description": "Lorem ipsum dollor",
            "price": "35.00",
            "category_id": 1,
            "created_at": "2021-05-04T00:00:00.000000Z",
            "updated_at": "2021-06-09T06:20:41.000000Z"
        }
    ]
},
{
    "id": 7,
    "total": "135.00",
    "user_id": 1,
    "created_at": "2021-06-10T16:08:16.000000Z",
    "updated_at": "2021-06-10T16:08:16.000000Z",
    "products": [
        {
            "id": 1,
            "name": "Camisa Teste",
            "description": "Uma camisa qualquer",
            "price": "15.00",
            "category_id": 1,
            "created_at": "2021-02-10T00:00:00.000000Z",
            "updated_at": null
        },
        {
            "id": 2,
            "name": "Validator test",
            "description": "Lorem ipsum dollor",
            "price": "35.00",
            "category_id": 1,
            "created_at": "2021-05-04T00:00:00.000000Z",
            "updated_at": "2021-06-09T06:20:41.000000Z"
        }
    ]
}]};

export {product_list, categories};