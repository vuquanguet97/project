const express = require('express');
const groupRouter = express.Router();
const groupHelper = require('../helper/group')

groupRouter.route('/:groupID')
    .get(groupHelper.getGroupInfo)

groupRouter.route('/:groupID')
    .put(groupHelper.editGroupInfo)

groupRouter.route('/')
    .post(groupHelper.createGroup)

module.exports = groupRouter;
