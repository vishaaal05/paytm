// backend/routes/user.js
const express = require("express");
const router = express.Router();

const { object, string } = require("zod");
const { User, Account } = require("../db");
const { sign } = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");
const { authMiddleware } = require("../middleware");

// import { object, string } from "zod";
// import { User, Account } from "../db";
// import { sign } from "jsonwebtoken";
// import { JWT_SECRET } from "./config";
// import { authMiddleware } from "../middleware";

const signupBody = object({
    username: string().email(),
	firstName: string(),
	lastName: string(),
	password: string()
})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body) // safeParse is a method provided by Zod that validates req.body (the incoming request body) against the signupBody schema.
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = sign({userId}, JWT_SECRET); // this code takes the userId and some signature as jwt secret code to create token

    res.json({
        message: "User created successfully",
        token: token
    })
})


const signinBody = object({
    username: string().email(),
	password: string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = sign({ userId: user._id}, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = object({
	password: string().optional(),
    firstName: string().optional(),
    lastName: string().optional(),
})

// updating user
router.put("/update", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne({ _id: req.body.id}, req.body);

    res.json({
        message: "Updated successfully"
    })
})


router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            { firstName: { $regex: filter, $options: 'i' } },
            { lastName: { $regex: filter, $options: 'i' } }
        ]
    });

    res.json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
})

module.exports = router;