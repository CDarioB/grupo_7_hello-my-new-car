const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/img/products');
	},
	filename: (req, file, cb) => {
		let fileName = 'product_' + `${Date.now()}_photo${path.extname(file.originalname)}`;
		cb(null, fileName);
	}
})

const uploadFile = multer({ storage });

module.exports = uploadFile;