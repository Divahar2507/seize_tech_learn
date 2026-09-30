import { RoadmapTrack } from '../types/learning';

export const ROADMAP_TRACKS: RoadmapTrack[] = [
  {
    id: 'track-ai-skills',
    title: {
      en: 'AI & Automation Specialist',
      ta: 'AI & ஆட்டோமேஷன் நிபுணர் பாதை'
    },
    slug: 'ai-automation-specialist',
    category: 'AI Tools & Prompting',
    tagline: {
      en: 'From foundational prompt mechanics to reliable workplace workflows and custom AI tools.',
      ta: 'அடிப்படை பிராம்டிங் முதல் நிறுவன பணிகளை எளிதாக்கும் AI ஆட்டோமேஷன் வரை.'
    },
    description: {
      en: 'Learn how to harness LLMs, eliminate errors with grounded prompts, write structured data outputs, and automate real-world office and study tasks.',
      ta: 'LLM-களை முழுமையாகப் பயன்படுத்தி, பிழைகளை நீக்கி, தினசரி வேலைகளை தானியங்கியாக்கும் முழுமையான வழித்தடம்.'
    },
    icon: 'BrainCircuit',
    accentColor: 'violet',
    totalWeeks: 4,
    careerRoles: ['Prompt Engineer', 'AI Operations Specialist', 'AI Productivity Lead'],
    nodes: [
      {
        id: 'node-ai-foundations',
        title: {
          en: 'Prompting Anatomy & C.T.C.O',
          ta: 'பிராம்டிங் அடிப்படைகள் & C.T.C.O'
        },
        description: {
          en: 'Context, Task, Constraints, and Output formatting principles.',
          ta: 'சூழல், பணி, கட்டுப்பாடு மற்றும் வெளியீட்டு சூத்திரம்.'
        },
        level: 'Beginner',
        associatedCourseId: 'course-ai-skills',
        associatedLessonId: 'les-ai-101',
        category: 'AI Tools & Prompting',
        prerequisites: [],
        estimatedWeeks: 1,
        skillsGained: ['C.T.C.O Framework', 'Persona Design', 'Constraint Enforcement']
      },
      {
        id: 'node-ai-fewshot',
        title: {
          en: 'Few-Shot Teaching & JSON Schemas',
          ta: 'Few-Shot கற்பித்தல் & JSON வடிவமைப்பு'
        },
        description: {
          en: 'In-context learning with 2-3 exemplars for structured responses.',
          ta: 'உதாரணங்கள் மூலம் AI-யை நாம் விரும்பும் வடிவத்தில் பதிலளிக்க வைத்தல்.'
        },
        level: 'Beginner',
        associatedCourseId: 'course-ai-skills',
        associatedLessonId: 'les-ai-102',
        category: 'AI Tools & Prompting',
        prerequisites: ['node-ai-foundations'],
        estimatedWeeks: 1,
        skillsGained: ['Few-Shot Prompting', 'Structured Data Extraction', 'Schema Grounding']
      },
      {
        id: 'node-ai-safety',
        title: {
          en: 'AI Safety & Anti-Hallucination',
          ta: 'AI நம்பகத்தன்மை & பிழை தவிர்த்தல்'
        },
        description: {
          en: 'Grounding clauses and escape hatches to guarantee factual truth.',
          ta: 'உண்மைத்தன்மையை உறுதிப்படுத்தி தவறான தகவல்களை தடுக்கும் முறைகள்.'
        },
        level: 'Intermediate',
        associatedCourseId: 'course-ai-skills',
        associatedLessonId: 'les-ai-201',
        category: 'AI Tools & Prompting',
        prerequisites: ['node-ai-fewshot'],
        estimatedWeeks: 1,
        skillsGained: ['Grounding Prompts', 'Hallucination Mitigation', 'Data Privacy']
      },
      {
        id: 'node-ai-project',
        title: {
          en: 'Capstone: Automated AI Study Assistant',
          ta: 'திட்டப்பணி: தானியங்கி AI படிப்பு உதவியாளர்'
        },
        description: {
          en: 'Deploy a reusable prompt pipeline with summary, flashcards, and quizzes.',
          ta: 'முழுமையான பிராம்ட் தொகுப்பை உருவாக்கி நிரூபித்தல்.'
        },
        level: 'Intermediate',
        associatedCourseId: 'course-ai-skills',
        category: 'AI Tools & Prompting',
        prerequisites: ['node-ai-safety'],
        estimatedWeeks: 1,
        skillsGained: ['Pipeline Design', 'Proof of Work', 'Deliverable Architecture']
      }
    ]
  },
  {
    id: 'track-web-dev',
    title: {
      en: 'Modern Web Developer',
      ta: 'நவீன இணையதள உருவாக்குநர் பாதை'
    },
    slug: 'modern-web-developer',
    category: 'Web Development',
    tagline: {
      en: 'From semantic markup and responsive layouts to component state and deployed portfolios.',
      ta: 'HTML மற்றும் CSS முதல் React மற்றும் நேரலை போர்ட்ஃபோலியோ வரை.'
    },
    description: {
      en: 'Master semantic HTML5, modern responsive Flexbox and Grid, JavaScript DOM events, and React component state to build fast, beautiful websites.',
      ta: 'முறையான HTML5, CSS Flexbox, JavaScript மற்றும் React மூலம் கண்கவர் இணையதளங்களை உருவாக்கும் பயிற்சி.'
    },
    icon: 'Code2',
    accentColor: 'cyan',
    totalWeeks: 6,
    careerRoles: ['Frontend Developer', 'UI Engineer', 'Junior Web Developer'],
    nodes: [
      {
        id: 'node-web-html',
        title: {
          en: 'Semantic HTML5 Architecture',
          ta: 'Semantic HTML5 கட்டமைப்பு'
        },
        description: {
          en: 'Landmarks, accessibility, search indexing, and document structure.',
          ta: 'முறையான Semantic Tag-கள் மற்றும் எளிதில் அணுகக்கூடிய வடிவமைப்பு.'
        },
        level: 'Beginner',
        associatedCourseId: 'course-web-dev',
        associatedLessonId: 'les-web-101',
        category: 'Web Development',
        prerequisites: [],
        estimatedWeeks: 1,
        skillsGained: ['Semantic HTML5', 'Accessibility (a11y)', 'SEO Landmarks']
      },
      {
        id: 'node-web-css',
        title: {
          en: 'Responsive Layouts & Flexbox',
          ta: 'CSS Flexbox & ரெஸ்பான்சிவ் தளம்'
        },
        description: {
          en: 'Mobile-first screen flows, alignment axes, and flex wrapping.',
          ta: 'அனைத்து திரை அளவுகளுக்கும் ஏற்ற வளைந்து கொடுக்கும் திரை அமைப்புகள்.'
        },
        level: 'Beginner',
        associatedCourseId: 'course-web-dev',
        associatedLessonId: 'les-web-102',
        category: 'Web Development',
        prerequisites: ['node-web-html'],
        estimatedWeeks: 2,
        skillsGained: ['CSS Flexbox', 'Media Queries', 'Mobile-First Layouts']
      },
      {
        id: 'node-web-project',
        title: {
          en: 'Capstone: Deployed Portfolio Website',
          ta: 'திட்டப்பணி: நேரலை போர்ட்ஃபோலியோ தளம்'
        },
        description: {
          en: 'Publish your personal site to Vercel/Netlify with live proof.',
          ta: 'உங்கள் இணையதளத்தை Vercel அல்லது Netlify-ல் நேரலையாக வெளியிடுதல்.'
        },
        level: 'Intermediate',
        associatedCourseId: 'course-web-dev',
        category: 'Web Development',
        prerequisites: ['node-web-css'],
        estimatedWeeks: 2,
        skillsGained: ['Deployment (Vercel)', 'Git/GitHub', 'Portfolio Proof']
      }
    ]
  },
  {
    id: 'track-english-comm',
    title: {
      en: 'Workplace English & Communication',
      ta: 'பணியிட ஆங்கிலம் & தகவல் தொடர்பு பாதை'
    },
    slug: 'workplace-english-communication',
    category: 'English & Communication',
    tagline: {
      en: 'Overcome hesitation, speak with structure, and handle interviews with calm confidence.',
      ta: 'தயக்கத்தை போக்கி, நேர்த்தியான ஆங்கிலத்தில் பேசி நேர்காணல்களில் சாதிக்கும் வழித்தடம்.'
    },
    description: {
      en: 'Master spontaneous spoken English, crisp business email writing, and interview introductions without memorizing rigid scripts.',
      ta: 'மனப்பாடம் செய்யாமல் இயல்பாக ஆங்கிலத்தில் பேசவும் தொழில்முறை மின்னஞ்சல்களை பிழையின்றி எழுதவும் பயிற்சி.'
    },
    icon: 'WandSparkles',
    accentColor: 'amber',
    totalWeeks: 4,
    careerRoles: ['Client-Facing Engineer', 'Business Associate', 'Confident Professional'],
    nodes: [
      {
        id: 'node-eng-intro',
        title: {
          en: 'The P.P.F. Self-Introduction',
          ta: 'P.P.F சுய அறிமுகம்'
        },
        description: {
          en: 'Present, Past, and Future structured introduction for interviews.',
          ta: 'Present, Past, Future வரிசையில் சுருக்கமான சுய அறிமுகம்.'
        },
        level: 'Beginner',
        associatedCourseId: 'course-english-comm',
        associatedLessonId: 'les-eng-101',
        category: 'English & Communication',
        prerequisites: [],
        estimatedWeeks: 1,
        skillsGained: ['P.P.F Framework', 'Interview Introductions', 'Conversational Structure']
      },
      {
        id: 'node-eng-emails',
        title: {
          en: 'Workplace Email & Written Communication',
          ta: 'பணியிட மின்னஞ்சல்கள் & எழுத்து நடை'
        },
        description: {
          en: 'Write concise, professional emails with clear calls to action.',
          ta: 'சுருக்கமான, பணிவான மற்றும் பயனுள்ள தொழில்முறை மின்னஞ்சல்களை எழுதும் பயிற்சி.'
        },
        level: 'Beginner',
        associatedCourseId: 'course-english-comm',
        associatedLessonId: 'les-eng-201',
        category: 'English & Communication',
        prerequisites: ['node-eng-intro'],
        estimatedWeeks: 1,
        skillsGained: ['Email Etiquette', 'Action Lines', 'Polite Communication']
      },
      {
        id: 'node-eng-project',
        title: {
          en: 'Capstone: 60-Second Video Pitch',
          ta: 'திட்டப்பணி: 60 வினாடி சுய அறிமுக வீடியோ'
        },
        description: {
          en: 'Record an unlisted video pitch demonstrating poise and clear diction.',
          ta: 'தன்னம்பிக்கையுடன் கூடிய 60 வினாடி அறிமுக வீடியோவை பதிவு செய்து பகிர்தல்.'
        },
        level: 'Beginner',
        associatedCourseId: 'course-english-comm',
        category: 'English & Communication',
        prerequisites: ['node-eng-emails'],
        estimatedWeeks: 1,
        skillsGained: ['Public Speaking', 'Body Language', 'Diction & Pacing']
      }
    ]
  },
  {
    id: 'track-placement-prep',
    title: {
      en: 'Campus & Career Placement Mastery',
      ta: 'வேலைவாய்ப்பு & பிளேஸ்மென்ட் வெற்றி பாதை'
    },
    slug: 'placement-career-mastery',
    category: 'Career & Placement Prep',
    tagline: {
      en: 'Turn effort into job offers with ATS resumes, STAR behavioral stories, and aptitude.',
      ta: 'ATS முறையில் தேர்வாகும் ரெஸ்யூம் மற்றும் STAR அணுகுமுறை மூலம் வேலைவாய்ப்பை உறுதி செய்யும் பாதை.'
    },
    description: {
      en: 'A battle-tested blueprint to clear HR screening, beat applicant tracking systems, solve aptitude puzzles, and answer behavioral interview questions.',
      ta: 'ரெஸ்யூம் ஸ்கிரீனிங் முதல் இறுதி HR சுற்று வரை அனைத்தையும் எளிதாக கடப்பதற்கான முழுமையான பயிற்சி.'
    },
    icon: 'BriefcaseBusiness',
    accentColor: 'rose',
    totalWeeks: 5,
    careerRoles: ['Software Engineer', 'Graduate Trainee', 'Product Specialist'],
    nodes: [
      {
        id: 'node-prep-resume',
        title: {
          en: 'ATS Resume Architecture (X-Y-Z)',
          ta: 'ATS ரெஸ்யூம் தயாரிப்பு (X-Y-Z)'
        },
        description: {
          en: 'Accomplished [X], measured by [Y], by doing [Z] metric bullets.',
          ta: 'எண்களுடன் கூடிய சாதனைகளை வெளிப்படுத்தும் கூகுளின் X-Y-Z சூத்திரம்.'
        },
        level: 'Beginner',
        associatedCourseId: 'course-placement-prep',
        associatedLessonId: 'les-prep-101',
        category: 'Career & Placement Prep',
        prerequisites: [],
        estimatedWeeks: 1,
        skillsGained: ['ATS Formatting', 'Google X-Y-Z Formula', 'Action Verbs']
      },
      {
        id: 'node-prep-star',
        title: {
          en: 'STAR Method & Behavioral Mastery',
          ta: 'STAR அணுகுமுறை & நடத்தை வினாக்கள்'
        },
        description: {
          en: 'Situation, Task, Action, Result structured storytelling for HR rounds.',
          ta: 'கடினமான HR கேள்விகளுக்கு STAR முறையில் சிறப்பான கதைகளுடன் பதிலளிக்கும் முறை.'
        },
        level: 'Beginner',
        associatedCourseId: 'course-placement-prep',
        associatedLessonId: 'les-prep-201',
        category: 'Career & Placement Prep',
        prerequisites: ['node-prep-resume'],
        estimatedWeeks: 1,
        skillsGained: ['STAR Method', 'Storytelling', 'HR Interview Readiness']
      },
      {
        id: 'node-prep-project',
        title: {
          en: 'Capstone: Placement Dossier & STAR Bank',
          ta: 'திட்டப்பணி: வேலைவாய்ப்பு ஆவணத் தொகுப்பு'
        },
        description: {
          en: 'Assemble ATS resume, optimized LinkedIn, and 5 STAR behavioral answers.',
          ta: 'ATS Resume, LinkedIn சுயவிவரம் மற்றும் 5 STAR நேர்காணல் பதில்களின் தொகுப்பு.'
        },
        level: 'Beginner',
        associatedCourseId: 'course-placement-prep',
        category: 'Career & Placement Prep',
        prerequisites: ['node-prep-star'],
        estimatedWeeks: 2,
        skillsGained: ['STAR Method', 'LinkedIn Optimization', 'Interview Preparation']
      }
    ]
  }
];
