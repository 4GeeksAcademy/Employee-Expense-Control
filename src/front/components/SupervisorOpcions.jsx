import { motion } from "framer-motion";
import useSupervisorOpcions from "../hooks/useSupervisorOpcions"
import CardOption from "../DesignComponents/Card";
const SupervisorOpcions = () => {
    useSupervisorOpcions()
    return (<>
        <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", padding: "2rem" }}>
            <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    marginBottom: "2rem",
                    textAlign: "center"
                }}
            >
                Hello Supervisor!
            </motion.h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "1.5rem",
                    justifyItems: "center"
                }}
            >
                <CardOption
                    title="See pending budgets"
                    to="/budgetspending"
                    buttonText="See budgets"
                />
                <CardOption
                    title="See current budgets"
                    to="/budgetsaccepted"
                    buttonText="Current budgets"
                />
                <CardOption
                    title="See total expenses"
                    to="/totaldepartment"
                    buttonText="See expenses"
                />
                <CardOption
                    title="Assign department to employee"
                    to="/assignDepartmentEmployee"
                    buttonText="Assign"
                />
                <CardOption
                    title="Assign department to supervisor"
                    to="/assignDepartmentSupervisor"
                    buttonText="Assign"
                />
            </div>
        </div>
    </>)
}

export default SupervisorOpcions