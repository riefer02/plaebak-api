// Load the SDK for JavaScript
var AWS = require('aws-sdk');
// var S3 = require('aws-sdk/clients/s3');
// Set the Region
AWS.config.update({ region: 'us-east-2' });

console.log(AWS.config);
