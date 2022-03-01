import './PatientInfo.css';

export default function UploadImage ({setPatient}) {
    const cloud_name = 'aleximages';
    const upload_preset = 'doneApp_upload';

    const uploadWidget = () => {
        console.log('uploadWidget');
        window.cloudinary.openUploadWidget({ cloud_name, upload_preset, tags: ['uploaded-image'] },
            (error, result) => {
                if (result.event === 'success') {
                    console.log(result.info.public_id, result.info.signature);
                    const imageId = result.info.public_id;
                    setPatient(prevState => ({ ...prevState, imageId }));
                }
            });
    }

    return (
        <>
            <div className="upload">
                <button onClick={uploadWidget} className="submit-button">
                    Add a picture of Yourself
                </button>
            </div>
        </>
    )
}