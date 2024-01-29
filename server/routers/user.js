const express = require('express');
const app = express();
const UserAuthController = require('../controllers/UserAuthController');
const UserController = require('../controllers/UserController');
const JWTTokenValidat = require('../functions/JWTTokenValidation');
/***
 * 
 *  Call Controller Methods
 * 
***/
const {
    login, 
    logout,
    register, 
    forgotPassword, 
    resetPassword
} = new UserAuthController();
const {
    info, 
} = new UserController();
/***
 * 
 *  Auth Route Start
 * 
***/
var AuthRoute = express.Router();

AuthRoute.post('/register', register);
AuthRoute.post('/login', login);
AuthRoute.post('/logout', logout);
AuthRoute.post('/forgot-password', forgotPassword);
AuthRoute.post('/reset-password', resetPassword);

app.use('/auth', AuthRoute);
/***
 * 
 *  User Route Start
 * 
***/
var UserRoute = express.Router();

UserRoute.use(JWTTokenValidat);
UserRoute.get('/info', info);
app.use('/', UserRoute);



module.exports = app;