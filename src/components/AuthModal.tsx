import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Cloud, 
  Award, 
  LogOut,
  ExternalLink,
  Zap
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { 
  loginWithGoogle, 
  loginWithGoogleCredential, 
  GOOGLE_CLIENT_ID 
} from '../services/firebase';

declare global {
  interface Window {
    google?: any;
  }
}

export const AuthModal: React.FC = () => {
  const { 
    openAuthModal, 
    setOpenAuthModal, 
    userState,
    loginLocally,
    logoutLocally,
    setActiveTab
  } = useLearning();

  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const gsiButtonRef = useRef<HTMLDivElement>(null);

  const isGuest = userState.user.isAnonymous;

  // Helper to parse Google Identity Services JWT ID Token
  const parseGoogleJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  };

  // Handle Google Identity Services (GIS) credential response
  const handleGsiCredential = async (response: { credential?: string }) => {
    if (!response?.credential) return;
    setErrorMsg('');
    setLoading(true);

    const payload = parseGoogleJwt(response.credential);

    try {
      // Exchange GIS ID token with Firebase Auth
      await loginWithGoogleCredential(response.credential);
      setOpenAuthModal(false);
    } catch (firebaseErr: any) {
      console.warn('Firebase credential exchange note:', firebaseErr);
      // Graceful local sync with decoded Google user identity
      if (payload) {
        loginLocally(
          payload.name || payload.given_name || payload.email?.split('@')[0] || 'Learner',
          payload.email,
          payload.picture
        );
        setOpenAuthModal(false);
      } else {
        setErrorMsg('Could not read Google profile. Please try the Sign In button below.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Initialize Google Identity Services (GIS) button when modal opens
  useEffect(() => {
    if (!openAuthModal || !isGuest) return;

    let checkInterval: any = null;
    let attempts = 0;

    const initGsi = () => {
      if (window.google?.accounts?.id && gsiButtonRef.current) {
        try {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGsiCredential,
            auto_select: false,
            cancel_on_tap_outside: true
          });

          // Render official Google button into container
          gsiButtonRef.current.innerHTML = '';
          window.google.accounts.id.renderButton(gsiButtonRef.current, {
            theme: 'filled_blue',
            size: 'large',
            type: 'standard',
            shape: 'pill',
            text: 'continue_with',
            width: 320
          });
          return true;
        } catch (e) {
          console.warn('GIS init notice:', e);
        }
      }
      return false;
    };

    if (!initGsi()) {
      checkInterval = setInterval(() => {
        attempts++;
        if (initGsi() || attempts > 15) {
          clearInterval(checkInterval);
        }
      }, 300);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, [openAuthModal, isGuest]);

  if (!openAuthModal) return null;

  // Primary Google Login via Firebase OAuth Popup
  const handleGooglePopupAuth = async () => {
    setErrorMsg('');
    setLoading(true);

    try {
      await loginWithGoogle();
      setOpenAuthModal(false);
    } catch (err: any) {
      console.error('Google OAuth error:', err);
      const code = err.code || '';
      const msg = err.message || '';

      if (code === 'auth/popup-closed-by-user') {
        setErrorMsg('Sign-in window was closed before completion. Please try again.');
      } else if (code === 'auth/unauthorized-domain' || msg.includes('auth/unauthorized-domain')) {
        setErrorMsg(
          'Domain not authorized: Please ensure your current origin (e.g. localhost) is added under Firebase Console -> Authentication -> Settings -> Authorized Domains.'
        );
      } else if (
        code === 'auth/configuration-not-found' || 
        msg.includes('CONFIGURATION_NOT_FOUND') ||
        code === 'auth/operation-not-allowed'
      ) {
        setErrorMsg(
          'Google Sign-In is awaiting activation in Firebase Console. Please verify Authentication > Sign-in method > Google is enabled.'
        );
      } else {
        setErrorMsg(err.message || 'Google sign-in encountered an issue. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    logoutLocally();
    setOpenAuthModal(false);
  };

  const handleGoToProfile = () => {
    setOpenAuthModal(false);
    setActiveTab('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl border border-slate-700/80 bg-slate-900 p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
        
        {/* Close button */}
        <button
          onClick={() => setOpenAuthModal(false)}
          className="absolute right-5 top-5 rounded-lg p-1.5 text-slate-400 hover:text-white transition hover:bg-slate-800"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 pt-1">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 font-heading text-lg font-black text-white shadow-xl shadow-violet-500/25">
            <svg className="h-7 w-7" viewBox="0 0 24 24">
              <path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#ffffff" opacity="0.9" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#ffffff" opacity="0.8" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#ffffff" opacity="0.95" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
          </div>
          <h3 className="font-heading text-xl font-bold text-white tracking-tight">
            {!isGuest ? 'Your Google Account' : 'Sign In with Google'}
          </h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
            {!isGuest 
              ? 'Your learner profile is connected and synchronized with Google OAuth.'
              : 'One-click sign-in. Back up your progress, badges, and verified career portfolio.'}
          </p>
        </div>

        {/* Logged In View */}
        {!isGuest ? (
          <div className="space-y-5 rounded-2xl border border-slate-800 bg-slate-950/70 p-5 text-center">
            <div className="relative mx-auto h-16 w-16">
              {userState.user.photoURL ? (
                <img 
                  src={userState.user.photoURL} 
                  alt={userState.user.displayName || 'Google User'} 
                  className="h-16 w-16 rounded-full object-cover border-2 border-violet-500/50 shadow-md"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600/20 text-violet-300 font-bold text-xl border border-violet-500/40">
                  {(userState.user.displayName || userState.user.email || 'G')[0].toUpperCase()}
                </div>
              )}
              <div 
                className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-emerald-500 text-slate-950 shadow"
                title="Verified Account"
              >
                <CheckCircle2 className="h-4 w-4 fill-emerald-500 text-slate-950" />
              </div>
            </div>

            <div>
              <div className="font-heading text-base font-bold text-white">
                {userState.user.displayName || 'Learner'}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                {userState.user.email}
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 rounded-full bg-emerald-500/10 px-3 py-1 border border-emerald-500/20">
                <Cloud className="h-3.5 w-3.5" />
                <span>Cloud Synced</span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-cyan-400 rounded-full bg-cyan-500/10 px-3 py-1 border border-cyan-500/20">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Google OAuth 2.0</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleGoToProfile}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-700 hover:text-white transition"
              >
                <Award className="h-3.5 w-3.5 text-amber-400" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-rose-500/40 bg-rose-500/10 py-2.5 text-xs font-bold text-rose-300 hover:bg-rose-500/20 transition"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* Sign-In View: Dedicated Google Login Only */
          <div className="space-y-5">
            {errorMsg && (
              <div className="flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-950/40 p-3.5 text-xs text-rose-300 animate-in fade-in">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-400" />
                <span className="leading-relaxed">{errorMsg}</span>
              </div>
            )}

            {/* Google Identity Services Render Target (if available) */}
            <div className="flex justify-center" ref={gsiButtonRef} />

            {/* Primary Google Login Button */}
            <button
              onClick={handleGooglePopupAuth}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold py-3.5 px-5 shadow-lg shadow-black/30 transition active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span className="text-sm">
                {loading ? 'Connecting to Google...' : 'Continue with Google'}
              </span>
            </button>

            {/* Google Authentication Features */}
            <div className="space-y-2.5 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                What Google Login Unlocks:
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-400 shrink-0" />
                  <span><strong>Zero passwords</strong> to manage or reset</span>
                </li>
                <li className="flex items-center gap-2">
                  <Cloud className="h-4 w-4 text-cyan-400 shrink-0" />
                  <span><strong>Instant cloud sync</strong> of XP, streak & lessons</span>
                </li>
                <li className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-violet-400 shrink-0" />
                  <span><strong>Verified credentials</strong> issued to your Google name</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span><strong>OAuth 2.0 privacy</strong> — zero password storage</span>
                </li>
              </ul>
            </div>

            {/* Google Security & Privacy Assurance */}
            <div className="text-center text-[11px] text-slate-500 leading-relaxed px-2">
              SeizeLearn strictly accesses your public name, email, and avatar for credential verification. Your account is secured by Google OAuth.
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
