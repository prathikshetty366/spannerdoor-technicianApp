import React, { useState ,useEffect} from 'react';
import styles from './Vehicle.module.scss';
import { vehicleDummyData } from '../../app/SeedingData';
import Button from '../Button/Button';

function Vehicle({ submitVehicle,selectedVehicleData }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [needVehicle, setneedVehicle] = useState(false)
    const [vehicleData, setvehicleData] = useState({
        registration: '',
        year: '',
        make: '',
        model: '',
    });
    const [selectedVehicle, setselectedVehicle] = useState({})
    const handleSearch = (event) => {
        setselectedVehicle({})
        const searchTerm = event.target.value;
        if (searchTerm === '') {
            setSearchTerm('');
            setSearchResult([]);
        } else {
            setSearchTerm(searchTerm);

            // Filter vehicleDummyData based on the search term
            const filteredResult = vehicleDummyData.filter((owner) =>
                Object.values(owner).some(
                    (value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            setSearchResult(filteredResult);
        }
    };

    const handleInputChange = (event, field) => {
        console.log(event.target.value,field,"value and field")
        // Update the corresponding field in vehicleData state
        setvehicleData({
            ...vehicleData,
            [field]: event.target.value,
        });
    };


    const handleCreateVehicle = () => {
        console.log(vehicleData,"fffffff")
        // Validate that all fields in vehicleData have values
        const areAllFieldsFilled = Object.values(vehicleData).every(value => value.trim() !== '');
    
        if (areAllFieldsFilled) {
            setneedVehicle(false);
            setselectedVehicle(vehicleData);
        } else {
            alert("Please fill in all fields.");
            return
        }
    };
    
    const handleEditVehicle = () => {
        setvehicleData({ ...selectedVehicle })
        setneedVehicle(true)
    }
    const handleMoveToNextStep = () => {
        if (needVehicle) {
            alert("Please save the customer details")
        } else if(!Object.keys(selectedVehicle).length) {
            alert("please fill in all the information")
        }else{
            submitVehicle(selectedVehicle)

        }
    }
    useEffect(() => {
        if (Object.keys(selectedVehicleData).length > 0) {
            setvehicleData(selectedVehicleData);
            setneedVehicle(false);
            setselectedVehicle(selectedVehicleData);
        }
    }, [selectedVehicleData]);

    return (
        <div className={styles.vehicleContainer}>
            <div className={styles.vehicleInfo}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <div className={styles.numbering}>1</div>
                        <div className={styles.tagline}>CHECK VEHICLE DETAILS HISTORY</div>
                    </div>
                    {!needVehicle &&
                        <div className={styles.search}>
                            <input
                                placeholder="SEARCH"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                    }
                </div>
                {!needVehicle && (
                    <div className={styles.ownership}>
                        <div className={Object.keys(selectedVehicle).length?styles.success:searchTerm && searchResult.length > 0 ? styles.success : styles.error}>
                            {Object.keys(selectedVehicle).length ? "Your chosen VEHICLE" : searchTerm && searchResult.length > 0 ? 'VEHICLE FOUND SUCCESSFULLY' : searchTerm ? 'SORRY NO VEHICLE FOUND' : ''}
                        </div>
                        <div className={styles.searchWrapper}>
                            {Object.keys(selectedVehicle).length > 0 ? (
                                <div className={styles.ownershipDetails} onClick={handleEditVehicle}>
                                    <h2>{selectedVehicle.registration}</h2>
                                    <h2>{selectedVehicle.year}</h2>
                                    <h2>{selectedVehicle.make}</h2>
                                    <h2>{selectedVehicle.model}</h2>
                                </div>
                            ) : (
                                searchResult.map((result, index) => (
                                    <div className={styles.ownershipDetails} key={index} onClick={() => {
                                        setneedVehicle(false);
                                        setselectedVehicle(result);
                                    }}>
                                        <h2>{result.registration}</h2>
                                        <h2>{result.year}</h2>
                                        <h2>{result.make}</h2>
                                        <h2>{result.model}</h2>
                                    </div>
                                ))
                            )}
                            {
                                !Object.keys(selectedVehicle).length &&
                                <div className={styles.buttonWrapper}>
                                    <Button
                                        styles={!searchResult.length ? { marginTop: "30px" } : {}}
                                        text={searchResult.length > 0 ? "ADD ANOTHER" : "CREATE NEW"}
                                        onClick={() => setneedVehicle(true)}
                                    />
                                    
                                </div>

                            }
                        </div>

                    </div>
                )}

                {needVehicle && (
                    <div className={styles.createvehicleContainer}>
                        <h2>CREATE NEW VEHICLE</h2>
                        <form className={styles.vehicleForm}>
                            <div className={styles.formRow}>
                                <input
                                    type="text"
                                    placeholder="Registration"
                                    value={vehicleData.registration}
                                    onChange={(e) => handleInputChange(e, 'registration')}
                                />
                                <input
                                    type="text"
                                    placeholder="Year"
                                    value={vehicleData.year}
                                    onChange={(e) => handleInputChange(e, 'year')}
                                />
                            </div>
                            <div className={styles.formRow}>
                                <input
                                    type="text"
                                    placeholder="Make"
                                    value={vehicleData.make}
                                    onChange={(e) => handleInputChange(e, 'make')}
                                />
                                <input
                                    type="text"
                                    placeholder="Model"
                                    value={vehicleData.model}
                                    onChange={(e) => handleInputChange(e, 'model')}
                                />
                            </div>
                            {/* <div className={styles.formRow}>
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={vehicleData.location}
                                    onChange={(e) => handleInputChange(e, 'location')}
                                />
                            </div> */}
                            <div className={styles.buttonWrapper}>
                            <Button
                                text="SAVE"
                                onClick={handleCreateVehicle} />
                                </div>
                        </form>
                    </div>
                )}
            </div>
            <div className={styles.vehiclePreview}>
                <h2>CONFIRM ALL THE ABOVE INFORMATION IS RIGHT ?</h2>
                <div className={styles.buttonWrapper}>
                {Object.keys(selectedVehicle).length?
                <Button
                    text="NEXT"
                    onClick={handleMoveToNextStep} />
                    :""
                }
                </div>

            </div>
        </div>
    );
}

export default Vehicle;
