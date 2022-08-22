// core or 3rd party libs
const express = require("express");
const router = express.Router();

const ProductControlller = require("../controllers/product.js");

//todo    to create resources

router.post("/", ProductControlller.add_new_product);

//todo     to fetch or read resources

router.get("/", ProductControlller.get_all_products);

router.get("/:productID", ProductControlller.get_single_product);

//todo    to update resources

router.patch("/:productID", ProductControlller.update_product);

//todo  delete resources

router.delete("/:productID", ProductControlller.delete_product);

module.exports = router;
