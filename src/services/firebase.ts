import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  OAuthProvider,
  signOut as fbSignOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile,
  signInAnonymously,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc,
  deleteDoc,
  Firestore 
} from 'firebase/firestore';

// Production configuration powered by Vite environment variables
const firebaseConfig = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
};

let app;
let auth: ReturnType<typeof getAuth> | null = null;
let db: Firestore | null = null;

// Multi-provider OAuth handlers
const googleProvider = new GoogleAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');
const linkedinProvider = new OAuthProvider('oidc.linkedin');

// Add scopes for rich profile retrieval
googleProvider.addScope('profile');
googleProvider.addScope('email');
microsoftProvider.addScope('User.Read');
linkedinProvider.addScope('openid');
linkedinProvider.addScope('profile');
linkedinProvider.addScope('email');

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.warn('Firebase initialization note: using local-first storage mode', error);
}

export { auth, db, googleProvider, microsoftProvider, linkedinProvider };

// 1. Google OAuth
export async function loginWithGoogle() {
  if (!auth) throw new Error('Firebase Auth not available');
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

// 2. Microsoft OAuth
export async function loginWithMicrosoft() {
  if (!auth) throw new Error('Firebase Auth not available');
  const result = await signInWithPopup(auth, microsoftProvider);
  return result.user;
}

// 3. LinkedIn OAuth
export async function loginWithLinkedIn() {
  if (!auth) throw new Error('Firebase Auth not available');
  try {
    const result = await signInWithPopup(auth, linkedinProvider);
    return result.user;
  } catch (err: any) {
    if (err.code === 'auth/configuration-not-found' || err.code === 'auth/operation-not-allowed') {
      throw new Error('LinkedIn Authentication: Please ensure LinkedIn OIDC is enabled in your Firebase Console under Authentication > Sign-in method.');
    }
    throw err;
  }
}

// 4. Custom Login with Username or Email + Password
export async function loginWithCredentials(usernameOrEmail: string, pass: string) {
  if (!auth) throw new Error('Firebase Auth not available');
  const cleanId = usernameOrEmail.trim();
  // Support either full email or pure username
  const emailToUse = cleanId.includes('@') ? cleanId : `${cleanId.toLowerCase().replace(/[^a-z0-9_]/g, '')}@seizelearn.local`;
  const result = await signInWithEmailAndPassword(auth, emailToUse, pass);
  return result.user;
}

// 5. Custom Registration with Username, Email & Password
export async function registerWithCredentials(username: string, email: string, pass: string) {
  if (!auth) throw new Error('Firebase Auth not available');
  const cleanUsername = username.trim();
  const cleanEmail = email.trim();
  // If email is provided, use it; otherwise generate username-based email handle
  const emailToUse = cleanEmail || `${cleanUsername.toLowerCase().replace(/[^a-z0-9_]/g, '')}@seizelearn.local`;
  
  const result = await createUserWithEmailAndPassword(auth, emailToUse, pass);
  
  if (result.user && cleanUsername) {
    try {
      await updateProfile(result.user, { displayName: cleanUsername });
    } catch (e) {
      console.warn('Could not update display name in auth profile', e);
    }
  }
  return result.user;
}

// Backward-compatible wrappers
export async function loginWithEmail(email: string, pass: string) {
  return loginWithCredentials(email, pass);
}

export async function registerWithEmail(email: string, pass: string) {
  return registerWithCredentials('', email, pass);
}

export async function loginAnonymously() {
  if (!auth) throw new Error('Firebase Auth not available');
  const result = await signInAnonymously(auth);
  return result.user;
}

export async function logoutUser() {
  if (!auth) return;
  await fbSignOut(auth);
}

export function subscribeToAuth(callback: (user: FirebaseUser | null) => void) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

// Cloud sync helper with graceful fallback
export async function syncUserStateToCloud(uid: string, state: any) {
  if (!db || !uid) return;
  try {
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, { ...state, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.warn('Cloud sync error (fallback to local state):', err);
  }
}

export async function fetchUserStateFromCloud(uid: string) {
  if (!db || !uid) return null;
  try {
    const userDocRef = doc(db, 'users', uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (err) {
    console.warn('Cloud fetch error (using local state):', err);
    return null;
  }
}

// Public learner profile fetcher for verified portfolio showcase
export async function fetchPublicProfile(uid: string) {
  if (!db || !uid) return null;
  try {
    const userDocRef = doc(db, 'users', uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      const data = snap.data();
      // Expose only public portfolio attributes
      return {
        uid,
        displayName: data.user?.displayName || 'Learner',
        photoURL: data.user?.photoURL,
        xp: data.xp || 0,
        streak: data.streak || 0,
        earnedBadgeIds: data.earnedBadgeIds || [],
        certificates: data.certificates || [],
        projectSubmissions: data.projectSubmissions || {},
        completedLessonIds: data.completedLessonIds || []
      };
    }
    return null;
  } catch (err) {
    console.warn('Error fetching public profile:', err);
    return null;
  }
}

// Project proof cloud sync
export async function syncSubmissionToCloud(submissionId: string, data: any) {
  if (!db || !submissionId) return;
  try {
    const subRef = doc(db, 'submissions', submissionId);
    await setDoc(subRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.warn('Could not sync submission to cloud:', err);
  }
}

// Save certificate to cloud collection for instant global verification
export async function saveCertificateToCloud(certificate: any) {
  if (!db || !certificate?.certificateCode) return;
  try {
    const certRef = doc(db, 'certificates', certificate.certificateCode);
    await setDoc(certRef, { ...certificate, syncedAt: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.warn('Could not sync certificate to cloud:', err);
  }
}

// Fetch certificate from cloud collection
export async function fetchCertificateFromCloud(certificateCode: string) {
  if (!db || !certificateCode) return null;
  try {
    const certRef = doc(db, 'certificates', certificateCode);
    const snap = await getDoc(certRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (err) {
    console.warn('Cloud certificate fetch error:', err);
    return null;
  }
}

// GDPR / CCPA right-to-be-forgotten: delete user data from cloud
export async function deleteUserDataFromCloud(uid: string) {
  if (!db || !uid) return false;
  try {
    const userDocRef = doc(db, 'users', uid);
    await deleteDoc(userDocRef);
    return true;
  } catch (err) {
    console.error('Error deleting cloud user data:', err);
    return false;
  }
}

