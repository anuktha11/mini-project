// Modify AddUser component to include email and phone fields
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddUser() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: "", password: "", email: "", phone: "" });

    const addUser = async (e) => {
        e.preventDefault();
        const { data } = await axios.post("http://localhost:3001/admin/adduser", { ...user }, { withCredentials: true });

        if (data.add) {
            navigate("/admin/");
        }
    };

    return (
        <div>
            <div className="OuterSingup">
                <form className="formSinup pt-3 pe-3 ps-3"  >
                    <div className="text-center" style={{marginTop:'30px'}}>
                        <h3>ADD USER</h3>
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            name="username"
                            onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                        />
                    </div>

                    

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            name="email"
                            onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                        />
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="phone">
                            Phone
                        </label>
                        <input
                            type="text"
                            id="phone"
                            className="form-control"
                            name="phone"
                            onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                        />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            name="password"
                            onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                        />
                    </div>

                    <div className="text-center">
                        <button type="button" className="btn btn-primary btn-block mb-4" onClick={addUser}>
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddUser;
