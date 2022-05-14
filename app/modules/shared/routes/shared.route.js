import sharedController from '../controllers/shared.controller';
import {FileUploader} from '../../../../lib/middleware';

module.exports = async(router) => {
    router.post('/upload-file', FileUploader.single('file'), await sharedController.uploadFile);
}