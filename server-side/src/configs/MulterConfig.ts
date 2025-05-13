import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './CloudinaryConfig'

/**
 * One reusable Multer instance ready to handle
 *   - single‑file uploads   -> upload.single('image')
 *   - multiple files        -> upload.array('images', maxCount)
 */
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_, file) => ({
    folder        : 'travel_book/images',            // change to your own folder path
    resource_type : 'image',
    public_id     : `${Date.now()}-${file.originalname
                       .replace(/\s+/g, '_')
                       .split('.')
                       .slice(0, -1)
                       .join('.')}`,                 // unique name
    format        : file.mimetype.split('/')[1] || 'jpg', // keep client‑side extension
    transformation: [{ quality: 'auto' }],           // optional default transform
  }),
});

export const upload = multer({ storage });
export default upload;