const admin = require("firebase-admin");
const firebase = require("firebase/app");

require("firebase/auth");

// var serviceAccount = require("../../serviceAccountKey.json");
const firebaseConfig = {
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

  deleteUser(uid) {
    return admin.auth().deleteUser(uid);
  },

  changeUserPassword(uid, newPassword) {
    return admin.auth().updateUser(uid, {
      password: newPassword,
    });
  },

  sendPasswordChangeEmail(emailAddress) {
    return firebase.auth().sendPasswordResetEmail(emailAddress);
  },

  changeUserEmail(uid, newEmail) {
    return admin.auth().updateUser(uid, {
      email: newEmail,
    });
  },

  async getUserEmails(uids) {
    const results = await admin.auth().getUsers(uids);
    const users = results ? results.users : [];
    const emails = users.map((user) => {
      return { uid: user.uid, email: user.email };
    });
    return emails;
  },

  async login(email, password) {
    const result = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
      
    return result.user.uid;
  },
};
