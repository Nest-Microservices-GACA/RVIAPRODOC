"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileNamerZip = void 0;
const uuid_1 = require("uuid");
const fileNamerZip = (req, file, callback) => {
    if (!file)
        return callback(new Error('File is empty'), false);
    const fileExtension = file.mimetype.split('/')[1];
    const folderName = file.originalname.split('.')[0].replace(/\s+/g, '-');
    const fileName = `${(0, uuid_1.v4)()}.${folderName}.${file.originalname.split('.')[1]}`;
    callback(null, fileName);
};
exports.fileNamerZip = fileNamerZip;
//# sourceMappingURL=fileNamerzip.helper.js.map