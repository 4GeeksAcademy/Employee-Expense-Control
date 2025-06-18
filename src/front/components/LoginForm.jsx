import useLoginForm from "../hooks/useLoginForm"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/AuthContext"
import { fetchLogin } from "../services/apiServicesFetch";
import { Link } from "react-router-dom"
import "../DesignComponents/SignUp/signup.css";
import AnimatedBackground from "../DesignComponents/GlobalComponents/AnimatedBackground";

const LoginForm = () => {

    const { email, setEmail, password, setPassword, rolNavigate } = useLoginForm()
    const { login } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // clear previous error
        setMsg("");
        try {
            const userData = await login(email, password);
            setMsg("Login successful! Redirecting...");
            setTimeout(() => {
                rolNavigate(userData);
            }, 2000);
        } catch (error) {
            console.error(error);
            setError(error.message); // Show the specific error message
        }
    };

    useEffect(() => {
        if (error || msg) {
            const timeout = setTimeout(() => {
                setError("");
                setMsg("");
            }, 5000); // hide after 5 seconds

            return () => clearTimeout(timeout);
        }
    }, [error, msg]);



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
                            Forgot your password? <Link className="linkColor" to="/forgot-password">Reset it here</Link>
                        </div>

                    </div>

                    {error && <div className="alert alert-danger errorAlert">{error}</div>}
                    {msg && <div className="alert alert-success successAlert">{msg}</div>}

                    <div className="d-grid gap-2 contBtn">
                        <button type="submit" className="btnSign btn">
                            Login
                        </button>
                    </div>
                    <div className="form-text emailHelp">
                        Need an account? <Link className="linkColor" to="/signup">Register</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};


export default LoginForm
