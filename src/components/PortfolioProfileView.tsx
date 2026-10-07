import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Award, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Calendar, 
  Share2, 
  Printer, 
  CheckCircle2, 
  Layers3, 
  ArrowLeft,
  Copy,
  Check,
  User,
  BrainCircuit,
  Code2
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { ALL_BADGES } from '../data/badgesData';

export const PortfolioProfileView: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { userState, allProjects, allCourses, findCertificateById } = useLearning();
  const [copied, setCopied] = useState(false);

  // Profile data: from current userState or fallback
  const displayName = username || userState.user.displayName || 'Verified Learner';
  const xp = userState.xp || 120;
  const streak = userState.streak || 1;
  const certificates = userState.certificates || [];
  const earnedBadges = ALL_BADGES.filter(b => userState.earnedBadgeIds.includes(b.id));

  // Projects that have submissions
  const submittedProjects = Object.entries(userState.projectSubmissions)
    .filter(([_, sub]) => sub.status === 'submitted')
    .map(([projId, sub]) => {
      const brief = allProjects.find(p => p.id === projId);
      return {
        ...sub,
        brief
      };
    });

  const profileUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
      
      {/* Top Bar Navigation & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <Link 
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Growth Dashboard</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-200 hover:text-white transition shadow-sm"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-slate-400" />}
            <span>{copied ? 'Link Copied!' : 'Share Portfolio'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white hover:bg-violet-500 transition shadow-lg shadow-violet-600/20"
          >
            <Printer className="h-4 w-4" />
            <span>Print / PDF CV</span>
          </button>
        </div>
      </div>

      {/* Hero Showcase Card */}
      <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-10 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          <div className="flex items-center gap-5">
            <div className="relative">
              {userState.user.photoURL ? (
                <img 
                  src={userState.user.photoURL} 
                  alt={displayName} 
                  className="h-20 w-20 rounded-2xl object-cover border-2 border-violet-500/40 shadow-xl"
                />
              ) : (
                <div className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-500 text-3xl font-black text-white shadow-xl shadow-violet-600/20">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-slate-950" title="Verified Proof Candidate">
                <CheckCircle2 className="h-3.5 w-3.5 text-white" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-2xl sm:text-3xl font-black text-white">
                  {displayName}
                </h1>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                  Verified Candidate
                </span>
              </div>

              <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-xl">
                Practical Software & AI Developer specializing in responsive web applications, C.T.C.O prompt engineering, and production delivery.
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 text-amber-300 font-bold">
                  <Flame className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>{streak} Day Learning Streak</span>
                </div>

                <div className="flex items-center gap-1.5 rounded-lg bg-violet-500/10 border border-violet-500/30 px-2.5 py-1 text-violet-300 font-bold">
                  <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                  <span>{xp} XP Earned</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-right hidden md:block">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Accreditation Source</span>
            <span className="font-heading text-sm font-bold text-slate-300">SeizeLearn EdTech Platform</span>
            <span className="text-[11px] text-cyan-400 block mt-1">Live Proof Portfolio</span>
          </div>

        </div>
      </div>

      {/* Verified Project Deliverables & Proofs */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
              <Layers3 className="h-5 w-5 text-cyan-400" />
              <span>Verified Project Proofs</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Production artifacts built and verified by following structured engineering briefs.
            </p>
          </div>
          <span className="text-xs font-bold text-cyan-400">
            {submittedProjects.length} Submitted
          </span>
        </div>

        {submittedProjects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {submittedProjects.map(proj => (
              <div 
                key={proj.projectId}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="rounded-md bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 text-[10px] font-bold text-cyan-300">
                      {proj.brief?.category || 'Software Engineering'}
                    </span>
                    <span>{new Date(proj.submittedAt).toLocaleDateString()}</span>
                  </div>

                  <h3 className="mt-3 font-heading text-lg font-bold text-white">
                    {proj.brief?.title.en || proj.projectId}
                  </h3>

                  <p className="mt-2 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {proj.notes || proj.brief?.description.en || proj.brief?.tagline.en}
                  </p>

                  {proj.checklistCompletedIds && proj.checklistCompletedIds.length > 0 && (
                    <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{proj.checklistCompletedIds.length} Specification Criteria Checked & Passed</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-slate-800 pt-3">
                  <div className="flex items-center gap-2">
                    {proj.demoUrl && (
                      <a
                        href={proj.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 px-2.5 py-1 text-xs font-bold transition"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {proj.repoUrl && (
                      <a
                        href={proj.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 text-xs font-bold transition"
                      >
                        <Github className="h-3 w-3" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>

                  <span className="text-[11px] font-bold text-emerald-400">
                    ✓ Verified Proof
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-800 p-8 text-center space-y-3">
            <Layers3 className="mx-auto h-8 w-8 text-slate-500" />
            <p className="text-xs text-slate-400">
              No project proofs submitted yet. Visit the <Link to="/projects" className="text-cyan-400 underline font-bold">Project Hub</Link> to build and publish your first proof of work!
            </p>
          </div>
        )}
      </div>

      {/* Verified Certificates & Credentials */}
      <div className="space-y-6">
        <div>
          <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
            <Award className="h-5 w-5 text-violet-400" />
            <span>Accredited Skill Certifications</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Independently verifiable digital credentials issued by SeizeLearn.
          </p>
        </div>

        {certificates.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {certificates.map(cert => (
              <div 
                key={cert.id}
                className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-950/20 to-slate-900 p-6 flex flex-col justify-between space-y-4 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-cyan-300">{cert.certificateCode}</span>
                    <span className="text-slate-400">{cert.issuedAt}</span>
                  </div>

                  <h3 className="mt-3 font-heading text-lg font-black text-white">
                    {cert.courseTitle}
                  </h3>
                  <p className="mt-1 text-xs text-violet-300">
                    Grade: {cert.grade}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {cert.skills.map((sk, idx) => (
                      <span key={idx} className="rounded-md bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800 pt-3">
                  <span className="text-xs font-semibold text-emerald-400">
                    ✓ Authenticated Credential
                  </span>
                  <Link
                    to={`/verify/${cert.id || cert.certificateCode}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600/30 text-violet-200 border border-violet-500/40 hover:bg-violet-600 hover:text-white px-3 py-1 text-xs font-bold transition"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Verify Credential</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-800 p-8 text-center space-y-3">
            <Award className="mx-auto h-8 w-8 text-slate-500" />
            <p className="text-xs text-slate-400">
              No certifications claimed yet. Complete curriculum specializations to earn your official verified credentials.
            </p>
          </div>
        )}
      </div>

      {/* Earned Badges Wall */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 space-y-4">
        <h3 className="font-heading text-lg font-bold text-white">
          Demonstrated Competencies & Badges ({earnedBadges.length})
        </h3>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {earnedBadges.map(badge => (
            <div 
              key={badge.id}
              className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 text-lg">
                🏆
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">{badge.title.en}</h4>
                <p className="text-[10px] text-slate-400 line-clamp-1">{badge.description.en}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
