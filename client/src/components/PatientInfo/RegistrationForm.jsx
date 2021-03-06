import React, { useState } from 'react';
import Input from './Input';
import UploadImage from './UploadImage';
import apiAgents from '../../service/apiAgent';
import initUser from '../../service/UserInit';
import UserContext from '../../contexts/UserContext';

export default function RegistrationForm() {
    const [patient, setPatient] = useState(initUser);
    const [, setUser] = UserContext.useUser();
    const handleChange = (e) => {
        const key = e.target.id;
        const val = e.target.value;
        setPatient(prevState => ({ ...prevState, [key]: val.toString() }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (patient.imageId) {
            try {
                apiAgents.Users.add(patient);
            } catch (e) {
                console.log('new patient error:', e);
            }
            setUser(patient);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input label="First Name" id="firstName" handleChange={handleChange} />
            <Input label="Last Name" id="lastName" handleChange={handleChange} />
            <Input label="Date of Birth" type="date" id="birthDate" handleChange={handleChange} />
            <small>Format: 123-456-7890</small>
            <Input label="Phone Number" type="tel" id="phone" handleChange={handleChange} />
            <Input label="email" type="email" id="email" handleChange={handleChange} />
            <Input label="Street Address" id="streetAddress" handleChange={handleChange} />
            <Input label="City" id="city" handleChange={handleChange} />
            <Input label="State" id="state" handleChange={handleChange} />
            <Input label="Zip code" id="zip" handleChange={handleChange} />
            <Input label="Password" id="password" handleChange={handleChange} />
            <div className="button-row">
                <UploadImage setPatient={setPatient} />
                <button type="submit" className="submit-button">Submit</button>
            </div>
        </form>
    )
}