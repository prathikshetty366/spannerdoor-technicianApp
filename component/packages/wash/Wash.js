import React, { useState } from 'react';
import styles from './wash.module.scss';
import CustomerVoice from '../../customerVoice/CustomerVoice';
import FileUploader from '../../FileUploader/FileUploader';
import Button from "../../Button/Button"
function Wash({ submitService }) {
    const [rows, setRows] = useState([
        { id: 1, type: 'customerVoice', text: '', priority: 'normal' },
    ]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [assignedTechnician,setAssignedTechnician]=useState()

    const handleUpdateRows = (updatedRows) => {
        setRows(updatedRows);
    };

    const handleFilesSelect = (files) => {
        setSelectedFiles(files)
    };

    const handleWashSubmit=()=>{
        const washData={
            rows,
            selectedFiles,
            assignedTechnician
        }
        submitService(washData)
    }

    return (
        <div className={styles.washContainer}>
            <header>WASH</header>
            <div className={styles.washWrapper}>
                <div className={styles.brief}>
                    <div>NORMAL WASH + POLISH</div>
                    <div>200 RS</div>
                </div>
                <div className={styles.customerVoiceWrapper}>
                    <CustomerVoice initialRows={rows} onUpdate={handleUpdateRows} />
                </div>
            </div>
            <FileUploader title="Before Service" label="Upload Images" onFilesSelect={handleFilesSelect} />
            <div className={styles.technicianAssign}>
                <div className={styles.text}>
                    <label>
                    {/* ASSIGN TECHNICIAN */}
                    <input placeholder='Assign  technician'
                    onChange={(e)=>setAssignedTechnician(e.target.value)}/>
                    </label>
                </div>
                <div className={styles.btnWrapper}>
                    <Button
                        text='Confirm Booking'
                        onClick={handleWashSubmit} />
                </div>
            </div>
        </div>
    );
}

export default Wash;
