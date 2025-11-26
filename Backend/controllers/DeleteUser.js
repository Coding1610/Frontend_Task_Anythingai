const User = require('../models/userModel');
const {handleError} = require('../helpers/handleError');
const {sendMailToAuthor} = require('../helpers/email');

exports.DeleteUser = async(req,res,next) => {

    try {
        const {id} = req.params;

        // Delete the user itself
        const deletedUser = await User.findByIdAndDelete(id);

        if(!deletedUser){
            return next(handleError(404,'User Not Found'));
        }

        res.status(200).json(
            {
                success:true,
                message:"User and related data deleted Successfully",
                deletedUser
            }
        )

        const subject = `⚠️ Your Frontend Task Account Has Been Deleted`;

        const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
            <div style="background-color: #0070BB; color: white; padding: 16px 24px;">
                <h2 style="margin: 0;">🚫 Account Deleted</h2>
            </div>

            <div style="padding: 20px;">
                <p style="font-size: 16px;">Hello <strong>${deletedUser?.name}</strong>,</p>

                <p style="font-size: 15px;">
                    We want to inform you that your Frontend Task account has been
                    <strong>permanently deleted by an administrator</strong>.
                </p>

                <p style="font-size: 15px;">
                    All your associated data and activity have been removed from our servers.
                </p>

                <p style="font-size: 15px;">
                    If you believe this action was taken by mistake, please contact our support team for assistance.
                </p>

                <hr style="border-top: 1px solid #ddd;" />
                <p style="font-size: 13px; color: #888;">
                    This action was initiated by an admin. No further steps are required from your side.
                </p>
            </div>
        </div>
        `;

        const text = `Hello ${deletedUser?.name}, your Frontend Task account has been permanently deleted by an admin. All your data has been removed from our servers.`;

        await sendMailToAuthor({ to: deletedUser?.email, subject, html, text });

    } catch (error) {
        next(handleError(500,`Error, ${error.message}`))
    }

};