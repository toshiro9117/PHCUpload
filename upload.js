const AWS = require('aws-sdk');
const multer = require('multer')();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

module.exports = multer.single('file'), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const params = {
    Bucket: 'your-bucket-name',
    Key: file.originalname,
    Body: file.buffer,
    ACL: 'public-read'
  };

  try {
    const data = await s3.upload(params).promise();
    res.json({ url: data.Location });
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    res.status(500).json({ error: 'Error uploading file to S3.' });
  }
};