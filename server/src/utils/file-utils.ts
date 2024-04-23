import fs from "fs";

/**
 * Helper function for deleting an image.
 *
 * @param {string} imagePath - the path of the image
 * @return {void}
 * */
export const deleteImageHelper = (imagePath: string) => {
  fs.unlink(imagePath, (err) => {
    console.log(err);
  });
};
