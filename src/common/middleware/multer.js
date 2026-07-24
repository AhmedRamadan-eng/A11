import multer from "multer";
import { log } from "node:console";
import fs from "node:fs"
import { cursorTo } from "node:readline";

export const FILE_TYPES = {
  images: ["image/jpeg", "image/png", "image/webp"],
  videos: ["video/mp4", "video/webm"],
  files: ["application/pdf"]
};
export let multer_locel = ({ custompath, allowedExtintions, maxsize } = { custompath: "general",maxsize: 6}) => {

  let storage = multer.diskStorage({

    destination: function (req, file, cb) {
      let filepath = `upload/${custompath}`;

      if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath, { recursive: true });
      }

      cb(null, filepath);
    },

    filename: function (req, file, cb) {
      let filename = `${file.originalname}`;
      cb(null, filename);
    }
  });

  let fileFilter = function (req, file, cb) {

    if (!allowedExtintions.includes(file.mimetype)) {
      cb("file type not allowed", false);
    }

    cb(null, true);
  };

  return multer({
    storage,
    fileFilter,   
    limits: {
      fileSize: maxsize * 1024 * 1024
    }
  });
};