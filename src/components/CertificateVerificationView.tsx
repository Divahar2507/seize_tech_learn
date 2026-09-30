import React from 'react';
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
  ExternalLink
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';

export const CertificateVerificationView: React.FC = () => {
  const { certificateId } = useParams<{ certificateId: string }>();
  const { language, t, findCertificateById } = useLearning();

  const cert = certificateId ? findCertificateById(certificateId) : undefined;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert(language === 'ta' ? 'சான்றிதழ் இணைப்பு நகலெடுக்கப்பட்டது!' : 'Verification link copied to clipboard!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      {/* Back button */}
      <div className="flex items-center justify-between print:hidden">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{language === 'ta' ? 'முகப்புக்குத் திரும்பு' : 'Back to Platform'}</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white transition"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>{language === 'ta' ? 'பகிர்' : 'Share'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-500 transition"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>{language === 'ta' ? 'அச்சிடு / PDF' : 'Print / PDF'}</span>
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
                {language === 'ta' ? 'அங்கீகரிக்கப்பட்ட டிஜிட்டல் சான்றிதழ்' : 'Verified Digital Credential'}
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
                {language === 'ta' ? 'இந்த சான்றிதழ் பெருமையுடன் வழங்கப்படுகிறது' : 'This is to officially certify that'}
              </span>
              <h1 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-wide">
                {cert.studentName}
              </h1>
              <p className="text-sm text-slate-300 max-w-xl mx-auto">
                {language === 'ta'
                  ? `வெற்றிகரமாக "${cert.courseTitle}" பாடத்திட்டத்தின் அனைத்து கட்டமைப்புத் திட்டங்களையும் செய்முறைப் பயிற்சிகளையும் முழுமையாக முடித்துள்ளார்.`
                  : `has successfully completed the comprehensive curriculum and rigorous practical project milestones for "${cert.courseTitle}".`}
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
                  {language === 'ta' ? 'சரிபார்க்கப்பட்ட தொழில் திறன்கள்' : 'Skills & Technologies Verified'}
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
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-12 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Award className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-bold text-white">
            {language === 'ta' ? 'சான்றிதழ் கிடைக்கவில்லை' : 'Credential Not Found in Local Cache'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            {language === 'ta'
              ? 'கோரப்பட்ட சான்றிதழ் எண் உங்கள் கணினியில் பதிவு செய்யப்படவில்லை அல்லது தவறாக உள்ளது.'
              : 'The requested credential identifier was not found in your session. Complete course requirements to issue this credential.'}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-violet-500 transition"
          >
            <Sparkles className="h-4 w-4" />
            <span>{language === 'ta' ? 'பாடத்திட்டங்களை ஆராய்க' : 'Explore Courses'}</span>
          </Link>
        </div>
      )}
    </div>
  );
};
