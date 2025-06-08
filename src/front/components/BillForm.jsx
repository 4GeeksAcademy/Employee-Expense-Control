import useBillForm from "../hooks/useBillForm"
import { fetchImageBill } from "../services/apiServicesFetch"
import { useState, useEffect } from "react"
const BillForm = () => {
  const {
    description, setDescription,
    location, setLocation,
    amount, setAmount,
    image, setImage,
    navigate
  } = useBillForm();

//CREADO UN MANEJO DE ESTADOS CON USESTATE PARA MENSAJES ERRORES Y VISTA PREVIA
// CON useEffect y UseState Generamos la previsualizacion de la imagen

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(""); //Guardamos en una URL temporal la imagen para mostrarla antes de enviarla.


  // 🖼️ Generar previsualización
  useEffect(() => {
    if (!image) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(image); //Creamos una URL temporal para ver la imagen
    setPreview(url);
    return () => URL.revokeObjectURL(url); //Limpiamos la memoria al desmontar o cambiar imagen
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
      <form className="p-4 shadow rounded bg-light" style={{ maxWidth: '600px', margin: '0 auto' }} onSubmit={handleSubmit}>
        <h2 className="mb-4 text-center text-primary">Trip Bill Form</h2>

        {/* Mensaje de éxito o error */}
        {message && (
          <div className={`alert ${error ? "alert-danger" : "alert-success"}`} role="alert">
            {message}
          </div>
        )}

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
            <div className="mt-3">
              <img src={preview} alt="Bill preview" className="img-thumbnail" style={{ maxHeight: "200px" }} />
            </div>
          )}
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
            {loading ? "Processing..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default BillForm