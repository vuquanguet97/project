const express = require('express');
const userRouter = express.Router();
const userHelper = require('../helper/user')

userRouter.route('/test')
    .get(userHelper.test)

userRouter.route('/:userID')
    .get(userHelper.getUserInfo)

userRouter.route('/:userID/home')
    .get(userHelper.getHomeInfo)

userRouter.route('/:userID')
    .put(userHelper.editUserInfo)

userRouter.route('/:userID/pass')
    .put(userHelper.changePassword)

userRouter.route('/:userID/friends')
    .get(userHelper.getListFriend)

userRouter.route('/:userID/groups')
    .get(userHelper.getListGroup)

module.exports = userRouter;
