import useLoginForm from "../hooks/useLoginForm"
import { fetchLogin } from "../services/apiServicesFetch"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {

    const { email, setEmail, password, setPassword } = useLoginForm()
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()
        fetchLogin(email, password)
        navigate("/")
    }

    return (
        <>
            <form className="p-4 rounded-4 shadow-lg bg-white" style={{ maxWidth: '400px', margin: 'auto' }} onSubmit={handleSubmit}>
                <h2 className="text-center mb-4">Login</h2>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control rounded-pill"
                        id="email"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-4">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control rounded-pill"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary rounded-pill py-2">Submit</button>
                </div>
            </form>

        </>
    )
}

export default LoginForm