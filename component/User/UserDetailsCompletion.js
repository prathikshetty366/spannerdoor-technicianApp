import styles from "./userDetails.module.scss"

export const UserDetailsCompletion=({handleUserEditFromPreview})=>{
    return(
        <div className={styles.completion} onClick={handleUserEditFromPreview}>
            <div className={styles.starter}>
                <div className={styles.number}>1</div>
                <h3>CHECK USER DETAILS HISTORY</h3>
            </div>
            <div className={styles.ender}>Completed</div>
        </div>
    )
}