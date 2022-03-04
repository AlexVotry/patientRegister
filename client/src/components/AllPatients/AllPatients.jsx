import React, { useEffect, useState, useCallback, useRef } from 'react';
import apiAgents from '../../service/apiAgent';
import Calendar from '../Calendar/Calendar';
import PatientInfo from '../PatientInfo/PatientInfo';
import UserContext from '../../contexts/UserContext';
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
                <PatientInfo patient={patient} />
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
                   {chosen[email] ? renderRestOfData(patient) : null}
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