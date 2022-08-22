// core or 3rd party libs
const express = require("express");
const router = express.Router();

const UserControlller = require("../controllers/user.js");

//todo    to create resources

router.post("/signup", UserControlller.signup);

router.post("/login", UserControlller.login);

//todo     to fetch or read resources

router.get("/", UserControlller.get_all_user);

router.get("/:userID", UserControlller.get_single_user);

// //todo    patch resources

router.patch("/:userID", UserControlller.update_user);

// todo     Delete resources

router.delete("/:userID", UserControlller.delete_user);

module.exports = router;
