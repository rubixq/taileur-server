const express = require("express");
const User = require("../repos/users_model");

const router = express.Router()

router.post("/signup", (req, res) => {
    const payload = req.body;
    let user = new User({
        msisdn: payload.countryCode + payload.phoneNumber,
        password: payload.password
    });
    
    user.save((err, u) => {
        if(err){
            console.log(err);
            res.json({
                userMsg: "Sign up failed",
                devMsg: err
            });
        }else{
            res.json({
                data: u.toJSON(),
                userMsg: "Enter 4-digit verification code"
            });
        }
    });

});

router.post("/signin", (req, res) => {
    
});

module.exports = router;