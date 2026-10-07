import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Flame, 
  Sparkles, 
  Target, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  BrainCircuit, 
  Code2, 
  WandSparkles, 
  BriefcaseBusiness, 
  ArrowRight,
  Printer,
  Calendar,
  Zap,
  Share2,
  Check,
  Download,
  Trash2,
  Globe,
  UserCheck
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { ALL_BADGES } from '../data/badgesData';
import { LearningCategory } from '../types/learning';

export const GrowthDashboard: React.FC = () => {
  const { 
    t, 
    userState, 
    allCourses, 
    allProjects, 
    getCategoryProgress, 
    getCourseProgress, 
    setActiveCourseAndLesson, 
    setSelectedCertificate, 
    setOpenCertificateModal, 
    generateCertificate,
    setActiveTab,
    setOpenDailyChallengeModal,
    exportDataAsJSON,
    deleteAccountAndData,
    syncStatus
  } = useLearning();

  const categories: { name: LearningCategory; icon: any; color: string }[] = [
    { name: 'AI Tools & Prompting', icon: BrainCircuit, color: 'text-violet-400' },
    { name: 'Web Development', icon: Code2, color: 'text-cyan-400' },
    { name: 'English & Communication', icon: WandSparkles, color: 'text-amber-400' },
    { name: 'Career & Placement Prep', icon: BriefcaseBusiness, color: 'text-rose-400' }
  ];

  const level = Math.floor(userState.xp / 250) + 1;
  const xpToNext = 250 - (userState.xp % 250);

  // Selected day for interactive tooltip
  const [selectedDayInfo, setSelectedDayInfo] = useState<{
    dateStr: string;
    dayNum: number;
    displayDate: string;
    count: number;
    actions: string[];
  } | null>(null);

  // Generate 35 days (5 weeks x 7 days) ending today
  const heatmapDays = useMemo(() => {
    const days = [];
    const today = new Date();
    const streakCount = userState.streak || 1;

    for (let i = 34; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const displayDate = d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });

      const actions: string[] = [];
      let count = 0;

      // Check streak active days
      if (i < streakCount) {
        count += 2;
        actions.push('Active Streak Study Session');
      }

      // Check completed daily challenges
      const challengeMatches = userState.completedDailyChallenges.filter(ch => ch.includes(dateStr));
      if (challengeMatches.length > 0) {
        count += 2;
        actions.push('Daily Challenge Solved (+40 XP)');
      }

      // Check quiz records
      Object.values(userState.quizRecords).forEach(rec => {
        if (rec.completedAt && rec.completedAt.startsWith(dateStr)) {
          count += 1;
          actions.push(`Quiz Passed (${rec.score}/${rec.totalQuestions})`);
        }
      });

      // Check project submissions
      Object.values(userState.projectSubmissions).forEach(sub => {
        if (sub.submittedAt && sub.submittedAt.startsWith(dateStr)) {
          count += 3;
          actions.push('Project Submission Verified');
        }
      });

      let level: 0 | 1 | 2 | 3 = 0;
      if (count >= 4) level = 3;
      else if (count >= 2) level = 2;
      else if (count >= 1) level = 1;

      days.push({
        dateStr,
        dayNum: d.getDate(),
        displayDate,
        count,
        level,
        actions: actions.length > 0 ? actions : ['No learning activities recorded']
      });
    }

    return days;
  }, [userState]);

  const activeDaysCount = heatmapDays.filter(d => d.count > 0).length;
  const consistencyRate = Math.round((activeDaysCount / heatmapDays.length) * 100);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      
      {/* Dashboard Top Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-r from-[#110e2e] via-[#0b0c20] to-slate-950 p-6 sm:p-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="rounded-lg border border-violet-400/30 bg-violet-500/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-violet-300">
              Learner Growth Dossier
            </span>
            <h1 className="mt-3 font-heading text-3xl sm:text-4xl font-black text-white">
              Your Momentum & Achievements
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              Track your skill acquisition, verified portfolio projects, streak habits, and career credentials.
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-400 font-heading text-xl font-black text-white shadow-lg shadow-violet-500/30">
              L{level}
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-slate-400">
                Skill Tier
              </div>
              <div className="font-heading text-lg font-black text-white">
                {userState.user.displayName || 'Learner'}
              </div>
              <div className="text-xs font-semibold text-violet-400">
                {userState.xp} Total XP · {xpToNext} XP to Level {level + 1}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 30-Day Activity Heatmap & Consistency Engine */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Calendar className="h-4 w-4" />
              </span>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                30-Day Learning Activity Heatmap
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              GitHub-style consistency matrix visualizing daily code labs, quiz challenges, and streak habits.
            </p>
          </div>

          {/* Quick Metrics Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-300">
              <Flame className="h-3.5 w-3.5 fill-current" />
              <span>{userState.streak} Day Streak</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-300">
              <Zap className="h-3.5 w-3.5" />
              <span>{activeDaysCount}/35 Active Days ({consistencyRate}%)</span>
            </div>
            <button
              onClick={() => setOpenDailyChallengeModal(true)}
              className="inline-flex items-center gap-1 rounded-xl bg-violet-600 hover:bg-violet-500 px-3 py-1.5 text-xs font-bold text-white transition shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Today's Challenge</span>
            </button>
          </div>
        </div>

        {/* Heatmap Matrix Display */}
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[500px] space-y-2">
            {/* Weekdays Header */}
            <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-mono text-slate-500 uppercase font-semibold">
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
            </div>

            {/* 35 Heatmap Tiles */}
            <div className="grid grid-cols-7 gap-2">
              {heatmapDays.map((day, idx) => {
                const isSelected = selectedDayInfo?.dateStr === day.dateStr;
                const isToday = idx === heatmapDays.length - 1;

                return (
                  <button
                    key={day.dateStr}
                    onClick={() => setSelectedDayInfo(day)}
                    onMouseEnter={() => setSelectedDayInfo(day)}
                    className={`h-11 sm:h-12 rounded-xl flex flex-col items-center justify-center p-1 font-mono text-[11px] transition-all relative group border ${
                      isSelected ? 'ring-2 ring-violet-400 scale-105 z-10' : ''
                    } ${
                      day.level === 3
                        ? 'bg-emerald-400 text-slate-950 font-black border-emerald-300 shadow-md shadow-emerald-500/20'
                        : day.level === 2
                        ? 'bg-emerald-600 text-white font-bold border-emerald-500'
                        : day.level === 1
                        ? 'bg-emerald-950/70 text-emerald-300 border-emerald-800/40 hover:border-emerald-600'
                        : 'bg-slate-950/50 text-slate-500 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span>{day.dayNum}</span>
                    {day.count > 0 && (
                      <span className={`text-[8px] font-sans ${day.level === 3 ? 'text-slate-900 font-bold' : 'text-emerald-400'}`}>
                        +{day.count * 20}p
                      </span>
                    )}
                    {isToday && (
                      <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-cyan-400 ring-2 ring-slate-900 animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Day Info Banner & Legend */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
          <div className="text-xs">
            {selectedDayInfo ? (
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">{selectedDayInfo.displayDate}:</span>
                <span className="text-emerald-400 font-semibold">
                  {selectedDayInfo.count > 0 
                    ? `${selectedDayInfo.count} events completed (${selectedDayInfo.actions.join(', ')})`
                    : 'Rest day / No active modules recorded'
                  }
                </span>
              </div>
            ) : (
              <span className="text-slate-500">
                Hover or tap on any calendar day to inspect milestones and logged XP.
              </span>
            )}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono self-start sm:self-center">
            <span>Less</span>
            <span className="h-3 w-3 rounded-md bg-slate-950 border border-slate-800" />
            <span className="h-3 w-3 rounded-md bg-emerald-950/70 border border-emerald-800/40" />
            <span className="h-3 w-3 rounded-md bg-emerald-600 border border-emerald-500" />
            <span className="h-3 w-3 rounded-md bg-emerald-400 border border-emerald-300" />
            <span>More</span>
          </div>
        </div>
      </div>

      {/* 4 Category Skill Progress Bars */}
      <div className="space-y-4">
        <h3 className="font-heading text-lg font-bold text-white">
          Skill Progress Across Launch Categories
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(cat => {
            const Icon = cat.icon;
            const progress = getCategoryProgress(cat.name);

            return (
              <div key={cat.name} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`p-2 rounded-xl bg-slate-800 ${cat.color}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-heading text-lg font-black text-white">
                    {progress.percentage}%
                  </span>
                </div>

                <h4 className="font-heading text-sm font-bold text-slate-200">
                  {cat.name}
                </h4>

                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>

                <div className="text-[11px] text-slate-400">
                  {progress.completedLessons} / {progress.totalLessons} lessons done
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verified Projects & Submissions */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading text-xl font-bold text-white">
              Portfolio Projects & Proof of Work
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Live projects verifying your ability beyond theoretical claims.
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('projects')}
            className="text-xs font-bold text-cyan-400 hover:underline"
          >
            Go to Project Hub &rarr;
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {allProjects.map(proj => {
            const sub = userState.projectSubmissions[proj.id];
            const isSubmitted = !!sub;

            return (
              <div 
                key={proj.id}
                className={`rounded-2xl border p-5 flex flex-col justify-between ${
                  isSubmitted 
                    ? 'border-emerald-500/40 bg-emerald-950/10' 
                    : 'border-slate-800 bg-slate-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-cyan-300">{proj.category}</span>
                    {isSubmitted ? (
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Verified Submission
                      </span>
                    ) : (
                      <span className="text-slate-500">
                        Not Started
                      </span>
                    )}
                  </div>

                  <h4 className="mt-2 font-heading text-base font-bold text-white">
                    {t(proj.title)}
                  </h4>

                  <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                    {t(proj.tagline)}
                  </p>

                  {isSubmitted && sub.demoUrl && (
                    <div className="mt-3">
                      <a
                        href={sub.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 hover:underline"
                      >
                        <span>{sub.demoUrl}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400">+{proj.xpReward} XP</span>
                  <button
                    onClick={() => {
                      setActiveTab('projects');
                    }}
                    className="text-xs font-bold text-violet-400 hover:text-white"
                  >
                    {isSubmitted ? 'View Proof' : 'Start Project'} &rarr;
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Earned Badges Showcase */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 space-y-6">
        <h3 className="font-heading text-xl font-bold text-white">
          Unlocked Achievement Badges
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {ALL_BADGES.map(badge => {
            const isUnlocked = userState.earnedBadgeIds.includes(badge.id);

            return (
              <div 
                key={badge.id}
                className={`rounded-2xl border p-4 text-center transition ${
                  isUnlocked
                    ? 'border-violet-500/40 bg-slate-900/90 shadow-md shadow-violet-950/20'
                    : 'border-slate-800/60 bg-slate-950/40 opacity-40'
                }`}
              >
                <div className="mx-auto text-3xl mb-2">{badge.icon}</div>
                <h4 className="font-heading text-sm font-bold text-white">
                  {t(badge.title)}
                </h4>
                <p className="mt-1 text-[11px] text-slate-400 line-clamp-2">
                  {t(badge.description)}
                </p>
                <div className="mt-3">
                  <span className={`rounded px-2 py-0.5 text-[9px] font-bold uppercase ${
                    isUnlocked ? 'bg-violet-500/20 text-violet-300' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {isUnlocked ? 'Earned' : 'Locked'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Verified Certificates */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading text-xl font-bold text-white">
              Accredited Skill Certificates
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Awarded upon finishing 100% of a specialization curriculum.
            </p>
          </div>
        </div>

        {userState.certificates.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {userState.certificates.map(cert => {
              const verificationUrl = `${window.location.origin}/verify/${cert.id || cert.certificateCode}`;
              const issueYear = new Date().getFullYear();
              const issueMonth = new Date().getMonth() + 1;
              const linkedInAddUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
                cert.courseTitle
              )}&organizationName=SeizeLearn&issueYear=${issueYear}&issueMonth=${issueMonth}&certUrl=${encodeURIComponent(
                verificationUrl
              )}&certId=${encodeURIComponent(cert.certificateCode)}`;

              return (
                <div 
                  key={cert.id}
                  className="rounded-2xl border border-violet-400/40 bg-gradient-to-br from-violet-950/20 via-slate-900 to-slate-900 p-6 flex flex-col justify-between space-y-4 shadow-lg shadow-violet-950/20"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-cyan-300">{cert.certificateCode}</span>
                      <span className="text-slate-400">{cert.issuedAt}</span>
                    </div>
                    <h4 className="mt-3 font-heading text-lg font-black text-white">
                      {cert.courseTitle}
                    </h4>
                    <p className="mt-1 text-xs text-violet-300">
                      Awarded to: {cert.studentName} ({cert.grade})
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {cert.skills.slice(0, 3).map((s, i) => (
                        <span key={i} className="rounded-md bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 pt-3">
                    <span className="text-xs font-semibold text-emerald-400">✓ Verified Credential</span>
                    <div className="flex items-center gap-2">
                      <a
                        href={linkedInAddUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#0a66c2] hover:bg-[#004182] px-2.5 py-1.5 text-xs font-bold text-white transition shadow-sm"
                      >
                        <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 0 0 0-2.9 1.45 1.45 0 0 0 0 2.9m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
                        </svg>
                        <span>LinkedIn</span>
                      </a>
                      <button
                        onClick={() => {
                          setSelectedCertificate(cert);
                          setOpenCertificateModal(true);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-violet-500 transition"
                      >
                        <Printer className="h-3.5 w-3.5" />
                        <span>View / Print</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-800 p-8 text-center space-y-4">
            <Award className="mx-auto h-10 w-10 text-violet-400 mb-2" />
            <div>
              <p className="text-sm font-semibold text-slate-200">
                No certificates claimed yet
              </p>
              <p className="mt-1 text-xs text-slate-400 max-w-md mx-auto">
                Complete curriculum requirements or claim your first specialization certificate to sync directly with your LinkedIn profile.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={() => generateCertificate('course-ai-skills')}
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-4 py-2 text-xs font-bold text-white transition shadow-lg shadow-violet-600/20"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Claim AI Prompting Certificate (+400 XP)</span>
              </button>
              <button
                onClick={() => generateCertificate('course-web-dev')}
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 px-4 py-2 text-xs font-bold text-cyan-300 transition"
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>Claim Web Dev Certificate (+500 XP)</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Public Portfolio Showcase Hub */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
            <Globe className="h-3 w-3" />
            <span>Public Showcase</span>
          </div>
          <h3 className="font-heading text-xl font-bold text-white">
            Your Live Developer & Career Portfolio
          </h3>
          <p className="text-xs text-slate-400">
            Share your verified project proofs, accredited certificates, and earned competencies directly with recruiters and hiring managers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 px-4 py-2.5 text-xs font-bold text-slate-950 transition shadow-lg shadow-cyan-500/20"
          >
            <UserCheck className="h-4 w-4" />
            <span>View Public Portfolio</span>
          </Link>
          <button
            onClick={() => {
              const url = `${window.location.origin}/profile`;
              navigator.clipboard.writeText(url);
              alert('Portfolio URL copied to clipboard: ' + url);
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 px-3.5 py-2.5 text-xs font-bold text-slate-200 transition"
          >
            <Share2 className="h-3.5 w-3.5 text-slate-400" />
            <span>Copy Link</span>
          </button>
        </div>
      </div>

      {/* Account Settings & Privacy Compliance (GDPR/CCPA) */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 sm:p-8 space-y-4">
        <div>
          <h3 className="font-heading text-base font-bold text-white">
            Account Management & Privacy Controls
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Export your complete learning records or manage your cloud persistence footprint (GDPR / CCPA compliant).
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={exportDataAsJSON}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-200 transition"
            >
              <Download className="h-3.5 w-3.5 text-cyan-400" />
              <span>Download My Data (JSON)</span>
            </button>
            <span className="text-[11px] text-slate-500">
              Includes all quiz logs, project briefs, and certificates.
            </span>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete your account data and reset your progress? This action cannot be undone.')) {
                deleteAccountAndData();
              }
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-2 text-xs font-bold text-rose-300 transition"
          >
            <Trash2 className="h-3.5 w-3.5 text-rose-400" />
            <span>Reset & Delete Account</span>
          </button>
        </div>
      </div>

    </div>
  );
};
