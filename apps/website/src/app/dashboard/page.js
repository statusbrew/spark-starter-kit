import ProfileNav from "../components/ProfileNav"
import Table from "../components/TrafficTable"

export default function Dashboard() {
    return (
        <section className="flex flex-col justify-center items-center">
            <ProfileNav/>
            <Table/>
        </section>
    )
}