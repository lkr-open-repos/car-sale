import multer from "multer";
import path from "path";
import { v1 as uuidv1 } from "uuid";

const MIME_TYPE_MAP: { [key: string]: string } = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
};

/**
 * Middleware for file uploads using multer.
 * Limits file size, specifies storage options, and filters file types.
 */
export const fileUpload = multer({
  limits: {
    fileSize: 10000000,
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join("uploads", "images"));
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuidv1() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    isValid ? cb(null, isValid) : cb(new Error("Invalid mime type"));
  },
});
