import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const single = upload.single("file");
export const multiple = upload.array("files", 10);

export default {
  single,
  multiple,
};
