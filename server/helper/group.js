const {Group} = require('../models');

module.exports = { 
    test: function(req, res){
        res.json('done');
    },
    createGroup: function(req, res){
        try {
            var group = new Group({
                name: 'nhóm đỉnh cao',
                description: 'mô tả đỉnh cao',
                avatarUrl: 'http://localhost:3000/',
                founder: 'quangdeptrai',
                members: ''
            })
            group.save(function(err, data) {
                if (err) return next(err);
                return res.status(200).json({
                    code: 200,
                    success: true,
                    data
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
            Group.findById(groupID,'member name founder description')
            .then(group => {
                res.json({
                    data: group
                });
            })
        }
        catch (e) {
            console.log('===================>', e)
            res.status(400).json('error');
        }     
    },
    editGroupInfo: function(req, res){
        try {
            var groupID = req.params.groupID;
            Group.findByIdAndUpdate(groupID,{ name: 'name', $set: {description: 'description2'}, $set: {founder: 'founder'}, $set: {avatarUrl: 'avatarUrl'}})
            .then(group =>{
                res.json({data: group});
                res.sendStatus(200).json('ok');
            })
        }
        catch(e){
            console.log('===================>', e)
            res.status(500).json('error');
        }
    }
};