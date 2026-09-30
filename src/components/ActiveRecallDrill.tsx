import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Brain,
  Zap,
  RotateCw,
  CheckCircle2,
  XCircle,
  Timer,
  Volume2,
  Sparkles,
  Filter,
  ChevronLeft,
  ChevronRight,
  Flame,
  Award,
  Layers,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { LearningCategory } from '../types/learning';

interface EnrichedCard {
  id: string;
  front: { en: string; ta: string };
  back: { en: string; ta: string };
  courseId: string;
  courseTitle: { en: string; ta: string };
  lessonId: string;
  lessonTitle: { en: string; ta: string };
  category: LearningCategory;
}

export const ActiveRecallDrill: React.FC = () => {
  const { allCourses, language, t, recordCardReview, triggerConfetti, setActiveCourseAndLesson, setActiveTab } = useLearning();

  // Mode: 'spaced' (classic flashcards with self-assessment) or 'blitz' (60s speed trial)
  const [mode, setMode] = useState<'spaced' | 'blitz'>('spaced');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [cardStats, setCardStats] = useState<Record<string, 'mastered' | 'review'>>({});

  // Blitz Mode State
  const [blitzActive, setBlitzActive] = useState<boolean>(false);
  const [blitzTimeLeft, setBlitzTimeLeft] = useState<number>(60);
  const [blitzScore, setBlitzScore] = useState<number>(0);
  const [blitzCompleted, setBlitzCompleted] = useState<boolean>(false);
  const timerRef = useRef<any>(null);

  // Compile all flashcards across courses
  const allCards = useMemo<EnrichedCard[]>(() => {
    const list: EnrichedCard[] = [];
    allCourses.forEach(course => {
      course.modules.forEach(module => {
        module.lessons.forEach(lesson => {
          lesson.flashcards.forEach(card => {
            list.push({
              id: card.id,
              front: card.front,
              back: card.back,
              courseId: course.id,
              courseTitle: course.title,
              lessonId: lesson.id,
              lessonTitle: lesson.title,
              category: course.category
            });
          });
        });
      });
    });
    return list;
  }, [allCourses]);

  // Filtered Cards
  const filteredCards = useMemo(() => {
    if (selectedCategory === 'all') return allCards;
    return allCards.filter(c => c.category === selectedCategory);
  }, [allCards, selectedCategory]);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  // Reset flip when card changes
  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex, selectedCategory]);

  // Blitz Timer Effect
  useEffect(() => {
    if (mode === 'blitz' && blitzActive) {
      timerRef.current = setInterval(() => {
        setBlitzTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setBlitzActive(false);
            setBlitzCompleted(true);
            triggerConfetti();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [mode, blitzActive]);

  const startBlitz = () => {
    setBlitzTimeLeft(60);
    setBlitzScore(0);
    setBlitzCompleted(false);
    setBlitzActive(true);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleNext = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // loop around
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  };

  const handleRate = (rating: 'easy' | 'hard') => {
    if (!currentCard) return;
    recordCardReview(currentCard.id, rating);
    setCardStats(prev => ({
      ...prev,
      [currentCard.id]: rating === 'easy' ? 'mastered' : 'review'
    }));

    if (mode === 'blitz' && blitzActive) {
      if (rating === 'easy') {
        setBlitzScore(prev => prev + 1);
      }
    }

    handleNext();
  };

  // Text to Speech
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'ta' ? 'ta-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const masteredCount = Object.values(cardStats).filter(s => s === 'mastered').length;
  const reviewCount = Object.values(cardStats).filter(s => s === 'review').length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-gradient-to-r from-violet-900/40 via-purple-900/20 to-slate-900 border border-violet-700/30 rounded-2xl p-6 backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 rounded-xl bg-violet-500/20 text-violet-400 border border-violet-500/30">
              <Brain className="w-6 h-6" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
              {language === 'ta' ? 'செயலில் நினைவு பயிற்சி அரங்கம்' : 'Active Recall & Spaced Repetition'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {language === 'ta' ? 'நினைவுத்திறன் & வேகப்பயிற்சி' : 'Recall Arena & Speed Drills'}
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            {language === 'ta'
              ? 'பாடங்களின் முக்கியக் கருத்துக்களை விரைவாக நினைவுகூர்ந்து தேர்ச்சி பெறுங்கள்.'
              : 'Retain 90% of your course learnings through flashcards, spaced repetition, and 60-second speed trials.'}
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 p-1.5 rounded-xl self-start md:self-auto">
          <button
            onClick={() => { setMode('spaced'); setBlitzActive(false); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              mode === 'spaced'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>{language === 'ta' ? 'நினைவு அட்டைகள்' : 'Spaced Deck'}</span>
          </button>
          <button
            onClick={() => { setMode('blitz'); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              mode === 'blitz'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>{language === 'ta' ? '60 வினாடி வேகம்' : '60s Blitz'}</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Categories & Progress Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => { setSelectedCategory('all'); setCurrentIndex(0); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-slate-700 text-white font-semibold'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {language === 'ta' ? 'அனைத்தும்' : 'All Topics'} ({allCards.length})
          </button>
          <button
            onClick={() => { setSelectedCategory('ai-tools'); setCurrentIndex(0); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === 'ai-tools'
                ? 'bg-violet-600/80 text-white font-semibold'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            🤖 AI Tools
          </button>
          <button
            onClick={() => { setSelectedCategory('web-dev'); setCurrentIndex(0); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === 'web-dev'
                ? 'bg-blue-600/80 text-white font-semibold'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            🌐 Web Dev
          </button>
          <button
            onClick={() => { setSelectedCategory('english-communication'); setCurrentIndex(0); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === 'english-communication'
                ? 'bg-emerald-600/80 text-white font-semibold'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            💬 English
          </button>
          <button
            onClick={() => { setSelectedCategory('career-placement'); setCurrentIndex(0); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === 'career-placement'
                ? 'bg-amber-600/80 text-white font-semibold'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            💼 Career
          </button>
        </div>

        {/* Stats Summary */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{masteredCount} {language === 'ta' ? 'தேர்ச்சி' : 'Mastered'}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <RotateCw className="w-3.5 h-3.5" />
            <span>{reviewCount} {language === 'ta' ? 'மீள்பார்வை' : 'Need Review'}</span>
          </div>
        </div>
      </div>

      {/* Main Flashcard Arena */}
      {filteredCards.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
          <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">No flashcards found in this category.</p>
        </div>
      ) : mode === 'blitz' && !blitzActive && !blitzCompleted ? (
        /* Blitz Ready Screen */
        <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-2xl backdrop-blur-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Zap className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {language === 'ta' ? '60 வினாடி மின்னல் சவால்!' : '60-Second Blitz Challenge!'}
          </h2>
          <p className="text-sm text-slate-300 mb-6">
            {language === 'ta'
              ? '60 வினாடிகளில் எத்தனை கேள்விகளுக்கு சரியான விடையை நினைவு கூர்கிறீர்கள் என்று சோதித்துப் பாருங்கள்!'
              : 'Race against the clock! Recall as many concepts as you can in 60 seconds and rack up XP bonuses.'}
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8 text-left">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
              <span className="text-xs text-slate-400 block">{language === 'ta' ? 'நேரம்' : 'Duration'}</span>
              <span className="text-lg font-bold text-amber-400 flex items-center gap-1">
                <Timer className="w-4 h-4" /> 60 seconds
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
              <span className="text-xs text-slate-400 block">{language === 'ta' ? 'வெற்றி பரிசு' : 'Reward'}</span>
              <span className="text-lg font-bold text-violet-400 flex items-center gap-1">
                <Award className="w-4 h-4" /> +50 XP Bonus
              </span>
            </div>
          </div>

          <button
            onClick={startBlitz}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-base shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
          >
            <Flame className="w-5 h-5 fill-slate-950" />
            <span>{language === 'ta' ? 'சவாலைத் தொடங்கு' : 'Start Blitz Now'}</span>
          </button>
        </div>
      ) : mode === 'blitz' && blitzCompleted ? (
        /* Blitz Result Screen */
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-2xl backdrop-blur-sm animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">
            {language === 'ta' ? 'அருமை! நேரம் முடிந்தது!' : 'Fantastic Blitz Round!'}
          </h2>
          <p className="text-sm text-slate-300 mb-6">
            {language === 'ta' ? 'உங்கள் வேகமான நினைவுத்திறன் முடிவு:' : 'Here is how you performed under pressure:'}
          </p>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-950 border border-slate-700 max-w-sm mx-auto mb-8">
            <span className="text-4xl font-extrabold text-amber-400">{blitzScore}</span>
            <span className="text-xs text-slate-400 block mt-1 uppercase tracking-wider font-semibold">
              {language === 'ta' ? 'சரியாக நினைவுகூர்ந்தவை' : 'Concepts Recalled Correctly'}
            </span>
            <div className="mt-4 pt-4 border-t border-slate-700/60 flex justify-between text-xs text-slate-300">
              <span>XP Earned</span>
              <span className="font-bold text-emerald-400">+{blitzScore * 10 + 50} XP</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={startBlitz}
              className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{language === 'ta' ? 'மீண்டும் விளையாடு' : 'Play Blitz Again'}</span>
            </button>
            <button
              onClick={() => { setMode('spaced'); setBlitzCompleted(false); }}
              className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-all border border-slate-700"
            >
              <span>{language === 'ta' ? 'வழக்கமான பயிற்சிக்குச் செல்' : 'Switch to Spaced Deck'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Active Flashcard Screen (Spaced Deck or Active Blitz) */
        <div className="max-w-2xl mx-auto">
          {/* Blitz Progress & Timer Bar */}
          {mode === 'blitz' && blitzActive && (
            <div className="mb-4 bg-slate-900 border border-amber-500/40 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-amber-400 animate-spin" />
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {blitzTimeLeft}s remaining
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Score:</span>
                <span className="text-sm font-bold text-white px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {blitzScore}
                </span>
              </div>
            </div>
          )}

          {/* Card Counter & Context Breadcrumb */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-3 px-1">
            <div className="flex items-center gap-1.5 truncate max-w-xs sm:max-w-md">
              <span className="font-semibold text-violet-400">{t(currentCard.courseTitle)}</span>
              <span>•</span>
              <span className="truncate">{t(currentCard.lessonTitle)}</span>
            </div>
            <span className="font-mono text-slate-500">
              {currentIndex + 1} / {filteredCards.length}
            </span>
          </div>

          {/* Flashcard Box */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`min-h-[300px] sm:min-h-[340px] rounded-2xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer border transition-all duration-300 shadow-xl relative overflow-hidden select-none ${
              isFlipped
                ? 'bg-gradient-to-br from-slate-900 via-violet-950/40 to-slate-900 border-violet-500/60 shadow-violet-950/30'
                : 'bg-slate-900/90 hover:bg-slate-800/90 border-slate-700/80 hover:border-slate-600'
            }`}
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between text-xs">
              <span className={`px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider text-[10px] ${
                isFlipped
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}>
                {isFlipped
                  ? (language === 'ta' ? 'விளக்கம் / பதில்' : 'Back • Answer & Breakdown')
                  : (language === 'ta' ? 'கேள்வி / கருத்து' : 'Front • Prompt & Question')}
              </span>

              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => speakText(isFlipped ? t(currentCard.back) : t(currentCard.front))}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                  title="Listen to pronunciation"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  {language === 'ta' ? 'தட்டவும்: திருப்ப' : 'Click card to flip'}
                </span>
              </div>
            </div>

            {/* Middle Card Content */}
            <div className="my-auto py-6 text-center">
              <p className={`font-semibold leading-relaxed transition-all ${
                isFlipped 
                  ? 'text-lg sm:text-xl text-violet-100' 
                  : 'text-xl sm:text-2xl text-white'
              }`}>
                {isFlipped ? t(currentCard.back) : t(currentCard.front)}
              </p>
            </div>

            {/* Bottom Lesson Jump Link */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCourseAndLesson(currentCard.courseId, currentCard.lessonId);
                  setActiveTab('lesson');
                }}
                className="hover:text-violet-400 flex items-center gap-1 transition-colors"
              >
                <span>{language === 'ta' ? 'பாடத்திற்குச் செல்' : 'Go to Lesson'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <span className="text-[11px] text-slate-500">
                {cardStats[currentCard.id] === 'mastered' && (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {language === 'ta' ? 'தேர்ச்சி பெறப்பட்டது' : 'Mastered'}
                  </span>
                )}
                {cardStats[currentCard.id] === 'review' && (
                  <span className="text-amber-400 font-semibold flex items-center gap-1">
                    <RotateCw className="w-3.5 h-3.5" /> {language === 'ta' ? 'மீள்பார்வை தேவை' : 'Needs Review'}
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* Rating Controls & Navigation */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Prev / Next buttons */}
            <div className="flex items-center gap-2 order-2 sm:order-1">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors"
                title="Previous card"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>{language === 'ta' ? 'திருப்புக' : 'Flip'}</span>
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors"
                title="Next card"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Self Assessment Assessment Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
              <button
                onClick={() => handleRate('hard')}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all active:scale-95"
              >
                <XCircle className="w-4 h-4 text-amber-400" />
                <span>{language === 'ta' ? 'கடினம் / மீள்பார்வை' : 'Need Review'}</span>
              </button>

              <button
                onClick={() => handleRate('easy')}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-500/40 text-xs font-bold transition-all active:scale-95 shadow-md shadow-emerald-950/20"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{language === 'ta' ? 'தெரிந்தது! (+10 XP)' : 'Mastered! (+10 XP)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
