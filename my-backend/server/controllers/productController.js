import fs from "fs"
import { __dirname } from "../server.js";

export const getAllProduct = (req,res)=>{
    try {
        const products = JSON.parse(fs.readFileSync(`${__dirname}/data/product.json`))
        return res.status(200).json(products)
    } catch (err) {
        return res.status(500).json({masseg:"something wrong"})
    }
}


export const getIdProduct = (req,res)=>{
    try {
        const {id}=req.params
        const products = JSON.parse(fs.readFileSync(`${__dirname}/data/product.json`))
        const product = products.filter(e=>e.id==id)
        return product.length>0 ? res.status(200).json(product) : res.status(400).json({masseg:"not id"})
    } catch (err) {
        return res.status(500).json({masseg:"something wrong"})
    }
}

export const addProduct = (req,res)=>{
    try {
        const data = req.body
        const products = JSON.parse(fs.readFileSync(`${__dirname}/data/product.json`))
        const newId = products[products.length-1].id +1
        products.push({...data,id:newId})
        fs.writeFileSync(`${__dirname}/data/product.json`,JSON.stringify(products))
        return res.status(201).json({...data,id:newId})
    } catch (err) {
        return res.status(500).json({masseg:"something wrong"})
    }
}

export const removeProduct = (req,res)=>{
    try {
        const {id}=req.params
        const products = JSON.parse(fs.readFileSync(`${__dirname}/data/product.json`))
        const newProducts = products.filter(e=>{
            if(e.id == id){
                return false
            }
            return e
        })
        fs.writeFileSync(`${__dirname}/data/product.json`,JSON.stringify(newProducts))
        return res.status(200).json(products)
    } catch (err) {
        return res.status(500).json({masseg:"something wrong"})
    }
}

export const UpProduct = (req,res)=>{
    try {
        const {id}=req.params
        const data = req.body
        const products = JSON.parse(fs.readFileSync(`${__dirname}/data/product.json`))
        const newProducts = products.map(e=>{
            if(e.id == id){
                return {...e,...data}
            }
            return e
        })
        fs.writeFileSync(`${__dirname}/data/product.json`,JSON.stringify(newProducts))
        return res.status(201).json(newProducts)
    } catch (err) {
        return res.status(500).json({masseg:"something wrong"})
    }
}