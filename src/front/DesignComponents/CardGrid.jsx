import React from "react";
import CardOption from "./Card";

const CardGrid = () => {
    const cards = [
        {
            title: "See pending budgets",
            to: "/budgetspending",
            buttonText: "See budgets"
        },
        {
            title: "See current budgets",
            to: "/budgetsaccepted",
            buttonText: "Current budgets"
        },
        {
            title: "See total expenses",
            to: "/totaldepartment",
            buttonText: "See expenses"
        },
        {
            title: "Assign department to employee",
            to: "/assignDepartmentEmployee",
            buttonText: "Assign"
        },
        {
            title: "Assign department to supervisor",
            to: "/assignDepartmentSupervisor",
            buttonText: "Assign"
        }
    ];

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1.5rem",
                justifyItems: "center"
            }}
        >
            {cards.map((card, index) => (
                <CardOption key={index} {...card} />
            ))}
        </div>
    );
};

export default CardGrid;