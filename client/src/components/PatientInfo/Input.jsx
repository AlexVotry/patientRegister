import React from 'react';
import './PatientInfo.css';

export default function Input ({handleChange, label, id}) {
    return (
        <>
            <label className="input-box">
                {label}:
                <input type="text" id={id} onChange={handleChange} />
            </label>
        </>
    )
}