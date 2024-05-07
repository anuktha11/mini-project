import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProfile } from "../../redux/userSlice";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});
    
    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = JSON.parse(user);

        if (token?.data) {
            navigate("/");
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("http://localhost:3001/login", { ...user }, { withCredentials: true });

            if (data.error) {
                setErrors({ username: data.error });
            } else if (data.pswdError) {
                setErrors({ password: data.pswdError });
            } else if (data.login) {
                localStorage.setItem("user", JSON.stringify(data));
                const { image, username, _id, email, phone } = data.user;
                dispatch(setProfile({ image, username, userid: _id, email, phone }));
                navigate("/");
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div>
            <div className="OuterSingup">
                <form className="formSinup pt-3 pe-3 ps-3">
                    <div className="text-center">
                        <h3>USER LOGIN</h3>
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
                            onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                        />
                        {errors.username && <span className="error-message text-danger">{errors.username}</span>}
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
                            onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                        />
                        {errors.password && <span className="error-message text-danger">{errors.password}</span>}
                    </div>

                    <div className="text-center">
                        <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleLogin}>
                            Login
                        </button>
                    </div>

                    <div className="text-center">
                        <p>
                            Don't have an account? <a href="/signup">Register here</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
