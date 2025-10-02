const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  barcode: { type: String, required: true },
  quantitySold: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model("Sale", saleSchema);
