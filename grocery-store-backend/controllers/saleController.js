const Product = require("../models/Product");
const Sale = require("../models/Sale");

// Record a sale
exports.sellProduct = async (req, res) => {
  try {
    const { barcode, quantitySold } = req.body;

    const product = await Product.findOne({ barcode });
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.quantity < quantitySold) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    product.quantity -= quantitySold;
    await product.save();

    const totalPrice = product.price * quantitySold;
    const sale = new Sale({ barcode, quantitySold, totalPrice });
    await sale.save();

    res.json({ message: "Sale recorded", sale });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get sales report
exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
