import { Link } from "react-router-dom"
import useSupervisorOpcions from "../hooks/useSupervisorOpcions"
const SupervisorOpcions = () => {
    useSupervisorOpcions()
    return (<>
        <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>
                Hello Supervisor!
            </h1>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1.5rem',
                    justifyItems: 'center'
                }}
            >
                <div style={{ width: '100%', maxWidth: '300px', backgroundColor: '#fff', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>See pending budgets</h2>
                    <Link to={"/budgetspending"}>
                        <button style={{ width: '100%', padding: '0.75rem', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '0.375rem' }}>See budgets</button>
                    </Link>
                </div>

                <div style={{ width: '100%', maxWidth: '300px', backgroundColor: '#fff', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>See current budgets</h2>
                    <Link to={"/budgetsaccepted"}>
                        <button style={{ width: '100%', padding: '0.75rem', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '0.375rem' }}>current budgets</button>
                    </Link>
                </div>

                <div style={{ width: '100%', maxWidth: '300px', backgroundColor: '#fff', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>See employee expenses</h2>
                    <Link>
                        <button style={{ width: '100%', padding: '0.75rem', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '0.375rem' }}>See expenses</button>
                    </Link>
                </div>

                <div style={{ width: '100%', maxWidth: '300px', backgroundColor: '#fff', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>See department expenses</h2>
                    <Link to={"/totaldepartment"}>
                        <button style={{ width: '100%', padding: '0.75rem', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '0.375rem' }}>See expenses</button>
                    </Link>
                </div>

                <div style={{ width: '100%', maxWidth: '300px', backgroundColor: '#fff', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>Assign department to employee</h2>
                    <Link to={"/assignDepartmentEmployee"}>
                        <button style={{ width: '100%', padding: '0.75rem', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '0.375rem' }}>Assign</button>
                    </Link>
                </div>

                <div style={{ width: '100%', maxWidth: '300px', backgroundColor: '#fff', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>Assign department to supervisor</h2>
                    <Link to={"/assignDepartmentSupervisor"}>
                        <button style={{ width: '100%', padding: '0.75rem', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '0.375rem' }}>Assign </button>
                    </Link>
                </div>
            </div>
        </div>
    </>)
}

export default SupervisorOpcions