const {User} = require('../models');

module.exports = { 
    test: function(req, res){
        res.status(200).json('true');
    },

    getUserInfo: function(req, res){
            try {
                var userID = req.params.userID;
                User.findById(userID,'username fullname email gender birthDate avatarUrl').then(user => {
                    res.json({
                        data: user
                    });
                })
            }
            catch (e) {
                console.log('===================>', e)
                res.json({
                    s: 'error'
                })
            }     
    },

    editUserInfo: function(req, res){
        try {
            var userID = req.params.userID;
                User.findByIdAndUpdate(userID,'username fullname email gender birthDate avatarUrl',{ username: 'quangsieudeptrai'}).then(user => {
                    res.status(200).json({
                        code: 200,
                        success: true,
                    });
                })
        }
        catch (e) {
            console.log('===================>', e)
            res.status(500).json({
                code: 500,
                success: false,
                message: ''
            });
        }
    },

    changePassword: function(req, res){
        try {
            var userID = req.params.userID;
                User.findByIdAndUpdate(userID,{ password: 'xxxxxx'}).then(user => {
                    res.status(200).json({
                        code: 200,
                        success: true,
                    });
                })
        }
        catch (e) {
            console.log('===================>', e)
            res.status(500).json({
                code: 500,
                success: false,
                message: ''
            });
        }
    },

    getListFriend: function(req, res){
        try {
            var userID = req.params.userID;
            User.findById(userID,'friends.friend')
            .then(user => {
                res.json({
                    data: user
                });
            })
        }
        catch (e) {
            console.log('===================>', e)
            res.json({
                s: 'error'
            })
        }     
    }
};