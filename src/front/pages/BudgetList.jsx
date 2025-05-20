import useBudgetList from "../hooks/useBudgetList"
const BudgetList = () => {
    const { budgetList, setBudgetList } = useBudgetList()
    return (
        <>
            <ol>
                {budgetList.map((budget, index) => {
                    return <li key={index}>{budget.budget_description}</li>
                })}
            </ol>
        </>
    )
}

export default BudgetList