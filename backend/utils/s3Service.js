const { S3 } = require("aws-sdk");


exports.s3Delete = async (filename, folder) => {
 
  const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECREAT_ACCESS_KEY,
    Bucket: process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_REGION,
  });


  s3.deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key:  `${folder}/${filename}` }, (err, data) => {
    if(err){
      return err
    }else{
      return data
    }
  });
};

exports.s3getSignedURL = async (req) => {
  const s3 = new S3();

  s3.config.update({
    region: process.env.AWS_REGION,
    apiVersion: "latest",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECREAT_ACCESS_KEY,
    },
  });

  const fileName = req.query.key;
  const folder = req.query.folder;

  const s3Params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${folder}/${fileName}`,
    Expires: 600,
  };

  return await s3.getSignedUrl("putObject", s3Params);
};



