const AWS = require('aws-sdk');
// const s3 = new AWS.S3();
const fs = require('fs');
// const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');

const fetchFile = async (filename, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET || 'app-plaebak',
    Key: `audio/${filename}.mp3`,
  };

  const client = new S3Client({ region: 'us-east-2' });
  const command = new GetObjectCommand(params);

  const { Body } = await client.send(command);

  // const streamToString = (stream) =>
  //   new Promise((resolve, reject) => {
  //     const chunks = [];
  //     stream.on('data', (chunk) => chunks.push(chunk));
  //     stream.on('error', reject);
  //     stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  //   });

  // const bodyContents = await streamToString(Body);

  // s3.getSignedUrl('getObject', params, (err, data) => {
  //   if (err) return res.status(400).send({ success: false, err: err });

  //   return res.send(data);
  // });
};

module.exports = fetchFile;
