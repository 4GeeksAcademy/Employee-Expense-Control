import CardOption from "./Card";
import { FaClipboardList, FaCheckCircle, FaDollarSign, FaUserTie, FaUsersCog } from "react-icons/fa";

const CardGrid = () => {
    const cards = [
        {
            title: "See pending budgets",
            to: "/budgetspending",
            buttonText: "See budgets",
            icon: <FaClipboardList />
        },
        {
            title: "See current budgets",
            to: "/budgetsaccepted",
            buttonText: "Current budgets",
            icon: <FaCheckCircle />
        },
        {
            title: "See total expenses",
            to: "/totaldepartment",
            buttonText: "See expenses",
            icon: <FaDollarSign />
        },
        {
            title: "Assign to employee",
            to: "/assignDepartmentEmployee",
            buttonText: "Assign",
            icon: <FaUsersCog />
        },
        {
            title: "Assign to supervisor",
            to: "/assignDepartmentSupervisor",
            buttonText: "Assign",
            icon: <FaUserTie />
        }
    ];

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "2rem",
                justifyItems: "center"
            }}
        >
            {cards.map((card, i) => (
                <CardOption key={i} {...card} />
            ))}
        </div>
    );
};

export default CardGrid;