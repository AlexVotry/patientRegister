import React, { useState } from 'react';
import Login from './Login';
import RegistrationForm from '../PatientInfo/RegistrationForm';
import booth from '../../assets/booth.png';
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
            return <Login setShow={setShow} setShowForm={setShowForm} />
        }
        if (showForm === 'register') {
            return <RegistrationForm />
        } else {
            return (
                <div className='welcome'>
                    <h3>Welcome to Dr. Who's Office</h3>
                    <h4>Please sign in or register as a new patient.</h4>
                    <h4>You will then be sent to a calender to choose an appointment time</h4>
                    <h5>Thank you for choosing Dr. Who</h5>
                </div>
            )
        }
    }

    return (
        <div className="container">
            <div className="message-box">
            {showPop()} 
                <div className="button-row">
                    <button className="auth-button" onClick={() => setShowForm('register')}>register</button>
                    <button className="auth-button" onClick={() => setShowForm('login')}>login</button>
                </div>
                {renderForm()}
            </div>
            <img id="booth" src={booth} alt="booth" />
        </div>
    )
}