import express from "express"
import { getAllUsers, login } from "../Controllers/userCd.js"

const userRuter = express.Router()
userRuter.route("/").get(getAllUsers).post(login)


export default userRuter