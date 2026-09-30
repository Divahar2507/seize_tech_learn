import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  LogIn, 
  UserPlus, 
  Sparkles, 
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  ShieldCheck
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { 
  loginWithGoogle, 
  loginWithMicrosoft, 
  loginWithLinkedIn, 
  loginWithCredentials, 
  registerWithCredentials, 
  logoutUser 
} from '../services/firebase';

export const AuthModal: React.FC = () => {
  const { 
    language, 
    openAuthModal, 
    setOpenAuthModal, 
    userState 
  } = useLearning();

  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  if (!openAuthModal) return null;

  const isGuest = userState.user.isAnonymous;

  // Handle custom credentials (username / email + password)
  const handleCredentialsAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isRegister) {
        if (!username.trim()) {
          throw new Error(language === 'ta' ? 'தயவுசெய்து உங்கள் பயனர் பெயரை உள்ளிடவும்.' : 'Please enter a username.');
        }
        if (password.length < 6) {
          throw new Error(language === 'ta' ? 'கடவுச்சொல் குறைந்தது 6 எழுத்துகள் இருக்க வேண்டும்.' : 'Password must be at least 6 characters long.');
        }
        await registerWithCredentials(username, email, password);
      } else {
        if (!usernameOrEmail.trim()) {
          throw new Error(language === 'ta' ? 'பயனர் பெயர் அல்லது மின்னஞ்சலை உள்ளிடவும்.' : 'Please enter your username or email.');
        }
        await loginWithCredentials(usernameOrEmail, password);
      }
      setOpenAuthModal(false);
    } catch (err: any) {
      console.error('Auth error', err);
      const msg = err.message || '';
      if (msg.includes('auth/invalid-credential') || msg.includes('auth/wrong-password') || msg.includes('auth/user-not-found')) {
        setErrorMsg(language === 'ta' ? 'தவறான பயனர் பெயர் அல்லது கடவுச்சொல்.' : 'Invalid credentials. Please verify your username and password.');
      } else if (msg.includes('auth/email-already-in-use')) {
        setErrorMsg(language === 'ta' ? 'இந்த மின்னஞ்சல்/பயனர் பெயர் ஏற்கனவே பயன்பாட்டில் உள்ளது.' : 'This email or username is already registered. Try signing in.');
      } else {
        setErrorMsg(err.message || 'Authentication error. Please check your inputs.');
      }
    } finally {
      setLoading(false);
    }
  };

  // OAuth Providers (Google, LinkedIn, Microsoft)
  const handleOAuthLogin = async (provider: 'google' | 'linkedin' | 'microsoft') => {
    setErrorMsg('');
    setLoading(true);
    setLoadingProvider(provider);

    try {
      if (provider === 'google') {
        await loginWithGoogle();
      } else if (provider === 'microsoft') {
        await loginWithMicrosoft();
      } else if (provider === 'linkedin') {
        await loginWithLinkedIn();
      }
      setOpenAuthModal(false);
    } catch (err: any) {
      console.error(`${provider} OAuth error:`, err);
      const code = err.code || '';
      const msg = err.message || '';
      if (code === 'auth/unauthorized-domain' || msg.includes('auth/unauthorized-domain')) {
        setErrorMsg(
          language === 'ta'
            ? 'டொமைன் அனுமதி தேவை: Firebase Console > Authentication > Settings > Authorized domains என்பதில் "localhost" ஐ சேர்க்கவும். அல்லது கீழே உள்ள பயனர் பெயர் & கடவுச்சொல் மூலம் இப்போதே உள்நுழையலாம்.'
            : 'Domain not authorized: Please add "localhost" to your Firebase Console -> Authentication -> Settings -> Authorized Domains. Or use the Username & Password login below!'
        );
      } else if (code === 'auth/popup-closed-by-user') {
        setErrorMsg(language === 'ta' ? 'உள்நுழைவு சாளரம் மூடப்பட்டது.' : 'Sign-in window was closed before completion.');
      } else {
        setErrorMsg(err.message || `${provider} sign-in encountered an error.`);
      }
    } finally {
      setLoading(false);
      setLoadingProvider(null);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setOpenAuthModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
        
        {/* Close button */}
        <button
          onClick={() => setOpenAuthModal(false)}
          className="absolute right-5 top-5 rounded-lg p-1.5 text-slate-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-400 font-heading text-lg font-black text-white shadow-lg shadow-violet-500/20">
            SZ
          </div>
          <h3 className="font-heading text-xl font-bold text-white">
            {!isGuest 
              ? (language === 'ta' ? 'உங்கள் கணக்கு' : 'Your Learner Profile')
              : isRegister 
                ? (language === 'ta' ? 'புதிய கணக்கு தொடங்குங்கள்' : 'Create Your Free Account')
                : (language === 'ta' ? 'மீண்டும் வருக!' : 'Welcome Back to SeizeLearn')}
          </h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            {language === 'ta' 
              ? 'கற்றல் புள்ளிகள், செய்முறைப் பணிகள் மற்றும் சான்றிதழ்களைப் பாதுகாக்க உள்நுழையவும்.'
              : 'Save your learning streaks, verified projects, and career credentials to the cloud.'}
          </p>
        </div>

        {/* Logged In View */}
        {!isGuest ? (
          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-600/20 text-violet-300 font-bold text-lg border border-violet-500/30">
              {(userState.user.displayName || userState.user.email || 'U')[0].toUpperCase()}
            </div>
            <div>
              <div className="font-heading text-base font-bold text-white">
                {userState.user.displayName || 'Learner'}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                {userState.user.email}
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 rounded-full bg-emerald-500/10 px-3 py-1 border border-emerald-500/30">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Cloud Synchronized</span>
            </div>
            <button
              onClick={handleLogout}
              className="w-full rounded-xl border border-rose-500/40 bg-rose-500/10 py-2.5 text-xs font-bold text-rose-300 hover:bg-rose-500/20 transition mt-4"
            >
              {language === 'ta' ? 'வெளியேறு' : 'Sign Out'}
            </button>
          </div>
        ) : (
          <>
            {errorMsg && (
              <div className="flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-950/40 p-3 text-xs text-rose-300">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-400" />
                <span className="leading-relaxed">{errorMsg}</span>
              </div>
            )}

            {/* 1. Fast Social OAuth Providers: LinkedIn, Google, Microsoft */}
            <div className="space-y-2.5">
              
              {/* Google */}
              <button
                onClick={() => handleOAuthLogin('google')}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-800/90 py-2.5 px-4 text-xs font-semibold text-white transition hover:bg-slate-700 hover:border-slate-600 disabled:opacity-50 shadow-sm"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>{loadingProvider === 'google' ? 'Connecting to Google...' : 'Continue with Google'}</span>
              </button>

              {/* LinkedIn */}
              <button
                onClick={() => handleOAuthLogin('linkedin')}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-[#0A66C2]/40 bg-[#0A66C2]/15 py-2.5 px-4 text-xs font-semibold text-white transition hover:bg-[#0A66C2]/25 hover:border-[#0A66C2]/60 disabled:opacity-50 shadow-sm"
              >
                <svg className="h-4 w-4 fill-[#0A66C2]" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                <span>{loadingProvider === 'linkedin' ? 'Connecting to LinkedIn...' : 'Continue with LinkedIn'}</span>
              </button>

              {/* Microsoft */}
              <button
                onClick={() => handleOAuthLogin('microsoft')}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-800/90 py-2.5 px-4 text-xs font-semibold text-white transition hover:bg-slate-700 hover:border-slate-600 disabled:opacity-50 shadow-sm"
              >
                <svg className="h-4 w-4" viewBox="0 0 23 23">
                  <path fill="#f35325" d="M1 1h10v10H1z"/>
                  <path fill="#81bc06" d="M12 1h10v10H12z"/>
                  <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                  <path fill="#ffba08" d="M12 12h10v10H12z"/>
                </svg>
                <span>{loadingProvider === 'microsoft' ? 'Connecting to Microsoft...' : 'Continue with Microsoft'}</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center pt-2">
              <div className="border-t border-slate-800 w-full" />
              <span className="bg-slate-900 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 absolute">
                {language === 'ta' ? 'அல்லது உள்நுழைவு மூலம்' : 'or continue with username'}
              </span>
            </div>

            {/* 2. Custom Login / Register with Username & Password */}
            <form onSubmit={handleCredentialsAuth} className="space-y-3 pt-1">
              
              {/* Register: Username Field */}
              {isRegister ? (
                <>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                      {language === 'ta' ? 'பயனர் பெயர்' : 'Username'}
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="e.g. dev_learner"
                        autoComplete="username"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                      {language === 'ta' ? 'மின்னஞ்சல் முகவரி' : 'Email Address'}
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition"
                      />
                    </div>
                  </div>
                </>
              ) : (
                /* Login: Username or Email Field */
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    {language === 'ta' ? 'பயனர் பெயர் அல்லது மின்னஞ்சல்' : 'Username or Email'}
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={usernameOrEmail}
                      onChange={e => setUsernameOrEmail(e.target.value)}
                      placeholder="e.g. dev_learner or you@example.com"
                      autoComplete="username"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition"
                    />
                  </div>
                </div>
              )}

              {/* Password Field */}
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                  {language === 'ta' ? 'கடவுச்சொல்' : 'Password'}
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete={isRegister ? 'new-password' : 'current-password'}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-10 py-2.5 text-xs text-white outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-violet-600 py-3 text-xs font-bold text-white transition hover:bg-violet-500 disabled:opacity-50 mt-3 shadow-lg shadow-violet-600/25 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>{language === 'ta' ? 'சரிபார்க்கிறது...' : 'Authenticating...'}</span>
                ) : isRegister ? (
                  <>
                    <UserPlus className="h-4 w-4" />
                    <span>{language === 'ta' ? 'புதிய கணக்கு தொடங்கு' : 'Create My Account'}</span>
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    <span>{language === 'ta' ? 'உள்நுழை' : 'Sign In with Password'}</span>
                  </>
                )}
              </button>
            </form>

            {/* Toggle Sign In / Sign Up */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setErrorMsg('');
                }}
                className="text-xs text-cyan-400 hover:underline font-semibold"
              >
                {isRegister
                  ? (language === 'ta' ? 'ஏற்கனவே கணக்கு உள்ளதா? உள்நுழையவும்' : 'Already have an account? Sign In')
                  : (language === 'ta' ? 'கணக்கு இல்லையா? புதிய கணக்கு தொடங்குங்கள்' : "Don't have an account? Sign Up free")}
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
