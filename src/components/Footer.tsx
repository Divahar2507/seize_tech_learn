import React from 'react';
import { Sparkles, Heart, Shield, Code, BookOpen, Layers3 } from 'lucide-react';
import { useLearning } from '../context/LearningContext';

export const Footer: React.FC = () => {
  const { setActiveTab, setActiveCourseAndLesson, allCourses } = useLearning();

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
            "Learn useful skills. Build real proof. Grow every day." Practical skills-to-career learning for everyone.
          </p>
        </div>

        {/* 4 Launch Paths */}
        <div className="space-y-3">
          <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white">
            Launch Paths
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
            Platform
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('projects')} className="hover:text-cyan-300 transition">
                Project Hub
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('roadmaps')} className="hover:text-cyan-300 transition">
                Career Roadmaps
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('dashboard')} className="hover:text-cyan-300 transition">
                Growth Dashboard
              </button>
            </li>
            <li>
              <span className="text-slate-500">AI Study Buddy (Coming Soon)</span>
            </li>
          </ul>
        </div>

        {/* Who it is for */}
        <div className="space-y-3">
          <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white">
            Designed For
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Students, freshers preparing for placements, working professionals upgrading skills, and freelancers.
          </p>
          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-900">
            &copy; 2026 SeizeLearn. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
