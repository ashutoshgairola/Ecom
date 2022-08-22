const Product = require("../models/product.js");

const url = "http://localhost:3000/product";

exports.add_new_product = (req, res, next) => {
  const ProductName = req.body.ProductName;
  const ProductCategory = req.body.ProductCategory;
  const ProductPrice = req.body.ProductPrice;

  const product = new Product({ ProductName, ProductCategory, ProductPrice });

  product
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Product Created successfully.",
        "Created Product": {
          "Product Name": result.ProductName,
          "Product Category": result.ProductCategory,
          Request: {
            type: "GET",
            URL: `${url}/${result._id}`,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.get_all_products = (req, res, next) => {
  Product.find()
    .select("ProductName _id ProductCategory")
    .exec()
    .then((result) => {
      const response = {
        "No of products": result.length,
        products: result.map((product) => {
          return {
            ProductName: product.ProductName,
            ProductCategory: product.ProductCategory,
            Request: {
              type: "GET",
              URL: `${url}/${product._id}`,
            },
          };
        }),
      };
      res.status(200).json({
        response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.get_single_product = (req, res, next) => {
  const id = req.params.productID;

  Product.find({ _id: id })
    .exec()
    .then((product) => {
      if (product.length >= 1) {
        res.status(200).json({
          product,
        });
      } else {
        res.status(404).json({
          Message: "Product Not Found.",
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

exports.update_product = (req, res, next) => {
  const id = req.params.productID;
  const updateFields = {};

  for (const [key, value] of Object.entries(req.body)) {
    updateFields[key] = value;
  }
  Product.update({ _id: id }, { $set: updateFields })
    .exec()
    .then((product) => {
      res.status(200).json({
        product,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.delete_product = (req, res, next) => {
  const id = req.params.productID;

  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      if (result.deletedCount >= 1) {
        res.status(200).json({
          message: "Product removed Successfully",
        });
      } else {
        res.status(404).json({
          message: "Product Not Found",
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
