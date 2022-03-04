import React, { useState } from 'react';
import Input from '../PatientInfo/Input';
import apiAgents from '../../service/apiAgent';
import UserContext from '../../contexts/UserContext';
import './Login.css';

export default function Login ({setShow, setShowForm}) {
    const [formInfo, setFormInfo] = useState({email: '', password: ''});
    const [, setUser] = UserContext.useUser();

    const loadUser = async () => {
        try {
            const thisUser = await apiAgents.Auth.login(formInfo);
            setUser(thisUser);
        } catch (error) {
            if (error.response.status === 401) {
                setShow(true);
                setShowForm('register');
            }
            console.log('no user on login:', error);
        }
    }

    const handleChange = (e) => {
        const key = e.target.id;
        const val = e.target.value;
        setFormInfo(prevState => ({ ...prevState, [key]: val }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loadUser();
    };

    return (
        <div>
            <form className="login-form">
                <Input label="email" id="email" handleChange={handleChange} />
                <Input label="password" id="password" handleChange={handleChange} />
                <button type="button" onClick={handleSubmit}className="submit-button">Submit</button>
            </form>
        </div>
    )
}