import React from "react";
import Toolbar from '../../components/toolbar';
import './layout.css';

const layout = (props) =>{
    return (
        <React.Fragment>
            <Toolbar/>
            <main className='content'>
                {props.children}
            </main>
        </React.Fragment>
    )
};

export default layout;