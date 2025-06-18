import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import { createSignup } from "../services/apiServicesFetch";
import "../DesignComponents/SignUp/signup.css";
import AnimatedBackground from "../DesignComponents/GlobalComponents/AnimatedBackground";
import { useAuth } from "../hooks/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

const SignUp = () => {
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();
    const { login, user, loading } = useAuth();

    const [signupData, setSignupData] = useState({
        name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        is_supervisor: false,
    });

    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [justLoggedIn, setJustLoggedIn] = useState(false);

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setSignupData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFormInput = async (e) => {
        e.preventDefault();
        setError("");
        setMsg("");

        const { email, password, confirmPassword } = signupData;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!email || !password || !confirmPassword) {
            setError("Please fill out all fields.");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const { confirmPassword: _, ...dataToSend } = signupData;

        try {
            const response = await createSignup(dispatch, dataToSend);

            if (response.success) {
                await login(email, password); // auto login
                setJustLoggedIn(true); // marca que ya estamos logueados
                setMsg("Signup successful! Redirecting...");
            } else {
                setError(response.message || response.error || "An error occurred during registration.");
            }
        } catch (err) {
            setError("Error during signup or login.");
            console.error(err);
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

    useEffect(() => {
        if (justLoggedIn && user && !loading) {
            // Aquí usamos user.rol para decidir ruta
            if (user.rol) {
                navigate("/supervisor");
            } else {
                navigate("/employeehome");
            }
        }
    }, [justLoggedIn, user, loading, navigate]);

    return (
        <div className="signMain">
            <AnimatedBackground />
            <form onSubmit={handleFormInput} className="signForm">
                <div className="signHeading">
                    <h2>Create Account</h2>
                </div>
                <div className="container">
                    <div className="mb-3">
                        <label htmlFor="nameInput" className="Signform-label required-label">
                            Name
                        </label>
                        <input
                            value={signupData.name}
                            name="name"
                            onChange={handleChange}
                            type="text"
                            required
                            className="form-control custom-placeholder"
                            id="nameInput"
                            placeholder="Name..."
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="lastNameInput" className="Signform-label required-label">
                            Last Name
                        </label>
                        <input
                            value={signupData.last_name}
                            name="last_name"
                            onChange={handleChange}
                            type="text"
                            required
                            className="form-control custom-placeholder"
                            id="lastNameInput"
                            placeholder="Last name..."
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="emailInput" className="Signform-label required-label">
                            Email
                        </label>
                        <input
                            value={signupData.email}
                            name="email"
                            onChange={handleChange}
                            type="email"
                            required
                            className="form-control custom-placeholder"
                            id="emailInput"
                            placeholder="example@email.com"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="passwordInput" className="Signform-label required-label">
                            Password
                        </label>
                        <input
                            value={signupData.password}
                            name="password"
                            onChange={handleChange}
                            type="password"
                            required
                            className="form-control custom-placeholder"
                            id="passwordInput"
                            placeholder="Password..."
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirmPasswordInput" className="Signform-label required-label">
                            Confirm Password
                        </label>
                        <input
                            value={signupData.confirmPassword}
                            name="confirmPassword"
                            onChange={handleChange}
                            type="password"
                            required
                            className="form-control custom-placeholder"
                            id="confirmPasswordInput"
                            placeholder="Confirm password..."
                        />
                    </div>

                    <div className="mb-3 form-check form-switch">
                        <label className="form-check-label checkSuperv" htmlFor="isSupervisorCheck">
                            Supervisor?
                            <input
                                type="checkbox"
                                className="form-check-input supervok"
                                id="isSupervisorCheck"
                                name="is_supervisor"
                                checked={signupData.is_supervisor}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <AnimatePresence mode="wait">
                        {(error || msg) && (
                            <motion.div
                                key={error ? "error" : "success"}
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className={`alert ${error ? "alert-danger errorAlert" : "alert-success successAlert"}`}
                                style={{
                                    borderRadius: "12px",
                                    fontSize: "1rem",
                                    fontWeight: "500",
                                    marginBottom: "1rem",
                                }}
                                role="alert"
                            >
                                {error || msg}
                            </motion.div>
                        )}
                    </AnimatePresence>



                    <div className="mb-3 d-grid gap-2 contBtn">
                        <button className="btnSign btn" type="submit" disabled={loading}>
                            Sign Up
                        </button>
                    </div>

                    <div className="form-text emailHelp">
                        Already have an account? <Link className="linkColor" to="/login">Log in</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
