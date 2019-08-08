const express = require('express');
const router = express.Router();
const UserData = require('../models/User');
const jwt = require('jsonwebtoken');

const secret = 'omi-nodejs';

function authenticate( res, err, user, password, username){
    if(err){
        console.error(err);
        res.status(500)
            .json({
                error: 'Something wrong! Please try again'
            });
    }else if (!user){
        res.status(401)
            .json({
                code: 401,
                success: false,
                message: 'Nhap sai email hoac mat khau'
            });
    } else {
        user.isCorrectPassword(password, function (err, same) {
            if(err){
                res.status(500)
                    .json({
                        error: 'We have a trouble'
                    });
            } else if (!same){
                res.status(401)
                    .json({
                        code: 401,
                        success: false,
                        message: 'Nhap sai email hoac mat khau'
                    });
            } else {
                // req.session.userID = user;
                const payload = {username};
                const token = jwt.sign(payload, secret, {
                    expiresIn: '1h'
                });
                res.cookie('token', token, {httpOnly:true})
                    .json({
                        code: 200,
                        success: true,
                        userID: user._id
                    });

                // luu token vao database sau khi dang nhap
                user['token'] = token;
                user.save(function (err) {
                    if(err){
                        console.log(err);
                    } else {
                        // console.log(res.status(200));
                    }
                })
            }
        })
    }
}

router.post('/login', function (req, res) {
  const {email, password} = req.body;
  if(email){
      UserData.findOne({email}, function (err, user) {
          if (!user){
              UserData.findOne({username: email}, function (err, user) {
                  authenticate(res, err, user, password, email)
              })
          }else{
              authenticate(res, err, user, password, email)
          }})
  }

});

router.post('/register', function (req, res) {
  const { email, username, password, fullName, gender} = req.body;
  var user = new UserData({ email, username, password, fullName, gender});
  user['register'] = 1;
  user.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).json({
        code: 401,
        success: false,
        message: 'Trung email hoac ten dang nhap'
      });
    } else {
      res.status(200).json({
        code: 200,
        success: true
      });
    }
  });
});

//POST route for updating data
// router.post('/', function (req, res, next) {
//   // confirm that user typed same password twice
//   if (req.body.password !== req.body.passwordConf) {
//     var err = new Error('Passwords do not match.');
//     err.status = 400;
//     res.send("passwords dont match");
//     return next(err);
//   }
//
//   if (req.body.email &&
//     req.body.username &&
//     req.body.password &&
//     req.body.passwordConf) {
//
//     const userData = {
//       email: req.body.email,
//       username: req.body.username,
//       password: req.body.password,
//     }
//
//     UserData.create(userData, function (error, user) {
//       if (error) {
//         return next(error);
//       } else {
//         req.session.userId = user._id;
//         return res.redirect('/profile');
//       }
//     });
//
//   } else
//     if (req.body.logemail && req.body.logpassword) {
//     UserData.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
//       if (error || !user) {
//         var err = new Error('Wrong email or password.');
//         err.status = 401;
//         return next(err);
//       } else {
//         req.session.userId = user._id;
//         return res.redirect('/profile');
//       }
//     });
//   } else {
//     var err = new Error('All fields required.');
//     err.status = 400;
//     return next(err);
//   }
// })

// GET route after registering
// router.get('/profile', function (req, res, next) {
//   UserData.findById(req.session.userId)
//     .exec(function (error, user) {
//       if (error) {
//         return next(error);
//       } else {
//         if (user === null) {
//           var err = new Error('Not authorized! Go back!');
//           err.status = 400;
//           return next(err);
//         } else {
//           return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
//         }
//       }
//     });
// });

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;
