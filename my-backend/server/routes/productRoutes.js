import express from "express"
import {UpProduct, addProduct, getAllProduct, getIdProduct, removeProduct} from "../controllers/productController.js"

const productsRuter = express.Router()
productsRuter.route("/").get(getAllProduct).post(addProduct)
productsRuter.route("/:id").get(getIdProduct).delete(removeProduct).patch(UpProduct)

export default productsRuter