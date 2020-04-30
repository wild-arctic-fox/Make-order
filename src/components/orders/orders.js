/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import './orders.css';
import {connect} from "react-redux";
import Modal from 'react-modal';
import {customStyles} from './../modal/customStyle';
import {addOrder} from "../../actions/actions";

Modal.setAppElement('#root');
const orders = (props) => {
    let pr;
    const [inputDis, setInputDis] = useState(false);
    const [dis, setDis] = useState(true);
    const [productClasses, setProductClasses] = useState('');
    const [customerClasses, setCustomerClasses] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);
    const [suggCust, setSuggCust] = useState([]);
    const [currentQuantity, setCurrentQuantity] = useState('');
    const [quantityClasses, setQuantityClasses] = useState('');
    const [customer, setCustomer] = useState({});
    const [product, setProduct] = useState({});
    const [products] = useState(props.store_p);
    const [currentCustomer, setCurrentCustomer] = useState('');
    const [suggProd, setSuggProd] = useState([]);
    const [currentProduct, setCurrentProduct] = useState('');
    const [customers] = useState(props.store_c);
    const [price, setPrice] = useState(0);
    const [yourChoice, setYourChoice] = useState([]);

    const setClasses = (who, set_classes) => {
        (who.length > 0) ? set_classes('') : set_classes('is-invalid');
    };
    const moreClick = () => {
        if (currentQuantity > 0 && product.length > 0 && customer.length > 0) {
            setInputDis(true);
            const myProduct = {
                product: currentProduct,
                count: currentQuantity
            };
            let total_price = +currentQuantity * +product[0].price;
            total_price += price;
            const data = [...yourChoice];
            data.push(myProduct);
            setPrice(total_price);
            setYourChoice(data);
            setCurrentProduct('');
            setCurrentQuantity('');
            setProduct({});
            setDis(false);
        } else {
            setClasses(customer, setCustomerClasses);
            setClasses(product, setProductClasses);
            checkAll(/^\d+$/, setQuantityClasses, currentQuantity);
        }
    };
    const suggest = (e, who, func, set_current_x, set_suggestions_x) => {
        const value = e.target.value.trim();
        let suggestions = [];
        if (value.length > 0) {
            const tmp = who.map(func);
            const regex = new RegExp(`${value}`, 'i');
            suggestions = tmp.filter(value1 => regex.test(value1))
        }
        set_suggestions_x(suggestions);
        set_current_x(value);
    };
    const suggest_now = (suggestions, who, set_who, set_current_who, set_suggestions, set_classes, field, f = false) => {
        return (suggestions.length === 0) ? null :
            (<ul className='suggest-ul'>
                {suggestions.map(value => <li
                    onClick={() => selectSuggestion(value, who, set_who, set_current_who, set_suggestions, set_classes, field, f)}>{value}</li>)}
            </ul>);
    };
    const selectSuggestion = (e, who, set_who, set_current_who, set_suggestions, set_classes, field, f = false) => {
        let current_tX = (f) ? e.split(' ')[0] : e;
        const isP = who.filter(c => c[field].toLowerCase() === current_tX.toLowerCase());
        set_who(isP);
        set_current_who(e);
        set_suggestions([]);
        set_classes('')
    };
    const sendData = () => {
        const data = {
            date: new Date(Date.now()).toDateString(),
            customer: customer[0],
            products: yourChoice,
            total_price: price.toFixed(2)
        };
        props.addOrder(data);
        closeModal();
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setInputDis(false);
        setDis(true);
        setProductClasses("");
        setCustomerClasses('');
        setSuggCust([]);
        setPrice(0);
        setCurrentQuantity('');
        setQuantityClasses('');
        setCustomer({});
        setProduct({});
        setCurrentCustomer('');
        setSuggProd([]);
        setCurrentProduct('');
        setYourChoice([]);
        setIsOpen(false);
    }

    const checkAll = (pattern, set_some_classes, value) => {
        (!pattern.test(value.trim())) ? set_some_classes('is-invalid') : set_some_classes('');
    };
    const orderss = props.store.map((order, index) => {
        return (
            <tr key={index} className="table-secondary">
                <th scope="row">{index}</th>
                <td>{order.date}</td>
                <td>{order.customer.first + ' ' + order.customer.last}</td>
                <td>
                    <table className='prod-list'>
                        {
                            order.products.map((p) => {
                                return (
                                    <tr>
                                        <td>{p.product}</td>
                                        <td>{p.count}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </td>
                <td>{order.total_price + '$'}</td>
            </tr>
        )
    });
    pr = yourChoice.map(e => {
        return (
            <div>
                <span>{e.product + ' - ' + e.count}</span>
            </div>
        )
    });
    return (
        <React.Fragment>
            <div className='title'>
                <h5>Orders</h5>
            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Products</th>
                    <th scope="col">Total cost</th>
                </tr>
                </thead>
                <tbody>
                {orderss}
                </tbody>
            </table>
            <div className='title'>
                <input type="button" className="btn btn-danger" value='Add to store' onClick={openModal}/>
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} overlayClassName="Overlay">
                <form>
                    <input type='button' name='close' className="btn btn-outline-secondary close-button"
                           onClick={closeModal} value='X'/>
                    <div className="form-group">
                        <label className='col-form-label' htmlFor="inputDefault">Input last name:</label>
                        <input name='client' disabled={inputDis} className={`form-control ${customerClasses}`}
                               type="text"
                               placeholder="Search" onBlur={() => setClasses(customer, setCustomerClasses)}
                               value={currentCustomer}
                               onChange={(event => suggest(event, customers, (el => `${el.last}  ${el.first}`), setCurrentCustomer, setSuggCust))}/>
                        {suggest_now(suggCust, customers, setCustomer, setCurrentCustomer, setSuggCust, setCustomerClasses, 'last', true)}
                    </div>
                    <div className="form-group" id='parent'>
                        <label className="col-form-label" htmlFor="inputDefault">Input product</label>
                        <input name='product' className={`form-control ${productClasses}`} type="text"
                               value={currentProduct}
                               placeholder="Search" onBlur={() => setClasses(product, setProductClasses)}
                               onChange={(event => suggest(event, products, (el => `${el.product}`), setCurrentProduct, setSuggProd))}/>
                        {suggest_now(suggProd, products, setProduct, setCurrentProduct, setSuggProd, setProductClasses, 'product')}
                        <label className="col-form-label" htmlFor="inputDefault">Input quantity</label>
                        <input name='count' className={`form-control ${quantityClasses}`} type="text"
                               placeholder="Input quantity" value={currentQuantity}
                               onBlur={() => checkAll(/^\d+$/, setQuantityClasses, currentQuantity)}
                               onChange={(e) => setCurrentQuantity(e.target.value)}/>
                        <br/>
                        <input className="btn  btn-primary" type="button" value='More' onClick={moreClick}/>
                    </div>
                    {pr}
                    <div>Total price : {price}$</div>
                    <br/>
                    <input name='send' disabled={dis} className="btn btn-success" type="button" value='Add order'
                           onClick={sendData}/>
                </form>
            </Modal>
        </React.Fragment>
    )
};
const mapStateToProps = (state) => {
    return {
        store: state.orders,
        store_c: state.customers,
        store_p: state.products
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addOrder: (el) => dispatch(addOrder(el))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(orders);