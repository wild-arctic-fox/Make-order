const init_state = {
    products: [{product: 'Vine', price: '20.00', count: 'liter'}, {product: 'Banana', price: '30.00', count: 'kg'},
        {product: 'Eggplant', price: '80.00', count: 'kg'}, {product: 'Milk', price: '59.00', count: 'liter'},
        {product: "Trout", price: '29.00', count: 't'}, {product: 'AppleJuice', price: '90.00', count: 'liter'},
        {product: 'Apple', price: '90.00', count: 'kg'}, {product: 'Apple pie', price: '190.00', count: 'kg'},
        {product: 'Lemon', price: '90.00', count: 'kg'}, {product: 'Egg', price: '80.00', count: 'kg'},
        {product: 'Condensed Milk', price: '59.00', count: 'liter'}, {product: "Salmon", price: '29.00', count: 't'},
        {product: 'Bri', price: '90.00', count: 'liter'}, {product: 'Fig', price: '90.00', count: 'kg'},
        {product: 'Brussel sprout', price: '190.00', count: 'kg'}, {product: 'Cilantro', price: '900.00', count: 'kg'}],
    customers: [{
        first: 'Alyona',
        last: 'Wain',
        phone: '066 666 66 66'
    }, {
        first: 'Alex',
        last: 'Janno',
        phone: '099 666 66 88'
    }, {
        first: 'Villanell',
        last: 'Janison',
        phone: '066 666 66 77'
    }],
    orders: [{
        date:new Date(Date.now()).toDateString(),
        customer:{
            first:'Alyona',
            last:'Wain',
            phone:'066 666 66 66'
        },
        products: [{product: 'Vine',count:4},{product: 'Sleeping pills',count:45}],
        total_price: '89.99'
    }]
};

const reducer = (store = init_state, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT': {
            const tmp = {...store};
            tmp.products.push(action.value);
            return tmp;
        }
        case 'ADD_CUSTOMER': {
            console.log(store);
            const tmp = {...store};
            tmp.customers.push(action.value);
            return tmp;
        }
        case 'ADD_ORDER': {
            const tmp = {...store};
            tmp.orders.push(action.value);
            return tmp;
        }
        default:
            return store;
    }
};

export default reducer;