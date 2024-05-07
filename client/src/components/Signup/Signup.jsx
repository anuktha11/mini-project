// Signup.jsx

import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { validateUsername, validatePassword, validatePhone } from "./validation";

function Signup() {
    const navigate = useNavigate();

    const [user, setUser] = useState({ username: "", password: "", email: "", phone: "" });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        let error = "";

        switch (name) {
            case "username":
                error = validateUsername(value);
                break;
            case "password":
                error = validatePassword(value);
                break;
            case "phone":
                error = validatePhone(value);
                break;
            default:
                break;
        }

        setErrors({
            ...errors,
            [name]: error
        });

        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        // Check for empty fields
        for (const key in user) {
            if (!user[key].trim()) {
                setErrors({
                    ...errors,
                    [key]: `${key.charAt(0).toUpperCase() + key.slice(1)} is required`
                });
                return;
            }
        }

        try {
            const { data } = await axios.post("http://localhost:3001/signup", { ...user }, { withCredentials: true });
            console.log(data);

            if (data.signup) {
                navigate("/login");
            }
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    return (
        <div className="OuterSingup">
            <form className="formSinup pt-3 pe-3 ps-3">
                <div className="text-center">
                    <h3>USER SIGNUP</h3>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example1">
                        Username
                    </label>
                    <input
                        type="text"
                        id="form2Example1"
                        className="form-control"
                        name="username"
                        onChange={handleChange}
                    />
                    {errors.username && <div className="error-message">{errors.username}</div>}
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example3">
                        Email
                    </label>
                    <input
                        type="email"
                        id="form2Example3"
                        className="form-control"
                        name="email"
                        onChange={handleChange}
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example4">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        id="form2Example4"
                        className="form-control"
                        name="phone"
                        onChange={handleChange}
                    />
                    {errors.phone && <div className="error-message">{errors.phone}</div>}
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="form2Example2"
                        className="form-control"
                        name="password"
                        onChange={handleChange}
                    />
                    {errors.password && <div className="error-message">{errors.password}</div>}
                </div>

                <div className="text-center">
                    <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleSignup}>
                        Sign Up
                    </button>
                </div>

                <div className="text-center">
                    <p>
                        Already have an account? <a href="/login">Sign in</a>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Signup;
