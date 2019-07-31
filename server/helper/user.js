const {User} = require('../models');
        bcrypt = require('bcrypt');

module.exports = { 
    test: function(req, res){
        res.status(200).json('true');
    },

    getHomeInfo: function(req, res){
        try{
            var userID = req.params.userID;
            User
            .findOne({ _id: userID },'fullName requestingUsers requestedUsers avatarUrl -_id')
            // .populate('user','fullName requestingUsers requestedUsers avatarUrl')
            .populate('friends','avatarUrl fullName')
            .populate('groups','avatarUrl name')
            .then(user => {
                res.status(200).json({user});
            })
        }
        catch (e) {
            console.log('===================>', e)
            res.status(404).json({
                code: 404,
                success: false,
                message: 'không tìm thấy'
            });
        }    
    },

    getUserInfo: function(req, res){
        try {
            var userID = req.params.userID;
            User
            .findById(userID,'fullName birthDate avatarUrl gender username email -_id')
            .then(user => {
                res.status(200).json(user);
            })
        }
        catch (e) {
            console.log('===================>', e)
            res.status(404).json({
                code: 404,
                success: false,
                message: 'không tìm thấy'
            });
        }     
    },

    changePassword: function(req, res){
        try {
            const { password } = req.body;
            var userID = req.params.userID;
            bcrypt
            .hash(password,10, function(err,hash){
                if (err) {
                    return next(err);
                }
                User
                .findByIdAndUpdate(userID,{ password: hash })
                .then(user => {
                    res.status(200).json({
                        code: 200,
                        success: true,
                    });
                })
            })
        }
        catch (e) {
            console.log('===================>', e)
            res.status(400).json({
                code: 400,
                success: false,
                message: 'có gì đó không đúng'
            });
        }
    },

    editUserInfo: function(req, res){
        try {
            const {fullName, gender, birthDate, avatarUrl} = req.body
            var userID = req.params.userID;
                User
                .findByIdAndUpdate(userID,{ fullName: fullName, gender: gender, birthDate: birthDate, avatarUrl:avatarUrl})
                .then(user => {
                    res.status(200).json({
                        success: true,
                    });
                })
        }
        catch (e) {
            console.log('===================>', e)
            res.status(404).json({
                success: false,
                message: 'có gì đó không đúng'
            });
        }
    },

    getListFriend: function(req, res){
        try {
            var userID = req.params.userID;
            User
            .findOne({_id: userID})
            .populate('friends','id')
            .then(listFriend => {
                res.status(200).json(listFriend.friends);
            })
        }
        catch (e) {
            console.log('===================>', e)
            res.status(400).json({
               code: 400,
               success: false,
               message: 'có gì đó không đúng'
            })
        }     
    },

    getListGroup: function(req, res){
        try {
            var userID = req.params.userID;
            User
            .findById(userID,'groups -_id')
            .then(listGroup => {
                res.status(200).json(listGroup);
            })
        }
        catch (e) {
            console.log('===================>', e)
            res.status(400).json({
               code: 400,
               success: false,
               message: "lỗi"
            })
        }    
    }
};
