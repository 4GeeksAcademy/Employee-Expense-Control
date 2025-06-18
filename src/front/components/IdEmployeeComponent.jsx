import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchId } from "../services/apiServicesFetch";
import useGlobalReducer from "../hooks/useGlobalReducer";
import BlueSpinner from "../components/BlueSpinner";
import { useNavigate } from "react-router-dom";

const IdEmployeeComponent = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const [copySuccess, setCopySuccess] = useState("");

  useEffect(() => {
    const loadId = async () => {
      if (!store.employeeId) {
        try {
          const data = await fetchId();
          if (data?.id) {
            dispatch({ type: "set_employee_id", payload: data.id });
          }
        } catch (error) {
          console.error("Error loading employee ID", error);
        }
      }
    };
    loadId();
  }, [store.employeeId, dispatch]);

  const copyToClipboard = () => {
    if (store.employeeId) {
      navigator.clipboard.writeText(store.employeeId).then(() => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 1500);
      });
    }
  };

  if (!store.employeeId) {
    return (
      <div className="py-5 px-4 main-idComponent" style={{ minHeight: "60vh" }}>
        <BlueSpinner />
      </div>
    );
  }

  return (
    <div className="py-5 px-4 main-idComponent" style={{ minHeight: "60vh" }}>
      {/* Button container aligned left with fixed max width */}
      <div style={{ maxWidth: "600px", marginBottom: "1rem" }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/employeehome")}
          className="btn mb-4 go-back-btn"
          style={{
            borderRadius: "2rem",
            fontWeight: "600",
            padding: "0.75rem 1.5rem",
            border: "2px groove grey",
            background: "var(--ghost-green)",
            color: "var(--ghost-white)",
            display: "inline-block",
            textAlign: "left",
          }}
        >
          ⬅ Back to Dashboard
        </motion.button>
      </div>

      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            padding: "2.5rem 3rem",
            boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
            border: "1px solid #9E7515",
            textAlign: "center",
            position: "relative",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              marginBottom: "1.5rem",
              background: "linear-gradient(90deg, #9E7515, #059669)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.5px",
              textShadow: "1px 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            🆔 Your Employee ID
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            style={{
              fontSize: "1.3rem",
              fontWeight: "600",
              color: "#9E7515",
              marginBottom: "1.5rem",
            }}
          >
            <em>Share this ID with your manager to activate your account and start managing expenses.</em>
          </motion.p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.7 }}
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              padding: "1rem 2rem",
              borderRadius: "16px",
              background: "linear-gradient(90deg, #059669, #9E7515)",
              color: "#fff",
              display: "block",
              boxShadow: "0 8px 20px rgba(5, 150, 105, 0.3)",
              userSelect: "text",
              marginBottom: "1.5rem",
            }}
            title="Employee ID"
          >
            {store.employeeId}
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyToClipboard}
            className="btn"
            style={{
              background: "var(--ghost-green)",
              color: "var(--ghost-white)",
              fontWeight: "600",
              padding: "0.5rem 1.5rem",
              borderRadius: "12px",
              border: "2px groove grey",
            }}
          >
            Copy ID
          </motion.button>

          {copySuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                color: "#059669",
                fontWeight: "600",
                marginTop: "0.5rem",
              }}
            >
              {copySuccess}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default IdEmployeeComponent;
