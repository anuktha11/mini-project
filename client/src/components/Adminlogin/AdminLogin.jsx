import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        const admin = localStorage.getItem("admin");
        const token = JSON.parse(admin);

        if (!token?.data) {
            return navigate("/admin/login");
        } else {
            return navigate("/admin/");
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const { data } = await axios.post("http://localhost:3001/admin/login", { ...admin }, { withCredentials: true });

        console.log(data);
        if (data.error) {
            setErrors({ username: data.error });
            return;
        } else if (data.pswdError) {
            setErrors({ password: data.pswdError });
            return;
        }
        if (data.login) {
            localStorage.setItem("admin", JSON.stringify(data));

            navigate("/admin/");
        }
    };

    return (
        <div>
            <div className="OuterSingup">
                <form className="formSinup  pt-3 pe-3 ps-3" style={{ border: "1px solid grey", borderRadius: "10px" }}>
                    <div class="form-outline">
                        <div className="text-center">
                            <h3>ADMIN</h3>
                        </div>
                        <label class="form-label" for="form2Example1">
                            Username
                        </label>
                        <input
                            type="email"
                            id="form2Example1"
                            class="form-control"
                            name="username"
                            onChange={(e) => setAdmin({ ...admin, [e.target.name]: e.target.value })}
                        />
                        {errors.username && <span className="error-message text-danger">{errors.username}</span>}
                    </div>

                    <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="form2Example2"
                            class="form-control"
                            name="password"
                            onChange={(e) => setAdmin({ ...admin, [e.target.name]: e.target.value })}
                        />
                        {errors.password && <span className="error-message text-danger">{errors.password}</span>}
                    </div>

                    <div className="text-center">
                        <button type="button" class="btn btn-primary btn-block mb-4" onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;