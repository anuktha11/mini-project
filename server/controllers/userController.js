const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { ObjectId } = mongoose.Types;

const JWT_SECRET = "qpuEEAkckC40XDAhjQAKUpEbvvEWdoNf";

const user = require("../models/userSchema");

module.exports = {
    signup: async (req, res) => {
        let userData = req.body;
        const { username, password, email, phone } = req.body;
        const existingUser = await user.findOne({ username: username });
        if (!existingUser) {
            user.insertOne(userData).then((data) => {
                console.log(data);
                res.json({ signup: true });
            });
        } else {
            res.json({ error: "existing" });
        }
    },

    userLogin: async (req, res) => {
        console.log(req.body);
        const { username, password } = req.body;
        let userData = await user.findOne({ username: username });
        console.log(userData);
        if (!userData) {
            res.json({ error: "not found" });
        } else {
            if (password != userData.password) {
                res.json({ pswdError: "Incorrect password" });
            }
            if (password == userData.password) {
                console.log("sdfghjk");
                const token = jwt.sign({}, JWT_SECRET);
                res.json({ status: "ok", login: true, data: token, user: userData });
            }
        }
    },

    imageUpload: (req, res) => {
        console.log(req.body);
        const { userId } = req.body;

        const imgUrl = req.file.filename;

        user.updateOne({ _id: new ObjectId(userId) }, { $set: { image: imgUrl } }).then((data) => {
            console.log(data);
            res.json({ status: true, imageUrl: imgUrl });
        });
    },
};
