import React, { useState, useEffect } from "react"; //useState is imported from react
import { useNavigate } from "react-router-dom"; //useParam, useLocation, Link, useNavigate de react-dom
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import { createSignup } from "../services/apiServicesFetch";
import "../DesignComponents/SignUp/signup.css";
import AnimatedBackground from "../DesignComponents/GlobalComponents/AnimatedBackground";



const SignUp = () => {


    const navigate = useNavigate()
    const { store, dispatch } = useGlobalReducer()
    const [signupData, setSignupData] = useState({
        name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        is_supervisor: false
    });

    const [error, setError] = useState("")
    const [msg, setMsg] = useState("")

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setSignupData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };


    const handleFormInput = async (e) => {
        e.preventDefault();

        setError(""); // Clear previous errors before submitting
        setMsg("");

        const { email, password, confirmPassword } = signupData;
        // Check for empty fields
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!email || !password || !confirmPassword) {
            setError("Please fill in all the fields.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return; //to stop the function
        }

        // Now send to backend (optional: remove confirmPassword from the payload)
        const { confirmPassword: confirmPword, ...dataToSend } = signupData;

        const response = await createSignup(dispatch, dataToSend);
        // Check if the response indicates success
        if (response.success) {
            setMsg(response.message);
            setTimeout(() => {
                navigate("/login"); // Navigate after successful signup
            }, 3000);
        } else {
            setError(response.message || "Something went wrong during signup.");
        }
    };
    //onChange={(e) => setFormData(prevData => ({...prevData, email:e.target.value}))}
    return (
        <div className="signMain">
            <AnimatedBackground/>
            <form onSubmit={handleFormInput} className="signForm">
                <div className="signHeading"><h2>Create an account</h2></div>
                <div className="container">
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput5" className="Signform-label required-label">
                            NAME
                        </label>
                        <input
                            value={signupData.name}
                            name="name"
                            onChange={handleChange}
                            type="text"
                            required className="form-control custom-placeholder"
                            id="formGroupExampleInput5"
                            placeholder="Enter name..."
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput6" className="Signform-label required-label">
                            LASTNAME
                        </label>
                        <input
                            value={signupData.last_name}
                            name="last_name"
                            onChange={handleChange}
                            type="text"
                            required className="form-control custom-placeholder"
                            id="formGroupExampleInput6"
                            placeholder="Enter Lastname..."
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="Signform-label required-label">
                            EMAIL
                        </label>
                        <input
                            value={signupData.email}
                            name="email"
                            onChange={handleChange}
                            type="text"
                            required className="form-control custom-placeholder"
                            id="formGroupExampleInput"
                            placeholder="Enter email..."
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="Signform-label required-label">
                            PASSWORD
                        </label>
                        <input
                            value={signupData.password}
                            name="password"
                            onChange={handleChange}
                            type="password"
                            required className="form-control custom-placeholder"
                            id="formGroupExampleInput2"
                            placeholder="Enter password..."
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput3" className="Signform-label required-label">
                            CONFIRM PASSWORD
                        </label>
                        <input
                            value={signupData.confirmPassword}
                            name="confirmPassword"
                            onChange={handleChange}
                            type="password"
                            required className="form-control custom-placeholder"
                            id="formGroupExampleInput3"
                            placeholder="Confirm password..."
                        />
                    </div>
                    <div className="mb-3 form-check form-switch ">
                        <label className="form-check-label checkSuperv" htmlFor="isSupervisorCheck">
                            Is Supervisor ?
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
                    {/* Show error message from the setError update*/}
                    {error && <div className="alert alert-danger errorAlert">{error}</div>}
                    {msg && <div className="alert alert-success successAlert">{msg}</div>}
                    <div className="mb-3 d-grid gap-2 contBtn"><button className="btnSign btn" type="submit">Continue</button></div>
                     <div className="form-text emailHelp">
                    Already have an account? <Link to="/login">Login</Link>
                        </div>
                
                </div>
            </form>
        </div>
    );
};

export default SignUp;


//  <div id="emailHelp" className="form-text">
//      Already have an account? <Link to="/login">Register</Link>
//          </div>