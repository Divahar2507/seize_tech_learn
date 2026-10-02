import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  FileText, 
  CheckCircle, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  Layers3, 
  Download, 
  Share2,
  ChevronRight,
  BookOpen,
  Code,
  CheckCircle2,
  XCircle,
  Lightbulb
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';

export const LessonPlayer: React.FC = () => {
  const { 
    t, 
    activeCourse, 
    activeLesson, 
    userState, 
    setActiveCourseAndLesson, 
    markLessonComplete, 
    submitQuiz, 
    toggleBookmark, 
    setOpenNotesDrawer, 
    setActiveTab 
  } = useLearning();

  // Local quiz & practice state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [revealedFlashcards, setRevealedFlashcards] = useState<Record<string, boolean>>({});
  const [practiceInput, setPracticeInput] = useState<string>('');
  const [practiceTested, setPracticeTested] = useState<boolean>(false);
  const [showSampleSolution, setShowSampleSolution] = useState<boolean>(false);

  if (!activeCourse || !activeLesson) return null;

  const isCompleted = userState.completedLessonIds.includes(activeLesson.id);
  const isBookmarked = userState.bookmarkedLessonIds.includes(activeLesson.id);

  // Find next lesson
  let nextLesson = null;
  let allLessons: any[] = [];
  activeCourse.modules.forEach(m => {
    allLessons.push(...m.lessons);
  });
  const currentIndex = allLessons.findIndex(l => l.id === activeLesson.id);
  if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
    nextLesson = allLessons[currentIndex + 1];
  }

  const handleSelectAnswer = (questionId: string, optIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optIndex }));
  };

  const handleSubmitQuiz = () => {
    if (!activeLesson.quizQuestions || activeLesson.quizQuestions.length === 0) return;
    let correctCount = 0;
    activeLesson.quizQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    submitQuiz(
      activeLesson.id,
      activeCourse.id,
      correctCount,
      activeLesson.quizQuestions.length,
      correctCount * 25
    );
    setQuizSubmitted(true);
  };

  const handleCompleteLesson = () => {
    markLessonComplete(activeLesson.id, activeLesson.xp);
  };

  const handleDownloadNotes = () => {
    const markdownContent = `# ${t(activeLesson.title)}\n\n## Summary\n${t(activeLesson.summary)}\n\n## Content\n${t(activeLesson.contentMarkdown)}\n\n## Key Takeaways\n${activeLesson.keyTakeaways.map(k => `- ${t(k)}`).join('\n')}\n`;
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeLesson.slug}-notes.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Bar: Back, Bookmarks, Notes Drawer */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('path')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Path Overview</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Download Notes */}
          <button
            onClick={handleDownloadNotes}
            className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition"
            title="Download Notes as Markdown"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Save Notes</span>
          </button>

          {/* Notes Drawer Button */}
          <button
            onClick={() => setOpenNotesDrawer(true)}
            className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition"
          >
            <FileText className="h-3.5 w-3.5 text-cyan-400" />
            <span className="hidden sm:inline">My Notes</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(activeLesson.id)}
            className={`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition ${
              isBookmarked
                ? 'border-amber-500/40 bg-amber-500/15 text-amber-300'
                : 'border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white'
            }`}
          >
            <Bookmark className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Bookmark'}</span>
          </button>

        </div>
      </div>

      {/* Lesson Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-violet-400 uppercase tracking-wider">
          <span>{activeCourse.category}</span>
          <span>·</span>
          <span>{activeLesson.durationMinutes} min</span>
          <span>·</span>
          <span>+{activeLesson.xp} XP</span>
        </div>

        <h1 className="mt-2 font-heading text-2xl sm:text-3xl font-black text-white">
          {t(activeLesson.title)}
        </h1>

        <p className="mt-3 rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <strong className="text-violet-300">Summary: </strong>
          {t(activeLesson.summary)}
        </p>
      </div>

      {/* Main Lesson Content */}
      <article className="prose prose-invert max-w-none rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6 text-slate-200 text-sm sm:text-base leading-relaxed">
        {t(activeLesson.contentMarkdown)
          .split('\n\n')
          .map((block, idx) => {
            if (block.startsWith('### ')) {
              return <h3 key={idx} className="font-heading text-xl font-bold text-white mt-6 mb-2">{block.replace('### ', '')}</h3>;
            }
            if (block.startsWith('#### ')) {
              return <h4 key={idx} className="font-heading text-lg font-bold text-cyan-300 mt-4 mb-2">{block.replace('#### ', '')}</h4>;
            }
            if (block.startsWith('```')) {
              const cleaned = block.replace(/```[a-z]*/, '').replace(/```$/, '');
              return (
                <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto my-4">
                  <pre>{cleaned.trim()}</pre>
                </div>
              );
            }
            if (block.startsWith('> ')) {
              return (
                <blockquote key={idx} className="border-l-4 border-violet-500 bg-violet-950/20 pl-4 py-2 my-4 text-xs sm:text-sm italic text-slate-300">
                  {block.replace('> ', '')}
                </blockquote>
              );
            }
            return <p key={idx} className="my-2">{block}</p>;
          })}
      </article>

      {/* Key Takeaways */}
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-6">
        <h4 className="flex items-center gap-2 font-heading text-base font-bold text-emerald-400">
          <CheckCircle className="h-5 w-5" />
          <span>Key Takeaways</span>
        </h4>
        <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-300">
          {activeLesson.keyTakeaways.map((takeaway, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>{t(takeaway)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Practice Task / Prompt Sandbox */}
      {activeLesson.practiceTask && (
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/15 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-heading text-base font-bold text-cyan-300">
              <Code className="h-5 w-5" />
              <span>Interactive Practice Challenge: {t(activeLesson.practiceTask.title)}</span>
            </div>
            <span className="rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300">
              +25 Practice XP
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t(activeLesson.practiceTask.instructions)}
          </p>

          {activeLesson.practiceTask.starterPromptOrCode && (
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-xs text-slate-400">
              <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Starter Template / Reference:</div>
              <pre className="overflow-x-auto">{activeLesson.practiceTask.starterPromptOrCode}</pre>
            </div>
          )}

          {/* Interactive Workspace Area */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Your Practice Solution / Execution:
            </label>
            <textarea
              rows={4}
              value={practiceInput}
              onChange={e => setPracticeInput(e.target.value)}
              placeholder="Type your answer, prompt, or code snippet here..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3.5 font-mono text-xs text-white outline-none focus:border-cyan-400 leading-relaxed"
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  setPracticeTested(true);
                  setShowSampleSolution(true);
                }}
                disabled={!practiceInput.trim()}
                className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-300 transition disabled:opacity-40"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Verify & Compare with Solution</span>
              </button>

              {activeLesson.practiceTask.solutionOrSample && (
                <button
                  onClick={() => setShowSampleSolution(!showSampleSolution)}
                  className="text-xs font-semibold text-cyan-300 hover:text-white"
                >
                  {showSampleSolution ? 'Hide Sample' : 'View Sample Solution'}
                </button>
              )}
            </div>

            {/* Revealed Sample Solution */}
            {showSampleSolution && activeLesson.practiceTask.solutionOrSample && (
              <div className="mt-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <Sparkles className="h-4 w-4" />
                  <span>Expert Reference Solution:</span>
                </div>
                <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3 font-mono text-xs text-emerald-200">
                  {activeLesson.practiceTask.solutionOrSample}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Quiz Challlenge */}
      {activeLesson.quizQuestions && activeLesson.quizQuestions.length > 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="flex items-center gap-2 font-heading text-lg font-bold text-white">
              <HelpCircle className="h-5 w-5 text-violet-400" />
              <span>Check Your Understanding</span>
            </h4>
            <span className="text-xs font-semibold text-slate-400">
              +{activeLesson.quizQuestions.length * 25} XP
            </span>
          </div>

          {activeLesson.quizQuestions.map(q => {
            const selectedOpt = selectedAnswers[q.id];
            const isCorrect = selectedOpt === q.correctIndex;

            return (
              <div key={q.id} className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 space-y-4">
                <p className="font-semibold text-sm sm:text-base text-white">
                  {t(q.question)}
                </p>

                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => {
                    const isOptionSelected = selectedOpt === oIdx;
                    let optionStyle = 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700';

                    if (quizSubmitted) {
                      if (oIdx === q.correctIndex) {
                        optionStyle = 'border-emerald-500/80 bg-emerald-950/40 text-emerald-200 font-bold';
                      } else if (isOptionSelected) {
                        optionStyle = 'border-rose-500/80 bg-rose-950/40 text-rose-200';
                      }
                    } else if (isOptionSelected) {
                      optionStyle = 'border-violet-500 bg-violet-600/20 text-violet-200 font-bold';
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectAnswer(q.id, oIdx)}
                        className={`w-full rounded-xl border p-3 text-left text-xs sm:text-sm transition flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{t(opt)}</span>
                        {quizSubmitted && oIdx === q.correctIndex && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        )}
                        {quizSubmitted && isOptionSelected && oIdx !== q.correctIndex && (
                          <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className={`rounded-lg p-3 text-xs leading-relaxed ${isCorrect ? 'bg-emerald-950/30 text-emerald-300' : 'bg-slate-900 text-slate-300'}`}>
                    <strong className="block font-bold mb-1">
                      {isCorrect ? 'Correct!' : 'Explanation:'}
                    </strong>
                    {t(q.explanation)}
                  </div>
                )}
              </div>
            );
          })}

          {!quizSubmitted ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(selectedAnswers).length === 0}
              className="w-full rounded-xl bg-violet-600 py-3 text-xs font-bold text-white transition hover:bg-violet-500 disabled:opacity-50"
            >
              Submit Quiz Answers
            </button>
          ) : (
            <div className="flex items-center justify-between border-t border-slate-800 pt-4 text-xs font-bold text-cyan-300">
              <span>Quiz Complete! XP Added to profile.</span>
              <button 
                onClick={() => setQuizSubmitted(false)}
                className="text-slate-400 hover:text-white"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* Active Recall Flashcards */}
      {activeLesson.flashcards && activeLesson.flashcards.length > 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center gap-2 font-heading text-base font-bold text-amber-300">
            <Lightbulb className="h-5 w-5" />
            <span>Active Recall Flashcards</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {activeLesson.flashcards.map(fc => {
              const isRevealed = revealedFlashcards[fc.id];
              return (
                <div
                  key={fc.id}
                  onClick={() => setRevealedFlashcards(prev => ({ ...prev, [fc.id]: !prev[fc.id] }))}
                  className="cursor-pointer rounded-xl border border-slate-800 bg-slate-950 p-4 transition hover:border-amber-400/50"
                >
                  <div className="text-[10px] font-bold uppercase text-amber-400 mb-1">
                    {isRevealed ? 'Answer:' : 'Question (Click to flip):'}
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    {isRevealed ? t(fc.back) : t(fc.front)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Completion & Next Lesson Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 pt-6">
        <button
          onClick={handleCompleteLesson}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-xs font-bold transition shadow-lg ${
            isCompleted
              ? 'border border-emerald-500/40 bg-emerald-500/20 text-emerald-300'
              : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-emerald-500/20'
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>{isCompleted ? 'Lesson Completed' : 'Mark Lesson Complete (+XP)'}</span>
        </button>

        {nextLesson && (
          <button
            onClick={() => setActiveCourseAndLesson(activeCourse.id, nextLesson.id)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-xs font-bold text-white transition hover:bg-violet-500 shadow-lg shadow-violet-600/20"
          >
            <span>Next Lesson: {t(nextLesson.title)}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

    </div>
  );
};
