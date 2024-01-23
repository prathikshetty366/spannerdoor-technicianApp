import React, { useState, useEffect } from 'react';
import styles from './user.module.scss';
import { ownershipData } from '../../app/SeedingData';
import Button from '../Button/Button';

function User({ submitUser, selectedOwnerData }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [needUser, setNeedUser] = useState(false)
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        pincode: '',
        contact: '',
        location: '',
    });
    const [selectedOwner, setSelectedOwner] = useState({})
    const handleSearch = (event) => {
        setSelectedOwner({})
        const searchTerm = event.target.value;
        if (searchTerm === '') {
            setSearchTerm('');
            setSearchResult([]);
        } else {
            setSearchTerm(searchTerm);

            // Filter ownershipData based on the search term
            const filteredResult = ownershipData.filter((owner) =>
                Object.values(owner).some(
                    (value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            setSearchResult(filteredResult);
        }
    };

    const handleInputChange = (event, field) => {
        // Update the corresponding field in userData state
        setUserData({
            ...userData,
            [field]: event.target.value,
        });
    };


    const handleCreateUserSubmit = () => {
        // Validate that all fields in userData have values
        const areAllFieldsFilled = Object.values(userData).every(value => value.trim() !== '');

        if (areAllFieldsFilled) {
            setNeedUser(false);
            setSelectedOwner(userData);
        } else {
            // Display an error message or take appropriate action for incomplete fields
            alert("Please fill in all fields.");
        }
    };

    const handleEditUserDetails = () => {
        setUserData({ ...selectedOwner })
        setNeedUser(true)
    }
    const handleMoveToNextStep = () => {
        if (needUser) {
            alert("Please save the customer details")
        } else if (!Object.keys(selectedOwner).length) {
            alert("please fill in all the information")
        } else {
            submitUser(selectedOwner)

        }
    }
    useEffect(() => {
        if (Object.keys(selectedOwnerData).length > 0) {
            setUserData(selectedOwnerData);
            setNeedUser(false);
            setSelectedOwner(selectedOwnerData);
        }
    }, [selectedOwnerData]);

    return (
        <div className={styles.userContainer}>
            <div className={styles.userInfo}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <div className={styles.numbering}>1</div>
                        <div className={styles.tagline}>CHECK USER DETAILS HISTORY</div>
                    </div>
                    {!needUser &&
                        <div className={styles.search}>
                            <input
                                placeholder="SEARCH"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                    }
                </div>
                {!needUser && (
                    <div className={styles.ownership}>
                        <div className={Object.keys(selectedOwner).length ? styles.success : searchTerm && searchResult.length > 0 ? styles.success : styles.error}>
                            {Object.keys(selectedOwner).length ? "Your chosen customer" : searchTerm && searchResult.length > 0 ? 'USER FOUND SUCCESSFULLY' : searchTerm ? 'SORRY NO USER FOUND' : ''}
                        </div>
                        <div className={styles.searchWrapper}>
                            {Object.keys(selectedOwner).length > 0 ? (
                                <div className={styles.ownershipDetails} onClick={handleEditUserDetails}>
                                    <h2>{selectedOwner.name}</h2>
                                    <h2>{selectedOwner.contact}</h2>
                                    <h2>{selectedOwner.email}</h2>
                                    <h2>{selectedOwner.location}</h2>
                                </div>
                            ) : (
                                searchResult.map((result, index) => (
                                    <div className={styles.ownershipDetails} key={index} onClick={() => {
                                        setNeedUser(false);
                                        setSelectedOwner(result);
                                    }}>
                                        <h2>{result.name}</h2>
                                        <h2>{result.contact}</h2>
                                        <h2>{result.email}</h2>
                                        <h2>{result.location}</h2>
                                    </div>
                                ))
                            )}
                            <div className={styles.buttonWrapper}>

                                {
                                    !Object.keys(selectedOwner).length &&
                                    (<Button
                                        styles={!searchResult.length ? { marginTop: "30px" } : {}}
                                        text={searchResult.length > 0 ? "ADD ANOTHER" : "CREATE NEW"}
                                        onClick={() => setNeedUser(true)}
                                    />)
                                }
                            </div>
                        </div>

                    </div>
                )}

                {needUser && (
                    <div className={styles.createUserContainer}>
                        <h2>CREATE NEW USER</h2>
                        <form className={styles.userForm}>
                            <div className={styles.formRow}>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={userData.name}
                                    onChange={(e) => handleInputChange(e, 'name')}
                                />
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={userData.email}
                                    onChange={(e) => handleInputChange(e, 'email')}
                                />
                            </div>
                            <div className={styles.formRow}>
                                <input
                                    type="text"
                                    placeholder="Pincode"
                                    value={userData.pincode}
                                    onChange={(e) => handleInputChange(e, 'pincode')}
                                />
                                <input
                                    type="text"
                                    placeholder="Contact"
                                    value={userData.contact}
                                    onChange={(e) => handleInputChange(e, 'contact')}
                                />
                            </div>
                            <div className={styles.formRow}>
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={userData.location}
                                    onChange={(e) => handleInputChange(e, 'location')}
                                />
                            </div>
                            <div className={styles.buttonWrapper}>
                                <Button
                                    text="SAVE"
                                    onClick={handleCreateUserSubmit} />
                            </div>
                        </form>
                    </div>
                )}
            </div>
            <div className={styles.userPreview}>
                <h2>CONFIRM ALL THE ABOVE INFORMATION IS RIGHT ?</h2>
                <div className={styles.buttonWrapper}>

                    {Object.keys(selectedOwner).length ?
                        <Button
                            text="NEXT"
                            onClick={handleMoveToNextStep} />
                        : ""
                    }

                </div>
            </div>
        </div>
    );
}

export default User;
