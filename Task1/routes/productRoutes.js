const express = require('express');
const multer = require('multer');
const path = require('path');
const productControllers = require('../controllers/productsControllers');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'productImages/') // Specify the directory where uploaded files should be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
  
});

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true); // Accept the file
//   } else {
//     cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'), false); // Reject the file
//   }
// };
const upload = multer({ storage: storage, }) // fileFilter: fileFilter });

router.post('/create', upload.single('productImage'), productControllers.createProduct);
router.get('/', productControllers.getProducts);
router.post('/update', productControllers.updateProduct);

module.exports = {
    router,
};
