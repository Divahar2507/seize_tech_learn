import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  QrCode,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Share2
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';

export const CertificateModal: React.FC = () => {
  const { 
    openCertificateModal, 
    setOpenCertificateModal, 
    selectedCertificate 
  } = useLearning();

  const [copied, setCopied] = useState(false);

  if (!openCertificateModal || !selectedCertificate) return null;

  const handlePrint = () => {
    window.print();
  };

  const verificationUrl = `${window.location.origin}/verify/${selectedCertificate.id || selectedCertificate.certificateCode}`;
  
  // LinkedIn 1-Click "Add Certification" official URL
  const issueYear = new Date().getFullYear();
  const issueMonth = new Date().getMonth() + 1;
  const linkedInAddUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
    selectedCertificate.courseTitle
  )}&organizationName=SeizeLearn&issueYear=${issueYear}&issueMonth=${issueMonth}&certUrl=${encodeURIComponent(
    verificationUrl
  )}&certId=${encodeURIComponent(selectedCertificate.certificateCode)}`;

  // Social sharing URLs
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(verificationUrl)}`;
  const tweetText = `Proud to announce I just completed "${selectedCertificate.courseTitle}" on SeizeLearn and received my verified certificate! 🎓🚀 #SeizeLearn #ContinuousLearning`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(verificationUrl)}`;
  const whatsappText = `Hey! I just earned my verified completion credential in "${selectedCertificate.courseTitle}" on SeizeLearn. Check it out: ${verificationUrl}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappText)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl border border-violet-500/40 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6 relative print:border-none print:shadow-none print:p-0 my-auto">
        
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 print:hidden">
          <div className="flex items-center gap-2 text-xs font-bold text-violet-400 uppercase tracking-wider">
            <Award className="h-4 w-4" />
            <span>Official Completion Credential</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white hover:bg-violet-500 transition shadow-lg shadow-violet-600/20"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => setOpenCertificateModal(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:text-white transition"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Certificate Decorative Canvas */}
        <div className="relative rounded-2xl border-4 border-double border-violet-500/30 bg-gradient-to-b from-slate-950 via-slate-900 to-[#0e1124] p-8 sm:p-12 text-center shadow-inner">
          
          {/* Ornamental corner markings */}
          <div className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-violet-400/50" />
          <div className="pointer-events-none absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-violet-400/50" />
          <div className="pointer-events-none absolute left-3 bottom-3 h-6 w-6 border-l-2 border-b-2 border-violet-400/50" />
          <div className="pointer-events-none absolute right-3 bottom-3 h-6 w-6 border-r-2 border-b-2 border-violet-400/50" />

          {/* Logo & Header */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-400 text-xs font-black text-white">
              SZ
            </div>
            <span className="font-heading text-xl font-black tracking-wider text-white">
              SEIZELEARN
            </span>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-300">
            Certificate of Practical Skill Mastery
          </p>

          <p className="mt-8 text-xs text-slate-400 font-serif italic">
            This is proudly presented to
          </p>

          <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-black text-white underline decoration-violet-500/50 underline-offset-8">
            {selectedCertificate.studentName}
          </h2>

          <p className="mt-6 max-w-lg mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed">
            for successfully completing 100% of the practical curriculum, active recall assessments, and guided project deliverables in:
          </p>

          <h3 className="mt-3 font-heading text-xl sm:text-2xl font-black text-cyan-300">
            {selectedCertificate.courseTitle}
          </h3>

          {/* Skills Acquired */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {selectedCertificate.skills.map((skill, i) => (
              <span 
                key={i}
                className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-[10px] font-bold text-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Footer details: QR code, verification seal, issued date */}
          <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500">Issued On</div>
              <div className="text-xs font-bold text-white">{selectedCertificate.issuedAt}</div>
              <div className="text-[10px] text-slate-500 mt-1">Status: {selectedCertificate.grade}</div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-slate-500">Credential ID</div>
                <div className="font-mono text-xs font-bold text-cyan-300">{selectedCertificate.certificateCode}</div>
                <div className="text-[9px] text-emerald-400 flex items-center gap-1 justify-end mt-0.5">
                  <ShieldCheck className="h-3 w-3" />
                  <span>Verified Public Proof</span>
                </div>
              </div>

              <div className="grid h-12 w-12 place-items-center rounded-xl border border-slate-700 bg-white p-1">
                <QrCode className="h-full w-full text-slate-950" />
              </div>
            </div>
          </div>

        </div>

        {/* 1-Click LinkedIn & Public Social Verification Bar (Hidden in Print) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 space-y-3 print:hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Share2 className="h-3.5 w-3.5 text-cyan-400" />
              <span>Showcase & Sync Credential</span>
            </span>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              <span>1-Click Verified</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* 1-Click LinkedIn Add Certification Button */}
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

            {/* LinkedIn Feed Share */}
            <a
              href={linkedInShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:border-slate-600 transition"
            >
              <span>Post to Feed</span>
            </a>

            {/* WhatsApp Share */}
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 px-3 py-2 text-xs font-semibold transition"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m-3.53 4.1c-.19 0-.41.07-.63.31-.22.25-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.66 2.62 4.09 3.61 2.02.82 2.43.66 2.87.62.44-.04 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.47-.28-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.17.25-.66.8-.81.97-.15.17-.3.19-.55.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.24.25-.4.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43z"/>
              </svg>
              <span>WhatsApp</span>
            </a>

            {/* X / Twitter */}
            <a
              href={twitterShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:border-slate-600 transition"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>X (Twitter)</span>
            </a>

            {/* Copy Direct Link */}
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white transition ml-auto"
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
          </div>
        </div>

      </div>
    </div>
  );
};
