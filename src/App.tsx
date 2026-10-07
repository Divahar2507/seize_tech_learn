import React, { Suspense, useEffect, useRef } from 'react';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  useNavigate, 
  useLocation, 
  Navigate 
} from 'react-router-dom';
import { LearningProvider, useLearning } from './context/LearningContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Code-split heavy views for fast initial load
const Homepage = React.lazy(() => import('./components/Homepage').then(m => ({ default: m.Homepage })));
const LearningPathView = React.lazy(() => import('./components/LearningPathView').then(m => ({ default: m.LearningPathView })));
const LessonPlayer = React.lazy(() => import('./components/LessonPlayer').then(m => ({ default: m.LessonPlayer })));
const ProjectHub = React.lazy(() => import('./components/ProjectHub').then(m => ({ default: m.ProjectHub })));
const GrowthDashboard = React.lazy(() => import('./components/GrowthDashboard').then(m => ({ default: m.GrowthDashboard })));
const RoadmapView = React.lazy(() => import('./components/RoadmapView').then(m => ({ default: m.RoadmapView })));
const PracticeStudio = React.lazy(() => import('./components/PracticeStudio').then(m => ({ default: m.PracticeStudio })));
const ActiveRecallDrill = React.lazy(() => import('./components/ActiveRecallDrill').then(m => ({ default: m.ActiveRecallDrill })));
const CertificateVerificationView = React.lazy(() => import('./components/CertificateVerificationView').then(m => ({ default: m.CertificateVerificationView })));
const PortfolioProfileView = React.lazy(() => import('./components/PortfolioProfileView').then(m => ({ default: m.PortfolioProfileView })));

// Lazy-loaded modals & drawers
const SearchModal = React.lazy(() => import('./components/SearchModal').then(m => ({ default: m.SearchModal })));
const DailyChallengeModal = React.lazy(() => import('./components/DailyChallengeModal').then(m => ({ default: m.DailyChallengeModal })));
const NotesDrawer = React.lazy(() => import('./components/NotesDrawer').then(m => ({ default: m.NotesDrawer })));
const CertificateModal = React.lazy(() => import('./components/CertificateModal').then(m => ({ default: m.CertificateModal })));
const AuthModal = React.lazy(() => import('./components/AuthModal').then(m => ({ default: m.AuthModal })));

const ViewFallback: React.FC = () => (
  <div className="flex min-h-[50vh] items-center justify-center p-8">
    <div className="flex flex-col items-center gap-3">
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-violet-500/20 border-t-violet-500" />
      <span className="text-xs font-medium text-slate-400">Loading learning module...</span>
    </div>
  </div>
);

// Bi-directional synchronizer between Browser URL and LearningContext
const NavigationSync: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    activeTab, 
    setActiveTab, 
    activeCourseId, 
    activeLessonId, 
    setActiveCourseAndLesson, 
    activeProjectId, 
    setActiveProjectId 
  } = useLearning();

  const isSyncingFromUrl = useRef(false);

  // 1. Sync URL -> Context State (on direct URL entry, bookmark, or browser back/forward)
  useEffect(() => {
    isSyncingFromUrl.current = true;
    const path = location.pathname;

    if (path === '/') {
      setActiveTab('home');
    } else if (path.startsWith('/practice')) {
      setActiveTab('practice');
    } else if (path.startsWith('/drills')) {
      setActiveTab('drills');
    } else if (path.startsWith('/dashboard')) {
      setActiveTab('dashboard');
    } else if (path.startsWith('/roadmaps')) {
      setActiveTab('roadmaps');
    } else if (path.startsWith('/projects')) {
      setActiveTab('projects');
      const parts = path.split('/');
      if (parts[2]) {
        setActiveProjectId(parts[2]);
      }
    } else if (path.startsWith('/courses')) {
      const parts = path.split('/');
      const cId = parts[2];
      const lId = parts[4]; // /courses/:cId/lessons/:lId
      if (cId && lId) {
        setActiveCourseAndLesson(cId, lId);
      } else if (cId) {
        setActiveCourseAndLesson(cId);
      }
    }

    const timer = setTimeout(() => {
      isSyncingFromUrl.current = false;
    }, 60);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // 2. Sync Context State -> URL (when buttons in UI change activeTab / course / lesson)
  useEffect(() => {
    if (isSyncingFromUrl.current || location.pathname.startsWith('/verify/') || location.pathname.startsWith('/profile')) return;

    let targetPath = '/';
    if (activeTab === 'home') targetPath = '/';
    else if (activeTab === 'practice') targetPath = '/practice';
    else if (activeTab === 'drills') targetPath = '/drills';
    else if (activeTab === 'dashboard') targetPath = '/dashboard';
    else if (activeTab === 'roadmaps') targetPath = '/roadmaps';
    else if (activeTab === 'projects') targetPath = activeProjectId ? `/projects/${activeProjectId}` : '/projects';
    else if (activeTab === 'path') targetPath = `/courses/${activeCourseId}`;
    else if (activeTab === 'lesson') targetPath = `/courses/${activeCourseId}/lessons/${activeLessonId}`;

    if (location.pathname !== targetPath) {
      navigate(targetPath);
    }
  }, [activeTab, activeCourseId, activeLessonId, activeProjectId]);

  return null;
};

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-violet-500 selection:text-white">
      {/* Navigation Header */}
      <Header />

      {/* Main View Router */}
      <main className="flex-1">
        <Suspense fallback={<ViewFallback />}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/courses/:courseId" element={<LearningPathView />} />
            <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonPlayer />} />
            <Route path="/projects" element={<ProjectHub />} />
            <Route path="/projects/:projectId" element={<ProjectHub />} />
            <Route path="/dashboard" element={<GrowthDashboard />} />
            <Route path="/roadmaps" element={<RoadmapView />} />
            <Route path="/practice" element={<PracticeStudio />} />
            <Route path="/practice/:toolId" element={<PracticeStudio />} />
            <Route path="/drills" element={<ActiveRecallDrill />} />
            <Route path="/profile" element={<PortfolioProfileView />} />
            <Route path="/profile/:username" element={<PortfolioProfileView />} />
            <Route path="/verify/:certificateId" element={<CertificateVerificationView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      {/* Interactive Drawers & Overlays */}
      <Suspense fallback={null}>
        <SearchModal />
        <DailyChallengeModal />
        <NotesDrawer />
        <CertificateModal />
        <AuthModal />
      </Suspense>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <LearningProvider>
        <BrowserRouter>
          <NavigationSync />
          <MainLayout />
        </BrowserRouter>
      </LearningProvider>
    </ErrorBoundary>
  );
}
