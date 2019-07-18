const User = require('../models/');

module.exports = { 
    test: function(req, res){
        res.json('done');
    },

    getUserInfo: function(req, res){
            try {
                var userID = req.params.userID;
                // console.log('====================>', req.param('id'),req.params);
                User.findById(userID,'username fullname email gender birthDate avatarUrl').then(user => {
                    res.json({
                        data: user
                    });
                })
            }
            catch (e) {
                console.log('===================>', error)
                res.json({
                    s: 'error'
                })
            }     
    },

    editUserInfo: function(req, res){
        try {
            var userID = req.params.userID;
                User.findByIdAndUpdate(userID,{ username: 'quangsieudeptrai'}).then(user => {
                    res.json({
                        data: user
                    });
                })
        }
        catch (e) {
            console.log('===================>', error)
            res.json({
                s: 'error'
            })
        }
    }
};