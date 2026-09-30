import React from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  CirclePlay, 
  BookOpen, 
  Layers3, 
  Trophy, 
  Clock, 
  Sparkles, 
  Star, 
  Target, 
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';

export const LearningPathView: React.FC = () => {
  const { 
    language, 
    t, 
    activeCourse, 
    userState, 
    setActiveTab, 
    setActiveCourseAndLesson, 
    getCourseProgress, 
    allProjects, 
    setActiveProjectId, 
    generateCertificate 
  } = useLearning();

  if (!activeCourse) return null;

  const progress = getCourseProgress(activeCourse.id);
  const capstoneProject = allProjects.find(p => p.id === activeCourse.capstoneProjectId);
  const isCapstoneDone = capstoneProject && !!userState.projectSubmissions[capstoneProject.id];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setActiveTab('home')}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{language === 'ta' ? 'முகப்பிற்குத் திரும்பு' : 'Back to Home'}</span>
        </button>
        <span className="text-slate-600">/</span>
        <span className="text-xs font-bold text-violet-400">{activeCourse.category}</span>
      </div>

      {/* Hero: Goal & Overview */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
              {activeCourse.level} Level
            </span>
            <h1 className="mt-3 font-heading text-2xl sm:text-4xl font-black text-white">
              {t(activeCourse.title)}
            </h1>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              {t(activeCourse.fullDescription)}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-violet-400" />
                <span>{activeCourse.estimatedHours} {language === 'ta' ? 'மணிநேரம்' : 'hours'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>+{activeCourse.xpReward} XP</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span>{activeCourse.rating} ({activeCourse.reviewCount} {language === 'ta' ? 'மதிப்பீடுகள்' : 'reviews'})</span>
              </div>
            </div>
          </div>

          {/* Quick Progress Box */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 md:w-64 shrink-0 text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {language === 'ta' ? 'பாதை முன்னேற்றம்' : 'Path Progress'}
            </div>
            <div className="mt-2 font-heading text-3xl font-black text-cyan-300">
              {progress.percentage}%
            </div>
            <p className="mt-1 text-xs text-slate-400">
              {progress.completedLessons} / {progress.totalLessons} {language === 'ta' ? 'பாடங்கள் முடிந்தது' : 'completed'}
            </p>

            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>

            {progress.isCompleted && (
              <button
                onClick={() => generateCertificate(activeCourse.id)}
                className="mt-4 w-full rounded-xl bg-violet-600 py-2 text-xs font-bold text-white hover:bg-violet-500 transition shadow-md shadow-violet-600/30"
              >
                {language === 'ta' ? 'சான்றிதழ் பெறுங்கள்' : 'Claim Certificate'}
              </button>
            )}
          </div>
        </div>

        {/* 6-Step Visual Journey Ribbon */}
        <div className="mt-8 border-t border-slate-800 pt-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            {language === 'ta' ? 'கற்றல் பாதை அமைப்பு:' : 'The SeizeLearn 6-Step Journey:'}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-300">
            <span className="rounded-md bg-slate-800 px-2.5 py-1 text-white">1. Goal</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <span className="rounded-md bg-slate-800 px-2.5 py-1 text-white">2. Modules</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <span className="rounded-md bg-slate-800 px-2.5 py-1 text-white">3. Short Lessons</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <span className="rounded-md bg-slate-800 px-2.5 py-1 text-white">4. Practice & Quiz</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <span className="rounded-md bg-cyan-950 border border-cyan-500/40 px-2.5 py-1 text-cyan-300">5. Project Hub</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <span className="rounded-md bg-violet-950 border border-violet-500/40 px-2.5 py-1 text-violet-300">6. Proof & Certificate</span>
          </div>
        </div>
      </div>

      {/* Target Learning Outcomes */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-white">
          <Target className="h-5 w-5 text-violet-400" />
          <span>{language === 'ta' ? 'நீங்கள் பெறும் முக்கிய திறன்கள்' : 'What You Will Learn & Build'}</span>
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {activeCourse.learningOutcomes.map((outcome, idx) => (
            <div key={idx} className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-3.5">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
              <span className="text-xs sm:text-sm text-slate-300">{t(outcome)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modules & Lessons List */}
      <div className="space-y-6">
        <h3 className="font-heading text-xl font-bold text-white">
          {language === 'ta' ? 'பாடப்பிரிவுகள் & தொகுதிகள்' : 'Curriculum Modules'}
        </h3>

        {activeCourse.modules.map(module => (
          <div 
            key={module.id} 
            className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70"
          >
            <div className="border-b border-slate-800/80 bg-slate-800/30 px-6 py-4">
              <h4 className="font-heading text-base font-bold text-white">
                {t(module.title)}
              </h4>
              <p className="mt-1 text-xs text-slate-400">
                {t(module.description)}
              </p>
            </div>

            <div className="divide-y divide-slate-800/60">
              {module.lessons.map(lesson => {
                const isCompleted = userState.completedLessonIds.includes(lesson.id);
                return (
                  <div
                    key={lesson.id}
                    onClick={() => setActiveCourseAndLesson(activeCourse.id, lesson.id)}
                    className="group flex cursor-pointer items-center justify-between px-6 py-4 transition hover:bg-slate-800/50"
                  >
                    <div className="flex items-center gap-4">
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-slate-600 group-hover:text-cyan-400 transition shrink-0" />
                      )}
                      <div>
                        <h5 className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
                          {t(lesson.title)}
                        </h5>
                        <p className="mt-0.5 text-xs text-slate-400 line-clamp-1">
                          {t(lesson.summary)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                      <span>{lesson.durationMinutes} min</span>
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-violet-300">+{lesson.xp} XP</span>
                      <button className="grid h-8 w-8 place-items-center rounded-lg bg-slate-800 text-slate-300 group-hover:bg-violet-600 group-hover:text-white transition">
                        <CirclePlay className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Capstone Project Section */}
      {capstoneProject && (
        <div className="overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-900 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <Layers3 className="h-4 w-4" />
                <span>{language === 'ta' ? 'முக்கிய போர்ட்ஃபோலியோ திட்டப்பணி' : 'Capstone Portfolio Project'}</span>
              </div>
              <h4 className="mt-2 font-heading text-xl font-bold text-white">
                {t(capstoneProject.title)}
              </h4>
              <p className="mt-1 text-xs text-slate-300 max-w-xl">
                {t(capstoneProject.tagline)}
              </p>
            </div>

            <button
              onClick={() => {
                setActiveProjectId(capstoneProject.id);
                setActiveTab('projects');
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-cyan-300 shrink-0"
            >
              <span>{isCapstoneDone ? (language === 'ta' ? 'திட்டப்பணியை சரிபார்க்க' : 'View Submission') : (language === 'ta' ? 'திட்டப்பணியை தொடங்கு' : 'Start Project')}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
