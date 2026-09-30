import React, { useState, useEffect } from 'react';
import { 
  Layers3, 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  Github, 
  Sparkles, 
  FileText, 
  Clock, 
  ShieldCheck, 
  Send,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { LearningCategory } from '../types/learning';

export const ProjectHub: React.FC = () => {
  const { 
    language, 
    t, 
    allProjects, 
    activeProject, 
    activeProjectId, 
    setActiveProjectId, 
    userState, 
    submitProject, 
    updateProjectChecklist 
  } = useLearning();

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [demoUrl, setDemoUrl] = useState<string>('');
  const [repoUrl, setRepoUrl] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  const selectedProject = activeProject || allProjects[0];
  const submission = userState.projectSubmissions[selectedProject.id];
  const completedChecklist = submission?.checklistCompletedIds || [];

  useEffect(() => {
    if (submission) {
      setDemoUrl(submission.demoUrl || '');
      setRepoUrl(submission.repoUrl || '');
      setNotes(submission.notes || '');
    } else {
      setDemoUrl('');
      setRepoUrl('');
      setNotes('');
    }
  }, [selectedProject.id, submission]);

  const handleToggleChecklist = (checkId: string) => {
    const nextChecklist = completedChecklist.includes(checkId)
      ? completedChecklist.filter(id => id !== checkId)
      : [...completedChecklist, checkId];
    updateProjectChecklist(selectedProject.id, nextChecklist);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    submitProject(selectedProject.id, demoUrl, repoUrl, notes, completedChecklist);
    setShowSubmitModal(false);
  };

  const filteredProjects = filterCategory === 'all' 
    ? allProjects 
    : allProjects.filter(p => p.category === filterCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-[#091b29] via-[#09152b] to-slate-950 p-6 sm:p-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
            <Layers3 className="h-3.5 w-3.5" />
            <span>{language === 'ta' ? 'திட்டப்பணி மையம்' : 'Project Hub'}</span>
          </div>

          <h1 className="mt-3 font-heading text-3xl sm:text-5xl font-black text-white leading-tight">
            {language === 'ta' ? (
              <>கற்றலின் உண்மை சான்று நீங்கள் உருவாக்கும் படைப்புகளே.</>
            ) : (
              <>The proof of learning is what you can make.</>
            )}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            {language === 'ta'
              ? 'ஒவ்வொரு கற்றல் பாதையும் வேலைவாய்ப்பிற்கு பயனுள்ள நிஜமான திட்டப்பணியோடு முடிகிறது. தொடக்கக் குறிப்புகளைப் பெற்று, சரிபார்ப்பு பட்டியலை நிறைவு செய்து, உங்கள் இணையதள அல்லது GitHub இணைப்பை சமர்ப்பியுங்கள்.'
              : 'Learning must end in visible work. Follow guided briefs, use starter code templates, tick off requirements, and submit live proof to build an undeniable portfolio.'}
          </p>
        </div>
      </div>

      {/* Main Grid: Projects List (Left) + Active Project Workspace (Right) */}
      <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
        
        {/* Left Column: Project Catalog Selector */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-400">
              {language === 'ta' ? 'அனைத்து திட்டப்பணிகள்' : 'Guided Projects'}
            </h3>
            <span className="text-xs text-cyan-400 font-bold">{allProjects.length} Available</span>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {['all', 'AI Tools & Prompting', 'Web Development', 'English & Communication', 'Career & Placement Prep'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                  filterCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'all' ? (language === 'ta' ? 'அனைத்தும்' : 'All') : cat.split(' ')[0]}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredProjects.map(proj => {
              const isSelected = proj.id === selectedProject.id;
              const sub = userState.projectSubmissions[proj.id];
              const isSubmitted = sub && sub.status === 'submitted';

              return (
                <div
                  key={proj.id}
                  onClick={() => setActiveProjectId(proj.id)}
                  className={`cursor-pointer rounded-2xl border p-4 transition ${
                    isSelected
                      ? 'border-cyan-400/60 bg-slate-900/90 shadow-lg shadow-cyan-950/20'
                      : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-cyan-400">{proj.category}</span>
                    {isSubmitted ? (
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {language === 'ta' ? 'சமர்ப்பிக்கப்பட்டது' : 'Submitted'}
                      </span>
                    ) : (
                      <span className="text-slate-500">+{proj.xpReward} XP</span>
                    )}
                  </div>

                  <h4 className="mt-2 font-heading text-sm font-bold text-white line-clamp-1">
                    {t(proj.title)}
                  </h4>

                  <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {t(proj.tagline)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Project Details, Checklist & Submission */}
        <div className="space-y-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          
          {/* Active Project Header */}
          <div className="border-b border-slate-800 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-xs font-bold text-cyan-300">
                  {selectedProject.category}
                </span>
                <h2 className="mt-2 font-heading text-2xl font-black text-white">
                  {t(selectedProject.title)}
                </h2>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-cyan-400" />
                  <span>{selectedProject.durationHours} {language === 'ta' ? 'மணிநேரம்' : 'hrs'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <span>+{selectedProject.xpReward} XP</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
              {t(selectedProject.description)}
            </p>

            {/* Submission Status Badge */}
            {submission && (
              <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <ShieldCheck className="h-4 w-4" />
                  <span>{language === 'ta' ? 'திட்டப்பணி வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!' : 'Proof Verified & Submitted to Portfolio!'}</span>
                </div>
                {submission.demoUrl && (
                  <a 
                    href={submission.demoUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="mt-2 inline-flex items-center gap-1 text-xs text-cyan-300 hover:underline"
                  >
                    <span>{language === 'ta' ? 'நேரலை இணைப்பு:' : 'Live Link:'} {submission.demoUrl}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Problem Statement */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
              {language === 'ta' ? 'திட்டப்பணியின் நோக்கம்' : 'The Problem Brief'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t(selectedProject.problemStatement)}
            </p>
          </div>

          {/* Step-by-Step Deliverable Checklist */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-heading text-base font-bold text-white">
                {language === 'ta' ? 'திட்டப்பணி சரிபார்ப்பு பட்டியல்' : 'Step-by-Step Checklist'}
              </h4>
              <span className="text-xs font-semibold text-cyan-400">
                {completedChecklist.length} / {selectedProject.checklist.length} {language === 'ta' ? 'முடிந்தது' : 'completed'}
              </span>
            </div>

            <div className="space-y-3">
              {selectedProject.checklist.map(item => {
                const isChecked = completedChecklist.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleToggleChecklist(item.id)}
                    className={`cursor-pointer flex items-start gap-3 rounded-xl border p-4 transition ${
                      isChecked 
                        ? 'border-emerald-500/40 bg-emerald-950/15' 
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    {isChecked ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="h-5 w-5 text-slate-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className={`text-xs sm:text-sm font-semibold ${isChecked ? 'text-emerald-200 line-through' : 'text-slate-200'}`}>
                        {t(item.label)}
                      </p>
                      {item.hint && (
                        <p className="mt-1 text-xs text-slate-400">
                          {t(item.hint)}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Starter Template Code / Files */}
          {selectedProject.starterFiles && selectedProject.starterFiles.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-400">
                  {language === 'ta' ? 'தொடக்கக் குறியீடு மாதிரி' : 'Starter Code / Template'}
                </h4>
                <button
                  onClick={() => handleCopyCode(selectedProject.starterFiles![0].code)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 hover:text-white"
                >
                  {copiedCode ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy Template'}</span>
                </button>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-300 overflow-x-auto">
                <pre>{selectedProject.starterFiles[0].code}</pre>
              </div>
            </div>
          )}

          {/* Rubric Criteria */}
          <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-5">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-violet-400 mb-3">
              {language === 'ta' ? 'மதிப்பீட்டு அளவுகோல்' : 'Review & Verification Rubric'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {selectedProject.rubric.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{t(r)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Submission Action */}
          <div className="border-t border-slate-800 pt-6">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 text-xs font-bold text-slate-950 hover:bg-cyan-300 transition shadow-lg shadow-cyan-400/20"
            >
              <Send className="h-4 w-4" />
              <span>{submission ? (language === 'ta' ? 'சமர்ப்பிப்பை மாற்றியமைக்க' : 'Update Project Proof') : (language === 'ta' ? 'திட்டப்பணியை சமர்ப்பிக்க' : 'Submit Project Proof (+XP)')}</span>
            </button>
          </div>

        </div>

      </div>

      {/* Submission Modal Form */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-heading text-lg font-bold text-white">
                {language === 'ta' ? 'திட்டப்பணி ஆதாரத்தை சமர்ப்பியுங்கள்' : 'Submit Project Proof'}
              </h3>
              <button 
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-white"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmitProof} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {language === 'ta' ? 'நேரலை இணையதள முகவரி (Live Demo URL)' : 'Live Demo URL (e.g. Vercel, Netlify, Google Drive)'}
                </label>
                <input
                  type="url"
                  required
                  value={demoUrl}
                  onChange={e => setDemoUrl(e.target.value)}
                  placeholder="https://my-project.vercel.app"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {language === 'ta' ? 'GitHub அல்லது ஆவண இணைப்பு (விருப்பத்தேர்வு)' : 'GitHub Repo or Document URL (Optional)'}
                </label>
                <input
                  type="url"
                  value={repoUrl}
                  onChange={e => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/yourname/project"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {language === 'ta' ? 'கற்றல் குறிப்புகள் / விளக்கம்' : 'Reflections & What You Learned'}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder={language === 'ta' ? 'இந்த திட்டப்பணியில் என்ன சாதித்தீர்கள்?' : 'Brief note about how you built it and challenges overcome...'}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  {language === 'ta' ? 'ரத்து' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-cyan-400 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-300 transition"
                >
                  {language === 'ta' ? 'உறுதி செய் (+XP)' : 'Verify & Submit (+XP)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
