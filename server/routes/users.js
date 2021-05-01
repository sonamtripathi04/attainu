const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const auth = require("../middlewear/user_auth")
const NewUser = require("../model/Newuser");

router.post(
    "/users",
    [
        check("name", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("phone_number", "Please enter a valid number").isLength({
            min: 10
        }),
        check("password", "Please enter a valid password").isLength({
            min: 8
        })
    ],auth,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            name,
            email,
            phone_number,
            password
        } = req.body;
        try {
            let user = await NewUser.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            user = new NewUser({
                name,
                email,
                phone_number,
                created_by:req.user.id,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
              await user.save()
              res.status(200).json({
                             message: "registered"
              });
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);


module.exports = router;
