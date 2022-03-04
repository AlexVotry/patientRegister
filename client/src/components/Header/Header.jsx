import React from 'react';
import { Link } from 'react-router-dom';
import { doneLogo } from '../../assets/url';
import UserContext from '../../contexts/UserContext';
import './Header.css';

export default function Header({auth}) {
    const [user] = UserContext.useUser();

    const renderContent = () => {
        return (
            <div className="header-links">
                <Link to={'/'}>Make an Appointment</Link>
                {user.admin ? (
                <Link to={'/AllPatients'}>See Patient list</Link>
                ) : null }
                <a href="/api/logout">Logout</a>
            </div>
        );
    }

    return (
        <nav className="navbar" data-test="header-component">
            <Link to={"/"} className="navbar-brand" ><img src={doneLogo} alt="logo" /></Link>
            {renderContent()}
        </nav>
    );
}