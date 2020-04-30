/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import './customers.css';
import {addCustomer} from "../../actions/actions";
import {customStyles} from "../modal/customStyle";

Modal.setAppElement('#root');

const customers = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [firstNameClasses, setFirstNameClasses] = useState('');
    const [lastNameClasses, setLastNameClasses] = useState('');
    const [phoneClasses, setPhoneClasses] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);

    const readAndSendData = () => {
        checkAll(/^[A-Za-z]+$/, setLastNameClasses, lastName);
        checkAll(/^[A-Za-z]+$/, setFirstNameClasses, firstName);
        checkAll(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/, setPhoneClasses, phone);
        if (!firstNameClasses && !lastNameClasses && !phoneClasses &&
            firstName !== '' && lastName !== '' && phone !== '') {
            const data = {
                first: firstName,
                last: lastName,
                phone: phone
            };
            props.addCustomer(data);
            closeModal();
        }
    };

    const checkAll = (pattern, set_some_classes, value) => {
        (!pattern.test(value.trim())) ? set_some_classes('is-invalid') : set_some_classes('');
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setFirstName('');
        setFirstNameClasses('');
        setPhone('');
        setPhoneClasses('');
        setLastName('');
        setLastNameClasses('');
        setIsOpen(false);
    }

    const customers = props.store.map((customer, index) => {
        return (
            <tr key={customer.phone} className="table-secondary">
                <th scope="row">{index}</th>
                <td>{customer.first}</td>
                <td>{customer.last}</td>
                <td>{customer.phone}</td>
            </tr>
        )
    });
    return (
        <React.Fragment>
            <div className='title'>
                <h5>Customers</h5>
            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Phone number</th>
                </tr>
                </thead>
                <tbody>
                {customers}
                </tbody>
            </table>
            <div className='title'>
                <input type="button" className="btn btn-info" onClick={openModal} value='Add customer'/>
            </div>
            <div>
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} overlayClassName="Overlay">
                    <input type='button' name='close' className="btn btn-outline-secondary  close-button"
                           onClick={closeModal} value='X'/>
                    <form>
                        <div className="form-group">
                            <label className="col-form-label" htmlFor="inputDefault">First name</label>
                            <input name='first_name' type="text" className={`form-control ${firstNameClasses}`}
                                   placeholder="input first name"
                                   onChange={(e) => setFirstName(e.target.value)}
                                   value={firstName}
                                   onBlur={() => checkAll(/^[A-Za-z]+$/, setFirstNameClasses, firstName)}/>
                        </div>
                        <div className="form-group">
                            <label className="col-form-label" htmlFor="inputDefault">Last name</label>
                            <input name='last_name' type="text" className={`form-control ${lastNameClasses}`}
                                   placeholder="input last name"
                                   onChange={(e) => setLastName(e.target.value)}
                                   value={lastName}
                                   onBlur={() => checkAll(/^[A-Za-z]+$/, setLastNameClasses, lastName)}/>
                        </div>
                        <div className="form-group">
                            <label className="col-form-label" htmlFor="inputDefault">Phone number</label>
                            <input name='phone' type="text" className={`form-control ${phoneClasses}`}
                                   placeholder="phone number"
                                   onChange={(e) => setPhone(e.target.value)}
                                   value={phone}
                                   onBlur={() => checkAll(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/, setPhoneClasses, phone)}/>
                        </div>
                        <input type="button" className="btn btn-warning" value='Add to store'
                               onClick={readAndSendData}/>
                    </form>
                </Modal>
            </div>
        </React.Fragment>
    )
};
const mapStateToProps = (state) => {
    return {
        store: state.customers
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addCustomer: (el) => dispatch(addCustomer(el))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(customers);