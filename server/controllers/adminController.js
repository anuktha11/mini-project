const adminCollection = require("../models/adminSchema");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const users = require("../models/userSchema");

const JWT_SECRET = "qpuEEAkckC40XDAhjQAKUpEbvvEWdoNf";
module.exports = {
    adminLogin: async (req, res) => {
        const { username, password } = req.body;
        console.log("admin", req.body);
        let admin = await adminCollection.findOne({ username: username });
        if (!admin) {
            res.json({ error: "not found" });
        } else {
            if (password !== admin.password) {
                res.json({ pswdError: "Incorrect password" });
            } else {
                const token = jwt.sign({}, JWT_SECRET);
                res.json({ status: "ok", login: true, data: token, admin });
                console.log({ data: admin, token });
            }
        }
    },

    showUser: async (req, res) => {
        try {
            const userData = await users.find().toArray();
            if (!userData) {
                res.json({ error: "empty" });
            } else {
                res.json({ status: true, userData });
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    addUser: async (req, res) => {
        const { username, password, email, phone } = req.body;
        console.log("new_user ", username);
        try {
            const existingUser = await users.findOne({ username: username });
            if (existingUser) {
                res.json({ error: "User already exists" });
            } else {
                const userData = { username, password, email, phone };
                await users.insertOne(userData);
                res.json({ add: true });
            }
        } catch (error) {
            console.error("Error adding user:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    changeUser: async (req, res) => {
        const userData = req.body;
        const id = userData.id;
        const { username, email, phone } = userData;
        console.log("userdata ", userData);
        
        try {
            const existingUser = await users.findOne({ _id: new ObjectId(id) });
            
            if (!existingUser) {
                res.json({ error: "User not found" });
                return;
            }
            
            // Check if the new username already exists
            if (username !== existingUser.username) {
                const usernameExists = await users.findOne({ username: username });
                if (usernameExists) {
                    res.json({ error: "Username already exists" });
                    return;
                }
            }
    
            // Perform the update operation
            const updatedUser = await users.updateOne(
                { _id: new ObjectId(id) },
                { $set: { username: username, email: email, phone: phone } }
            );
    
            if (updatedUser.modifiedCount === 1) {
                res.json({ update: true });
            } else {
                res.json({ error: "Failed to update user" });
            }
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    

    deleteUser: async (req, res) => {
        const { id } = req.body;
        console.log("deleted", id);
        try {
            await users.deleteOne({ _id: new ObjectId(id) });
            const details = await users.find().toArray();
            res.json({ delete: true, details });
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
};
