const router = require("express").Router();

const userController = require("../controllers/user");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/googleAuth", userController.googleAuth);

module.exports = router;
