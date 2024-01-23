import { AppLayout } from "../../component/appLayout/Layout"
import styles from "./Login.module.scss"
import Button from "../../component/Button/Button"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';


function Login() {
    const router = useRouter()
    const id = "1234"
    const secret = "1234"
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const isLoggedIn = localStorage.getItem("isLoggedIn")



    const handleLogin = () => {
        if (username.toLowerCase() === id.toLowerCase() && password.toLowerCase() === secret.toLowerCase()) {
            toast.success("Login successfull");
            localStorage.setItem("isLoggedIn",true)
            setTimeout(()=>{
                router.push("/home");
            },2000)

        } else {
            toast.error("Please check your username or password");
        }
    };
    
    const handleKeyDown = (e) => {
        // Check if the pressed key is Enter (key code 13)
        if (e.key === 'Enter') {
            handleLogin();
        }
    };
    useEffect(() => {
        if (isLoggedIn) {
            router.push("/dashboard")
        }
    }, [])

    return (
        <AppLayout isLoggedIn={false}>
            <div className={styles.loginContainer}>
                <div className={styles.loginWrapper}>
                    <div className={styles.inputForm}>
                        <div className={styles.loginheader}>TECHNICIAN DASHBOARD</div>
                        <input
                            placeholder="Enter your username."
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <input
                            placeholder="Enter your password."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            onKeyDown={handleKeyDown}
                        />
                        <div className={styles.buttonWrapper}>
                            <Button
                                text="Login"
                                onClick={handleLogin}
                            />
                        </div>
                        <div className={styles.loginOptions}>
                            <div>NOT REGISTERED? CLICK HERE</div>
                            <div>FORGET PIN</div>
                        </div>
                    </div>

                    <div className={styles.inputbg}>
                        <Image
                            src="/assets/Login/login-bg.png"
                            height={502}
                            width={502}
                            alt="bg"
                        />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </AppLayout>
    );

}


export default Login