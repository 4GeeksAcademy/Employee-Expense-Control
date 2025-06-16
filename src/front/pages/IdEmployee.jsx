import IdEmployeeComponent from "../components/IdEmployeeComponent"
import BudgetTitlePanel from "../DesignComponents/PendingHome/BudgetTitlePanel.jsx";


const IdEmployee = () => {
    return (<>
    <div className="container py-4">
         <BudgetTitlePanel
                title="🔑 Your Employee ID is shown below."
                description="Use this ID to verify your identity and gain full access to all app features designed to simplify your expense management."
                style={{
                    background: "linear-gradient(135deg,#9E7515, #059669)",

                }}
            />
        <IdEmployeeComponent></IdEmployeeComponent>
        </div>
    </>)
}

export default IdEmployee