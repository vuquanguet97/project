const {Group} = require('../models');

module.exports = {
    test: function(req, res){
        res.json('done');
    },

    createGroup: function(req, res){
        try {
            const {name, description, avatarUrl, founder, members} = req.body;
            var group = new Group({ name, description, avatarUrl, founder, members})
            group
            .save(function(err, data) {
                if (err) return console.log(err);
                return res.status(200).json({
                    code: 200,
                    success: true,
                });
            });
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

    getGroupInfo: function(req, res){
        try {
            var groupID = req.params.groupID;
            if(userID != founder){
                res.status(404).json({
                    code: 404,
                    success: false,
                    message: 'Không được phép'
                });
            }else{
                Group
                .findById(groupID,'name founder description')
                .populate('members','avatarUrl fullName')
                .then(group => {
                    res.json(group);
                })
            } 
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

    editGroupInfo: function(req, res){
        try {
            const {name, description, founder, avatarUrl, members} = req.body;
            var groupID = req.params.groupID;
            Group
            .findByIdAndUpdate(groupID,{ name: name, description: description, founder: founder, avatarUrl: avatarUrl, members: members})
            .then(group =>{
                console.log(group)
                res.status(200).json({
                    code: 200,
                    success: true,
                });
            })
        }
        catch(e){
            console.log('===================>', e)
            res.status(400).json({
                code: 400,
                success: false,
                message: 'có gì đó không đúng'
             })
        }
    }
};
