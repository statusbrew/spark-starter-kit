import ProfileNav from "../components/ProfileNav"
import TrafficTable from "../components/TrafficTable"

export default function Dashboard() {
    return (
        <section className="flex flex-col justify-center items-center">
            <ProfileNav/>
            <TrafficTable/>
        </section>
    )
}