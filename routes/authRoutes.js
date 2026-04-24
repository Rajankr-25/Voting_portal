const express = require("express");
const router = express.Router();

const User = require("../models/user");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "secret123";


// REGISTER

router.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.send("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.send("User Registered Successfully");

    } catch (error) {
        res.send(error);
    }

});


// LOGIN

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            SECRET_KEY
        );

        res.json({
            message: "Login successful",
            token: token,
            role: user.role
        });

    } catch (error) {
        res.json({
            message: "Login error"
        });
    }

});

module.exports = router;