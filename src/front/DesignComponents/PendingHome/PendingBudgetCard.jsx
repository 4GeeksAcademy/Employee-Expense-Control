import React from 'react';
import { motion } from "framer-motion";
import BudgetInfoDisplay from './BudgetInfoDisplay';
import EmployeeLink from './EmployeeLink';
import BudgetActions from './BudgetActions';

const colors = {
    backgroundWhite: "#FFFFFF",
    cardBorder: "#E0E0E0",
    boxShadowLight: "rgba(0, 0, 0, 0.08)",
    boxShadowHover: "rgba(0, 0, 0, 0.15)",
};

const PendingBudgetCard = ({
    budget,
    editedAmount,
    onAmountChange,
    onSelectEmployee,
    onAcceptClick,
    onRejectClick,
    employeeName
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ 
                scale: 1.02,
                boxShadow: `0 12px 30px ${colors.boxShadowHover}`
            }} 
            style={{
                backgroundColor: colors.backgroundWhite,
                borderRadius: "16px",
                padding: "1.5rem",
                marginBottom: "1.5rem",
                boxShadow: `0 8px 20px ${colors.boxShadowLight}`,
                border: `1px solid ${colors.cardBorder}`,
                cursor: "default",
                overflow: "hidden",
            }}
        >
            <BudgetInfoDisplay
                budgetDescription={budget.budget_description}
                requestedAmount={budget.amount}
                editedAmount={editedAmount}
                onAmountChange={onAmountChange}
                budgetId={budget.id}
            />

            <EmployeeLink
                employeeName={employeeName}
                employeeId={budget.employee_id}
                onSelectEmployee={onSelectEmployee}
            />

            <BudgetActions
                budgetId={budget.id}
                onAcceptClick={onAcceptClick}
                onRejectClick={onRejectClick}
            />
        </motion.div>
    );
};

export default PendingBudgetCard;