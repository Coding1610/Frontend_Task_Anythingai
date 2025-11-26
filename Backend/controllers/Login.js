const {handleError} = require('../helpers/handleError');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.Login = async(req,res,next) => {

    try {

        const {email,password} = req.body;

        const isEmail = await User.findOne({email});

        if(!isEmail){
            return next(handleError(404,"Email not found."));
        }

        const isPassword = await bcrypt.compare(password,isEmail.password);

        if(!isPassword){
            return next(handleError(404,"Incorrect Password."));
        }

        const token = jwt.sign({
            _id:isEmail._id,
            name:isEmail.name,
            email:isEmail.email,
            avatar:isEmail.avatar,
            role:isEmail.role,
        },process.env.JWT_SECRET_KEY);

        res.cookie('cookie_name', token , {
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
            path:'/'
        });

        isEmail.password = undefined;

        res.status(200).json(
            {
                success:true,
                message:"Login Successfully",
                user:isEmail
            }
        );

    } catch(error) {
        return next(handleError(500,error.message));
    }
}