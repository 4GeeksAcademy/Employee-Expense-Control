import useBillForm from "../hooks/useBillForm";
import { fetchImageBill } from "../services/apiServicesFetch";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BillForm = () => {
  const {
    description, setDescription,
    location, setLocation,
    amount, setAmount,
    image, setImage,
    navigate
  } = useBillForm();

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!image) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);


  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage("");
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setMessage("");
    setError(false);

    const result = await fetchImageBill(image, description, location, amount);

    if (!result.ok) {
      setError(true);
      setMessage(result.message);
    } else {
      setError(false);
      setMessage(result.message);


      setTimeout(() => {
        setDescription("");
        setLocation("");
        setAmount("");
        setImage(null);
        setPreview("");
        setMessage("");
      }, 1500);
    }

    setLoading(false);
  };

  return (
    <div className="py-5 px-4 main-billForm">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/employeehome")}
        className="btn mb-4 align-self-start go-back-btn"
        style={{
          borderRadius: "2rem",
          fontWeight: "600",
          padding: "0.75rem 1.5rem",
          border: "2px groove grey",
          background: "var(--ghost-green)",
          color: "var(--ghost-white)",
        }}
      >
        ⬅ Back to Dashboard
      </motion.button>

      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          padding: "2rem",
          boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
          width: "100%",
          maxWidth: "600px",
          border: "1px solid #9E7515",
          margin: "0 auto"
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4 text-center"
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            background: "linear-gradient(90deg, #9E7515, #059669)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.5px",
            textShadow: "1px 1px 2px rgba(0,0,0,0.05)",
          }}
        >
          🧾 Submit Trip Bill
        </motion.h2>

        <AnimatePresence>
          {message && (
            <motion.div
              key="alert"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className={`alert ${error ? "alert-danger" : "alert-success"}`}
              style={{
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: "500",
                marginBottom: "1rem",
              }}
              role="alert"
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="form-label"
              style={{
                fontSize: "1.05rem",
                fontWeight: "500",
                color: "#9E7515",
                letterSpacing: "0.3px",
                marginBottom: "0.4rem",
                display: "block",
              }}
            >
              Trip Description
            </label>
            <input
              type="text"
              id="description"
              className="form-control shadow-sm border-0 custom-holder"
              placeholder="e.g. Business meeting in Madrid"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                fontSize: "1.1rem",
                padding: "0.75rem",
                borderRadius: "12px",
                backgroundColor: "#f1f5f9",
              }}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="form-label"
              style={{
                fontSize: "1.05rem",
                fontWeight: "500",
                color: "#9E7515",
                letterSpacing: "0.3px",
                marginBottom: "0.4rem",
                display: "block",
              }}
            >
              Trip Address
            </label>
            <input
              type="text"
              id="location"
              className="form-control shadow-sm border-0 custom-holder"
              placeholder="Madrid, Spain"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                fontSize: "1.1rem",
                padding: "0.75rem",
                borderRadius: "12px",
                backgroundColor: "#f1f5f9",
              }}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="amount"
              className="form-label"
              style={{
                fontSize: "1.05rem",
                fontWeight: "500",
                color: "#9E7515",
                letterSpacing: "0.3px",
                marginBottom: "0.4rem",
                display: "block",
              }}
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              className="form-control shadow-sm border-0 custom-holder"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
              style={{
                fontSize: "1.1rem",
                padding: "0.75rem",
                borderRadius: "12px",
                backgroundColor: "#f1f5f9",
              }}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="formFile"
              className="form-label"
              style={{
                fontSize: "1.05rem",
                fontWeight: "500",
                color: "#9E7515",
                letterSpacing: "0.3px",
                marginBottom: "0.4rem",
                display: "block",
              }}
            >
              Upload Bill
            </label>
            <input
              type="file"
              id="formFile"
              className="form-control shadow-sm border-0 custom-holder"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              style={{
                fontSize: "1.1rem",
                fontStyle: "italic",
                padding: "0.5rem 0.75rem",
                borderRadius: "12px",
                backgroundColor: "#f1f5f9",
              }}
            />
            {preview && (
              <div className="mt-3 text-center position-relative" style={{ display: 'inline-block' }}>
                <img
                  src={preview}
                  alt="Bill preview"
                  className="img-thumbnail shadow"
                  style={{ maxHeight: "200px", borderRadius: "12px" }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setPreview("");
                  }}
                  className="btn btn-sm btn-danger"
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    padding: 0,
                    fontWeight: "bold",
                    fontSize: "1rem",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}
                  aria-label="Remove image"
                >
                  &times;
                </button>
              </div>
            )}

          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="btn w-100 mb-2"
            style={{
              background: "linear-gradient(135deg,rgb(224, 160, 10), #9E7515)",
              color: "#fff",
              fontSize: "1.2rem",
              padding: "0.75rem",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(158, 117, 21, 0.3)",
              fontWeight: "600",
              border: "none",
            }}
          >
            {loading ? "Processing..." : "Submit Bill"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default BillForm;
