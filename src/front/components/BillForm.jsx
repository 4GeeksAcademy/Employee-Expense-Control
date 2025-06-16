import useBillForm from "../hooks/useBillForm";
import { fetchImageBill } from "../services/apiServicesFetch";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
      setTimeout(() => navigate("/employeehome"), 1500);
    }

    setLoading(false);
  };

  return (
    <div className="container py-5">
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

      <motion.form
        className="p-4 shadow rounded bg-light"
        style={{ maxWidth: '600px', margin: '0 auto' }}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-4 text-center text-primary fw-bold">Trip Bill Form</h2>

        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-bold">Trip Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Business meeting in Madrid"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label fw-bold">Trip Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Madrid, Spain"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label fw-bold">Amount</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className="form-control"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="formFile" className="form-label fw-bold">Upload Bill</label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
          />
          {preview && (
            <div className="mt-3 text-center">
              <img
                src={preview}
                alt="Bill preview"
                className="img-thumbnail shadow"
                style={{ maxHeight: "200px" }}
              />
            </div>
          )}
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
            {loading ? "Processing..." : "Submit"}
          </button>
        </div>

        {message && (
          <motion.div
            className={`alert mt-4 ${error ? "alert-danger" : "alert-success"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            role="alert"
          >
            {message}
          </motion.div>
        )}
      </motion.form>
    </div>
  );
};

export default BillForm;
