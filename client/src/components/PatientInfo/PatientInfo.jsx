import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

export default function PatientInfo ({patient}) {
    const { email, birthDate } = patient;
    const dob = new Date(birthDate);
    const birth = birthDate ? dob.toDateString().split(' ').slice(1).join(' ') : null;
    
        return (
            <>
                <h2>{patient.firstName} {patient.lastName}</h2>
                <div>birth: <span className="bolden">{birth}</span></div>
                <div>phone: <span className="bolden">{patient.phone}</span></div>
                <p>email: <span className="bolden">{email}</span></p>
                <div className="address-box">
                    <p>address:</p>
                    <div className="address-data">
                        <div className="bolden" >{patient.streetAddress}</div>
                        <div className="address-line2" >
                            <p className="bolden">{patient.city}</p>
                            <p className="bolden">{patient.state}, </p>
                            <p className="bolden">{patient.zip}</p>
                        </div>
                    </div>
                </div>
                <Image cloudName="aleximages" publicId={patient.imageId} style={{ marginRight: '10px', borderRadius: '10px' }}>
                    <Transformation crop="pad" width="100" height="100" />
                </Image>
            </>
        )
}