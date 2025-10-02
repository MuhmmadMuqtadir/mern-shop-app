const express = require("express");
const router = express.Router();
const { sellProduct, getSales } = require("../controllers/saleController");

router.post("/sell", sellProduct);
router.get("/", getSales);

module.exports = router;
