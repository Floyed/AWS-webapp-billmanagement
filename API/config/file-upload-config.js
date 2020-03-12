
let multer = require('multer');
var path = require('path');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

let s3 = new aws.S3();

let upload;

aws.config.update({region: 'us-east-1'});

if(process.env.APPLICATION_ENV == 'prod'){
    const bucket = process.env.S3_BUCKET_ADDRESS.substring(0, process.env.S3_BUCKET_ADDRESS.indexOf(".s3.amazonaws.com"));

    upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: bucket,
            acl: 'private',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: (req, file, cb) => {
                cb(null, Date.now() + path.extname(file.originalname));
            }
        })
    });

} else {

    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    });
    
    upload = multer({
        storage: storage, fileFilter: function (req, file, cb) {
            return cb(null, true);
        }
    });
}



module.exports = upload;
