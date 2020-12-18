import React, {Fragment, useContext} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import LiftContext from '../../context/lift/liftContext';

export const Navbar = ({title, icon}) => {
    const authContext = useContext(AuthContext)
    const liftContext = useContext(LiftContext)

    const {isAuthenticated, logout, user} = authContext; 
    const {clearLifts} = liftContext

    const onLogout = () => {
        logout();
        clearLifts();
    };

    const authLinks = (
        <Fragment>
            <li>Welcome, {user && user.name} </li>
            <li>
                <a onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt"></i>
                    Sign-out
                </a>
            </li>
        </Fragment>
    );
    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </Fragment>
    );
    return (
     
        <div className="navbar bg-primary">
            <h1>
                <i className={icon}>
                    
                </i>
                {title}
                <i className={icon}>
                    
                </i>
            </h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
                
            </ul>
        </div>
        
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

Navbar.defaultProps ={
    title: 'LiftIt',
    icon: 'fas fa-dumbbell'
}

export default Navbar;