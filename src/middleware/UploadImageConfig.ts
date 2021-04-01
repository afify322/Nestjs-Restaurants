import { HttpException, HttpStatus } from '@nestjs/common';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 } from 'cloudinary';

export const imageFileFilter = (
  _req: any,
  file: { originalname: string },
  callback: (arg0: HttpException, arg1: boolean) => void,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new HttpException(
        'Only image files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }

  callback(null, true);
};

export const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: 'Restaurants',
    format: async (req, file) => (file.mimetype = 'png'),
    public_id: (req, file) => 'computed-filename-using-request',
  },
});
