import React, { useCallback } from 'react';
import Calendar from '../Calendar/Calendar';
// import PatientInfo from '../PatientInfo/PatientInfo';
import RegistrationForm from '../PatientInfo/RegistrationForm';
import UserContext from '../../contexts/UserContext';

export default function Home() {
    const [user] = UserContext.useUser();

    const showCalendar = useCallback(() => {
        if (user.email) {
            return <Calendar user={user} />
        }
        return null;
    }, [user]);

    return (
        <>
            {user.email ? null : <RegistrationForm />}
            {showCalendar()}
        </>
    )
}