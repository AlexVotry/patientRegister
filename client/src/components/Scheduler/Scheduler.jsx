import React, { useCallback } from 'react';
import Calendar from '../Calendar/Calendar';
import PatientInfo from '../PatientInfo/PatientInfo';
import UserContext from '../../contexts/UserContext';

export default function Scheduler() {
    const [user] = UserContext.useUser();

    const showCalendar = useCallback(() => {
        if (user.email) {
            return <Calendar user={user} />
        }
        return null;
    }, [user]);

    return (
        <>
            {user.email ? null : <PatientInfo />}
            {showCalendar()}
        </>
    )
}