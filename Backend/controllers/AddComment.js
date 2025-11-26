const Comment = require('../models/commentModel');
const User = require('../models/userModel'); 
const { handleError } = require('../helpers/handleError');

exports.AddComment = async (req, res, next) => {
  try {
    const { author, comment } = req.body;

    const newComment = await Comment.create({ author, comment });

    res.status(200).json({
      success: true,
      message: "Comment added Successfully",
      newComment
    });

  } catch (error) {
    next(handleError(500, `Error occurred while adding comment, ${error.message}`));
  }
};
