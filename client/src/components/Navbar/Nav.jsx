/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Nav() {
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = JSON.parse(user);

        if (!token?.data) {
            return navigate("/login");
        } else {
            return navigate("/");
        }
    }, [navigate]);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        navigate("/login");
    };
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        Home
                    </a>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link icon" onClick={() => navigate("/profile")}>
                                    <i class="fa-solid fa-user"></i>
                                </a>
                            </li>

                            <li class="nav-item">
                                <a
                                    class="nav-link active"
                                    type="button"
                                    onClick={handleLogout}
                                    aria-current="page"
                                    href="#"
                                >
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Nav;
