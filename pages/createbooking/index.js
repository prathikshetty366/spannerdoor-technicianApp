import { useEffect, useState } from "react";
import { AppLayout } from "../../component/appLayout/Layout";
import User from "../../component/User/User";
import styles from "./createbooking.module.scss"
import { UserDetailsCompletion } from "../../component/User/UserDetailsCompletion";
import Vehicle from "../../component/Vehicle/Vehicle";
import { VehicleDetailsCompletion } from "../../component/Vehicle/VehicleDatailsPreview";
import { useRouter } from "next/router";
import Service from "../../component/Service/Service";
import ServiceDetailsCompletion from "../../component/Service/ServiceDetailsCompletion";

function CreateBooking() {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const router = useRouter()
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
    const [serviceDetails, setServiceDetails] = useState({
        data: {},
        completed: false,
    })
    const [serviceData, setServiceData] = useState({})
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

    const handleServiceDataSubmission = (data) => {
        console.log(data)
        setServiceData(data);
        setServiceDetails({
            data,
            completed: true,
        });
    };

    const handleServiceEdit = () => {
        setServiceDetails({
            data: {},
            completed: false,
        });
    };

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/")
        }
    }, [])

    return (
        <AppLayout isLoggedIn={true}>
            <div className={styles.homeContainer}>
                <div className={styles.homeWrapper}>
                    <h2 className={styles.header}>CREATE A NEW BIKE SERVICE BOOKING</h2>
                    <div className={styles.Wrapper}>
                        {/* User Component */}
                  {!userDetails.completed &&(
                            <User submitUser={handleUserDataSubmission} selectedOwnerData={selectedOwnerData} />
                        )}

                        {userDetails.completed && !vehicleDetails.completed &&  !serviceDetails.completed&&(
                            <UserDetailsCompletion handleUserEditFromPreview={handleUserEditFromPreview} />
                        )}

                        {userDetails.completed && !vehicleDetails.completed && (
                            <Vehicle submitVehicle={handleVehicleDataSubmission} selectedVehicleData={vehicleData} />
                        )}


                        {userDetails.completed && vehicleDetails.completed && !serviceDetails.completed && (
                            <>
                                <UserDetailsCompletion handleUserEditFromPreview={handleUserEditFromPreview} />
                                <VehicleDetailsCompletion handleVehicleEditFromPreview={handleVehicleEdit} />
                            </>
                        )}
                        {userDetails.completed && vehicleDetails.completed && serviceDetails.completed && (
                            <>
                                <UserDetailsCompletion handleUserEditFromPreview={handleUserEditFromPreview} />
                                <VehicleDetailsCompletion handleVehicleEditFromPreview={handleVehicleEdit} />
                                <ServiceDetailsCompletion handleServiceEditFromPreview={handleServiceEdit} />

                            </>
                        )} 
                        {/* Service Component */}
                        {userDetails.completed && vehicleDetails.completed && !serviceDetails.completed && (
                            <Service submitService={handleServiceDataSubmission} selectedServiceData={serviceData} />
                      )} 

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

export default CreateBooking;