import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
// import Nav from "./components/Navbar/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Adminlogin from "./pages/AdminLogin";
import Adminhome from "./pages/AdminHome";
import Addusers from "./pages/Adduser";
import EditUser from "./pages/EditUser";


function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" Component={Home} />
                    <Route exact path="/signup" Component={Signup} />
                    <Route exact path="/login" Component={Login} />

                    <Route exact path="/profile" Component={Profile} />

                    <Route exact path="/admin/login" Component={Adminlogin} />
                    <Route exact path="/admin/" Component={Adminhome} />



                    <Route exact path="/admin/adduser" Component={Addusers} />
                    <Route exact path="/admin/edituser" Component={EditUser} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
