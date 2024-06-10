import fs from "fs";
import { __dirname } from "../server.js";

export const getAllUsers = (req, res, next) => {
  const users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`));
  return res.status(200).json(users);
};


export const login = (req, res, next) => {
  const data = req.body
  const users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`));
  let user = users.filter(e=>e.name==data.name)
  if(user.length == 0 ){
    return res.status(400).json({message:"password or user not"})
  }if(user[0].password!=data.password){
    return res.status(400).json({message:"password or user not"})
  }
  return res.status(200).json(user);
};