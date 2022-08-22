const Order = require("../models/order.js");

exports.create_new_order = (req, res, next) => {
  const products = req.body.products;
  const order = new Order({
    products,
  });
  order
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Order Created successfully.",
        result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.get_all_orders = (req, res, next) => {
  Order.find()
    .populate("products")
    .exec()
    .then((result) => {
      res.status(200).json({
        "No of orders": result.length,
        result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.get_single_order = (req, res, next) => {
  const id = req.params.orderID;

  Order.find({ _id: id })
    .populate("products")
    .exec()
    .then((order) => {
      if (order.length >= 1) {
        res.status(200).json({
          order,
        });
      } else {
        res.status(404).json({
          Message: "Order Not Found.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        error: err.message,
      });
    });
};

exports.update_order = (req, res, next) => {
  const id = req.params.orderID;
  const updateFields = {};

  for (const [key, value] of Object.entries(req.body)) {
    updateFields[key] = value;
  }
  Order.update({ _id: id }, { $set: updateFields })
    .exec()
    .then((order) => {
      if (order.modifiedCount >= 1) {
        res.status(200).json({
          message: "Order Updated Successfully",
        });
      } else {
        res.status(404).json({
          message: "Order Not Found",
        });
      }
      res.status(200).json({
        order,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.delete_order = (req, res, next) => {
  const id = req.params.orderID;

  Order.remove({ _id: id })
    .exec()
    .then((result) => {
      if (result.deletedCount >= 1) {
        res.status(200).json({
          message: "Order removed Successfully",
        });
      } else {
        res.status(404).json({
          message: "Order Not Found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    });
};
