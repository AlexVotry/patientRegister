import React from 'react';
import './PatientInfo.css';

export default function Input ({handleChange, label, id, type}) {
    const inputType = type || 'text';
    const phonePattern = '[0-9]{3}-[0-9]{3}-[0-9]{4}'
    return (
        <>
            <label className="input-box">
                {label}:
                { type === 'tel' ? 
                    <input type={inputType} id={id} pattern = {phonePattern} onChange={handleChange} required /> :
                    <input type={inputType} id={id} onChange={handleChange} required/>
                }
            </label>
        </>
    )
}