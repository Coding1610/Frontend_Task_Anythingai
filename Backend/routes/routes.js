const express = require('express');
const router = express.Router();
const {upload} = require('../config/multer');

// import middleware
const {Authenticate} = require('../middlewares/Authenticate');
const {AdminView} = require('../middlewares/AdminView');

// import handler
const {Register} = require('../controllers/Register');
const {Login} = require('../controllers/Login');
const {GoogleAuth} = require('../controllers/GoogleAuth');
const {Logout} = require('../controllers/Logout');
const {GetUser} = require('../controllers/GetUser');
const {UpdateUser} = require('../controllers/UpdateUser');
const { GetAllUsers } = require('../controllers/GetAllUsers');
const { DeleteUser } = require('../controllers/DeleteUser');
const { GetUserCount } = require('../controllers/GetUserCount');
const { GetCommentsByMe } = require('../controllers/GetCommentsByMe');
const { DeleteComment } = require('../controllers/DeleteComment');
const { AddComment } = require('../controllers/AddComment');

// create routes
router.post('/register', Register);
router.post('/login', Login);
router.post('/google-auth', GoogleAuth);
router.get('/logout', Authenticate, Logout);
router.get('/get-user/:userid', Authenticate, GetUser);
router.put('/update-user/:userid', Authenticate, upload.single('file'), UpdateUser);
router.delete('/user/delete/:id', Authenticate, AdminView, DeleteUser);
router.get('/get-all-users', AdminView, GetAllUsers);
router.get('/get-user-count', AdminView, GetUserCount);
router.get('/comments-by-me/:id', Authenticate, GetCommentsByMe);
router.delete('/comment/delete/:commentId', Authenticate, DeleteComment);
router.post('/comment/add', Authenticate, AddComment);

module.exports = router;