import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Award, 
  Calendar, 
  User, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft, 
  Share2, 
  Printer,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';

export const CertificateVerificationView: React.FC = () => {
  const { certificateId } = useParams<{ certificateId: string }>();
  const { t, findCertificateById } = useLearning();
  const [copied, setCopied] = useState(false);

  const cert = certificateId ? findCertificateById(certificateId) : undefined;

  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // LinkedIn Certification & Social Share URLs
  const issueYear = new Date().getFullYear();
  const issueMonth = new Date().getMonth() + 1;
  const linkedInAddUrl = cert
    ? `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
        cert.courseTitle
      )}&organizationName=SeizeLearn&issueYear=${issueYear}&issueMonth=${issueMonth}&certUrl=${encodeURIComponent(
        currentUrl
      )}&certId=${encodeURIComponent(cert.certificateCode)}`
    : '';

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
  const tweetText = cert
    ? `Proud to share my verified certificate in "${cert.courseTitle}" from SeizeLearn! 🎓 Check out my public credential proof:`
    : 'Check out this verified credential on SeizeLearn:';
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(currentUrl)}`;
  const whatsappText = cert
    ? `Hey! Check out my official verified certificate in "${cert.courseTitle}" from SeizeLearn: ${currentUrl}`
    : `Verified Credential on SeizeLearn: ${currentUrl}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      {/* Back button */}
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Platform</span>
        </Link>

        <div className="flex items-center gap-2">
          {cert && (
            <a
              href={linkedInAddUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#0a66c2] hover:bg-[#004182] px-3.5 py-2 text-xs font-bold text-white transition shadow-sm"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 0 0 0-2.9 1.45 1.45 0 0 0 0 2.9m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
              </svg>
              <span>Add to LinkedIn</span>
              <ExternalLink className="h-3 w-3 opacity-80" />
            </a>
          )}
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white transition"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-400" />
                <span>Copy Link</span>
              </>
            )}
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-3 py-2 text-xs font-semibold text-white hover:bg-violet-500 transition"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {cert ? (
        <div className="overflow-hidden rounded-3xl border border-violet-500/30 bg-slate-900/90 shadow-2xl backdrop-blur-xl">
          {/* Status Header Banner */}
          <div className="bg-gradient-to-r from-emerald-500/20 via-cyan-500/10 to-violet-500/20 border-b border-emerald-500/30 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Verified Digital Credential
              </span>
            </div>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-mono font-bold text-emerald-300 border border-emerald-500/40">
              STATUS: AUTHENTIC
            </span>
          </div>

          <div className="p-8 sm:p-12 space-y-8">
            {/* Seal & Organization */}
            <div className="text-center space-y-2">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-400 font-black text-white shadow-xl shadow-violet-500/30">
                SZ
              </div>
              <h2 className="font-heading text-xl font-bold tracking-tight text-white">
                SeizeLearn Knowledge Foundation
              </h2>
              <p className="text-xs text-slate-400">
                Official Credential Verification Registry · Career Skills Track
              </p>
            </div>

            {/* Recipient Block */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 text-center space-y-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                This is to officially certify that
              </span>
              <h1 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-wide">
                {cert.studentName}
              </h1>
              <p className="text-sm text-slate-300 max-w-xl mx-auto">
                has successfully completed the comprehensive curriculum and rigorous practical project milestones for "{cert.courseTitle}".
              </p>
            </div>

            {/* Credential Data Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                <span className="text-[10px] font-semibold uppercase text-slate-400">Credential ID</span>
                <p className="mt-1 font-mono text-xs font-bold text-violet-300 break-all">{cert.certificateCode}</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                <span className="text-[10px] font-semibold uppercase text-slate-400">Date Issued</span>
                <p className="mt-1 text-xs font-bold text-white">{cert.issuedAt}</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                <span className="text-[10px] font-semibold uppercase text-slate-400">Performance</span>
                <p className="mt-1 text-xs font-bold text-emerald-400">{cert.grade}</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                <span className="text-[10px] font-semibold uppercase text-slate-400">XP Earned</span>
                <p className="mt-1 text-xs font-bold text-cyan-300">+{cert.xpEarned} XP</p>
              </div>
            </div>

            {/* Skills Validated */}
            {cert.skills && cert.skills.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Skills & Technologies Verified
                </span>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-lg border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Showcase & LinkedIn Integration Bar */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 space-y-4 print:hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div>
                  <h4 className="font-heading text-sm font-bold text-white flex items-center gap-2">
                    <Award className="h-4 w-4 text-cyan-400" />
                    <span>Broadcast & Showcase Credential</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Sync directly to your professional profile or share public proof with recruiters.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 self-start sm:self-center">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Officially Verified</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={linkedInAddUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0a66c2] hover:bg-[#004182] px-4 py-2.5 text-xs font-bold text-white transition shadow-md shadow-[#0a66c2]/20"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 0 0 0-2.9 1.45 1.45 0 0 0 0 2.9m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
                  </svg>
                  <span>Add to LinkedIn Profile</span>
                  <ExternalLink className="h-3 w-3 opacity-80" />
                </a>

                <a
                  href={linkedInShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-xs font-semibold text-slate-200 hover:text-white hover:border-slate-600 transition"
                >
                  <span>Post to Feed</span>
                </a>

                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 px-3.5 py-2.5 text-xs font-semibold transition"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m-3.53 4.1c-.19 0-.41.07-.63.31-.22.25-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.66 2.62 4.09 3.61 2.02.82 2.43.66 2.87.62.44-.04 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.47-.28-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.17.25-.66.8-.81.97-.15.17-.3.19-.55.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.24.25-.4.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>

                <a
                  href={twitterShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-xs font-semibold text-slate-200 hover:text-white hover:border-slate-600 transition"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>X (Twitter)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-12 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Award className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-bold text-white">
            Credential Not Found in Local Cache
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            The requested credential identifier was not found in your session. Complete course requirements to issue this credential.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-violet-500 transition"
          >
            <Sparkles className="h-4 w-4" />
            <span>Explore Courses</span>
          </Link>
        </div>
      )}
    </div>
  );
};
