import React, { useState } from 'react';
import { 
  Zap, 
  X, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Clock, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';

export const DailyChallengeModal: React.FC = () => {
  const { 
    t, 
    openDailyChallengeModal, 
    setOpenDailyChallengeModal, 
    todayChallenge, 
    completeDailyChallenge, 
    userState 
  } = useLearning();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!openDailyChallengeModal) return null;

  const isAlreadyDone = userState.completedDailyChallenges.includes(todayChallenge.id);
  const q = todayChallenge.quizQuestion;

  const handleSelectOption = (idx: number) => {
    if (submitted || isAlreadyDone) return;
    setSelectedOption(idx);
  };

  const handleVerify = () => {
    if (selectedOption === null || !q) return;
    setSubmitted(true);
    if (selectedOption === q.correctIndex) {
      completeDailyChallenge(todayChallenge.id, todayChallenge.xpReward);
    }
  };

  const isCorrect = q && (selectedOption === q.correctIndex || isAlreadyDone);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="w-full max-w-lg rounded-3xl border border-amber-500/30 bg-slate-900 p-6 sm:p-8 space-y-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/20 text-amber-400">
              <Zap className="h-5 w-5 animate-pulse" />
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Daily Challenge
              </span>
              <h3 className="font-heading text-lg font-bold text-white">
                {t(todayChallenge.title)}
              </h3>
            </div>
          </div>

          <button 
            onClick={() => setOpenDailyChallengeModal(false)}
            className="rounded-lg p-1 text-slate-400 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Challenge Topic & XP Details */}
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-xs text-slate-400">
          <span>{todayChallenge.topic} · {todayChallenge.estimatedMinutes} min</span>
          <span className="font-bold text-amber-400">+{todayChallenge.xpReward} XP Reward</span>
        </div>

        {/* Problem Statement */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {t(todayChallenge.problemStatement)}
        </p>

        {/* Options */}
        {q && (
          <div className="space-y-2.5">
            {q.options.map((opt, i) => {
              const isSelected = selectedOption === i;
              let style = 'border-slate-800 bg-slate-950/80 text-slate-300 hover:border-slate-700';

              if (submitted || isAlreadyDone) {
                if (i === q.correctIndex) {
                  style = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-bold';
                } else if (isSelected) {
                  style = 'border-rose-500 bg-rose-950/40 text-rose-200';
                }
              } else if (isSelected) {
                style = 'border-amber-400 bg-amber-400/10 text-amber-200 font-bold';
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelectOption(i)}
                  className={`w-full rounded-xl border p-3.5 text-left text-xs sm:text-sm transition flex items-center justify-between ${style}`}
                >
                  <span>{t(opt)}</span>
                  {(submitted || isAlreadyDone) && i === q.correctIndex && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  )}
                  {submitted && isSelected && i !== q.correctIndex && (
                    <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Explanation upon submission */}
        {(submitted || isAlreadyDone) && q && (
          <div className={`rounded-xl p-4 text-xs leading-relaxed ${isCorrect ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-200' : 'bg-slate-950 border border-slate-800 text-slate-300'}`}>
            <strong className="block font-bold mb-1">
              {isCorrect ? 'Outstanding! Correct Answer!' : 'Explanation:'}
            </strong>
            {t(q.explanation)}
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {!submitted && !isAlreadyDone ? (
            <button
              onClick={handleVerify}
              disabled={selectedOption === null}
              className="w-full rounded-xl bg-amber-400 py-3 text-xs font-bold text-slate-950 transition hover:bg-amber-300 disabled:opacity-50"
            >
              Check Answer (+XP)
            </button>
          ) : (
            <button
              onClick={() => setOpenDailyChallengeModal(false)}
              className="w-full rounded-xl bg-slate-800 py-3 text-xs font-bold text-white transition hover:bg-slate-700"
            >
              Close Challenge
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
