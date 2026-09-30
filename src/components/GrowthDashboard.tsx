import React from 'react';
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
  Printer
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { ALL_BADGES } from '../data/badgesData';
import { LearningCategory } from '../types/learning';

export const GrowthDashboard: React.FC = () => {
  const { 
    language, 
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
    setActiveTab 
  } = useLearning();

  const categories: { name: LearningCategory; icon: any; color: string }[] = [
    { name: 'AI Tools & Prompting', icon: BrainCircuit, color: 'text-violet-400' },
    { name: 'Web Development', icon: Code2, color: 'text-cyan-400' },
    { name: 'English & Communication', icon: WandSparkles, color: 'text-amber-400' },
    { name: 'Career & Placement Prep', icon: BriefcaseBusiness, color: 'text-rose-400' }
  ];

  const level = Math.floor(userState.xp / 250) + 1;
  const xpToNext = 250 - (userState.xp % 250);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      
      {/* Dashboard Top Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-r from-[#110e2e] via-[#0b0c20] to-slate-950 p-6 sm:p-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="rounded-lg border border-violet-400/30 bg-violet-500/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-violet-300">
              {language === 'ta' ? 'கற்றல் வளர்ச்சி பலகை' : 'Learner Growth Dossier'}
            </span>
            <h1 className="mt-3 font-heading text-3xl sm:text-4xl font-black text-white">
              {language === 'ta' ? 'உங்கள் தினசரி முன்னேற்றம்' : 'Your Momentum & Achievements'}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              {language === 'ta' 
                ? 'உங்கள் கற்றல் வேகம், முடிக்கப்பட்ட திட்டப்பணிகள் மற்றும் பெற்ற சான்றிதழ்களின் முழு விவரம்.'
                : 'Track your skill acquisition, verified portfolio projects, streak habits, and career credentials.'}
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-400 font-heading text-xl font-black text-white shadow-lg shadow-violet-500/30">
              L{level}
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-slate-400">
                {language === 'ta' ? 'திறன் நிலை' : 'Skill Tier'}
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

      {/* 4 Category Skill Progress Bars */}
      <div className="space-y-4">
        <h3 className="font-heading text-lg font-bold text-white">
          {language === 'ta' ? '4 துறைகளில் உங்கள் திறன் முன்னேற்றம்' : 'Skill Progress Across Launch Categories'}
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
                  {progress.completedLessons} / {progress.totalLessons} {language === 'ta' ? 'பாடங்கள் முடிந்தது' : 'lessons done'}
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
              {language === 'ta' ? 'சமர்ப்பிக்கப்பட்ட திட்டப்பணிகள் (போர்ட்ஃபோலியோ ஆதாரம்)' : 'Portfolio Projects & Proof of Work'}
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              {language === 'ta' ? 'வேலைவாய்ப்பு தேர்வாளர்களுக்கு நீங்கள் காட்டும் நேரடி படைப்புகள்.' : 'Live projects verifying your ability beyond theoretical claims.'}
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('projects')}
            className="text-xs font-bold text-cyan-400 hover:underline"
          >
            {language === 'ta' ? 'புதிய திட்டப்பணி' : 'Go to Project Hub'} &rarr;
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
                        {language === 'ta' ? 'சரிபார்க்கப்பட்டது' : 'Verified Submission'}
                      </span>
                    ) : (
                      <span className="text-slate-500">
                        {language === 'ta' ? 'நிலுவையில் உள்ளது' : 'Not Started'}
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
                    {isSubmitted ? (language === 'ta' ? 'விவரங்கள் பார்க்க' : 'View Proof') : (language === 'ta' ? 'தொடங்க' : 'Start Project')} &rarr;
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
          {language === 'ta' ? 'பெற்ற சாதனைப் பதக்கங்கள்' : 'Unlocked Achievement Badges'}
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
                    {isUnlocked ? (language === 'ta' ? 'பெற்றது' : 'Earned') : (language === 'ta' ? 'பூட்டப்பட்டது' : 'Locked')}
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
              {language === 'ta' ? 'சரிபார்க்கப்பட்ட திறன் சான்றிதழ்கள்' : 'Accredited Skill Certificates'}
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              {language === 'ta' ? 'பாடங்களை முடித்து உங்கள் அதிகாரப்பூர்வ சான்றிதழை பெறுங்கள்.' : 'Awarded upon finishing 100% of a specialization curriculum.'}
            </p>
          </div>
        </div>

        {userState.certificates.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {userState.certificates.map(cert => (
              <div 
                key={cert.id}
                className="rounded-2xl border border-violet-400/40 bg-gradient-to-br from-violet-950/20 via-slate-900 to-slate-900 p-6 flex flex-col justify-between space-y-4"
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
                </div>

                <div className="flex items-center justify-between border-t border-slate-800 pt-3">
                  <span className="text-xs font-semibold text-emerald-400">✓ Verified Credential</span>
                  <button
                    onClick={() => {
                      setSelectedCertificate(cert);
                      setOpenCertificateModal(true);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-violet-500"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>{language === 'ta' ? 'சான்றிதழைப் பார்' : 'View / Print'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-800 p-8 text-center">
            <Award className="mx-auto h-10 w-10 text-slate-600 mb-2" />
            <p className="text-sm font-semibold text-slate-300">
              {language === 'ta' ? 'இன்னும் எந்த சான்றிதழும் பெறப்படவில்லை' : 'No certificates claimed yet'}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {language === 'ta' ? 'ஒரு கற்றல் பாதையின் அனைத்து பாடங்களையும் முடித்து சான்றிதழ் பெறுங்கள்.' : 'Complete all lessons in a path to unlock your official verified certificate.'}
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
