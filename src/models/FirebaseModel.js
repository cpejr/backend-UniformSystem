const admin = require("firebase-admin");
const firebase = require("firebase/app");

require("firebase/auth");

// var serviceAccount = require("../../serviceAccountKey.json");
var firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.FIREBASE_DATABASEURL,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDER,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENTID,
};

firebase.initializeApp(firebaseConfig);

admin.initializeApp({
  credential: admin.credential.cert({
    "type": process.env.SERVICE_ACCOUNT_TYPE,
    "project_id": process.env.SERVICE_ACCOUNT_PROJECT_ID,
    "private_key_id": process.env.SERVICE_ACCOUNT_PRIVATE_KEY_ID,
    "private_key": process.env.SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
    "client_id": process.env.SERVICE_ACCOUNT_CLIENT_ID,
    "auth_uri": process.env.SERVICE_ACCOUNT_AUTH_URI,
    "token_uri": process.env.SERVICE_ACCOUNT_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.SERVICE_ACCOUNT_AUTH_PROVIDER,
    "client_x509_cert_url": process.env.SERVICE_ACCOUNT_CLIENT_URL
}),
  databaseURL: "https://uniformsystembackend-f2419.firebaseio.com",
});

module.exports = {
  async createNewUser(email, password) {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    
    return result.user.uid;
  },

  async deleteUser(uid) {
    return new Promise((resolve, reject) => {
      admin
        .auth()
        .deleteUser(uid)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {

          const errorMessage = error.message;
          reject(errorMessage);
        });
    });
  },

  async changeUserPassword(uid, newPassword) {
    return new Promise((resolve, reject) => {
      admin
        .auth()
        .updateUser(uid, {
          password: newPassword,
        })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {

          const errorMessage = error.message;
          reject(errorMessage);
        });
    });
  },

  async sendPasswordChangeEmail(emailAddress) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .sendPasswordResetEmail(emailAddress)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {

          const errorMessage = error;
          reject(error);
        });
    });
  },

  async changeUserEmail(uid, newEmail) {
    return new Promise((resolve, reject) => {
      admin
        .auth()
        .updateUser(uid, {
          email: newEmail,
        })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {

          const errorMessage = error.message;
          reject(errorMessage);
        });
    });
  },

  async getUserEmails(uids) {
    return new Promise((resolve, reject) => {
      admin
        .auth()
        .getUsers(uids) //Must have entries <= 100
        .then((results) => {
          const users = results ? results.users : [];
          const emails = users.map((user) => {
            return { uid: user.uid, email: user.email };
          });
          resolve(emails);
        })
        .catch((error) => {

          const errorMessage = error.message;
          reject(errorMessage);
        });
    });
  },

  async login(email, password) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          resolve(result.user.uid);
        })
        .catch((error) => {

          const errorMessage = error.message;
          reject(errorMessage);
        });
    });
  },
};
