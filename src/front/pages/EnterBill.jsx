import BillForm from "../components/BillForm"
import BudgetTitlePanel from "../DesignComponents/PendingHome/BudgetTitlePanel.jsx";


const EnterBill = () => {

    return (
        <>
            <div className="container py-4">
                   <BudgetTitlePanel
                title="🧾 Submit your bills here."
                description="Enter all necessary details accurately to ensure your expenses are recorded and linked to the correct budget."
                style={{
                    background: "linear-gradient(135deg,#9E7515, #059669)",
                }}
                //  className="large-enough "
            />
                <div className="row">
                    <div className="col-sm-12 col-md-10 col-lg-8 col-xl-8 col-xxl-8"></div>
                    <BillForm></BillForm>
                </div>
            </div>
        </>
    )
}

export default EnterBill