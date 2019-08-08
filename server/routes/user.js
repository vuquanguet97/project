const express = require('express');
const userRouter = express.Router();
const userHelper = require('../helper/user');
const {withAuth} = require('../middleware/middleware');

userRouter.route('/search/:search')
    .get(withAuth, userHelper.searchFriend);

userRouter.route('/:userID')
    .get(withAuth, userHelper.getUserInfo)
	.put(userHelper.editUserInfo);

userRouter.route('/:userID/home')
    .get(withAuth, userHelper.getHomeInfo);

userRouter.route('/:userID/pass')
    .put(withAuth, userHelper.changePassword);

userRouter.route('/:userID/friends')
    .get(withAuth, userHelper.getListFriend);

userRouter.route('/:userID/groups')
    .get(withAuth, userHelper.getListGroup);

userRouter.route('/:userID/request')
    .get(withAuth, userHelper.getListRequestingFriend);

userRouter.route('/:userID/requested')
    .get(withAuth, userHelper.getListRequestedFriend);

userRouter.route('/:userID/makingRequest')
    .put(withAuth, userHelper.sendingRequestAddFriend);

userRouter.route('/:userID/friendProcess')
    .put(userHelper.actionFriendRequest);

module.exports = userRouter;
