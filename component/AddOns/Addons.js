import React, { useEffect, useState } from 'react';
import styles from './Addons.module.scss';
import { addOns } from '../../app/SeedingData';

function AddOns({ submitAddons }) {
    const [selectedAddOns, setSelectedAddOns] = useState([]);

    const handleAdd = (addOn) => {
        setSelectedAddOns((prevSelectedAddOns) => [...prevSelectedAddOns, addOn]);
    };

    const handleRemove = (addOn) => {
        setSelectedAddOns((prevSelectedAddOns) =>
            prevSelectedAddOns.filter((selectedAddOn) => selectedAddOn !== addOn)
        );
    };
    useEffect(() => {
        submitAddons(selectedAddOns)

    }, [selectedAddOns])

    return (
        <div className={styles.AddOnsContainer}>
            <h2>Addons</h2>
            {addOns &&
                addOns.map((addOn) => {
                    const isSelected = selectedAddOns.includes(addOn);

                    return (
                        <div key={addOn.id} className={styles.addonItem}>
                            <div className={styles.title}>{addOn.name}</div>
                            <div
                                className={`${styles.btn} ${isSelected ? styles.selected : ''}`}
                                onClick={() =>
                                    isSelected ? handleRemove(addOn) : handleAdd(addOn)
                                }
                            >
                                {isSelected ? 'Added' : 'Add'}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

export default AddOns;
