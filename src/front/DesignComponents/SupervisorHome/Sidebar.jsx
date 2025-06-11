import { FaUserShield, FaChartPie, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
    return (
        <div style={{
            width: "250px",
            backgroundColor: "#1f2937",
            color: "white",
            display: "flex",
            flexDirection: "column",
            padding: "1.5rem",
            boxShadow: "2px 0 8px rgba(0,0,0,0.1)"
        }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem", fontWeight: "bold" }}>
                Supervisor Panel
            </h2>
            <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <span><FaUserShield /> Profile</span>
                <span><FaChartPie /> Overview</span>
                <span><FaSignOutAlt /> Logout</span>
            </nav>
        </div>
    );
};

export default Sidebar;