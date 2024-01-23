import { useRouter } from "next/router"
import { AppLayout } from "../../component/appLayout/Layout"

function Dashboard() {
    const router = useRouter()
    const handleBooking = () => {
        router.push("/createbooking")
    }
    return (
        <AppLayout>
            <button onClick={handleBooking}>new booking</button>
        </AppLayout>
    )
}

export default Dashboard