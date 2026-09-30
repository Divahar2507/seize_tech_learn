export type Language = 'en' | 'ta';

export interface BilingualText {
  en: string;
  ta: string;
}

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Mastery';

export type LearningCategory = 
  | 'AI Tools & Prompting'
  | 'Web Development'
  | 'English & Communication'
  | 'Career & Placement Prep';

export type LessonType = 'interactive_guide' | 'practice_lab' | 'quiz_challenge' | 'prompt_sandbox';

export interface QuizQuestion {
  id: string;
  question: BilingualText;
  codeSnippet?: string;
  options: BilingualText[];
  correctIndex: number;
  explanation: BilingualText;
  hint?: BilingualText;
}

export interface Flashcard {
  id: string;
  front: BilingualText;
  back: BilingualText;
  category: string;
  difficulty?: DifficultyLevel;
}

export interface PracticeTask {
  title: BilingualText;
  instructions: BilingualText;
  starterPromptOrCode?: string;
  solutionOrSample?: string;
  hints?: BilingualText[];
}

export interface LessonResource {
  title: string;
  url: string;
  type: 'doc' | 'video' | 'template' | 'repo';
}

export interface Lesson {
  id: string;
  title: BilingualText;
  slug: string;
  durationMinutes: number;
  xp: number;
  type: LessonType;
  summary: BilingualText;
  contentMarkdown: BilingualText;
  keyTakeaways: BilingualText[];
  practiceTask?: PracticeTask;
  quizQuestions?: QuizQuestion[];
  flashcards?: Flashcard[];
  resources?: LessonResource[];
}

export interface Module {
  id: string;
  title: BilingualText;
  description: BilingualText;
  order: number;
  lessons: Lesson[];
}

export interface Instructor {
  name: string;
  role: string;
  avatar: string;
  bio: BilingualText;
  company?: string;
}

export interface Course {
  id: string;
  title: BilingualText;
  slug: string;
  shortDescription: BilingualText;
  fullDescription: BilingualText;
  category: LearningCategory;
  level: DifficultyLevel;
  estimatedHours: number;
  xpReward: number;
  thumbnailGradient: string;
  iconName: string;
  color: 'violet' | 'cyan' | 'amber' | 'rose';
  instructor: Instructor;
  rating: number;
  reviewCount: number;
  enrolledCount: number;
  tags: string[];
  modules: Module[];
  learningOutcomes: BilingualText[];
  capstoneProjectId: string;
  isFeatured?: boolean;
}

export interface ProjectChecklistItem {
  id: string;
  label: BilingualText;
  hint?: BilingualText;
}

export interface ProjectBrief {
  id: string;
  title: BilingualText;
  slug: string;
  category: LearningCategory;
  level: DifficultyLevel;
  durationHours: number;
  xpReward: number;
  tagline: BilingualText;
  description: BilingualText;
  problemStatement: BilingualText;
  starterFiles?: { filename: string; code: string }[];
  starterTemplateUrl?: string;
  checklist: ProjectChecklistItem[];
  deliverables: BilingualText[];
  rubric: BilingualText[];
  associatedCourseId: string;
  thumbnailGradient: string;
}

export interface ProjectSubmission {
  projectId: string;
  submittedAt: string;
  demoUrl?: string;
  repoUrl?: string;
  notes?: string;
  checklistCompletedIds: string[];
  status: 'in_progress' | 'submitted' | 'verified';
  feedback?: BilingualText;
}

export interface RoadmapNode {
  id: string;
  title: BilingualText;
  description: BilingualText;
  level: DifficultyLevel;
  associatedCourseId?: string;
  associatedLessonId?: string;
  category: LearningCategory;
  prerequisites: string[];
  estimatedWeeks: number;
  skillsGained: string[];
}

export interface RoadmapTrack {
  id: string;
  title: BilingualText;
  slug: string;
  category: LearningCategory;
  tagline: BilingualText;
  description: BilingualText;
  icon: string;
  accentColor: string;
  totalWeeks: number;
  careerRoles: string[];
  nodes: RoadmapNode[];
}

export interface Badge {
  id: string;
  title: BilingualText;
  description: BilingualText;
  icon: string;
  unlockedAt?: string;
  category: 'streak' | 'xp' | 'completion' | 'project';
}

export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  issuedAt: string;
  grade: string;
  xpEarned: number;
  certificateCode: string;
  skills: string[];
}

export interface DailyChallenge {
  id: string;
  date: string;
  title: BilingualText;
  category: LearningCategory;
  topic: string;
  xpReward: number;
  estimatedMinutes: number;
  problemStatement: BilingualText;
  type: 'quiz' | 'prompt_task' | 'code_snippet';
  quizQuestion?: QuizQuestion;
  practiceTask?: PracticeTask;
}

export interface UserNote {
  id: string;
  lessonId: string;
  courseId: string;
  lessonTitle: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuizAttemptRecord {
  id: string;
  lessonId: string;
  courseId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  xpEarned: number;
  completedAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isAnonymous?: boolean;
}

export interface UserProgressState {
  user: UserProfile;
  language: Language;
  xp: number;
  streak: number;
  lastActiveDate: string;
  weeklyGoalHours: number;
  enrolledCourseIds: string[];
  completedLessonIds: string[];
  bookmarkedLessonIds: string[];
  completedDailyChallenges: string[];
  quizRecords: Record<string, QuizAttemptRecord>;
  projectSubmissions: Record<string, ProjectSubmission>;
  earnedBadgeIds: string[];
  certificates: Certificate[];
  notes: Record<string, UserNote>;
}
