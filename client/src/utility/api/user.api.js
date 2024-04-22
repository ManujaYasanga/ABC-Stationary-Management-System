import axios from "axios";
const BASE_API = axios.create({ baseURL: "http://127.0.0.1:5000/user" });

async function UserRegisterAPI({ username, password, email }) {
    return await BASE_API.post("/register", {
        username, password, email
    })
};

async function UserLoginAPI({email, password}) {
    return await BASE_API.post("/login", {
        email, password
    })
}

async function getUserData(token) {
    return await BASE_API.get("/get-data", {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}

export { UserLoginAPI, UserRegisterAPI, getUserData };

