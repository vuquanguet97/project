const express = require('express');
const userRouter = express.Router();
const userHelper = require('../helper/user')

// userRouter.route('/test')
//     .get((req, res) => {
//         res.json('done');
//     })

userRouter.route('/test')
    .get(userHelper.test)

userRouter.route('/:userID')
    .get(userHelper.getUserInfo)

userRouter.route('/:userID')
    .put(userHelper.editUserInfo)

module.exports = userRouter;
