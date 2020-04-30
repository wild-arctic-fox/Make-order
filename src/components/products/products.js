/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import './products.css';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import {addProduct} from "../../actions/actions";
import {customStyles} from './../modal/customStyle';

Modal.setAppElement('#root');
const products = (props) => {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [select, setSelect] = useState('g');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [nameClasses, setNameClasses] = useState('');
    const [priceClasses, setPriceClasses] = useState('');

    const readAndSendData = () => {
        checkAll(/^[A-Za-z]+$/, setNameClasses, name);
        checkAll(/^\d+$/, setPriceClasses, price);
        if (!nameClasses && !priceClasses && name !== '' && price !== '') {
            const data = {
                product: name, price: price + '.00', count: select
            };
            props.addProduct(data);
            closeModal();
        }
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setName('');
        setNameClasses('');
        setPrice('');
        setPriceClasses('');
        setSelect('');
        setIsOpen(false);
    }

    const checkAll = (pattern, set_some_classes, value) => {
        (!pattern.test(value.trim())) ? set_some_classes('is-invalid') : set_some_classes('');
    };

    const products = props.store.map((product, index) => {
        return (
            <tr key={product.product} className="table-secondary">
                <th scope="row">{index}</th>
                <td>{product.product}</td>
                <td>{product.price + '$ per ' + product.count}</td>
            </tr>
        )
    });

    return (
        <React.Fragment>
            <div className='title'>
                <h5>Products</h5>
            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Cost</th>
                </tr>
                </thead>
                <tbody>
                {products}
                </tbody>
            </table>
            <div className='title'>
                <input type="button" className="btn btn-success" value='Add product' onClick={openModal}/>
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} overlayClassName="Overlay">
                <form>
                    <input type='button' name='close' className="btn btn-outline-secondary close-button"
                           onClick={closeModal} value='X'/>
                    <div className="form-group">
                        <label className="col-form-label" htmlFor="inputDefault">Product name</label>
                        <input name='name' type="text" className={`form-control ${nameClasses}`} value={name}
                               placeholder="input name" onChange={(e) => setName(e.target.value)}
                               onBlur={() => checkAll(/^[A-Za-z]+$/, setNameClasses, name)}/>
                    </div>
                    <div className="form-group">
                        <select name='select' className="custom-select" value={select}
                                onChange={(e) => setSelect(e.target.value)}>
                            <option value="kg">kg</option>
                            <option value="liter">liter</option>
                            <option value="pack">pack</option>
                            <option value="g">g</option>
                            <option value="thing">thing</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Input price</label>
                        <div className="form-group">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                </div>
                                <input type="text" name='price' className={`form-control ${priceClasses}`}
                                       value={price}
                                       onChange={(e) => setPrice(e.target.value)}
                                       onBlur={() => checkAll(/^\d+$/, setPriceClasses, price)}/>
                                <div className="input-group-append">
                                    <span className="input-group-text">.00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <input type="button" className="btn btn-warning" value='Add to store' onClick={readAndSendData}/>
                </form>
            </Modal>
        </React.Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        store: state.products
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: (el) => dispatch(addProduct(el))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(products);