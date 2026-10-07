import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  signInWithCredential,
  GoogleAuthProvider, 
  signOut as fbSignOut, 
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

// Google OAuth Client ID for web clients
export const GOOGLE_CLIENT_ID = 
  import.meta.env.VITE_GOOGLE_CLIENT_ID || 
  '462481919288-at905smamnrmun7efha54k0lccv5q3oi.apps.googleusercontent.com';

let app;
let auth: ReturnType<typeof getAuth> | null = null;
let db: Firestore | null = null;

// Google OAuth provider configuration
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.warn('Firebase initialization note: using local-first storage mode', error);
}

export { auth, db, googleProvider };

// 1. Google OAuth Popup
export async function loginWithGoogle() {
  if (!auth) throw new Error('Firebase Auth not available');
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

// 2. Google OAuth ID Token Credential (used with Google Identity Services / One-Tap)
export async function loginWithGoogleCredential(idToken: string) {
  if (!auth) throw new Error('Firebase Auth not available');
  const credential = GoogleAuthProvider.credential(idToken);
  const result = await signInWithCredential(auth, credential);
  return result.user;
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

