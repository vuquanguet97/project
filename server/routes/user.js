const express = require('express');
const userRouter = express.Router();
const userHelper = require('../helper/user')

userRouter.route('/test')
    .get(userHelper.test)

userRouter.route('/:userID')
    .get(userHelper.getUserInfo)

userRouter.route('/:userID')
    .put(userHelper.editUserInfo)

userRouter.route('/userID/pass')
    .put(userHelper.changePassword)

userRouter.route('/:userID/friends')
    .get(userHelper.getListFriend)

module.exports = userRouter;
