import React, { useState } from 'react';
import Login from './Login';
import PatientInfo from '../PatientInfo/PatientInfo';
import './Login.css';

export default function Auth() {
    const [show, setShow] = useState(false);
    const [showForm, setShowForm] = useState('');

    const showPop = () => {
        if (!show) return null;
        return <div>You are not registered yet.</div>
    }

    const renderForm = () => {
        if (showForm === 'login') {
            return <Login setShow={setShow} />
        }
        if (showForm === 'register') {
            return <PatientInfo />
        }
        return null;
    }

    return (
        <div className="container">
            {showPop()}
            <div className="message-box">
                <div className="button-row">
                    <button className="auth-button" onClick={() => setShowForm('register')}>register</button>
                    <button className="auth-button" onClick={() => setShowForm('login')}>login</button>
                </div>
                {renderForm()}
            </div>
        </div>
    )
}