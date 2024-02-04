import { useRouter } from "next/router"
import { AppLayout } from "../../component/appLayout/Layout"
import PendingAmount from "../../component/Dashboard/PendingAmount/PendingAmount"
import { useState } from "react"
import styles from "./dashboard.module.scss"
import Button from "../../component/Button/Button"

function Dashboard() {
    const router = useRouter()
    const [pendingAmount, setPendingAmount] = useState("12000")
    const [activeLink, setActiveLink] = useState(1);
    const [orderFilter, setOrderFilter] = useState()
    const handleBooking = () => {
        router.push("/createbooking")
    }
    return (
        <AppLayout isLoggedIn={true}>
            <PendingAmount amount={pendingAmount} date="12/01/24" />
            <div className={styles.quickLinks}>
                <div className={styles.quickLinksWrapper}>
                    <div onClick={() => setActiveLink(1)} className={activeLink === 1 ? styles.ItemActive : styles.Item}>
                        <span>QUICK OPTION</span>
                    </div>
                    <div onClick={() => setActiveLink(2)} className={activeLink === 2 ? styles.ItemActive : styles.Item}>
                        <span>ALL ORDERS</span>
                    </div>
                    <div onClick={() => setActiveLink(3)} className={activeLink === 3 ? styles.ItemActive : styles.Item}>
                        <span>ENQUIRY</span>
                    </div>
                    <div onClick={() => setActiveLink(4)} className={activeLink === 4 ? styles.ItemActive : styles.Item}>
                        <span>SERVICE REMINDERS</span>
                    </div>
                </div>
                {activeLink==1&&(
                <div className={styles.orderFilter}>
                    <div onClick={() => setOrderFilter(1)} className={`${styles.filterItem} ${styles.todayOrder}`}>
                        TODAY’S ORDER
                    </div>
                    <div onClick={() => setOrderFilter(2)} className={`${styles.filterItem} ${styles.todayDelivery}`}>
                        TODAY’S DELIVERY
                    </div>
                    <div onClick={() => setOrderFilter(3)} className={`${styles.filterItem} ${styles.delayed}`}>
                        DELAYED
                    </div>
                </div>
                )}
                <div className={styles.breaker}></div>
              <div className={styles.searchAndBooking}>
                <div className={styles.search}>
                    <input
                    placeholder="Search Your Order Here"
                    />
                    <div className={styles.buttonWrapper}>
                        <Button text="+ New Booking"
                        onClick={handleBooking}/>
                    </div>
                </div>
              </div>
            </div>
            {/* <button onClick={handleBooking}>new booking</button> */}
        </AppLayout>
    )
}

export default Dashboard