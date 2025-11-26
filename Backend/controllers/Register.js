const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { sendMailToAuthor } = require('../helpers/email');
const { handleError } = require('../helpers/handleError');

exports.Register = async (req, res, next) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next(handleError(400, 'Please fill all the fields'));
        }

        const checkUser = await User.findOne({ email });

        if (checkUser) {
            return next(handleError(409, 'User Already Registered'));
        }

        const hashpassword = await bcrypt.hashSync(password, 10);

        const newUser = await User.create({ name, email, password: hashpassword });

        res.status(200).json({
            success: true,
            message: 'Registration Successfull',
            newUser,
        });

        const subject = `👋 Welcome to Frontend Task, ${name}!`;

        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
                <div style="background-color: #0070BB; color: white; padding: 16px 24px;">
                    <h2 style="margin: 0;">🔐 Welcome to Frontend Task</h2>
                </div>

                <div style="padding: 20px;">
                    <p style="font-size: 16px;">Hello <strong>${name}</strong>,</p>

                    <p style="font-size: 15px;">
                        We're excited to have you onboard! Frontend Task allows you to experience
                        <strong>secure authentication, protected routes, and smooth CRUD operations</strong>.
                    </p>

                    <p style="margin-top: 8px;">✨ Start managing your data with confidence!</p>

                    <div style="margin: 30px 0;">
                        <a href="https://prajapatiyash.framer.website"
                        style="background-color: #007FFF; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px;">
                            Go to Frontend Task
                        </a>
                    </div>

                    <hr style="border-top: 1px solid #ddd;" />
                    <p style="font-size: 13px; color: #888;">
                        If you didn’t sign up for Frontend Task, please ignore this email.
                    </p>
                </div>
            </div>
            `;

            const text = `Welcome to Frontend Task, ${name}! Experience secure authentication and CRUD features. Visit https://prajapatiyash.framer.website to get started.`;

        await sendMailToAuthor({ to: email, subject, html, text });

    } catch (error) {
        return next(handleError(500, error.message));
    }
};
