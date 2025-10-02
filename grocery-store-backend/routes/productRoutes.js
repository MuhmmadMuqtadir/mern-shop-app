const express = require("express");
const router = express.Router();
const { addProduct, getProduct, getAllProducts } = require("../controllers/productController");

router.post("/add", addProduct);
router.get("/:barcode", getProduct);
router.get("/", getAllProducts);

module.exports = router;
