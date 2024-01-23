import styles from "./VehicleDetails.module.scss"

export const VehicleDetailsCompletion=({handleVehicleEditFromPreview})=>{
    return(
        <div className={styles.completion} onClick={handleVehicleEditFromPreview}>
            <div className={styles.starter}>
                <div className={styles.number}>2</div>
                <h3>CHECK VEHICLE DETAILS HISTORY</h3>
            </div>
            <div className={styles.ender}>Completed</div>
        </div>
    )
}