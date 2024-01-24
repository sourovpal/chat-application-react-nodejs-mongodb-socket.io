const express = require('express');
const app = express();
const UserAuthController = require('../controllers/UserAuthController');
const JWTTokenValidat = require('../functions/JWTTokenValidation');
/***
 * 
 *  Call Controller Methods
 * 
***/
const {login, register} = new UserAuthController();
/***
 * 
 *  Auth Route Start
 * 
***/
var AuthRoute = express.Router();

AuthRoute.post('/register', register);
AuthRoute.post('/login', login);
AuthRoute.post('/forgot-password', login);
AuthRoute.post('/reset-password', login);

app.use('/auth', AuthRoute);
/***
 * 
 *  User Route Start
 * 
***/
var UserRoute = express.Router();

UserRoute.use(JWTTokenValidat);

app.use('/', UserRoute);



module.exports = app;