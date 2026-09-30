import React from 'react';
import { Sparkles, Heart, Shield, Code, BookOpen, Layers3 } from 'lucide-react';
import { useLearning } from '../context/LearningContext';

export const Footer: React.FC = () => {
  const { language, setLanguage, setActiveTab, setActiveCourseAndLesson, allCourses } = useLearning();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Brand & Vision */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 font-heading text-sm font-black text-white">
              SZ
            </div>
            <span className="font-heading text-lg font-black tracking-tight text-white">
              SeizeLearn
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            {language === 'ta'
              ? 'பயனுள்ள திறன்களைக் கற்றுக் கொள்ளுங்கள். உண்மையான படைப்புகள் மூலம் நிரூபியுங்கள். தினமும் முன்னேறுங்கள்.'
              : '"Learn useful skills. Build real proof. Grow every day." Practical skills-to-career learning for everyone.'}
          </p>

          <div className="flex items-center gap-2 text-xs font-semibold">
            <button
              onClick={() => setLanguage('en')}
              className={`rounded px-2 py-0.5 ${language === 'en' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              English
            </button>
            <span>·</span>
            <button
              onClick={() => setLanguage('ta')}
              className={`rounded px-2 py-0.5 ${language === 'ta' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              தமிழ் (Tamil)
            </button>
          </div>
        </div>

        {/* 4 Launch Paths */}
        <div className="space-y-3">
          <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white">
            {language === 'ta' ? 'கற்றல் பாதைகள்' : 'Launch Paths'}
          </h4>
          <ul className="space-y-2 text-xs">
            {allCourses.map(c => (
              <li key={c.id}>
                <button
                  onClick={() => setActiveCourseAndLesson(c.id)}
                  className="hover:text-cyan-300 transition text-left"
                >
                  {c.category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Practical Features */}
        <div className="space-y-3">
          <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white">
            {language === 'ta' ? 'முக்கிய அம்சங்கள்' : 'Platform'}
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('projects')} className="hover:text-cyan-300 transition">
                {language === 'ta' ? 'திட்டப்பணி மையம்' : 'Project Hub'}
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('roadmaps')} className="hover:text-cyan-300 transition">
                {language === 'ta' ? 'தொழில் வழிகாட்டிகள்' : 'Career Roadmaps'}
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('dashboard')} className="hover:text-cyan-300 transition">
                {language === 'ta' ? 'வளர்ச்சி பலகை' : 'Growth Dashboard'}
              </button>
            </li>
            <li>
              <span className="text-slate-500">{language === 'ta' ? 'AI படிப்பு தோழன் (விரைவில்)' : 'AI Study Buddy (Coming Soon)'}</span>
            </li>
          </ul>
        </div>

        {/* Who it is for */}
        <div className="space-y-3">
          <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white">
            {language === 'ta' ? 'யாருக்காக?' : 'Designed For'}
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            {language === 'ta'
              ? 'பள்ளி & கல்லூரி மாணவர்கள், கேம்பஸ் வேலைவாய்ப்பிற்கு தயாராகும் பட்டதாரிகள், தொழில் வல்லுநர்கள் மற்றும் ஃப்ரீலான்ஸர்கள்.'
              : 'Students, freshers preparing for placements, working professionals upgrading skills, and freelancers.'}
          </p>
          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-900">
            &copy; 2026 SeizeLearn. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
