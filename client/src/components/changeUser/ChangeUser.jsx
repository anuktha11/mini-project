import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { changeUser } from "../../redux/adminSlice";

function ChangeUser() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { name, id, email, phone } = useSelector((state) => state.admin);
    const [userData, setUserData] = useState({
        username: name,
        email ,  
        phone   
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value
        }));
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            console.log( userData)

            const response = await axios.post("http://localhost:3001/admin/edituser", {
                id: id,
                ...userData
            });
            const data = response.data;
            if (data.update) {
                navigate("/admin/");
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div>
            <div>
                <div className="OuterSingup">
                    <form
                        className="formSinuppt-5 pe-5 ps-5"
                        style={{ border: "1px solid grey", borderRadius: "10px" }}
                        onSubmit={handleEdit}
                    >
                        <div className="text-center">
                            <h4>EDIT USER</h4>
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={userData.username}
                                className="form-control"
                                name="username"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={userData.email}
                                className="form-control"
                                name="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="phone">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                value={userData.phone}
                                className="form-control"
                                name="phone"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary btn-block mb-4">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangeUser;