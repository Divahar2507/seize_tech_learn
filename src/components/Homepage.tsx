import React, { useMemo } from 'react';
import { 
  Search, 
  ArrowRight, 
  BrainCircuit, 
  Code2, 
  WandSparkles, 
  BriefcaseBusiness, 
  CirclePlay, 
  Zap, 
  Layers3, 
  Trophy, 
  Flame, 
  Target, 
  CheckCircle, 
  BookOpen, 
  Star,
  ChevronRight,
  ShieldCheck,
  Compass,
  Brain
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { LearningCategory } from '../types/learning';

const CATEGORY_CHIPS: { label: string; category: LearningCategory; icon: any }[] = [
  { label: 'AI Skills', category: 'AI Tools & Prompting', icon: BrainCircuit },
  { label: 'Web Development', category: 'Web Development', icon: Code2 },
  { label: 'Spoken English', category: 'English & Communication', icon: WandSparkles },
  { label: 'Placement Prep', category: 'Career & Placement Prep', icon: BriefcaseBusiness },
];

export const Homepage: React.FC = () => {
  const { 
    t, 
    allCourses, 
    allProjects, 
    userState, 
    todayChallenge, 
    activeCourseId, 
    setActiveCourseAndLesson, 
    enrollCourse, 
    getCourseProgress, 
    getCategoryProgress, 
    setOpenDailyChallengeModal, 
    setActiveTab, 
    setActiveProjectId,
    searchQuery, 
    setSearchQuery,
    setOpenSearchModal
  } = useLearning();

  // Find active course or default
  const currentCourse = allCourses.find(c => c.id === activeCourseId) || allCourses[0];
  const currentProgress = currentCourse ? getCourseProgress(currentCourse.id) : null;

  // Filter courses based on search
  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return allCourses;
    const q = searchQuery.toLowerCase();
    return allCourses.filter(c => 
      t(c.title).toLowerCase().includes(q) ||
      t(c.shortDescription).toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }, [allCourses, searchQuery]);

  const level = Math.floor(userState.xp / 250) + 1;
  const xpToNextLevel = 250 - (userState.xp % 250);

  const handleStartCourse = (courseId: string) => {
    enrollCourse(courseId);
    setActiveCourseAndLesson(courseId);
  };

  // Compute smart recommended next step
  const nextRecommendedLesson = useMemo(() => {
    if (!currentCourse) return null;
    for (const mod of currentCourse.modules) {
      for (const les of mod.lessons) {
        if (!userState.completedLessonIds.includes(les.id)) {
          return { course: currentCourse, lesson: les };
        }
      }
    }
    return null;
  }, [currentCourse, userState.completedLessonIds]);

  const isTodayChallengeDone = userState.completedDailyChallenges.includes(todayChallenge.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      
      {/* 1. HERO SECTION: "What do you want to learn today?" */}
      <section className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-b from-[#0e1329] via-[#090d1c] to-slate-950 p-6 sm:p-10 lg:p-12 shadow-2xl">
        {/* Glow decoration */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-violet-600/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />

        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            Practical Skills to Career
          </div>

          <h1 className="mt-4 font-heading text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
            Learn useful skills.<br />
            <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Build real proof. Grow every day.
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Beyond classroom theory: short practical lessons, daily active recall, hands-on capstone projects, and direct career readiness.
          </p>

          {/* Interactive Search Bar */}
          <div className="mt-8 relative max-w-2xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-violet-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to learn today?"
              className="h-14 w-full rounded-2xl border border-slate-700 bg-slate-900/90 pl-12 pr-28 text-sm text-white placeholder-slate-400 shadow-inner outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
            <button
              onClick={() => setOpenSearchModal(true)}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-300 transition"
              title="Open full command search"
            >
              <span>Search</span>
              <kbd className="font-mono text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-400 border border-slate-800">Ctrl K</kbd>
            </button>
          </div>

          {/* Quick Filter Chips */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
              Popular paths:
            </span>
            {CATEGORY_CHIPS.map(chip => {
              const Icon = chip.icon;
              return (
                <button
                  key={chip.category}
                  onClick={() => setSearchQuery(searchQuery === chip.label ? '' : chip.label)}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition ${
                    searchQuery.toLowerCase().includes(chip.label.toLowerCase())
                      ? 'border-cyan-400 bg-cyan-400/15 text-cyan-200 shadow-md shadow-cyan-500/10'
                      : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 text-violet-400" />
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* 2. CORE MOMENTUM DUAL SECTION: Continue Learning & Daily Challenge */}
      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        
        {/* Continue Learning Card */}
        {currentCourse && currentProgress && (
          <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Continue Learning
                </span>
                <h3 className="mt-1 font-heading text-xl font-bold text-white">
                  {t(currentCourse.title)}
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  {currentCourse.category} · {currentCourse.level}
                </p>
              </div>
              <button 
                onClick={() => handleStartCourse(currentCourse.id)}
                className="grid h-10 w-10 place-items-center rounded-xl bg-violet-600/20 text-violet-300 hover:bg-violet-600 hover:text-white transition"
              >
                <CirclePlay className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>
                  {currentProgress.completedLessons} of ${currentProgress.totalLessons} lessons completed
                </span>
                <span className="font-bold text-cyan-300">{currentProgress.percentage}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-500" 
                  style={{ width: `${currentProgress.percentage}%` }}
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => handleStartCourse(currentCourse.id)}
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-violet-500 shadow-md shadow-violet-600/20"
              >
                <span>Resume Next Lesson</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={() => setActiveCourseAndLesson(currentCourse.id)}
                className="text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
              >
                View Path Details &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Daily Challenge Widget */}
        <div 
          onClick={() => setOpenDailyChallengeModal(true)}
          className="group relative cursor-pointer overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-slate-900/90 to-slate-950 p-6 backdrop-blur-sm transition hover:border-amber-400/60"
        >
          <div className="flex items-start justify-between">
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/15 px-2.5 py-1 text-xs font-bold text-amber-300">
              <Zap className="h-3.5 w-3.5" />
              <span>Daily Challenge</span>
            </div>
            <span className="text-xs font-bold text-amber-400">+{todayChallenge.xpReward} XP</span>
          </div>

          <h3 className="mt-4 font-heading text-lg font-bold text-white group-hover:text-amber-200 transition">
            {t(todayChallenge.title)}
          </h3>

          <p className="mt-2 text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {t(todayChallenge.problemStatement)}
          </p>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400">
              {todayChallenge.estimatedMinutes} mins · {todayChallenge.topic}
            </span>
            <span className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition ${
              isTodayChallengeDone
                ? 'bg-emerald-500/20 text-emerald-300'
                : 'bg-amber-400 text-slate-950 group-hover:bg-amber-300'
            }`}>
              {isTodayChallengeDone ? 'Completed' : 'Start Challenge'}
              <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

      </section>

      {/* 2.5 RECOMMENDED NEXT STEP (From Product Proposal) */}
      {nextRecommendedLesson && (
        <section className="rounded-2xl border border-violet-500/30 bg-gradient-to-r from-violet-950/30 via-slate-900 to-slate-900 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                  Recommended Next Step
                </span>
                <h3 className="font-heading text-lg font-bold text-white">
                  {t(nextRecommendedLesson.lesson.title)}
                </h3>
                <p className="text-xs text-slate-400">
                  {t(nextRecommendedLesson.course.title)} · {nextRecommendedLesson.lesson.durationMinutes} mins · +{nextRecommendedLesson.lesson.xp} XP
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveCourseAndLesson(nextRecommendedLesson.course.id, nextRecommendedLesson.lesson.id)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-violet-500 shadow-md shadow-violet-600/25 shrink-0"
            >
              <span>Jump to Lesson</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* 2.7 INTERACTIVE STUDIOS & ACTIVE RECALL ARENA */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* Practice Studio Tile */}
        <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-900 p-6 flex flex-col justify-between hover:border-emerald-500/50 transition">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Code2 className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Hands-on Labs
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Interactive Practice Studio
            </h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Live HTML/CSS/JS CodeLab, C.T.C.O Prompt Evaluator, Voice Speech Studio with filler analysis, and ATS Resume Scorer.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">4 Tools • Real-time Feedback</span>
            <button
              onClick={() => setActiveTab('practice')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md shadow-emerald-600/20"
            >
              <span>Open Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Active Recall & Blitz Arena Tile */}
        <div className="relative overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-950/30 via-slate-900 to-slate-900 p-6 flex flex-col justify-between hover:border-violet-500/50 transition">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="p-2.5 rounded-xl bg-violet-500/20 text-violet-400 border border-violet-500/30">
                <Brain className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
                Spaced Repetition
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Recall Arena & 60s Blitz Deck
            </h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Master concepts with spaced repetition flashcards, English audio cards, and high-speed 60s recall trials.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">+50 XP Bonus • Flashcard Mastery</span>
            <button
              onClick={() => setActiveTab('drills')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition shadow-md shadow-violet-600/20"
            >
              <span>Enter Arena</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. FOUR CORE LAUNCH PATHS: The Heart of SeizeLearn */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
              Core Learning Paths
            </span>
            <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              Discover Your Next Practical Skill
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            Every path follows the 6-step cycle: Goal → Modules → Lessons → Practice → Quiz → Project.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filteredCourses.map(course => {
            const progress = getCourseProgress(course.id);
            const isEnrolled = userState.enrolledCourseIds.includes(course.id);
            const project = allProjects.find(p => p.id === course.capstoneProjectId);

            return (
              <div 
                key={course.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6 transition hover:border-slate-700 hover:shadow-xl hover:shadow-violet-950/20"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-xs font-bold text-cyan-300">
                      {course.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {course.estimatedHours} hrs · +{course.xpReward} XP
                    </span>
                  </div>

                  <h3 className="mt-4 font-heading text-xl font-bold text-white group-hover:text-cyan-300 transition">
                    {t(course.title)}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {t(course.shortDescription)}
                  </p>

                  {/* Highlights / Modules count */}
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5 text-violet-400" />
                      <span>{course.modules.length} Modules</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span>{course.rating} ({course.reviewCount})</span>
                    </div>
                    {project && (
                      <div className="flex items-center gap-1 text-cyan-300">
                        <Layers3 className="h-3.5 w-3.5" />
                        <span className="truncate max-w-[150px]">{t(project.title)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer: Progress or Enroll */}
                <div className="mt-6 border-t border-slate-800/80 pt-4 flex items-center justify-between">
                  <div className="text-xs font-semibold">
                    {isEnrolled ? (
                      <span className="text-cyan-300">
                        {progress.completedLessons}/{progress.totalLessons} done ({progress.percentage}%)
                      </span>
                    ) : (
                      <span className="text-slate-400">Free Access</span>
                    )}
                  </div>

                  <button
                    onClick={() => handleStartCourse(course.id)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-white transition hover:bg-violet-600 group-hover:bg-violet-600"
                  >
                    <span>{isEnrolled ? 'Continue' : 'Start Path'}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 4. PROJECT HUB CALLOUT: "The proof of learning is what you can make." */}
      <section className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-[#09182b] via-[#0b1b36] to-slate-950 p-6 sm:p-10">
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.3fr_1fr] items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
              <Layers3 className="h-3.5 w-3.5" />
              <span>Project Hub</span>
            </div>

            <h2 className="mt-3 font-heading text-2xl sm:text-4xl font-black text-white leading-tight">
              The proof of learning is what you can make.
            </h2>

            <p className="mt-3 text-sm text-slate-300 max-w-xl leading-relaxed">
              Turn every skill into portfolio evidence. Follow step-by-step checklists, use starter code templates, submit GitHub or live deployment proof, and get verified.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={() => setActiveTab('projects')}
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-cyan-300 shadow-lg shadow-cyan-400/20"
              >
                <span>Explore All Projects</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-2.5 text-xs font-bold text-slate-200 transition hover:bg-slate-800"
              >
                <span>Your Growth Dashboard</span>
              </button>
            </div>
          </div>

          {/* Project Mini Showcase */}
          <div className="grid gap-3 sm:grid-cols-2">
            {allProjects.slice(0, 4).map((p, idx) => (
              <div 
                key={p.id}
                onClick={() => {
                  setActiveProjectId(p.id);
                  setActiveTab('projects');
                }}
                className="cursor-pointer rounded-xl border border-slate-800/90 bg-slate-900/80 p-4 transition hover:border-cyan-400/50 hover:bg-slate-900"
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-cyan-300">
                  <span>0{idx + 1}</span>
                  <span>+{p.xpReward} XP</span>
                </div>
                <h4 className="mt-2 font-heading text-sm font-bold text-white line-clamp-1">
                  {t(p.title)}
                </h4>
                <p className="mt-1 text-[11px] text-slate-400 line-clamp-2">
                  {t(p.tagline)}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. LEARNER MOMENTUM & GROWTH SUMMARY */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
              Your Momentum
            </span>
            <h3 className="mt-1 font-heading text-xl sm:text-2xl font-bold text-white">
              Consistency & Progress
            </h3>
          </div>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300"
          >
            Full Dashboard &rarr;
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
            <Flame className="h-5 w-5 text-amber-400" />
            <div className="mt-2 font-heading text-2xl font-black text-white">{userState.streak}</div>
            <div className="text-xs text-slate-400">Day Streak</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
            <Trophy className="h-5 w-5 text-violet-400" />
            <div className="mt-2 font-heading text-2xl font-black text-white">{userState.xp}</div>
            <div className="text-xs text-slate-400">Total XP</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
            <CheckCircle className="h-5 w-5 text-cyan-400" />
            <div className="mt-2 font-heading text-2xl font-black text-white">{userState.completedLessonIds.length}</div>
            <div className="text-xs text-slate-400">Lessons Done</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <div className="mt-2 font-heading text-2xl font-black text-white">
              {Object.keys(userState.projectSubmissions).length}
            </div>
            <div className="text-xs text-slate-400">Projects Done</div>
          </div>
        </div>

        {/* Level Progression Bar */}
        <div className="mt-6 rounded-xl border border-slate-800/80 bg-slate-950/60 p-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300">Level {level} Learner</span>
            <span className="text-violet-400 font-semibold">{xpToNextLevel} XP to Level {level + 1}</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-400"
              style={{ width: `${Math.min(100, ((userState.xp % 250) / 250) * 100)}%` }}
            />
          </div>
        </div>

      </section>

    </div>
  );
};
