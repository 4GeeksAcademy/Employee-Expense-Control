import useBudgetList from "../hooks/useBudgetList"
const BudgetList = () => {
    const { budgets } = useBudgetList()
    return (
        <>
            <ol>
                {budgets.map((budget, index) => {
                    return <li key={index}>{budget.budget_description}</li>
                })}
            </ol>
        </>
    )
}

export default BudgetList