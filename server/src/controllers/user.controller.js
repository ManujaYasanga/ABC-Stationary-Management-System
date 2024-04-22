const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


async function register(req, res) {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ msg: "All fields are required!" });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const dbRes = await UserModel.create({
            username,
            password : passwordHash,
            email,
        });
        console.log(dbRes);
        return res.json({ msg: "User Created" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server side Error Occured" });
    }
}

const JWT_TOKEN = process.env.JWT_TOKEN;

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        const isValid = await bcrypt.compare(password, user.password);

        if (isValid) {
            const token = jwt.sign(
                { _id: user.id, username: user.username, email: user.email },
                JWT_TOKEN,
                { expiresIn: "10h" }
            );
            res.status(200).json({ token });
        } else {
            res.status(401).json({ msg: "Unauthorized" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server side Error Occured" });
    }
}

async function getUserData(req, res) {
        try {
            const token = req.headers.authorization;
    
            if (!token) {
                return res.status(401).json({ msg: "Unauthorized" });
            }
    
            const _tokenData = token.split(" ")[1];
    
            const _decoded = jwt.verify(_tokenData, JWT_TOKEN);
            const id = _decoded._id;
            const user = await UserModel.findById(id);
            const { password, ...rest } = user._doc;
            res.json({ user: rest });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Server side Error Occured" });
        }
}



module.exports = {register, login, getUserData}