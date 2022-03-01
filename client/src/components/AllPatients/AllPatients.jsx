import React, { useEffect, useState, useCallback, useRef } from 'react';
import apiAgents from '../../service/apiAgent';
import Calendar from '../Calendar/Calendar';
import UserContext from '../../contexts/UserContext';
import { Image, Transformation } from 'cloudinary-react';
import './AllPatients.css';

export default function AllPatients() {
    const [allPatients, setAllPatients] = useState([]);
    const [user] = UserContext.useUser();
    const [chosen, setChosen] = useState({});
    const [show, setShow] = useState(false);
    const mountedRef = useRef(true);

    const loadPatients = useCallback(async () => {
        if (!mountedRef.current) return null;
        try {
            const list = await apiAgents.Users.list();
            setAllPatients(list);
        } catch (e) {
            console.log('loadPatients:', e);
        }
    }, []);
    
    useEffect(() => {
        loadPatients();
        return () => {
            mountedRef.current = false
        }
    },[allPatients, loadPatients])

    const renderRestOfData = (patient) => {
        const { email } = patient;
        if (chosen[email] && !show)
        return (
            <div className="patient-popup">
                <button className="close-button" type="button" onClick={() => setChosen({[email]: false})}>X</button>
                <h2>{patient.firstName} {patient.lastName}</h2>
                <div>phone: <span className="bolden">{patient.phone}</span></div>
                <p>email: <span className="bolden">{email}</span></p>
                <div className="address">
                    <p>address:</p>
                    <div className="address-data">
                        <div className="bolden" >{patient.streetAddress}</div>
                        <div className ="address-line2" >
                            <p className="bolden">{patient.city}</p>
                            <p className="bolden">{patient.state}, </p>
                            <p className="bolden">{patient.zip}</p>
                        </div>
                    </div>
                </div>
                <Image cloudName="aleximages" publicId={patient.imageId} style={{ marginRight: '10px', borderRadius: '10px' }}>
                    <Transformation crop="pad" width="100" height="100"  />
                </Image>
            </div>
        )
    }

    const chooseWisely = useCallback ((email) => {
        chosen[email] ? setChosen({[email]: false}) : setChosen({ [email]: true });
    }, [chosen]);
    
    const showAllPatients = () => {
        if (!allPatients.length || show) return null;
        return allPatients.map((patient) => {
            const { email, firstName, lastName } = patient;
            return (
                <div key={email} className="each-patient">
                    <button className="patient-name" type="button" onClick={() => chooseWisely(email)}>
                        <h2 >{firstName} {lastName}</h2>
                    </button>
                   {renderRestOfData(patient)}
                </div>
            )
        });
    }
    const showCalendar = () => {
        if (!show) return null;
        return <Calendar user={user} />;
    }

    return (
        <div className="all-patients">
            <button type="button" className="submit-button" onClick={() => setShow(!show)}>Show Schedule</button>
            {showCalendar()}
            {showAllPatients()}
        </div>
    )
}