const express = require("express");
const router = express.Router();
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getToken, processPayment } = require("../controllers/PaymentB");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);

//
router.get("/payment/gettoken/:userId",isSignedIn,isAuthenticated,getToken);

router.post("/payment/braintree/:userId",isSignedIn,isAuthenticated,processPayment)


module.exports = router;