// core or 3rd party libs
const express = require("express");
const router = express.Router();

const OrderControlller = require("../controllers/order.js");

//todo    to create resources

router.post("/", OrderControlller.create_new_order);

//todo     to fetch or read resources

router.get("/", OrderControlller.get_all_orders);

router.get("/:orderID", OrderControlller.get_single_order);

// todo   update resource

router.patch("/:orderID", OrderControlller.update_order);

// todo   delete resource

router.delete("/:orderID", OrderControlller.delete_order);

module.exports = router;
