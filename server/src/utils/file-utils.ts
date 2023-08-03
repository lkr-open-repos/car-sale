import fs from "fs";

export const deleteImageHelper = (imagePath: string) => {
  fs.unlink(imagePath, (err) => {
    console.log(err);
  });
};
