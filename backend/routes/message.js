
const router = require('express').Router();

const { addMessage, getMessages} = require('../controllers/MessageController');

router.post("/addmsg", addMessage);
router.post("/getmsg", getMessages);

module.exports = router; 