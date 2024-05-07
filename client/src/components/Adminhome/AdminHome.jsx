import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeUser } from "../../redux/adminSlice";
import "./Home.css";

function AdminHome() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");

    const[count,setCount] = useState(0)
 const increase =()=>{
    setCount (count+1)
 }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3001/admin/details");
            setData(response.data.userData);

            const admin = localStorage.getItem("admin");
            const token = JSON.parse(admin);
            if (!token?.data) {
                navigate("/admin/login");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteData = async (id) => {
        try {
            const { data } = await axios.post("http://localhost:3001/admin/deleteUser", { id });
            setData(data.details);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div>
                <button className="button" onClick={() => navigate("/admin/addUser")}>
                    Add User
                </button>
            </div>
            
          <p> {count}</p> 
                <button onClick={increase}> count</button>


            <div>
                <div className="input-group rounded" style={{ width: "500px", marginLeft: "20%" }}>
                    <input
                        type="search"
                        className="form-control rounded"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="search-addon"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <span className="input-group-text border-0" id="search-addon">
                        <i className="fas fa-search"></i>
                    </span>
                </div>
            </div>
            <div className="container">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Users</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data
                            .filter((user) => user.username.toLowerCase().includes(query))
                            .map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <img src={`/Images/${item.image}`} alt="image" style={{ width: "50px" }}></img>
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => {
                                                dispatch(changeUser({ id: item._id, name: item.username,email: item.email,phone: item.phone }));
                                                navigate("/admin/editUser");
                                            }}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-danger" onClick={() => deleteData(item._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminHome;
