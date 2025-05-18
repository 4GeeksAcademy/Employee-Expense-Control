import useBillForm from "../hooks/useBillForm"
import { fetchImageBill } from "../services/apiServicesFetch"
const BillForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        fetchImageBill(image, description, location, amount)
    }
    const { description, setDescription, location, setLocation, amount, setAmount, image, setImage } = useBillForm()
    return (
        <>
            <form className="p-4 shadow rounded bg-light" style={{ maxWidth: '600px', margin: '0 auto' }} onSubmit={handleSubmit}>
                <h2 className="mb-4 text-center text-primary">Trip Bill Form</h2>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label fw-bold">Trip Description</label>
                    <input type="text" className="form-control" id="description" placeholder="e.g. Business meeting in Madrid" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label fw-bold">Trip Address</label>
                    <input type="text" className="form-control" id="address" placeholder="Madrid, Spain" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="amount" className="form-label fw-bold">Amount</label>
                    <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input type="text" className="form-control" id="amount" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="formFile" className="form-label fw-bold">Upload Bill</label>
                    <input className="form-control" type="file" id="formFile" onChange={(e) => setImage(e.target.files[0])} />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                </div>
            </form>

        </>
    )
}

export default BillForm