const router        = require('express').Router(),
	  messageHelper = require('../helper/message');

router.route('/')
	.get(messageHelper.getMessages);


module.exports = router;
