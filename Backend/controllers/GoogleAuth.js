const {handleError} = require('../helpers/handleError');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { sendMailToAuthor } = require('../helpers/email');

// GoogleAuth Controller
exports.GoogleAuth = async(req,res,next) => {

    try {

        // fetch data
        const {name,email,avatar} = req.body;

        // check email is present or not
        const isEmail = await User.findOne({email});

        const finalUser = isEmail

        // absent then
        if(!isEmail){
            // create new user
            const password = Math.round(Math.random()*1000000).toString();
            const hashPassword = await bcrypt.hash(password,10);
            finalUser = await User.create({name,email,password:hashPassword,avatar});
        }

        // create jwt 
        const token = jwt.sign({
            _id:finalUser._id,
            name:finalUser.name,
            email:finalUser.email,
            avatar:finalUser.avatar
        },process.env.JWT_SECRET_KEY);

        // create cookie
        res.cookie('cookie_name', token , {
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
            path:'/'
        });

        finalUser.password = undefined;

        // response send
        res.status(200).json(
            {
                success:true,
                message:"Login Successfully",
                user:finalUser
            }
        );

        const subject = `🎉 You Signed Up with Google — Welcome ${name}!`;

        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
                <div style="background-color: #0070BB; color: white; padding: 16px 24px;">
                    <h2 style="margin: 0;">🚀 Welcome to Frontend Task</h2>
                </div>

                <div style="padding: 20px;">
                    <p style="font-size: 16px;">Hello <strong>${name}</strong>,</p>

                    <p style="font-size: 15px;">
                        You've successfully signed up using <strong>Google Authentication</strong>!
                        Frontend Task gives you access to <strong>secure login, protected routes, and full CRUD features</strong>.
                    </p>

                    <p style="margin-top: 8px;">✨ You're all set — jump into your dashboard!</p>

                    <div style="margin: 30px 0;">
                        <a href="https://prajapatiyash.framer.website"
                        style="background-color: #007FFF; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px;">
                            Go to Frontend Task
                        </a>
                    </div>

                    <hr style="border-top: 1px solid #ddd;" />
                    <p style="font-size: 13px; color: #888;">
                        If this wasn't you, please ignore this message.
                    </p>
                </div>
            </div>
            `;
            
        const text = `Welcome ${name}! You signed up using Google. Explore secure authentication and CRUD features at https://prajapatiyash.framer.website`;

        await sendMailToAuthor({ to: email, subject, html, text });

    } catch(error) {
        return next(handleError(500,error.message));
    }
}
