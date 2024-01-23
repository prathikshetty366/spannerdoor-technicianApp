import { useState } from "react";
import { AppLayout } from "../../component/appLayout/Layout";
import User from "../../component/user/User";
import styles from "./home.module.scss"
import { UserDetailsCompletion } from "../../component/user/UserDetailsCompletion";
import Vehicle from "../../component/Vehicle/Vehicle";
import { VehicleDetailsCompletion } from "../../component/Vehicle/VehicleDatailsPreview";

function Home() {
    const [userDetails, setUserDetails] = useState({
        data: {},
        completed: false,
    });
    const [selectedOwnerData, setSelectedOwnerData] = useState({});
    const [vehicleDetails, setVehicleDetails] = useState({
        data: {},
        completed: false,
    });
    const [vehicleData, setVehicleData] = useState({});

    const handleUserDataSubmission = (data) => {
        setSelectedOwnerData(data);
        setUserDetails({
            data,
            completed: true,
        });
    };

    const handleUserEditFromPreview = () => {
        setUserDetails({
            data: {},
            completed: false,
        });
    };

    const handleVehicleDataSubmission = (data) => {
        setVehicleData(data);
        setVehicleDetails({
            data,
            completed: true,
        });
    };

    const handleVehicleEdit = () => {
        setVehicleDetails({
            data: {},
            completed: false,
        });
    };

    return (
        <AppLayout isLoggedIn={true}>
            <div className={styles.homeContainer}>
                <div className={styles.homeWrapper}>
                    <h2 className={styles.header}>CREATE A NEW BIKE SERVICE BOOKING</h2>
                    <div className={styles.Wrapper}>
                        {!userDetails.completed && !vehicleDetails.completed && (
                            <User submitUser={handleUserDataSubmission} selectedOwnerData={selectedOwnerData} />
                        )}
                           {!userDetails.completed && vehicleDetails.completed && (
                            <User submitUser={handleUserDataSubmission} selectedOwnerData={selectedOwnerData} />
                        )}
                        {userDetails.completed && !vehicleDetails.completed && (
                            <UserDetailsCompletion handleUserEditFromPreview={handleUserEditFromPreview} />
                        )}
                        {vehicleDetails.completed && !userDetails.completed && (
                            <VehicleDetailsCompletion handleVehicleEditFromPreview={handleVehicleEdit} />
                        )}
                        {userDetails.completed && vehicleDetails.completed && (
                            <>
                                <UserDetailsCompletion handleUserEditFromPreview={handleUserEditFromPreview} />
                                <VehicleDetailsCompletion handleVehicleEditFromPreview={handleVehicleEdit} />
                            </>
                        )}
                        {!vehicleDetails.completed && userDetails.completed && (
                            <Vehicle submitVehicle={handleVehicleDataSubmission} selectedVehicleData={vehicleData} />
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

export default Home;