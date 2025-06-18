import EmpCardOption from "../EmployeeHome/EmpCard";

import { FaClipboardList, FaChartPie, FaIdBadge, FaFolderOpen, FaPlusCircle, FaCheckCircle, FaDollarSign, FaUserTie, FaUsersCog, FaChartLine, FaHistory, FaFileInvoiceDollar, FaCog, FaUserPlus } from "react-icons/fa";

const EmpCardGrid = ({ hasAcceptedBudget }) => {
    const cards = [
        {
            title: "Start a New Budget",
            to: "/createbudget",
            buttonText: "Manage budgets",
            icon: <FaChartPie />
        },
        {
            title: "Log a New Expense",
            to: hasAcceptedBudget ? "/enterbill" : "#",
            buttonText: "Add Expense",
            icon: <FaPlusCircle />,
            disabled: !hasAcceptedBudget,
        },
        {
            title: "View & Manage Budgets",
            to: "/mybudgets",
            buttonText: "See expenses",
            icon: <FaFolderOpen />
        },
        {
            title: "Access My Employee ID",
            to: "/employeeid",
            buttonText: "View ID",
            icon: <FaIdBadge />
        },
        {
            title: "Assign to supervisor",
            to: "/underconstruction",
            buttonText: "Coming Soon...",
            icon: <FaUserTie />
        },
        {
            title: "View Spending Analytics",
            to: "/underconstruction",
            buttonText: "Coming Soon...",
            icon: <FaChartLine />
        },
        {
            title: "Review Bill Approvals",
            to: "/underconstruction",
            buttonText: "Coming Soon...",
            icon: <FaFileInvoiceDollar />
        },
        {
            title: "Access Approval History",
            to: "/underconstruction",
            buttonText: "Coming Soon...",
            icon: <FaHistory />
        },
        {
            title: "Manage Department Settings",
            to: "/underconstruction",
            buttonText: "Coming Soon...",
            icon: <FaCog />
        },
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
                <EmpCardOption key={i} {...card} />
            ))}
        </div>
    );
};

export default EmpCardGrid;
