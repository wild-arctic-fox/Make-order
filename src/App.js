import React from 'react';
import './App.css';
import Products from './components/products';
import Orders from './components/orders';
import Customers from './components/customers';
import {Route, Switch} from 'react-router-dom';

function App() {
    return (
        <React.Fragment className="App">
            <Switch>
                <Route exact  path='/' component={Orders}/>
                <Route path='/products' component={Products}/>
                <Route path='/customers' component={Customers}/>
            </Switch>
        </React.Fragment>
    );
}

export default App;
