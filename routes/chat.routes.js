const express = require('express');

const chatController = require('../controllers/chat.controller');

const router = express.Router();

router.get('/', chatController.findAll);

router.post('/create', chatController.create);

module.exports = router;
