import Jimp from 'jimp';
import fs from 'fs';
import { ImageSizes } from '../data/constants';

const PATH = './uploads';
const resizeImage = {
    resizeOrigional: (file, newFile) => {
        //Resize Original
        Jimp.read(PATH + '/' + file, (err, lenna) => {
            if (err) throw err;
            lenna
                .resize(ImageSizes.original.width, Jimp.AUTO)
                .write(PATH + '/' + newFile);
        });
        fs.unlink(PATH + '/' + file, function() {
            // file deleted
        });
        return newFile;
    }
}

export default resizeImage;