import React, { useState } from 'react';
import styles from './wash.module.scss';
import CustomerVoice from '../../customerVoice/CustomerVoice';
import Image from 'next/image';
import Button from "../../Button/Button"
function Wash({submitService}) {
    const [rows, setRows] = useState([
        { id: 1, type: 'customerVoice', text: '', priority: 'normal' },
    ]);

    const handleUpdateRows = (updatedRows) => {
        setRows(updatedRows);
    };
    

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
            <div className={styles.serviceImage}>
                <div className={styles.beforeService}>Before Service</div>
                <div className={styles.uploadbtn}>
                    <Image
                        src="/assets/wash/plus.png"
                        width={32}
                        height={40}
                        alt='upload'
                    />
                </div>
            </div>
            <div className={styles.technicianAssign}>
                <div className={styles.text}>ASSIGN TECHNICIAN</div>
                <div className={styles.btnWrapper}>
                <Button
                text='Confirm Booking'
                onClick={()=>submitService(rows)}/>
                </div>
            </div>
        </div>
    );
}

export default Wash;
