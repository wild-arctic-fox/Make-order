import React from "react";
import {Link} from "react-router-dom";

const toolbar = (props) => {
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to={'/'} className="navbar-brand">OrderMe</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02"
                        aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={'/products'} className="nav-link">
                                Products
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/customers'} className="nav-link">
                                Customers
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/'} className="nav-link">
                                Orders
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </React.Fragment>
    )
};

export default toolbar;