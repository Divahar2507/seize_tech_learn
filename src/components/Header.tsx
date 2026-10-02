import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  Trophy, 
  Compass, 
  Layers3, 
  User, 
  LogIn, 
  Zap, 
  Milestone,
  CheckCircle2,
  Menu,
  X,
  Code2,
  Brain,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLearning } from '../context/LearningContext';

export const Header: React.FC = () => {
  const { 
    userState, 
    activeTab, 
    setActiveTab, 
    setOpenDailyChallengeModal, 
    setOpenAuthModal,
    setOpenSearchModal,
    isOnline
  } = useLearning();

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const isTodayChallengeDone = userState.completedDailyChallenges.includes('dc-2026-09-21');

  const handleNavClick = (tab: any) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo & Product Promise */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link 
            to="/"
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 font-black text-white shadow-lg shadow-violet-500/20">
              SZ
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-heading text-lg font-black tracking-tight text-white">
                SeizeLearn
                <span className="rounded-full border border-violet-400/40 bg-violet-500/10 px-1.5 py-0.5 text-[9px] font-bold text-violet-300">
                  PROD
                </span>
                {!isOnline && (
                  <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-bold text-amber-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                    Offline
                  </span>
                )}
              </div>
              <p className="hidden text-[10px] font-semibold text-slate-400 sm:block">
                Practical Skills to Career
              </p>
            </div>
          </Link>

          {/* Desktop Primary Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold">
            <button
              onClick={() => handleNavClick('home')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition ${
                activeTab === 'home' 
                  ? 'bg-slate-800 text-white' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="h-4 w-4 text-violet-400" />
              Discover
            </button>
            <button
              onClick={() => handleNavClick('practice')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition ${
                activeTab === 'practice' 
                  ? 'bg-slate-800 text-emerald-300' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="h-4 w-4 text-emerald-400" />
              Practice
            </button>
            <button
              onClick={() => handleNavClick('drills')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition ${
                activeTab === 'drills' 
                  ? 'bg-slate-800 text-pink-300' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Brain className="h-4 w-4 text-pink-400" />
              Drills
            </button>
            <button
              onClick={() => handleNavClick('projects')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition ${
                activeTab === 'projects' 
                  ? 'bg-slate-800 text-cyan-300' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers3 className="h-4 w-4 text-cyan-400" />
              Projects
            </button>
            <button
              onClick={() => handleNavClick('roadmaps')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition ${
                activeTab === 'roadmaps' 
                  ? 'bg-slate-800 text-amber-300' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Milestone className="h-4 w-4 text-amber-400" />
              Roadmaps
            </button>
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition ${
                activeTab === 'dashboard' 
                  ? 'bg-slate-800 text-violet-300' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Trophy className="h-4 w-4 text-violet-400" />
              Growth
            </button>
          </nav>
        </div>

        {/* Right Side Utilities: Search, Daily Challenge, Streak, XP, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Search Palette Trigger */}
          <button
            onClick={() => setOpenSearchModal(true)}
            className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/90 px-2.5 py-1.5 text-xs text-slate-400 hover:text-slate-200 hover:border-slate-700 transition"
            title="Search anything (Ctrl+K or /)"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden sm:inline font-mono text-[10px] bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-slate-400">Ctrl K</kbd>
          </button>

          {/* Daily Challenge Quick Button */}
          <button
            onClick={() => setOpenDailyChallengeModal(true)}
            className={`hidden sm:flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold transition ${
              isTodayChallengeDone
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                : 'border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20'
            }`}
          >
            {isTodayChallengeDone ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Zap className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            )}
            <span>Daily Challenge</span>
          </button>

          {/* Streak Indicator */}
          <div 
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-2.5 py-1.5 text-xs font-bold text-amber-400"
            title="Learning Streak Days"
          >
            <Flame className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span>{userState.streak}</span>
          </div>

          {/* XP Indicator */}
          <div 
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-2.5 py-1.5 text-xs font-bold text-violet-300"
            title="Total XP Earned"
          >
            <Sparkles className="h-4 w-4 text-violet-400" />
            <span>{userState.xp} <span className="text-[10px] text-slate-500 hidden sm:inline">XP</span></span>
          </div>

          {/* User Sign In / Profile */}
          <button
            onClick={() => setOpenAuthModal(true)}
            className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-slate-200 transition hover:border-violet-400 hover:text-white"
          >
            {userState.user.photoURL ? (
              <img 
                src={userState.user.photoURL} 
                alt="Profile" 
                className="h-5 w-5 rounded-full object-cover" 
              />
            ) : (
              <User className="h-4 w-4 text-slate-300" />
            )}
            <span className="max-w-[80px] truncate hidden md:inline">
              {userState.user.displayName || 'Sign In'}
            </span>
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              activeTab === 'home' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="h-4 w-4 text-violet-400" />
            <span>Discover</span>
          </button>

          <button
            onClick={() => handleNavClick('practice')}
            className={`w-full flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              activeTab === 'practice' ? 'bg-slate-800 text-emerald-300' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="h-4 w-4 text-emerald-400" />
            <span>Practice Studio</span>
          </button>

          <button
            onClick={() => handleNavClick('drills')}
            className={`w-full flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              activeTab === 'drills' ? 'bg-slate-800 text-pink-300' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Brain className="h-4 w-4 text-pink-400" />
            <span>Recall Arena</span>
          </button>

          <button
            onClick={() => handleNavClick('projects')}
            className={`w-full flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              activeTab === 'projects' ? 'bg-slate-800 text-cyan-300' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers3 className="h-4 w-4 text-cyan-400" />
            <span>Project Hub</span>
          </button>

          <button
            onClick={() => handleNavClick('roadmaps')}
            className={`w-full flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              activeTab === 'roadmaps' ? 'bg-slate-800 text-amber-300' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Milestone className="h-4 w-4 text-amber-400" />
            <span>Career Roadmaps</span>
          </button>

          <button
            onClick={() => handleNavClick('dashboard')}
            className={`w-full flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              activeTab === 'dashboard' ? 'bg-slate-800 text-violet-300' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Trophy className="h-4 w-4 text-violet-400" />
            <span>Growth Dashboard</span>
          </button>

          <button
            onClick={() => {
              setOpenDailyChallengeModal(true);
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-sm font-semibold text-amber-300"
          >
            <Zap className="h-4 w-4 text-amber-400" />
            <span>Daily Challenge</span>
          </button>
        </div>
      )}
    </header>
  );
};
