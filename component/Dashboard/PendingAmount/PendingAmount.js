import styles from "./PendingAmount.module.scss"

function PendingAmount(props){
    const {amount,date}=props
    return(
        <div className={styles.PendingAmount}>
            <div className={styles.pendingWrapper}>
                <div className={styles.content}>
                    <div className={styles.label}>Pending Amount</div>
                    <div className={styles.btn}>{amount}Rs</div>
                </div>
                <div className={styles.filter}>
                    <div className={styles.label}>Date</div>
                    <div className={styles.date}>{date}</div>
                </div>
            </div>
        </div>
    )
}

export default PendingAmount;