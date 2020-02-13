var multer = require('multer')
var upload = multer({ dest: '/home/floyed/FP/Projects/Cloud/temp/uploads/' })

module.exports = function (app) {
    const fileController = require('../controllers/file-controller');
    
    // User Routes for search and create.
    // app.route('/v1/bill/:billId/file') //all paths with /vi/user/self
    //     .post(fileController.post) //listing the information

    app.post('/v1/bill/:billId/file', 
        upload.single('billFile'),fileController.post)

    // getting all bills
    app.route('/v1/bill/:billId/file/:fileId')
        .get(fileController.getOne)
        .delete(fileController.deleteOne);

};