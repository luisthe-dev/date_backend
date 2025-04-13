import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

// Multer upload options
export const multerOptions = {
  // Enable file size limits
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif|heic|mp4|wmv|quicktime)$/)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  // Storage properties
  storage: diskStorage({
    // Destination storage path details
    destination: (req: any, file: Express.Multer.File, cb: any) => {
      const user: User = req.user;

      const uploadPath = `./storage/user_media/${file.mimetype.split('/')[0]}/${user.id}`;
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, {
            recursive: true
        });
      }
      cb(null, uploadPath);
    },
    filename: (req: any, file: any, cb: any) => {
      cb(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};
