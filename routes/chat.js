const router = require("express").Router();
const chatController = require("../controllers/chat");
const checkAuth = require("../middleware/cookieAuth");

router.post("/newChatGroup", checkAuth, chatController.createNewChatGroup);
router.get("/getChatGroups", checkAuth, chatController.getChatGroups);
router.get("/getGroupChats", checkAuth, chatController.getGroupChats);
router.post("/addChat", checkAuth, chatController.addChat);

module.exports = router;
