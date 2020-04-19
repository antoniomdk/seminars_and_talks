const multer = require('multer');
const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const config = require('../config')[process.env.NODE_ENV || 'development'];

/* ----------- image middleware ---------------- */

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
});

module.exports.upload = upload;

module.exports.storeImg =  async (req, res, next) => {
  // no image then skip this image processing middleware
  if(!req.file) return next();
  if(req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpeg') {
    return next(new Error('File Format is not supported'));
  }
  const imgFilename = await store(req.file.buffer);
  // eslint-disable-next-line require-atomic-updates
  req.file.imgFilename = imgFilename;
  return next();
}

async function store(buffer) {
  const filename = getFilename();
  const filepath = config.data.getFilepath(filename);

  await sharp(buffer)
  .resize(350, 250, {
    fit: sharp.fit.inside,
    withoutEnlargement: true,
  })
  .toFile(filepath);
  return filename;
}

function getFilename() {
  return `${uuidv4()}.png`;
}

/* ------ login/not login check middleware ----------- */
module.exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/user/signin');
}

module.exports.notLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()) {
    return next();
  }
  return res.redirect(req.user.url);
}