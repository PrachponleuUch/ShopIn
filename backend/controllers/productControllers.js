import Product from "../models/products.js"

// Get all products ==> /api/v1/products
export const getProducts = async (req, res) => {
  const products = await Product.find()
  res.status(200).json({
    products
  })
}

// Create new product ==> /api/v1/admin/products
export const newProduct = async(req, res) => {
  const product = await Product.create(req.body)

  res.status(200).json({
    product
  })
}