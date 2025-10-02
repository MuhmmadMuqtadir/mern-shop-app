const Product = require("../models/Product");

// Add product
exports.addProduct = async (req, res) => {
  try {
    const { barcode, name, price, quantity, category, expiryDate } = req.body;

    let product = await Product.findOne({ barcode });
    if (product) {
      // If product exists, update details
      product.name = name || product.name;
      product.price = price || product.price;
      product.quantity += quantity; // add stock
      product.category = category || product.category;
      product.expiryDate = expiryDate || product.expiryDate;
      await product.save();
      return res.json({ message: "Product updated", product });
    }

    // New product
    product = new Product({ barcode, name, price, quantity, category, expiryDate });
    await product.save();
    res.json({ message: "Product added", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get product by barcode
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ barcode: req.params.barcode });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
