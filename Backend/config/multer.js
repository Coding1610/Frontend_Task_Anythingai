const multer = require('multer');

// Existing diskStorage for images
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Existing image file filter
function fileFilter(req, file, cb) {
    const allowedFiles = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
    if (!allowedFiles.includes(file.mimetype)) {
        cb(new Error("Only Images are allowed."), false);
    } else {
        cb(null, true);
    }
}

// Existing export for image upload
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Expor
module.exports = {
    upload,        // Image uploader
};