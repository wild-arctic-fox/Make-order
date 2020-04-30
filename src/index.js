import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Layout from './hoc/layout';
import {createStore} from "redux";
import reducer from "./reducer/reducer";
import {Provider} from "react-redux";

const store = createStore(reducer);

ReactDOM.render(
    <BrowserRouter>
        <Layout>
            <Provider store={store}>
                <App/>
            </Provider>
        </Layout>
    </BrowserRouter>
    , document.getElementById('root')
);