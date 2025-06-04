import useLoginForm from "../hooks/useLoginForm"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/AuthContext"
import { Link } from "react-router-dom"
import "../DesignComponents/SignUp/signup.css";
import AnimatedBackground from "../DesignComponents/GlobalComponents/AnimatedBackground";

const LoginForm = () => {

    const { email, setEmail, password, setPassword, rolNavigate } = useLoginForm()
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login(email, password);
            console.log("Datos de usuario:",userData)
            rolNavigate(userData);
        } catch (error) {
            console.error(error);

        }
    };


return (
        <div className="signMain">
            <AnimatedBackground />
            <form onSubmit={handleSubmit} className="signForm">
                <div className="signHeading">
                    <h2>Login</h2>
                </div>
                <div className="container">
                    <div className="mb-3">
                        <label htmlFor="email" className="Signform-label required-label">
                            EMAIL ADDRESS
                        </label>
                        <input
                            type="email"
                            className="form-control custom-placeholder"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                        <div className="form-text emailHelp">
                            We'll never share your email with anyone else.
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="Signform-label required-label">
                            PASSWORD
                        </label>
                        <input
                            type="password"
                            className="form-control custom-placeholder"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                        <div className="form-text emailHelp">
                             Forgot your password? <Link to="/forgot-password">Reset it here</Link>
                        </div>
                        
                    </div>

                    <div className="d-grid gap-2 contBtn">
                        <button type="submit" className="btnSign btn">
                            Login
                        </button>  
                    </div>
                     <div className="form-text emailHelp">
                              Need an account? <Link to="/signup">Register</Link>
                        </div>
                </div>
            </form>
        </div>
    );
};


export default LoginForm


// <p className="text-center mt-3">
                           // Need an account? <Link to="/signup">Register</Link>
                        //</p>

//     return (
//         <>
//             <form className="p-4 rounded-4 shadow-lg bg-white" style={{ maxWidth: '400px', margin: 'auto' }} onSubmit={handleSubmit}>
//                 <h2 className="text-center mb-4">Login</h2>

//                 <div className="mb-3">
//                     <label htmlFor="email" className="form-label">Email address</label>
//                     <input
//                         type="email"
//                         className="form-control rounded-pill"
//                         id="email"
//                         aria-describedby="emailHelp"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//                 </div>

//                 <div className="mb-4">
//                     <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
//                     <input
//                         type="password"
//                         className="form-control rounded-pill"
//                         id="exampleInputPassword1"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>

//                 <div className="d-grid">
//                     <button type="submit" className="btn btn-primary rounded-pill py-2">Submit</button>
//                     <p className="text-center mt-3">¿Olvidaste tu contraseña?{" "}
//                         <Link to="/forgot-password">Haz clic aquí</Link>
//                     </p>
//                 </div>

//             </form>

//         </>
//     )
// }

