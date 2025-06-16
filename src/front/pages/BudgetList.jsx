import BudgetListComponent from "../components/BudgetListComponent";
import BudgetTitlePanel from "../DesignComponents/PendingHome/BudgetTitlePanel.jsx";

const BudgetList = () => {

    return (
        <div className="container py-4">
               <BudgetTitlePanel
                title="📊 Manage your budgets and related bills below"
                description="Review the status of each budget, edit or delete budgets and bills as needed to keep your records up to date."
                style={{
                    background: "linear-gradient(135deg,#9E7515, #059669)",
                }}
                //  className="large-enough "
            />
            <div className="row">
                <div className="col-sm-12 col-md-10 col-lg-8 col-xl-8 col-xxl-8 ms-3">
                    <BudgetListComponent></BudgetListComponent>
                </div>
            </div>
        </div>
    )

};

export default BudgetList;
