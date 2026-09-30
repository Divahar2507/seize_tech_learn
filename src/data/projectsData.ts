import { ProjectBrief } from '../types/learning';

export const INITIAL_PROJECTS: ProjectBrief[] = [
  {
    id: 'project-ai-assistant',
    title: {
      en: 'Automated AI Study & Daily Work Assistant',
      ta: 'தானியங்கி AI படிப்பு மற்றும் வேலை உதவியாளர்'
    },
    slug: 'ai-study-work-assistant',
    category: 'AI Tools & Prompting',
    level: 'Beginner',
    durationHours: 3,
    xpReward: 350,
    associatedCourseId: 'course-ai-skills',
    thumbnailGradient: 'from-violet-600 via-indigo-600 to-purple-800',
    tagline: {
      en: 'Turn raw class notes or complex work documents into structured summaries, flashcards, and practice quizzes.',
      ta: 'உங்கள் குறிப்புகளை சுருக்கங்கள், Flashcards மற்றும் வினாக்களாக தானாக மாற்றும் AI கருவி.'
    },
    description: {
      en: 'Build a production-ready prompt template suite that takes any long text and automatically extracts: 1) Executive Summary, 2) 5 Key Flashcards, 3) 3 Practice Questions with explanations, and 4) A Tamil plain-language breakdown.',
      ta: 'எந்தவொரு நீண்ட ஆங்கில ஆவணத்தையும் சுருக்கி, 5 முக்கியமான Flashcards மற்றும் தமிழில் எளிய விளக்கத்தை உருவாக்கும் முழுமையான பிராம்ட் தொகுப்பை உருவாக்குங்கள்.'
    },
    problemStatement: {
      en: 'Students and busy professionals waste dozens of hours manually summarizing documents. Your goal is to build an automated AI prompt pipeline that ingests any article or lecture and outputs a clean, verifiable study kit.',
      ta: 'நீண்ட கட்டுரைகளையும் பாடங்களையும் படித்து குறிப்பெடுக்க அதிக நேரம் விரயமாகிறது. இந்த திட்டப்பணியில், எந்தவொரு பாடத்தையும் எளிதாக சுருக்கி தரும் AI படிப்பு தொகுப்பை நீங்கள் உருவாக்க வேண்டும்.'
    },
    starterTemplateUrl: 'https://github.com/seizelearn/starter-ai-assistant-prompts',
    starterFiles: [
      {
        filename: 'prompt_pipeline.md',
        code: `### AI Study Assistant Prompt Pipeline\n\n#### Step 1: Ingestion & Persona Grounding\n[Define C.T.C.O system prompt here]\n\n#### Step 2: Extraction Rules\n[Define few-shot JSON format here]\n\n#### Step 3: Tamil Translation Hook\n[Add bilingual translation constraints here]`
      }
    ],
    checklist: [
      {
        id: 'chk-ai-1',
        label: {
          en: 'Define the System Persona with strict C.T.C.O constraints',
          ta: 'C.T.C.O விதிகளை கொண்டு AI-க்கு தெளிவான பொறுப்பை (Persona) நிர்ணயிக்கவும்'
        },
        hint: {
          en: 'Include negative constraints to avoid academic jargon and hallucinations.',
          ta: 'தவறான தகவல்களை தவிர்ப்பதற்கான கட்டுப்பாடுகளை சேர்க்கவும்.'
        }
      },
      {
        id: 'chk-ai-2',
        label: {
          en: 'Provide 2 Few-Shot exemplars demonstrating the exact JSON output format',
          ta: 'நாம் விரும்பும் வடிவத்தில் பதில் வர 2 மாதிரி உதாரணங்களை (Few-Shot) சேர்க்கவும்'
        }
      },
      {
        id: 'chk-ai-3',
        label: {
          en: 'Implement an "Escape Hatch" clause to prevent confident hallucinations',
          ta: 'தகவல் இல்லாத போது தெரியாது என்று வெளிப்படையாக ஒப்புக்கொள்ளும் விதியை சேர்க்கவும்'
        }
      },
      {
        id: 'chk-ai-4',
        label: {
          en: 'Test with a real 500-word article and verify output in both English & Tamil',
          ta: 'ஒரு 500 வார்த்தை ஆங்கில கட்டுரையை உள்ளிட்டு ஆங்கிலம் மற்றும் தமிழில் சரியாக வருகிறதா என சோதிக்கவும்'
        }
      }
    ],
    deliverables: [
      {
        en: 'A documented prompt template (Markdown or Google Doc link).',
        ta: 'முழுமையான பிராம்ட் ஆவண இணைப்பு (Markdown அல்லது Google Doc).'
      },
      {
        en: 'Sample execution output showing English summary + Tamil breakdown.',
        ta: 'ஆங்கில சுருக்கம் மற்றும் தமிழ் விளக்கத்தை காட்டும் மாதிரி வெளியீடு.'
      }
    ],
    rubric: [
      {
        en: 'Persona & C.T.C.O structure is clear and unambiguous.',
        ta: 'C.T.C.O அமைப்பு தெளிவாக உள்ளதா.'
      },
      {
        en: 'Negative constraints prevent hallucinations effectively.',
        ta: 'தவறான தகவல்களை தடுக்கும் கட்டுப்பாடுகள் உள்ளதா.'
      },
      {
        en: 'Output format is clean and immediately readable.',
        ta: 'வெளியீட்டு வடிவம் நேர்த்தியாக உள்ளதா.'
      }
    ]
  },
  {
    id: 'project-web-portfolio',
    title: {
      en: 'Personal Responsive Portfolio Website',
      ta: 'தனிநபர் ரெஸ்பான்சிவ் போர்ட்ஃபோலியோ இணையதளம்'
    },
    slug: 'responsive-portfolio-website',
    category: 'Web Development',
    level: 'Beginner',
    durationHours: 6,
    xpReward: 500,
    associatedCourseId: 'course-web-dev',
    thumbnailGradient: 'from-cyan-600 via-blue-600 to-indigo-800',
    tagline: {
      en: 'Build and deploy your live personal website showing your skills, completed projects, and contact links.',
      ta: 'உங்கள் திறன்களையும் திட்டப்பணிகளையும் உலகிற்கு காட்டும் நேரடி இணையதளத்தை உருவாக்கி இணையத்தில் வெளியிடுங்கள்.'
    },
    description: {
      en: 'A complete personal portfolio website built with semantic HTML5, modern CSS Flexbox/Grid, responsive mobile-first layouts, and deployed to a free public URL (Netlify/Vercel/GitHub Pages).',
      ta: 'Semantic HTML5, நவீன CSS மற்றும் மொபைல் திரைக்கு ஏற்ற வடிவில் உங்கள் சொந்த இணையதளத்தை உருவாக்கி இணையத்தில் வெளியிடும் திட்டப்பணி.'
    },
    problemStatement: {
      en: 'Sending a raw resume PDF is not enough in modern tech. Hiring managers want to see live proof that you understand responsive layouts, web accessibility, and clean design. Build a site that proves your ability.',
      ta: 'வெறும் PDF ரெஸ்யூம் மட்டுமே வேலைவாய்ப்புக்கு போதாது. உங்கள் குறியீட்டுத் திறனை நேரடியாக நிரூபிக்கும் வகையில் ஒரு நேரடி இணையதளம் அவசியமாகிறது.'
    },
    starterTemplateUrl: 'https://github.com/seizelearn/starter-portfolio-template',
    starterFiles: [
      {
        filename: 'index.html',
        code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My Portfolio</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <!-- Header & Nav -->\n  <header></header>\n  <!-- Projects Showcase -->\n  <main id="projects"></main>\n</body>\n</html>`
      }
    ],
    checklist: [
      {
        id: 'chk-web-1',
        label: {
          en: 'Use semantic HTML5 tags (<header>, <nav>, <main>, <article>, <footer>)',
          ta: 'முறையான Semantic HTML5 Tag-களை பயன்படுத்தவும்'
        }
      },
      {
        id: 'chk-web-2',
        label: {
          en: 'Build responsive navigation bar and project card grid with Flexbox / CSS Grid',
          ta: 'Flexbox / CSS Grid பயன்படுத்தி மொபைலுக்கும் கணினிக்கும் ஏற்ற வலைப்பின்னலை அமைக்கவும்'
        }
      },
      {
        id: 'chk-web-3',
        label: {
          en: 'Feature at least 2 real projects with screenshots, live demo links, and GitHub links',
          ta: 'குறைந்தது 2 திட்டப்பணிகளை புகைப்படங்கள் மற்றும் நேரடி இணைப்புகளுடன் சேர்க்கவும்'
        }
      },
      {
        id: 'chk-web-4',
        label: {
          en: 'Deploy the website publicly on Vercel, Netlify, or GitHub Pages',
          ta: 'இணையதளத்தை Vercel, Netlify அல்லது GitHub Pages-ல் நேரலையாக வெளியிடவும்'
        }
      }
    ],
    deliverables: [
      {
        en: 'Public live demo URL (e.g. yourname.vercel.app).',
        ta: 'நேரடி இணையதள முகவரி (Live URL).'
      },
      {
        en: 'GitHub repository URL with clean commit history and a README.',
        ta: 'குறியீடு அடங்கிய GitHub இணைய முகவரி.'
      }
    ],
    rubric: [
      {
        en: 'Mobile responsive on both 375px phone screen and desktop browser.',
        ta: 'மொபைல் மற்றும் கணினி இரண்டிலும் தளம் நேர்த்தியாக இயங்குகிறதா.'
      },
      {
        en: 'Semantic HTML markup without unnecessary <div> nesting.',
        ta: 'Semantic Tag-கள் சரியாக கையாளப்பட்டுள்ளனவா.'
      },
      {
        en: 'Clear visual contrast and accessible fonts.',
        ta: 'எழுத்துக்கள் தெளிவாக படிக்க முடிகிறதா.'
      }
    ]
  },
  {
    id: 'project-self-pitch',
    title: {
      en: '60-Second Video Self-Pitch & Audio Dossier',
      ta: '60 வினாடி தொழில்முறை சுய அறிமுக வீடியோ/ஆடியோ'
    },
    slug: '60-second-video-self-pitch',
    category: 'English & Communication',
    level: 'Beginner',
    durationHours: 2,
    xpReward: 300,
    associatedCourseId: 'course-english-comm',
    thumbnailGradient: 'from-amber-600 via-orange-600 to-yellow-700',
    tagline: {
      en: 'Deliver an articulate, memorable 60-second self-introduction that hooks recruiters instantly.',
      ta: 'நேர்காணல் தேர்வாளர்களை கவரும் வகையில் 60 வினாடிகளில் உங்கள் அறிமுகத்தை பதிவு செய்யுங்கள்.'
    },
    description: {
      en: 'Record an engaging, structured 60-second elevator pitch using the P.P.F. (Present, Past, Future) formula. Submit your script transcript and a Google Drive / YouTube unlisted video link.',
      ta: 'P.P.F சூத்திரத்தைப் பயன்படுத்தி 60 வினாடி சுய அறிமுகத்தை எழுதி, அதை வீடியோ அல்லது ஆடியோ வடிவில் பதிவு செய்து சமர்ப்பியுங்கள்.'
    },
    problemStatement: {
      en: 'First impressions are made in the first 30 seconds of an interview. Hesitant speech, filler words ("um", "ah"), and unstructured answers damage confidence. Perfect your pitch before walking into any interview.',
      ta: 'நேர்காணலின் முதல் 30 வினாடிகளே நமது தன்னம்பிக்கையை வெளிப்படுத்துகின்றன. தயக்கத்தை போக்கி தெளிவான ஆங்கிலத்தில் பேசும் பயிற்சியே இந்த திட்டப்பணி.'
    },
    starterTemplateUrl: 'https://docs.google.com/document/d/seizelearn-pitch-template',
    checklist: [
      {
        id: 'chk-eng-1',
        label: {
          en: 'Draft a 100-word pitch script following Present -> Past -> Future',
          ta: 'Present -> Past -> Future வரிசையில் 100 வார்த்தை அறிமுகக் குறிப்பை எழுதவும்'
        }
      },
      {
        id: 'chk-eng-2',
        label: {
          en: 'Perform 3 practice takes in front of a mirror focusing on eye contact and smiling',
          ta: 'கண்ணாடி முன் நின்று புன்னகையுடன் 3 முறை ஒத்திகை பார்க்கவும்'
        }
      },
      {
        id: 'chk-eng-3',
        label: {
          en: 'Record video or clear audio under 60 seconds (zero filler sounds like "um")',
          ta: '60 வினாடிகளுக்குள் "Um", "Uh" போன்ற தயக்கங்கள் இன்றி பதிவு செய்யவும்'
        }
      },
      {
        id: 'chk-eng-4',
        label: {
          en: 'Upload as an Unlisted video on YouTube or shareable Google Drive link',
          ta: 'YouTube Unlisted அல்லது Google Drive இணைப்பாக பதிவேற்றவும்'
        }
      }
    ],
    deliverables: [
      {
        en: 'Written transcript of your 60-second pitch.',
        ta: 'உங்கள் 60 வினாடி அறிமுக உரை.'
      },
      {
        en: 'Shareable video/audio recording link.',
        ta: 'பதிவு செய்யப்பட்ட வீடியோ அல்லது ஆடியோ இணைப்பு.'
      }
    ],
    rubric: [
      {
        en: 'Speech clarity, pacing, and deliberate pauses.',
        ta: 'குரல் தெளிவு மற்றும் நிதானமான வேகம்.'
      },
      {
        en: 'No recitation tone; speaks naturally and authentically.',
        ta: 'மனப்பாடம் செய்த தொனி இன்றி இயல்பாக பேசுதல்.'
      }
    ]
  },
  {
    id: 'project-career-portfolio',
    title: {
      en: 'Placement-Ready Portfolio & STAR Interview Bank',
      ta: 'வேலைவாய்ப்பு போர்ட்ஃபோலியோ & STAR நேர்காணல் வினா வங்கி'
    },
    slug: 'placement-portfolio-star-bank',
    category: 'Career & Placement Prep',
    level: 'Beginner',
    durationHours: 4,
    xpReward: 450,
    associatedCourseId: 'course-placement-prep',
    thumbnailGradient: 'from-rose-600 via-pink-600 to-red-800',
    tagline: {
      en: 'Assemble an ATS-proof resume, optimized LinkedIn profile, and 5 STAR behavioral interview answers.',
      ta: 'ATS முறையில் தேர்வாகும் ரெஸ்யூம், சிறந்த LinkedIn சுயவிவரம் மற்றும் 5 STAR நேர்காணல் பதில்களின் தொகுப்பு.'
    },
    description: {
      en: 'A comprehensive career launch dossier: 1) Single-column ATS resume using the X-Y-Z formula, 2) Headline and About summary for LinkedIn, and 3) 5 written STAR stories ready for tough HR questions.',
      ta: 'வேலைவாய்ப்பிற்கு தேவையான அனைத்து ஆவணங்களின் முழுமையான தொகுப்பு: 1) ATS Resume, 2) LinkedIn சுயவிவரம், 3) 5 STAR நேர்காணல் கதைகள்.'
    },
    problemStatement: {
      en: 'Hundreds of applicants apply for each junior opening. Candidates with polished proof, clean ATS formatting, and prepared behavioral stories stand out immediately.',
      ta: 'ஒவ்வொரு வேலைக்கும் நூற்றுக்கணக்கானோர் விண்ணப்பிக்கும் சூழலில், முறையான ஆவணங்களும் தயாரிப்பும் கொண்டவர்கள் மட்டுமே உடனடியாக தேர்ந்தெடுக்கப்படுகிறார்கள்.'
    },
    checklist: [
      {
        id: 'chk-prep-1',
        label: {
          en: 'Create a single-column ATS resume with at least 3 Google X-Y-Z bullet points',
          ta: 'கூகுளின் X-Y-Z சூத்திரத்தைப் பயன்படுத்தி 3 சாதனைகளுடன் கூடிய Single-Column Resume-ஐ உருவாக்கவும்'
        }
      },
      {
        id: 'chk-prep-2',
        label: {
          en: 'Draft 5 STAR behavioral stories (Situation, Task, Action, Result)',
          ta: 'STAR முறையில் (சூழல், பணி, நடவடிக்கை, முடிவு) 5 நேர்காணல் கதைகளை தயாரிக்கவும்'
        }
      },
      {
        id: 'chk-prep-3',
        label: {
          en: 'Write an attention-grabbing LinkedIn headline and 3-paragraph About section',
          ta: 'கவரும் வகையிலான LinkedIn Headline மற்றும் About குறிப்பை எழுதவும்'
        }
      },
      {
        id: 'chk-prep-4',
        label: {
          en: 'Bundle into a single PDF document or Google Drive portfolio folder',
          ta: 'அனைத்தையும் ஒரே PDF அல்லது Google Drive கோப்பாக இணைக்கவும்'
        }
      }
    ],
    deliverables: [
      {
        en: 'Link to your public ATS Resume PDF.',
        ta: 'உங்கள் ATS Resume PDF இணைப்பு.'
      },
      {
        en: 'Link to your LinkedIn Profile.',
        ta: 'உங்கள் LinkedIn சுயவிவர இணைப்பு.'
      },
      {
        en: 'STAR behavioral answers document.',
        ta: 'STAR நேர்காணல் வினா வங்கி ஆவணம்.'
      }
    ],
    rubric: [
      {
        en: 'X-Y-Z metrics are measurable and concrete (percentages, user counts, times).',
        ta: 'சாதனைகள் எண்களுடன் துல்லியமாக அளவிடப்பட்டுள்ளனவா.'
      },
      {
        en: 'STAR answers emphasize personal actions and lessons learned.',
        ta: 'STAR பதில்களில் உங்கள் பங்களிப்பு தெளிவாக உள்ளதா.'
      }
    ]
  }
];
