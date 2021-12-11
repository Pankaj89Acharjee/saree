import multer from "multer"; /*Is used to upload files using dialogue box*/
import express from "express";
import { isAuth } from '../utils.js'

const uploadRouter = express.Router();
/*Creating API for uploading files*/

/*For API request we need a multer and for that we need a storage */
const storage = multer.diskStorage({
    destination(req, file, cb) /*cb = call back fx*/
     {  
         cb(null, 'uploads/'); /*null means if any error else uploads*/

    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    },
}); /*This is a folder storage*/

const upload = multer({storage});


uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
} ); /*This '/' means final API i.e., /api/uploads*/

export default uploadRouter;
