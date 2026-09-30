import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Course,
  Lesson,
  Language,
  BilingualText,
  UserProgressState,
  ProjectBrief,
  ProjectSubmission,
  Certificate,
  DailyChallenge,
  UserNote,
  LearningCategory
} from '../types/learning';
import { INITIAL_COURSES } from '../data/coursesData';
import { INITIAL_PROJECTS } from '../data/projectsData';
import { DAILY_CHALLENGES } from '../data/dailyChallenges';
import { ALL_BADGES } from '../data/badgesData';
import { subscribeToAuth, syncUserStateToCloud, fetchUserStateFromCloud, logoutUser } from '../services/firebase';

const STORAGE_KEY = 'seize_learn_platform_v3';

const INITIAL_USER_STATE: UserProgressState = {
  user: {
    uid: 'guest-learner',
    displayName: 'Learner',
    email: 'learner@seizelearn.local',
    isAnonymous: true
  },
  language: 'en',
  xp: 120,
  streak: 2,
  lastActiveDate: new Date().toISOString().split('T')[0],
  weeklyGoalHours: 5,
  enrolledCourseIds: ['course-ai-skills', 'course-web-dev'],
  completedLessonIds: ['les-ai-101'],
  bookmarkedLessonIds: [],
  completedDailyChallenges: [],
  quizRecords: {},
  projectSubmissions: {},
  earnedBadgeIds: ['badge-first-step'],
  certificates: [],
  notes: {}
};

