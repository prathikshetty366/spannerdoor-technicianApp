import styles from "./ServiceDetails.module.scss"

 const ServiceDetailsCompletion=({handleServiceEditFromPreview})=>{
    return(
        <div className={styles.completion} onClick={handleServiceEditFromPreview}>
            <div className={styles.starter}>
                <div className={styles.number}>3</div>
                <h3>CHECK SERVICE DETAILS HISTORY</h3>
            </div>
            <div className={styles.ender}>Completed</div>
        </div>
    )
}

export default ServiceDetailsCompletion