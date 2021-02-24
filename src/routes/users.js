const router = require("express").Router();

router.get("/users/signin", (req, res) => {
  res.send("Signin");
});
router.get("/users/signup", (req, res) => {
  res.send("Signup");
});
module.exports = router;
