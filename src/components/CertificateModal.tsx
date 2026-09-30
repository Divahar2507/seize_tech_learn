import React from 'react';
import { 
  X, 
  Printer, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  QrCode,
  CheckCircle2
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';

export const CertificateModal: React.FC = () => {
  const { 
    language, 
    openCertificateModal, 
    setOpenCertificateModal, 
    selectedCertificate 
  } = useLearning();

  if (!openCertificateModal || !selectedCertificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl border border-violet-500/40 bg-slate-900 p-6 sm:p-10 shadow-2xl space-y-6 relative print:border-none print:shadow-none print:p-0">
        
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 print:hidden">
          <div className="flex items-center gap-2 text-xs font-bold text-violet-400 uppercase tracking-wider">
            <Award className="h-4 w-4" />
            <span>Official Completion Credential</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white hover:bg-violet-500 transition"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => setOpenCertificateModal(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:text-white"
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

      </div>
    </div>
  );
};
