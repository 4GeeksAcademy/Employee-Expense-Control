import CardOption from "./Card";
import { FaClipboardList, FaCheckCircle, FaDollarSign, FaUserTie, FaUsersCog, FaChartLine, FaHistory, FaFileInvoiceDollar, FaCog, FaUserPlus } from "react-icons/fa";

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
        },
        // --- Added 5 New Options Below ---
        {
            title: "View Spending Analytics",
            to: "/spendinganalytics",
            buttonText: "Analyze Spending",
            icon: <FaChartLine /> // New icon for analytics/trends
        },
        {
            title: "Review Bill Approvals",
            to: "/billapprovals",
            buttonText: "Review Bills",
            icon: <FaFileInvoiceDollar /> // New icon for bill review
        },
        {
            title: "Access Approval History",
            to: "/approvalhistory",
            buttonText: "View History",
            icon: <FaHistory /> // New icon for history
        },
        {
            title: "Manage Department Settings",
            to: "/departmentsettings",
            buttonText: "Adjust Settings",
            icon: <FaCog /> // New icon for settings
        },
        {
            title: "Add New Employee",
            to: "/addnewemployee",
            buttonText: "Add Employee",
            icon: <FaUserPlus /> // New icon for adding users
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