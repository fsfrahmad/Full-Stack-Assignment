const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const User = require("../models/User");
const bcrypt = require('bcrypt');

router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(200).json({message: "User created successfully",user});
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid credentials" });
        }
        res.status(200).json({message: "Login Successful",user});
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;

