import styles from "./layout.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";

export const AppLayout = ({ children, isLoggedIn }) => {
    const router = useRouter()
    const handleLogout = () => {
        localStorage.setItem("isLoggedIn", "")
        router.push("/")
    }
    return (
        <div className={styles.layoutWrapper}>
            <div className={styles.navbar}>
                <div className={styles.navheader} style={{ justifyContent: !isLoggedIn ? "center" : "" }}>
                    <Image
                        src="/assets/Layout/logo.png"
                        width={500}
                        height={60}
                        alt="Logo"
                        className={styles.logo}
                        style={{ marginLeft: !isLoggedIn ? "0" : "63px" }}
                        onClick={() => { router.push("/home") }}
                    />
                    {isLoggedIn &&
                        <div className={styles.logout} onClick={handleLogout}>LOGOUT</div>
                    }
                </div>
                <div className={styles.navsubheader}></div>
            </div>
            <div className={styles.content}>
                {children}
            </div>
            <div className={styles.navfooter}>COPYRIGHT RESERVED WITH SPANNERDOOR 2024 </div>
        </div>
    );
};
