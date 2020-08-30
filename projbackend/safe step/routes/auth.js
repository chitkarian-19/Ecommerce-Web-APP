var express =require("express");
var router = express.Router();
const {signout,signup} = require("../controllers/auth");
      //import methods from controllers to routes {MTEHOD}



router.post("/signup",signup);
router.get("/signout", signout);

module.exports = router;