interface LearningContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (text?: BilingualText | string) => string;
  userState: UserProgressState;
  activeTab: 'home' | 'path' | 'lesson' | 'projects' | 'dashboard' | 'roadmaps' | 'practice' | 'drills';
  setActiveTab: (tab: 'home' | 'path' | 'lesson' | 'projects' | 'dashboard' | 'roadmaps' | 'practice' | 'drills') => void;
  allCourses: Course[];
  activeCourse: Course | undefined;
  activeLesson: Lesson | undefined;
  activeCourseId: string;
  activeLessonId: string;
  setActiveCourseAndLesson: (courseId: string, lessonId?: string) => void;
  enrollCourse: (courseId: string) => void;
  allProjects: ProjectBrief[];
  activeProject: ProjectBrief | undefined;
  activeProjectId: string;
  setActiveProjectId: (id: string) => void;
  todayChallenge: DailyChallenge;
  markLessonComplete: (lessonId: string, xpEarned: number) => void;
  submitQuiz: (lessonId: string, courseId: string, score: number, totalQuestions: number, xpEarned: number) => void;
  toggleBookmark: (lessonId: string) => void;
  saveNote: (lessonId: string, courseId: string, lessonTitle: string, content: string) => void;
  deleteNote: (noteId: string) => void;
  submitProject: (projectId: string, demoUrl: string, repoUrl: string, notes: string, completedChecklistIds: string[]) => void;
  updateProjectChecklist: (projectId: string, checklistCompletedIds: string[]) => void;
  completeDailyChallenge: (challengeId: string, xpReward: number) => void;
  generateCertificate: (courseId: string) => Certificate;
  getCourseProgress: (courseId: string) => { completedLessons: number; totalLessons: number; percentage: number; isCompleted: boolean };
  getCategoryProgress: (category: LearningCategory) => { completedLessons: number; totalLessons: number; percentage: number };
  recordCardReview: (cardId: string, result: 'easy' | 'hard') => void;
  triggerConfetti: () => void;
  openAuthModal: boolean;
  setOpenAuthModal: (open: boolean) => void;
  openDailyChallengeModal: boolean;
  setOpenDailyChallengeModal: (open: boolean) => void;
  openNotesDrawer: boolean;
  setOpenNotesDrawer: (open: boolean) => void;
  openCertificateModal: boolean;
  setOpenCertificateModal: (open: boolean) => void;
  openSearchModal: boolean;
  setOpenSearchModal: (open: boolean) => void;
  selectedCertificate: Certificate | null;
  setSelectedCertificate: (cert: Certificate | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isOnline: boolean;
  findCertificateById: (id: string) => Certificate | undefined;
  loginLocally: (username: string, email?: string) => void;
  logoutLocally: () => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state from LocalStorage or default
  const [userState, setUserState] = useState<UserProgressState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...INITIAL_USER_STATE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
    return INITIAL_USER_STATE;
  });

  const [activeTab, setActiveTab] = useState<'home' | 'path' | 'lesson' | 'projects' | 'dashboard' | 'roadmaps' | 'practice' | 'drills'>('home');
  const [activeCourseId, setActiveCourseId] = useState<string>('course-ai-skills');
  const [activeLessonId, setActiveLessonId] = useState<string>('les-ai-101');
  const [activeProjectId, setActiveProjectId] = useState<string>('project-ai-assistant');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const [openDailyChallengeModal, setOpenDailyChallengeModal] = useState<boolean>(false);
  const [openNotesDrawer, setOpenNotesDrawer] = useState<boolean>(false);
  const [openCertificateModal, setOpenCertificateModal] = useState<boolean>(false);
  const [openSearchModal, setOpenSearchModal] = useState<boolean>(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);

  // Monitor network connectivity
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync to localStorage immediately, and debounced to Firestore cloud
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userState));
    } catch (e) {
      console.error('Error saving local state', e);
    }

    if (!userState.user.isAnonymous && userState.user.uid && isOnline) {
      const timer = setTimeout(() => {
        syncUserStateToCloud(userState.user.uid, userState);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [userState, isOnline]);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (firebaseUser) => {
      if (firebaseUser) {
        const cloudData = await fetchUserStateFromCloud(firebaseUser.uid);
        setUserState(prev => ({
          ...prev,
          ...(cloudData || {}),
          user: {
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName || 'Learner',
            email: firebaseUser.email || '',
            photoURL: firebaseUser.photoURL || undefined,
            isAnonymous: firebaseUser.isAnonymous
          }
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  const language = userState.language || 'en';

  const setLanguage = (lang: Language) => {
    setUserState(prev => {
      const newBadges = [...prev.earnedBadgeIds];
      if (lang === 'ta' && !newBadges.includes('badge-bilingual-learner')) {
        newBadges.push('badge-bilingual-learner');
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      }
      return { ...prev, language: lang, earnedBadgeIds: newBadges };
    });
  };

  const t = (text?: BilingualText | string): string => {
    if (!text) return '';
    if (typeof text === 'string') return text;
    return text[language] || text.en || '';
  };

  const allCourses = INITIAL_COURSES;
  const allProjects = INITIAL_PROJECTS;
  const allDailyChallenges = DAILY_CHALLENGES;
  const todayChallenge = DAILY_CHALLENGES[0];

  const activeCourse = useMemo(() => {
    return allCourses.find(c => c.id === activeCourseId) || allCourses[0];
  }, [activeCourseId, allCourses]);

  const activeLesson = useMemo(() => {
    if (!activeCourse) return undefined;
    for (const mod of activeCourse.modules) {
      const found = mod.lessons.find(l => l.id === activeLessonId);
      if (found) return found;
    }
    return activeCourse.modules[0]?.lessons[0];
  }, [activeCourse, activeLessonId]);

  const activeProject = useMemo(() => {
    return allProjects.find(p => p.id === activeProjectId) || allProjects[0];
  }, [activeProjectId, allProjects]);

  const setActiveCourseAndLesson = (courseId: string, lessonId?: string) => {
    setActiveCourseId(courseId);
    const targetCourse = allCourses.find(c => c.id === courseId);
    if (lessonId) {
      setActiveLessonId(lessonId);
    } else if (targetCourse && targetCourse.modules[0]?.lessons[0]) {
      setActiveLessonId(targetCourse.modules[0].lessons[0].id);
    }
    setActiveTab(lessonId ? 'lesson' : 'path');
  };

  const enrollCourse = (courseId: string) => {
    setUserState(prev => {
      if (prev.enrolledCourseIds.includes(courseId)) return prev;
      return {
        ...prev,
        enrolledCourseIds: [...prev.enrolledCourseIds, courseId]
      };
    });
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.7 }
      });
    } catch {
      // safe fallback
    }
  };

  const markLessonComplete = (lessonId: string, xpEarned: number) => {
    setUserState(prev => {
      const alreadyCompleted = prev.completedLessonIds.includes(lessonId);
      if (alreadyCompleted) return prev;

      const newBadges = [...prev.earnedBadgeIds];
      if (!newBadges.includes('badge-first-step')) {
        newBadges.push('badge-first-step');
      }

      triggerCelebration();

      return {
        ...prev,
        xp: prev.xp + xpEarned,
        completedLessonIds: [...prev.completedLessonIds, lessonId],
        earnedBadgeIds: newBadges
      };
    });
  };

  const submitQuiz = (
    lessonId: string,
    courseId: string,
    score: number,
    totalQuestions: number,
    xpEarned: number
  ) => {
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 70;

    setUserState(prev => {
      const newBadges = [...prev.earnedBadgeIds];
      if (percentage === 100 && !newBadges.includes('badge-quiz-ace')) {
        newBadges.push('badge-quiz-ace');
      }

      if (passed) {
        triggerCelebration();
      }

      return {
        ...prev,
        xp: prev.xp + xpEarned,
        earnedBadgeIds: newBadges,
        quizRecords: {
          ...prev.quizRecords,
          [lessonId]: {
            id: `qr-${Date.now()}`,
            lessonId,
            courseId,
            score,
            totalQuestions,
            percentage,
            passed,
            xpEarned,
            completedAt: new Date().toISOString()
          }
        }
      };
    });
  };

  const toggleBookmark = (lessonId: string) => {
    setUserState(prev => {
      const isBookmarked = prev.bookmarkedLessonIds.includes(lessonId);
      return {
        ...prev,
        bookmarkedLessonIds: isBookmarked
          ? prev.bookmarkedLessonIds.filter(id => id !== lessonId)
          : [...prev.bookmarkedLessonIds, lessonId]
      };
    });
  };

  const saveNote = (lessonId: string, courseId: string, lessonTitle: string, content: string) => {
    setUserState(prev => {
      const noteId = `note-${lessonId}`;
      const now = new Date().toISOString();
      return {
        ...prev,
        notes: {
          ...prev.notes,
          [noteId]: {
            id: noteId,
            lessonId,
            courseId,
            lessonTitle,
            content,
            createdAt: prev.notes[noteId]?.createdAt || now,
            updatedAt: now
          }
        }
      };
    });
  };

  const deleteNote = (noteId: string) => {
    setUserState(prev => {
      const newNotes = { ...prev.notes };
      delete newNotes[noteId];
      return { ...prev, notes: newNotes };
    });
  };

  const submitProject = (
    projectId: string,
    demoUrl: string,
    repoUrl: string,
    notes: string,
    completedChecklistIds: string[]
  ) => {
    const targetProject = allProjects.find(p => p.id === projectId);
    const xpReward = targetProject?.xpReward || 300;

    setUserState(prev => {
      const newBadges = [...prev.earnedBadgeIds];
      if (!newBadges.includes('badge-project-builder')) {
        newBadges.push('badge-project-builder');
      }

      triggerCelebration();

      const newSubmission: ProjectSubmission = {
        projectId,
        submittedAt: new Date().toISOString(),
        demoUrl,
        repoUrl,
        notes,
        checklistCompletedIds: completedChecklistIds,
        status: 'submitted',
        feedback: {
          en: 'Project proof submitted successfully! Verified for portfolio presentation.',
          ta: 'திட்டப்பணி வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது! போர்ட்ஃபோலியோவிற்காக சரிபார்க்கப்பட்டது.'
        }
      };

      return {
        ...prev,
        xp: prev.xp + xpReward,
        earnedBadgeIds: newBadges,
        projectSubmissions: {
          ...prev.projectSubmissions,
          [projectId]: newSubmission
        }
      };
    });
  };

  const updateProjectChecklist = (projectId: string, checklistCompletedIds: string[]) => {
    setUserState(prev => {
      const current = prev.projectSubmissions[projectId] || {
        projectId,
        submittedAt: new Date().toISOString(),
        status: 'in_progress',
        checklistCompletedIds: []
      };

      return {
        ...prev,
        projectSubmissions: {
          ...prev.projectSubmissions,
          [projectId]: {
            ...current,
            checklistCompletedIds
          }
        }
      };
    });
  };

  const completeDailyChallenge = (challengeId: string, xpReward: number) => {
    setUserState(prev => {
      if (prev.completedDailyChallenges.includes(challengeId)) return prev;
      triggerCelebration();
      return {
        ...prev,
        xp: prev.xp + xpReward,
        streak: prev.streak + 1,
        completedDailyChallenges: [...prev.completedDailyChallenges, challengeId]
      };
    });
  };

  const getCourseProgress = (courseId: string) => {
    const course = allCourses.find(c => c.id === courseId);
    if (!course) return { completedLessons: 0, totalLessons: 0, percentage: 0, isCompleted: false };

    let totalLessons = 0;
    let completedLessons = 0;

    for (const mod of course.modules) {
      for (const les of mod.lessons) {
        totalLessons++;
        if (userState.completedLessonIds.includes(les.id)) {
          completedLessons++;
        }
      }
    }

    const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    return {
      completedLessons,
      totalLessons,
      percentage,
      isCompleted: totalLessons > 0 && completedLessons === totalLessons
    };
  };

  const getCategoryProgress = (category: LearningCategory) => {
    const matchingCourses = allCourses.filter(c => c.category === category);
    let total = 0;
    let done = 0;

    matchingCourses.forEach(c => {
      const prog = getCourseProgress(c.id);
      total += prog.totalLessons;
      done += prog.completedLessons;
    });

    const percentage = total > 0 ? Math.round((done / total) * 100) : 0;
    return { completedLessons: done, totalLessons: total, percentage };
  };

  const generateCertificate = (courseId: string): Certificate => {
    const course = allCourses.find(c => c.id === courseId) || allCourses[0];
    const existing = userState.certificates.find(c => c.courseId === courseId);
    if (existing) {
      setSelectedCertificate(existing);
      setOpenCertificateModal(true);
      return existing;
    }

    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      courseId: course.id,
      courseTitle: t(course.title),
      studentName: userState.user.displayName || 'Learner',
      issuedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      grade: 'Distinction Mastery',
      xpEarned: course.xpReward,
      certificateCode: `SZ-${course.id.replace('course-', '').toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      skills: course.tags
    };

    setUserState(prev => ({
      ...prev,
      certificates: [...prev.certificates, newCert]
    }));

    setSelectedCertificate(newCert);
    setOpenCertificateModal(true);
    triggerCelebration();
    return newCert;
  };

  const recordCardReview = (cardId: string, result: 'easy' | 'hard') => {
    setUserState(prev => {
      const xpBonus = result === 'easy' ? 10 : 5;
      const newBadges = [...prev.earnedBadgeIds];
      if (!newBadges.includes('badge-recall-master')) {
        newBadges.push('badge-recall-master');
      }
      return {
        ...prev,
        xp: prev.xp + xpBonus,
        earnedBadgeIds: newBadges
      };
    });
  };

  const findCertificateById = (id: string): Certificate | undefined => {
    return userState.certificates.find(c => c.id === id || c.certificateCode === id);
  };

  const loginLocally = (username: string, email?: string) => {
    const cleanName = username.trim() || 'Learner';
    const cleanEmail = email?.trim() || `${cleanName.toLowerCase().replace(/[^a-z0-9_]/g, '')}@seizelearn.local`;
    setUserState(prev => ({
      ...prev,
      user: {
        uid: `user-local-${Date.now()}`,
        displayName: cleanName,
        email: cleanEmail,
        isAnonymous: false
      }
    }));
    triggerCelebration();
  };

  const logoutLocally = () => {
    logoutUser();
    setUserState(prev => ({
      ...prev,
      user: {
        uid: 'guest-learner',
        displayName: 'Learner',
        email: 'learner@seizelearn.local',
        isAnonymous: true
      }
    }));
  };

  return (
    <LearningContext.Provider
      value={{
        language,
        setLanguage,
        t,
        userState,
        activeTab,
        setActiveTab,
        allCourses,
        activeCourse,
        activeLesson,
        activeCourseId,
        activeLessonId,
        setActiveCourseAndLesson,
        enrollCourse,
        allProjects,
        activeProject,
        activeProjectId,
        setActiveProjectId,
        todayChallenge,
        markLessonComplete,
        submitQuiz,
        toggleBookmark,
        saveNote,
        deleteNote,
        submitProject,
        updateProjectChecklist,
        completeDailyChallenge,
        generateCertificate,
        getCourseProgress,
        getCategoryProgress,
        recordCardReview,
        triggerConfetti: triggerCelebration,
        openAuthModal,
        setOpenAuthModal,
        openDailyChallengeModal,
        setOpenDailyChallengeModal,
        openNotesDrawer,
        setOpenNotesDrawer,
        openCertificateModal,
        setOpenCertificateModal,
        openSearchModal,
        setOpenSearchModal,
        selectedCertificate,
        setSelectedCertificate,
        searchQuery,
        setSearchQuery,
        isOnline,
        findCertificateById,
        loginLocally,
        logoutLocally
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
