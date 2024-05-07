import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setProfile } from "../../redux/userSlice";

function Cards() {
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = JSON.parse(user);

        if (!token?.data) {
            return navigate("/login");
        } else {
            return navigate("/profile");
        }
    }, [navigate]);

    const dispatch = useDispatch();
    const { userid, username, image, email, phone } = useSelector((state) => state.user);

    console.log("User Profile:", { userid, username, image, email, phone }); 

    const [imageUrl, setImageUrl] = useState(null);

    const imageUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", imageUrl);
        formData.append("userId", userid);

        const config = {
            headers: {
                "content-type": "multipart/form-data",
                userId: userid,
            },
            withCredentials: true,
        };

        try {
            const { data } = await axios.post("http://localhost:3001/profile", formData, config);

            dispatch(setProfile({ image: data.imageUrl, username, userid, email, phone }));
            console.log("Image upload response:", data);
        } catch (error) {
            console.error("Image upload error:", error);
        }
    };

    const handleFileChange = (e) => {
        setImageUrl(e.target.files[0]);
    };

    return (
        <div>
            <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <form onSubmit={imageUpload}>
                    <div className="card pt-3 ms-2 mt-5" style={{ width: "300px", textAlign: "center" }}>
                        <label htmlFor="imageInput">
                            <img
                                className="mx-auto mt-4 card-img-top"
                                src={`/Images/${image}`}
                                alt="..."
                                style={{ width: "100px", cursor: "pointer", margin: "0 auto" }}
                            />
                            <input id="imageInput" type="file" style={{ display: "none" }} onChange={handleFileChange} />
                        </label>
                        <div className="card-body">
                            
                            <input className=" mt-3 btn btn-primary" type="submit" value="Submit" />
                        </div>
                       
                        <h6 className="mx-auto mt-2">{username}</h6>
                        <p style={{ textAlign: 'center' }}>Email: {email}</p>
                        <p style={{ textAlign: 'center' }}>Phone: {phone}</p>
                        
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Cards;
