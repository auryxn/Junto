const admin = require("firebase-admin");
const serviceAccount = require("./credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const auth = admin.auth();

// Функции для работы с пользователями
const createUser = async (email, password, displayName) => {
  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName
    });
    
    // Создаем документ пользователя в Firestore
    await db.collection('users').doc(userRecord.uid).set({
      username: displayName,
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      eventsJoined: [],
      eventsCreated: []
    });
    
    return { success: true, user: userRecord };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const getUserById = async (uid) => {
  try {
    const userRecord = await auth.getUser(uid);
    const userDoc = await db.collection('users').doc(uid).get();
    
    if (userDoc.exists) {
      return { 
        success: true, 
        user: userRecord,
        data: userDoc.data()
      };
    } else {
      return { success: false, error: "Пользователь не найден в Firestore" };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const updateUserData = async (uid, userData) => {
  try {
    await db.collection('users').doc(uid).update(userData);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const deleteUser = async (uid) => {
  try {
    await auth.deleteUser(uid);
    await db.collection('users').doc(uid).delete();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const verifyIdToken = async (idToken) => {
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    return { success: true, uid: decodedToken.uid };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports = { 
  db, 
  auth, 
  createUser, 
  getUserById, 
  updateUserData, 
  deleteUser, 
  verifyIdToken 
};
