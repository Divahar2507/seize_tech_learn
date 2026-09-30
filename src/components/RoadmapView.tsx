import React, { useState } from 'react';
import { 
  Milestone, 
  ArrowRight, 
  BrainCircuit, 
  Code2, 
  WandSparkles, 
  BriefcaseBusiness, 
  CheckCircle2, 
  Circle, 
  Layers3, 
  Clock, 
  Briefcase,
  ChevronRight
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { ROADMAP_TRACKS } from '../data/roadmapsData';

export const RoadmapView: React.FC = () => {
  const { 
    language, 
    t, 
    userState, 
    setActiveCourseAndLesson, 
    setActiveTab 
  } = useLearning();

  const [selectedTrackId, setSelectedTrackId] = useState<string>('track-ai-skills');

  const selectedTrack = ROADMAP_TRACKS.find(tr => tr.id === selectedTrackId) || ROADMAP_TRACKS[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'BrainCircuit': return BrainCircuit;
      case 'Code2': return Code2;
      case 'WandSparkles': return WandSparkles;
      default: return BriefcaseBusiness;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-r from-[#1f1606] via-[#16120c] to-slate-950 p-6 sm:p-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">
            <Milestone className="h-3.5 w-3.5" />
            <span>{language === 'ta' ? 'தொழில் வழிகாட்டி வரைபடம்' : 'Career Skill Roadmaps'}</span>
          </div>

          <h1 className="mt-3 font-heading text-3xl sm:text-5xl font-black text-white leading-tight">
            {language === 'ta' ? (
              <>இலக்கை அறிந்து, தெளிவான பாதையைப் பின்பற்றுங்கள்.</>
            ) : (
              <>Discover a goal. Follow the step-by-step roadmap.</>
            )}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            {language === 'ta'
              ? 'எந்த திறனை முதலில் கற்பது என்று குழப்பம் வேண்டாம். தொடக்க நிலை முதல் பணி வாய்ப்பு வரை படிப்படியான வழிகாட்டிகள்.'
              : 'Never wonder what skill to learn next. Follow structured weekly milestones designed to take you directly into job readiness.'}
          </p>
        </div>
      </div>

      {/* Track Selector Bar */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ROADMAP_TRACKS.map(track => {
          const Icon = getIcon(track.icon);
          const isSelected = track.id === selectedTrack.id;

          return (
            <button
              key={track.id}
              onClick={() => setSelectedTrackId(track.id)}
              className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                isSelected
                  ? 'border-amber-400/60 bg-slate-900/90 shadow-lg shadow-amber-950/20'
                  : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
              }`}
            >
              <span className={`p-2.5 rounded-xl ${isSelected ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h4 className="font-heading text-sm font-bold text-white">
                  {t(track.title)}
                </h4>
                <p className="mt-1 text-xs text-slate-400">
                  {track.totalWeeks} {language === 'ta' ? 'வாரங்கள்' : 'weeks'} · {track.nodes.length} {language === 'ta' ? 'படிகள்' : 'steps'}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Roadmap Timeline */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 space-y-8">
        
        {/* Track Overview & Career Roles */}
        <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-2xl font-black text-white">
              {t(selectedTrack.title)}
            </h3>
            <p className="mt-1 text-sm text-slate-300 max-w-2xl">
              {t(selectedTrack.description)}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              <Briefcase className="h-3.5 w-3.5" />
              <span>{language === 'ta' ? 'பொருத்தமான வேலைகள்' : 'Target Career Roles'}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selectedTrack.careerRoles.map((role, i) => (
                <span key={i} className="rounded-md border border-slate-700 bg-slate-900 px-2 py-0.5 text-xs font-semibold text-slate-300">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Milestone Node Pipeline */}
        <div className="space-y-6">
          {selectedTrack.nodes.map((node, index) => {
            const isLessonDone = node.associatedLessonId && userState.completedLessonIds.includes(node.associatedLessonId);

            return (
              <div 
                key={node.id}
                className="relative flex items-start gap-4 sm:gap-6"
              >
                {/* Connecting Line */}
                {index < selectedTrack.nodes.length - 1 && (
                  <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-slate-800 -translate-x-1/2" />
                )}

                {/* Milestone Number / Status Bubble */}
                <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl border font-heading text-sm font-black transition z-10 ${
                  isLessonDone
                    ? 'border-emerald-500/80 bg-emerald-950 text-emerald-300 shadow-md shadow-emerald-500/20'
                    : 'border-slate-700 bg-slate-800 text-slate-200'
                }`}>
                  {isLessonDone ? <CheckCircle2 className="h-5 w-5" /> : `0${index + 1}`}
                </div>

                {/* Milestone Card Content */}
                <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-950/70 p-5 sm:p-6 transition hover:border-slate-700">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-md border border-slate-800 bg-slate-900 px-2 py-0.5 text-[11px] font-bold text-cyan-300">
                      Week {node.estimatedWeeks}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">{node.level}</span>
                  </div>

                  <h4 className="mt-2 font-heading text-lg font-bold text-white">
                    {t(node.title)}
                  </h4>

                  <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {t(node.description)}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-900">
                    <div className="flex flex-wrap gap-1.5">
                      {node.skillsGained.map((sk, sIdx) => (
                        <span key={sIdx} className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-slate-400">
                          {sk}
                        </span>
                      ))}
                    </div>

                    {node.associatedCourseId && (
                      <button
                        onClick={() => {
                          setActiveCourseAndLesson(node.associatedCourseId!, node.associatedLessonId);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white transition"
                      >
                        <span>{language === 'ta' ? 'பாடத்தை கற்க' : 'Jump to Lesson'}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
