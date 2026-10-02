import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  X,
  BookOpen,
  FolderGit2,
  Code2,
  Brain,
  Map,
  ArrowRight,
  Sparkles,
  Command
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';

interface SearchResultItem {
  id: string;
  type: 'course' | 'lesson' | 'project' | 'tool' | 'roadmap';
  title: string;
  subtitle: string;
  category?: string;
  action: () => void;
}

export const SearchModal: React.FC = () => {
  const {
    openSearchModal,
    setOpenSearchModal,
    allCourses,
    allProjects,
    t,
    setActiveCourseAndLesson,
    setActiveProjectId,
    setActiveTab
  } = useLearning();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global keydown listener for Ctrl+K, Cmd+K, /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger '/' if user is already typing in an input or textarea
      const target = e.target as HTMLElement;
      const isInput = target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpenSearchModal(true);
      } else if (e.key === '/' && !isInput) {
        e.preventDefault();
        setOpenSearchModal(true);
      } else if (e.key === 'Escape' && openSearchModal) {
        e.preventDefault();
        setOpenSearchModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openSearchModal, setOpenSearchModal]);

  // Focus input when opened
  useEffect(() => {
    if (openSearchModal) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [openSearchModal]);

  // Compile search pool
  const searchResults = useMemo<SearchResultItem[]>(() => {
    const cleanQuery = query.toLowerCase().trim();
    const results: SearchResultItem[] = [];

    // Quick Tools & Actions
    const quickActions: SearchResultItem[] = [
      {
        id: 'action-practice-web',
        type: 'tool',
        title: 'Web Dev CodeLab & Sandbox',
        subtitle: 'Live HTML, CSS & JavaScript Sandbox with templates',
        action: () => {
          setActiveTab('practice');
          setOpenSearchModal(false);
        }
      },
      {
        id: 'action-practice-ai',
        type: 'tool',
        title: 'C.T.C.O Prompt Engineering Studio',
        subtitle: 'Test Context, Task, Constraints, Output scoring',
        action: () => {
          setActiveTab('practice');
          setOpenSearchModal(false);
        }
      },
      {
        id: 'action-drills',
        type: 'tool',
        title: 'Recall Arena & 60s Blitz Deck',
        subtitle: 'Spaced repetition flashcard challenges and speed trials',
        action: () => {
          setActiveTab('drills');
          setOpenSearchModal(false);
        }
      },
      {
        id: 'action-roadmaps',
        type: 'roadmap',
        title: 'Career Roadmaps & Milestones',
        subtitle: 'Step-by-step career tracks and placement guides',
        action: () => {
          setActiveTab('roadmaps');
          setOpenSearchModal(false);
        }
      }
    ];

    if (!cleanQuery) {
      return quickActions;
    }

    // Filter Quick Actions
    quickActions.forEach(qa => {
      if (qa.title.toLowerCase().includes(cleanQuery) || qa.subtitle.toLowerCase().includes(cleanQuery)) {
        results.push(qa);
      }
    });

    // Courses
    allCourses.forEach(course => {
      const courseTitleEn = course.title.en.toLowerCase();
      const courseTitleTa = course.title.ta.toLowerCase();
      const courseDescEn = course.shortDescription.en.toLowerCase();
      const courseDescTa = course.shortDescription.ta.toLowerCase();
      const tags = course.tags.map(tag => tag.toLowerCase()).join(' ');

      if (
        courseTitleEn.includes(cleanQuery) ||
        courseTitleTa.includes(cleanQuery) ||
        courseDescEn.includes(cleanQuery) ||
        courseDescTa.includes(cleanQuery) ||
        tags.includes(cleanQuery)
      ) {
        results.push({
          id: `course-${course.id}`,
          type: 'course',
          title: t(course.title),
          subtitle: `${course.level.toUpperCase()} • ${course.estimatedHours} hrs • ${course.modules.length} Modules`,
          category: course.category,
          action: () => {
            setActiveCourseAndLesson(course.id, course.modules[0]?.lessons[0]?.id);
            setActiveTab('path');
            setOpenSearchModal(false);
          }
        });
      }

      // Lessons inside this course
      course.modules.forEach(module => {
        module.lessons.forEach(lesson => {
          const lessonTitleEn = lesson.title.en.toLowerCase();
          const lessonTitleTa = lesson.title.ta.toLowerCase();
          const summaryEn = lesson.summary.en.toLowerCase();
          const summaryTa = lesson.summary.ta.toLowerCase();

          if (
            lessonTitleEn.includes(cleanQuery) ||
            lessonTitleTa.includes(cleanQuery) ||
            summaryEn.includes(cleanQuery) ||
            summaryTa.includes(cleanQuery)
          ) {
            results.push({
              id: `lesson-${lesson.id}`,
              type: 'lesson',
              title: t(lesson.title),
              subtitle: `${t(course.title)} • ${lesson.durationMinutes} mins`,
              category: course.category,
              action: () => {
                setActiveCourseAndLesson(course.id, lesson.id);
                setActiveTab('lesson');
                setOpenSearchModal(false);
              }
            });
          }
        });
      });
    });

    // Projects
    allProjects.forEach(proj => {
      const projTitleEn = proj.title.en.toLowerCase();
      const projTitleTa = proj.title.ta.toLowerCase();
      const descEn = proj.description.en.toLowerCase();

      if (
        projTitleEn.includes(cleanQuery) ||
        projTitleTa.includes(cleanQuery) ||
        descEn.includes(cleanQuery)
      ) {
        results.push({
          id: `project-${proj.id}`,
          type: 'project',
          title: t(proj.title),
          subtitle: `Capstone Project • ${proj.durationHours}h • ${proj.category}`,
          action: () => {
            setActiveProjectId(proj.id);
            setActiveTab('projects');
            setOpenSearchModal(false);
          }
        });
      }
    });

    return results.slice(0, 10);
  }, [query, allCourses, allProjects, t, setActiveCourseAndLesson, setActiveProjectId, setActiveTab, setOpenSearchModal]);

  // Keyboard navigation within the results list
  const handleKeyDownInModal = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults[selectedIndex]) {
        searchResults[selectedIndex].action();
      }
    }
  };

  if (!openSearchModal) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      onClick={() => setOpenSearchModal(false)}
    >
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDownInModal}
      >
        {/* Search Header Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search lessons, skills, code sandbox, projects..."
            className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            <span>ESC</span>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 divide-y divide-slate-800/40">
          {searchResults.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              <Search className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <span>No results found for "{query}"</span>
            </div>
          ) : (
            searchResults.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-violet-600/20 text-white border border-violet-500/30'
                      : 'hover:bg-slate-800/60 text-slate-300 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <span className={`p-2 rounded-lg shrink-0 ${
                      item.type === 'course' ? 'bg-violet-500/20 text-violet-400' :
                      item.type === 'lesson' ? 'bg-blue-500/20 text-blue-400' :
                      item.type === 'project' ? 'bg-emerald-500/20 text-emerald-400' :
                      item.type === 'roadmap' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {item.type === 'course' && <BookOpen className="w-4 h-4" />}
                      {item.type === 'lesson' && <Sparkles className="w-4 h-4" />}
                      {item.type === 'project' && <FolderGit2 className="w-4 h-4" />}
                      {item.type === 'roadmap' && <Map className="w-4 h-4" />}
                      {item.type === 'tool' && <Code2 className="w-4 h-4" />}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm truncate text-white">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 shrink-0 transition-opacity ${
                    isSelected ? 'opacity-100 text-violet-400' : 'opacity-0'
                  }`} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="px-4 py-2.5 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px]">↓</kbd>
              <span className="ml-1">to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px]">↵</kbd>
              <span className="ml-1">to select</span>
            </span>
          </div>
          <span className="flex items-center gap-1 text-slate-500">
            <Command className="w-3 h-3" /> SeizeLearn Search
          </span>
        </div>
      </div>
    </div>
  );
};
