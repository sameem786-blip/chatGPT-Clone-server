const router = require("express").Router();
const chatController = require("../controllers/chat");
const checkAuth = require("../middleware/cookieAuth");

router.post("/newChatGroup", chatController.createNewChatGroup);
router.get("/getChatGroups", chatController.getChatGroups);
router.get("/getGroupChats", chatController.getGroupChats);
router.post("/addChat", chatController.addChat);

module.exports = router;
