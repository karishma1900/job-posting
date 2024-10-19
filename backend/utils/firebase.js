var  admin = require("firebase-admin");

var serviceAccount = require("./job-posting-7bf25-firebase-adminsdk-r2m76-86f7a9c44c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
