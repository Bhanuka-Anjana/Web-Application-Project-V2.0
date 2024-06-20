const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// upload file and return the file url
const uploadFile = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
    ACL: "public-read",
  };

  const data = await s3.upload(params).promise();
  return data.Location;
};

// remove the file from s3
const removeFile = async (fileUrl) => {
  const fileName = fileUrl.split("/").pop();
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
  };

 await s3.deleteObject(params).promise();
};

module.exports = {
  uploadFile,
  removeFile,
};
