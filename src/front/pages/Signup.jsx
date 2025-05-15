import React, { useState } from "react"; //useState is imported from react
import { useNavigate } from "react-router-dom"; //useParam, useLocation, Link, useNavigate de react-dom
import useGlobalReducer from "../hooks/useGlobalReducer";
import { createSignup } from "../services/apiServicesFetch";




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

        if (signupData.password !== signupData.confirmPassword) {
            setError("Passwords do not match.");
            return; //to stop the function
        }

        // Now send to backend (optional: remove confirmPassword from the payload)
        const { confirmPassword, ...dataToSend } = signupData;

        const response = await createSignup(dispatch, dataToSend);
        // Check if the response indicates success
        if (response.success) {
            navigate("/home"); // Navigate after successful signup
        } else {
            setError(response.message || "Something went wrong during signup.");
        }
    };
    //onChange={(e) => setFormData(prevData => ({...prevData, email:e.target.value}))}
    return (
        <form onSubmit={handleFormInput}>
            <div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput5" className="form-label">
                        Name
                    </label>
                    <input
                        value={signupData.name}
                        name="name"
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput5"
                        placeholder="Enter name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput6" className="form-label">
                        Surname
                    </label>
                    <input
                        value={signupData.last_name}
                        name="last_name"
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput6"
                        placeholder="Enter surname"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">
                        Email
                    </label>
                    <input
                        value={signupData.email}
                        name="email"
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder="Enter email"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">
                        Password
                    </label>
                    <input
                        value={signupData.password}
                        name="password"
                        onChange={handleChange}
                        type="password"
                        className="form-control"
                        id="formGroupExampleInput2"
                        placeholder="Enter password"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput3" className="form-label">
                        Confirm password
                    </label>
                    <input
                        value={signupData.confirmPassword}
                        name="confirmPassword"
                        onChange={handleChange}
                        type="password"
                        className="form-control"
                        id="formGroupExampleInput3"
                        placeholder="Confirm password"
                    />
                </div>
                <div className="mb-3 form-check">
                    <label className="form-check-label" htmlFor="isSupervisorCheck">
                        Is Supervisor ?
                    </label>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="isSupervisorCheck"
                        name="is_supervisor"
                        checked={signupData.is_supervisor}
                        onChange={handleChange}
                    />
                </div>
                {/* Show error message from the setError update*/}
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Sign Up</button>
            </div>
        </form>
    );
};

export default SignUp;
