const cors = require('cors')
const express = require("express");
const delay = require('delay');
const jwt = require('./security/jwt');
//const controller = require("./controllers.js");

const userStorage = require('./security/users-storage')({
    email: 'jose@gmail.com',
    password: 'jose'
});
//userStorage.logUsers();

const login = require('./routes/login-route')(userStorage);
const signup = require('./routes/signup-route')(userStorage);
const verify = require('./routes/verify-route');


const router = express.Router();


// --------------- AUTH API
router.post("/login", login);  
router.post("/signup", signup);   
router.get("/verify", verify); 





module.exports = router;