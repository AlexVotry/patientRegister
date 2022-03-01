import React, { useState } from 'react';
import Input from '../PatientInfo/Input';
import apiAgents from '../../service/apiAgent';
import UserContext from '../../contexts/UserContext';
import './Login.css';

export default function Login ({setShow}) {
    const [formInfo, setFormInfo] = useState({email: '', password: ''});
    const [user, setUser] = UserContext.useUser();

    const loadUser = async () => {
        try {
            const thisUser = await apiAgents.Auth.login(formInfo);
            if (thisUser) {
                console.log('thisUser:', thisUser);
                setUser(thisUser);
            } else {
                // TODO: make pop up with Link to new patient.
                console.log('You are not a current patient');
            }
        } catch (error) {
            if (error.response.status === 401) {
                setShow(true);
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
        console.log('user:', user);
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