import React, { useState, useEffect } from 'react';
import styles from './user.module.scss';
import Button from '../Button/Button';
import { useDispatch, useSelector } from "react-redux";
import * as UserActions from "@/app/store/actions"
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

function User({ submitUser, selectedOwnerData }) {
    const dispatch = useDispatch()
    const User = useSelector((state) => state.User)
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [needUser, setNeedUser] = useState(false)
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        pincode: '',
        PhoneNumber: '',
        licence: '',
        gst: '',
        address: ''

    });
    const [selectedOwner, setSelectedOwner] = useState({})
    const [editUser, setEditUser] = useState(false)
    const handleSearch = (event) => {

        setSelectedOwner({})
        const searchTerm = event.target.value;
        if (searchTerm === '') {
            setSearchTerm('');
            setSearchResult([]);
        } else {
            setSearchTerm(searchTerm);
            dispatch(UserActions.fetchCustomerDetails(searchTerm))
        }
    };
    useEffect(() => {
        if (User && User.getCustomerSuccess) {
            setSearchResult(User.customerDetails);
            dispatch(UserActions.fetchCustomerDetailsInit())
        }
        if (User.updateCustomersuccess) {
            setSelectedOwner(User.updatedCustomerDetails)
            setNeedUser(false)
            toast.success("successfully updated customer details")
            dispatch(UserActions.updateCustomerInit())
            setEditUser(false)
        }
        if (User.updateCustomerFailure && User.error.userExist) {
            toast.error(User.error.error)
            dispatch(UserActions.updateCustomerInit())
            setEditUser(false)
        }
        if (User && User.createUserSuccess) {
            toast.success("Successfully created new user.")
            setSelectedOwner(User.newUser)
            setNeedUser(false)
            dispatch(UserActions.createUserInit());
        }
        if (User && User.createUserFailure) {
            toast.error(User.error.error)
            // setNeedUser(false)
            dispatch(UserActions.createUserInit());
        }
    }, [User])
    console.log(selectedOwner)
    const handleInputChange = (event, field) => {
        // Update the corresponding field in userData state
        setUserData({
            ...userData,
            [field]: event.target.value,
        });
    };


    const handleCreateUserSubmit = () => {
        // Validate that all fields in userData have values
        const payload = {
            customerData: {
                name: userData.name,
                email: userData.email,
                pincode: userData.pincode,
                phoneNumber: userData.phoneNumber,
                licence: userData.licence,
                gst: userData.gst,
                address: userData.address,
                notifications: "SMS, Email"
            }
        }
        dispatch(UserActions.createUser(payload))
    };

    const handleEditUserSubmit = () => {
        // setSelectedOwner(userData)
        // setNeedUser(false)
        const payload = {
            customerId: userData.id,
            userDetails: {
                name: userData.name,
                email: userData.email,
                pincode: userData.pincode,
                phoneNumber: userData.phoneNumber,
                licence: userData.licence,
                gst: userData.gst,
                address: userData.address
            }
        }
        dispatch(UserActions.updateCustomer(payload))
    }

    const handleEditUserDetails = () => {
        setEditUser(true)
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
                                    <h2>{selectedOwner.phoneNumber}</h2>
                                    <h2>{selectedOwner.email}</h2>
                                    <h2>{selectedOwner.pincode}</h2>
                                </div>
                            ) : (
                                    // <div>hello
                                    // </div>
                                    searchResult && searchResult?.map((result, index) => (
                                        <div className={styles.ownershipDetails} key={index} onClick={() => {
                                            setNeedUser(false);
                                            setSelectedOwner(result);
                                        }}>
                                            <h2>{result.name}</h2>
                                            <h2>{result.phoneNumber}</h2>
                                            <h2>{result.email}</h2>
                                            <h2>{result.pincode}</h2>
                                        </div>
                                    ))
                            )}
                            <div className={styles.buttonWrapper}>

                                {
                                    !Object.keys(selectedOwner).length &&
                                    (<Button
                                        styles={!searchResult.length ? { marginTop: "30px" } : {}}
                                        text={searchResult?.length > 0 ? "ADD ANOTHER" : "CREATE NEW"}
                                        onClick={() => { setNeedUser(true); setUserData({}) }}
                                    />)
                                }
                            </div>
                        </div>

                    </div>
                )}

                {needUser && (
                    <div className={styles.createUserContainer}>
                        <h2>{editUser ? "Edit User" : "CREATE NEW USER"}</h2>
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
                                    placeholder="PhoneNumber"
                                    value={userData.phoneNumber}
                                    onChange={(e) => handleInputChange(e, 'phoneNumber')}
                                    type="number"
                                    maxLength={10}

                                />
                            </div>
                            <div className={styles.formRow}>
                                <input
                                    type="text"
                                    placeholder="licence"
                                    value={userData.licence}
                                    onChange={(e) => handleInputChange(e, 'licence')}
                                />
                                <input
                                    type="text"
                                    placeholder="gst"
                                    value={userData.gst}
                                    onChange={(e) => handleInputChange(e, 'gst')}
                                />

                            </div>
                            <div className={styles.formRow}>
                                <input
                                    type="text"
                                    placeholder="address"
                                    value={userData.address}
                                    onChange={(e) => handleInputChange(e, 'address')}
                                />
                            </div>
                            <div className={styles.buttonWrapper}>
                                <Button
                                    text="SAVE"
                                    onClick={editUser ? handleEditUserSubmit : handleCreateUserSubmit} />
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
            <ToastContainer />
        </div>
    );
}

export default User;
