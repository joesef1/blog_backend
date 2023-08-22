const path = require("path");
const multer = require("multer");
const { lutimes } = require("fs");

// Photo Storage

const PhotoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
  cb(null , path.join(__dirname, "../images"));
  },
  filename:( req,file,cb)=>{
  if (file) {
  cb(null , new Date().toISOString().replace(/:/g,"-") + file.originalname);
  }else{
    cb(null, false)
  }
  }
})


// Photo Upload meddleware
const PhotoUpload = multer ({
  storage :PhotoStorage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    }else{
      cb({message: "unsupported file format"},false);
    }
  },

  limits: {fieldSize: 1024 * 1024} 
});

module.exports = PhotoUpload;