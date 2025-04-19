const cloudinary = require('./cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'Projects',
      allowed_format: ['jpg','jpeg','png'], 
      public_id: file.originalname.split('.')[0],
    };
  },
});

const upload = multer({ storage });
const uploadMultiple = upload.single('image'); 

module.exports = uploadMultiple;
