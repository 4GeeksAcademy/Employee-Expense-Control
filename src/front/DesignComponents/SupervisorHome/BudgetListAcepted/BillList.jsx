import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const billContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const billItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 10, transition: { duration: 0.2 } },
};

const BillList = ({ bills }) => {
    return (
        <>
            <h4 style={styles.billListTitle}>Associated Bills:</h4>
            <motion.ul
                variants={billContainerVariants}
                initial="hidden"
                animate="visible"
                style={styles.billList}
            >
                <AnimatePresence>
                    {bills.map((bill) => (
                        <motion.li
                            key={bill.id}
                            variants={billItemVariants}
                            layout
                            style={styles.billListItem}
                        >
                            <p style={styles.billDescription}>
                                {bill.trip_description || `Bill #${bill.id}`}
                            </p>
                            <p style={styles.billState}>
                                Status:{" "}
                                <motion.span
                                    style={{
                                        ...styles.billStateText,
                                        color:
                                            bill.state === "APPROVED"
                                                ? "#16a34a"
                                                : bill.state === "PENDING"
                                                    ? "#f59e0b"
                                                    : "#dc2626",
                                    }}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                >
                                    {bill.state}
                                </motion.span>
                            </p>
                            <p style={styles.billAmount}>
                                Amount:{" "}
                                <span style={styles.billAmountValue}>
                                    ${parseFloat(bill.amount).toFixed(2)}
                                </span>
                            </p>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </motion.ul>
        </>
    );
};

const styles = {
    billListTitle: {
        fontSize: "1rem",
        fontWeight: "600",
        color: "#2d3748",
        marginTop: "16px",
        marginBottom: "8px",
    },
    billList: {
        listStyleType: "disc",
        paddingLeft: "20px",
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        color: "#4a5568",
    },
    billListItem: {
        borderBottom: "1px solid #f3f4f6",
        paddingBottom: "8px",
        marginBottom: "8px",
    },
    billDescription: {
        fontWeight: "500",
    },
    billState: {
        fontSize: "0.875rem",
    },
    billStateText: {
        fontWeight: "700",
    },
    billAmount: {
        fontSize: "0.875rem",
    },
    billAmountValue: {
        fontWeight: "700",
        color: "#2d3748",
    },
};

export default BillList;