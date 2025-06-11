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
        {
            title: "View Spending Analytics",
            to: "/spendinganalytics",
            buttonText: "Analyze Spending",
            icon: <FaChartLine />
        },
        {
            title: "Review Bill Approvals",
            to: "/billapprovals",
            buttonText: "Review Bills",
            icon: <FaFileInvoiceDollar />
        },
        {
            title: "Access Approval History",
            to: "/approvalhistory",
            buttonText: "View History",
            icon: <FaHistory />
        },
        {
            title: "Manage Department Settings",
            to: "/departmentsettings",
            buttonText: "Adjust Settings",
            icon: <FaCog />
        },
        {
            title: "Add New Employee",
            to: "/addnewemployee",
            buttonText: "Add Employee",
            icon: <FaUserPlus />
        }
    ];

    return (
        <div
            className="card-grid" 
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