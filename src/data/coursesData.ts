import { Course } from '../types/learning';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-ai-skills',
    title: {
      en: 'AI Tools & Prompt Engineering',
      ta: 'AI கருவிகள் மற்றும் பிராம்டிங் பயிற்சி'
    },
    slug: 'ai-tools-prompting',
    category: 'AI Tools & Prompting',
    level: 'Beginner',
    estimatedHours: 6,
    xpReward: 650,
    color: 'violet',
    thumbnailGradient: 'from-violet-600 via-indigo-600 to-purple-800',
    iconName: 'BrainCircuit',
    rating: 4.9,
    reviewCount: 428,
    enrolledCount: 3120,
    isFeatured: true,
    capstoneProjectId: 'project-ai-assistant',
    shortDescription: {
      en: 'Use AI safely, write razor-sharp prompts, automate daily study and work, and build AI-powered workflows.',
      ta: 'AI கருவிகளை பாதுகாப்பாகவும் பயனுள்ளதாகவும் பயன்படுத்தி உங்கள் படிப்பு மற்றும் வேலைகளை எளிதாக்குங்கள்.'
    },
    fullDescription: {
      en: 'A practical, zero-fluff guide to mastering modern generative AI tools. Learn system prompting, few-shot examples, fact-checking to eliminate hallucinations, and building personal study and work automations.',
      ta: 'நவீன AI கருவிகளை எளிதாக கற்றுக்கொள்ளுங்கள். முறையான Prompt எழுதுதல், உண்மைத்தன்மையை சரிபார்த்தல் மற்றும் தானியங்கி முறைகளை உருவாக்குங்கள்.'
    },
    instructor: {
      name: 'Karthik Raman & Priya Sundar',
      role: 'Applied AI Engineers & Educators',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: {
        en: 'AI practitioners with 8+ years building enterprise LLM workflows and mentoring over 15,000 students across Tamil Nadu and India.',
        ta: '8 ஆண்டுகளுக்கும் மேலான AI அனுபவம் வாய்ந்த வல்லுநர்கள், 15,000க்கும் மேற்பட்ட மாணவர்களுக்கு வழிகாட்டியவர்கள்.'
      },
      company: 'Seize AI Labs'
    },
    tags: ['ChatGPT', 'Gemini', 'Prompting', 'Automation', 'Productivity'],
    learningOutcomes: [
      {
        en: 'Write structured, high-yield prompts using Persona, Context, Task, and Constraints.',
        ta: 'சரியான முறைப்படி Persona, Context, Task மற்றும் Constraints பயன்படுத்தி Prompt எழுதுங்கள்.'
      },
      {
        en: 'Detect and prevent AI hallucinations using ground-truth verification techniques.',
        ta: 'AI வழங்கும் தவறான தகவல்களை (Hallucinations) கண்டறிந்து திருத்துங்கள்.'
      },
      {
        en: 'Automate repetitive study tasks: summaries, mock interview questions, and revision flashcards.',
        ta: 'படிப்பு குறிப்புகள், மாதிரி நேர்காணல் வினாக்கள் மற்றும் Flashcards-களை தானியங்கியாக்குங்கள்.'
      },
      {
        en: 'Build an automated AI Study & Work Assistant capstone project.',
        ta: 'உங்கள் சொந்த AI படிப்பு மற்றும் வேலை உதவியாளரை உருவாக்குங்கள்.'
      }
    ],
    modules: [
      {
        id: 'mod-ai-1',
        title: {
          en: 'Module 1: The Anatomy of a High-Yield Prompt',
          ta: 'தொகுதி 1: பயனுள்ள பிராம்ட்டின் அடிப்படை வடிவமைப்பு'
        },
        description: {
          en: 'Transform vague questions into precise instructions that get accurate results every time.',
          ta: 'தெளிவற்ற கேள்விகளை துல்லியமான கட்டளைகளாக மாற்றி சிறந்த முடிவுகளைப் பெறுங்கள்.'
        },
        order: 1,
        lessons: [
          {
            id: 'les-ai-101',
            title: {
              en: 'The C.T.C.O Formula for Master Prompts',
              ta: 'C.T.C.O சூத்திரம்: துல்லியமான Prompt எழுதும் முறை'
            },
            slug: 'ctco-prompt-formula',
            durationMinutes: 10,
            xp: 60,
            type: 'interactive_guide',
            summary: {
              en: 'Learn the 4-part formula: Context, Task, Constraints, and Output format to get 10x better answers from AI.',
              ta: 'AI-யிடமிருந்து சிறந்த பதில்களைப் பெற Context, Task, Constraints, Output ஆகிய 4 கூறுகளைப் பயன்படுத்தும் சூத்திரம்.'
            },
            contentMarkdown: {
              en: `### Why Bad Prompts Get Bad Answers

Most people treat AI like a Google search engine: they type 3 words like *"explain recursion"* and get a generic, textbook response that feels overwhelming.

To get executive-quality responses, use the **C.T.C.O Framework**:

\`\`\`text
1. [C] Context: Who are you? What is the background?
2. [T] Task: Exactly what action must the AI perform?
3. [C] Constraints: What should it avoid? Word limits? Tone?
4. [O] Output Format: Bullet points? Table? Code snippet? Bilingual?
\`\`\`

---

#### Compare the Difference:

> ❌ **Weak Prompt**:
> *"Write an email asking for leave."*
>
> Result: Stiff, formal corporate gibberish.

> ✅ **C.T.C.O Prompt**:
> *"You are an experienced software engineer. **[Context]**
> Draft a polite 3-sentence email to my manager requesting 2 days of sick leave due to viral fever. **[Task]**
> Keep the tone calm and professional, don't over-explain symptoms, and mention that critical PR reviews are handed over to Dinesh. **[Constraints]**
> Return as ready-to-copy plain text with a clear subject line. **[Output]**"*

---

#### The Golden Rule of Prompting
Always give the AI an **identity/persona** and a **negative constraint** (what *not* to do). This cuts hallucinations by over 70%.`,
              ta: `### தவறான Prompt ஏன் மோசமான பதில்களைத் தருகிறது?

பெரும்பாலானவர்கள் AI-ஐ கூகுள் தேடுபொறி போல பயன்படுத்துகிறார்கள்: *"explain recursion"* என்று 3 வார்த்தைகளில் தட்டச்சு செய்துவிட்டு, புரியாத புத்தக விளக்கங்களைப் பெற்று ஏமாற்றமடைகிறார்கள்.

சிறந்த பதிலைப் பெற **C.T.C.O சூத்திரத்தை** பயன்படுத்துங்கள்:

\`\`\`text
1. [C] Context (சூழல்): நீங்கள் யார்? உங்கள் நிலை என்ன?
2. [T] Task (செயல்): AI என்ன செய்ய வேண்டும்?
3. [C] Constraints (கட்டுப்பாடுகள்): எதை தவிர்க்க வேண்டும்? எத்தனை வரிகள்?
4. [O] Output (வெளியீட்டு வடிவம்): அட்டவணையா? குறிப்புகளா? தமிழ் விளக்கமா?
\`\`\`

---

#### இந்த வித்தியாசத்தை கவனியுங்கள்:

> ❌ **பலவீனமான Prompt**:
> *"லீவு கேட்டு ஈமெயில் எழுது."*

> ✅ **C.T.C.O Prompt**:
> *"நான் ஒரு மென்பொருள் நிறுவனத்தில் ஜூனியர் டெவலப்பராக பணியாற்றுகிறேன். [Context]
> எனக்கு காய்ச்சல் காரணமாக 2 நாள் விடுப்பு கேட்டு மேலாளருக்கு 3 வரிகளில் சுருக்கமான ஈமெயில் எழுது. [Task]
> தேவையில்லாத மருத்துவ காரணங்களை அடுக்காமல், எனது பணி தினேஷிடம் ஒப்படைக்கப்பட்டுவிட்டது என்று குறிப்பிடு. [Constraints]
> நேரடி தமிழ் மற்றும் ஆங்கிலம் இரண்டிலும் அனுப்பு. [Output]"*

---

#### பொன்னான விதி:
எப்பொழுதும் AI-க்கு ஒரு **பொறுப்பை (Persona)** மற்றும் **எதை செய்யக்கூடாது என்ற கட்டுப்பாட்டை** வழங்கவும். இது தவறான தகவல்களை பெருமளவில் குறைக்கும்.`
            },
            keyTakeaways: [
              {
                en: 'Use C.T.C.O (Context, Task, Constraints, Output) for every non-trivial prompt.',
                ta: 'ஒவ்வொரு முறை AI பயன்படுத்தும் போதும் C.T.C.O முறையை நினைவில் வையுங்கள்.'
              },
              {
                en: 'Negative constraints ("do not include corporate jargon", "max 100 words") refine results instantly.',
                ta: 'எதை தவிர்க்க வேண்டும் என்று கூறுவது பதிலை மேலும் கூர்மையாக்கும்.'
              },
              {
                en: 'Asking for specific output formats (tables, checklists, markdown) saves hours of manual formatting.',
                ta: 'அட்டவணை அல்லது பட்டியல் வடிவில் கேட்கும்போது வேலை மிக விரைவாக முடிகிறது.'
              }
            ],
            practiceTask: {
              title: {
                en: 'Write your first C.T.C.O Prompt',
                ta: 'உங்கள் முதல் C.T.C.O Prompt-ஐ எழுதுங்கள்'
              },
              instructions: {
                en: 'Draft a prompt asking AI to summarize a 5-page research paper for a 10th-grade student in simple English with Tamil analogies.',
                ta: 'ஒரு கடினமான அறிவியல் கட்டுரையை 10ஆம் வகுப்பு மாணவனுக்கு புரியும் எளிய உதாரணங்களுடன் விளக்க ஒரு Prompt-ஐ எழுதுங்கள்.'
              },
              starterPromptOrCode: `Context: ...\nTask: ...\nConstraints: ...\nOutput: ...`,
              solutionOrSample: `Context: You are a friendly science teacher speaking to a 10th-grade student.\nTask: Explain the core concept of this document in 3 short paragraphs.\nConstraints: Avoid academic jargon; use everyday Tamil village/kitchen analogies; max 150 words.\nOutput: Markdown with bold key terms and a 1-sentence takeaway.`
            },
            quizQuestions: [
              {
                id: 'quiz-ai-101-1',
                question: {
                  en: 'What does the "C" in C.T.C.O stand for, and why is it important?',
                  ta: 'C.T.C.O-வில் "C" எதைக் குறிக்கிறது, அது ஏன் முக்கியமானது?'
                },
                options: [
                  {
                    en: 'Command — tells the model to execute immediately.',
                    ta: 'Command — உடனடியாக இயக்க கட்டளையிடுகிறது.'
                  },
                  {
                    en: 'Context & Constraints — grounds the AI on the situation and boundaries.',
                    ta: 'Context & Constraints — AI-க்கு சூழ்நிலையையும் கட்டுப்பாட்டையும் தெளிவுபடுத்துகிறது.'
                  },
                  {
                    en: 'Correction — fixes errors in past prompts.',
                    ta: 'Correction — முந்தைய தவறுகளை சரிசெய்கிறது.'
                  },
                  {
                    en: 'Compilation — builds the code before running.',
                    ta: 'Compilation — இயக்குவதற்கு முன் சரிபார்க்கிறது.'
                  }
                ],
                correctIndex: 1,
                explanation: {
                  en: 'Context grounds the AI in the background scenario, while Constraints establish boundaries and limits.',
                  ta: 'Context சூழ்நிலையை விவரிக்கிறது, Constraints என்ன செய்ய வேண்டும், எதை தவிர்க்க வேண்டும் என்பதை நிர்ணயிக்கிறது.'
                }
              }
            ],
            flashcards: [
              {
                id: 'fc-ai-1',
                front: {
                  en: 'What is a "Negative Constraint" in Prompting?',
                  ta: 'பிராம்டிங்கில் "Negative Constraint" என்றால் என்ன?'
                },
                back: {
                  en: 'An explicit instruction telling the AI what NOT to do (e.g. "Do not use buzzwords", "Do not exceed 100 words").',
                  ta: 'AI எதை செய்யக்கூடாது என்பதை முன்கூட்டியே தெளிவாகக் கூறுவது (எ.கா: "கடினமான ஆங்கில சொற்களை தவிர்க்கவும்").'
                },
                category: 'Prompting'
              }
            ]
          },
          {
            id: 'les-ai-102',
            title: {
              en: 'Few-Shot Prompting: Teaching by Example',
              ta: 'Few-Shot முறை: உதாரணங்கள் காட்டி AI-க்கு கற்றுக்கொடுத்தல்'
            },
            slug: 'few-shot-prompting-examples',
            durationMinutes: 12,
            xp: 75,
            type: 'interactive_guide',
            summary: {
              en: 'Provide 2-3 sample inputs and outputs so the AI replicates your exact style, tone, and formatting effortlessly.',
              ta: '2 அல்லது 3 மாதிரி உதாரணங்களை வழங்குவதன் மூலம் AI நாம் விரும்பும் அதே பாணியில் பதிலளிக்க வைக்கும் உத்தி.'
            },
            contentMarkdown: {
              en: `### The Power of "Few-Shot" Prompting

When you tell an AI: *"Extract skills from this resume"*, you get unpredictable formats.

When you provide **2 sample input/output pairs** (called "Shots"), the AI mirrors your exact thinking pattern with 99% consistency.

\`\`\`text
Input: "Divya has 2 years of building React dashboards and Node.js REST APIs."
Output: Skills: [React, Node.js, REST APIs] | Experience: 2 years

Input: "Rahul managed digital marketing campaigns on Meta and optimized Google Ads CTR."
Output: Skills: [Meta Ads, Google Ads, CTR Optimization] | Experience: Not stated

Input: [Your new candidate text here]
Output:
\`\`\`

#### Why This Works
LLMs predict the most statistically probable completion of a pattern. When you start the pattern, the model effortlessly finishes it.`,
              ta: `### Few-Shot முறையின் நன்மைகள்

நீங்கள் AI-யிடம் *"இந்த ரெஸ்யூமிலிருந்து திறன்களை எடு"* என்று வெறுமனே கூறினால், அது ஒவ்வொரு முறையும் ஒரு விதமான வடிவத்தில் தரும்.

ஆனால் **2 மாதிரி உதாரணங்களை (Exemplars)** நீங்கள் முன்வைத்தால், AI நீங்கள் விரும்பும் அதே துல்லியமான பாணியில் 99% சரியாக பதிலளிக்கும்.

\`\`\`text
மாதிரி 1: "செல்விக்கு 2 வருட React மற்றும் SQL அனுபவம் உள்ளது."
வெளியீடு: திறன்கள்: [React, SQL] | அனுபவம்: 2 ஆண்டுகள்

மாதிரி 2: "குமார் டிஜிட்டல் மார்க்கெட்டிங் மற்றும் SEO பணிகளை செய்துள்ளார்."
வெளியீடு: திறன்கள்: [Digital Marketing, SEO] | அனுபவம்: குறிப்பிடப்படவில்லை

புதிய உள்ளீடு: [உங்கள் புதிய தகவல் இங்கே]
வெளியீடு:
\`\`\`

இது LLM-ன் பேட்டர்ன் கணிப்பு திறனை முழுமையாகப் பயன்படுத்துகிறது.`
            },
            keyTakeaways: [
              {
                en: 'Zero-shot = giving instructions only. Few-shot = giving instructions + 2-3 worked examples.',
                ta: 'Zero-shot = கட்டளை மட்டும். Few-shot = கட்டளையுடன் 2-3 மாதிரி உதாரணங்கள்.'
              },
              {
                en: 'Few-shot is the fastest way to get deterministic JSON, tables, or specialized translations.',
                ta: 'குறிப்பிட்ட அட்டவணை அல்லது மொழிபெயர்ப்பு வடிவத்தைப் பெற Few-shot சிறந்த வழியாகும்.'
              }
            ],
            quizQuestions: [
              {
                id: 'quiz-ai-102-1',
                question: {
                  en: 'What is the main advantage of Few-Shot Prompting over Zero-Shot Prompting?',
                  ta: 'Zero-Shot-ஐ விட Few-Shot முறையின் முக்கிய நன்மை என்ன?'
                },
                options: [
                  {
                    en: 'It reduces the cost to 0 tokens.',
                    ta: 'டோக்கன் கட்டணத்தை பூஜ்ஜியமாக்குகிறது.'
                  },
                  {
                    en: 'It sets a visible pattern for style, structure, and output consistency.',
                    ta: 'வடிவம், நடை மற்றும் சீரான பதிலுக்கான தெளிவான மாதிரியை வழங்குகிறது.'
                  },
                  {
                    en: 'It forces the AI to run offline.',
                    ta: 'AI-ஐ ஆஃப்லைனில் இயக்க கட்டாயப்படுத்துகிறது.'
                  },
                  {
                    en: 'It only works with mathematical calculations.',
                    ta: 'இது கணித கணக்குகளுக்கு மட்டுமே உதவும்.'
                  }
                ],
                correctIndex: 1,
                explanation: {
                  en: 'By providing input-output pairs, the AI learns the exact desired schema and style.',
                  ta: 'மாதிரி உதாரணங்களை வழங்குவதன் மூலம், AI அதே பாணியில் பதில்களை உருவாக்குகிறது.'
                }
              }
            ],
            flashcards: [
              {
                id: 'fc-ai-2',
                front: {
                  en: 'Zero-Shot vs. Few-Shot',
                  ta: 'Zero-Shot vs. Few-Shot வேறுபாடு'
                },
                back: {
                  en: 'Zero-shot gives no examples; Few-shot provides 2-5 illustrative examples to steer output format.',
                  ta: 'Zero-shot உதாரணம் இன்றி கேட்கும் முறை; Few-shot 2 முதல் 5 உதாரணங்களுடன் கேட்கும் முறை.'
                },
                category: 'Prompting'
              }
            ]
          }
        ]
      },
      {
        id: 'mod-ai-2',
        title: {
          en: 'Module 2: AI Safety, Ethics & Spotting Hallucinations',
          ta: 'தொகுதி 2: AI பாதுகாப்பு, நம்பகத்தன்மை மற்றும் பிழைகளை தவிர்த்தல்'
        },
        description: {
          en: 'Verify facts, protect private data, and rely on AI with critical thinking.',
          ta: 'தகவல் உண்மைத்தன்மையை சரிபார்த்து, ரகசிய தரவுகளை பாதுகாப்பாக கையாளும் முறைகள்.'
        },
        order: 2,
        lessons: [
          {
            id: 'les-ai-201',
            title: {
              en: 'Eliminating Hallucinations with Grounding Prompts',
              ta: 'AI தவறான தகவல்களை தருவதை தடுக்கும் Grounding நுட்பங்கள்'
            },
            slug: 'eliminating-ai-hallucinations',
            durationMinutes: 10,
            xp: 65,
            type: 'interactive_guide',
            summary: {
              en: 'Force the AI to quote only from provided text and reply "I do not know based on the provided text" when facts are missing.',
              ta: 'கொடுக்கப்பட்ட ஆவணத்திலிருந்து மட்டுமே பதிலளிக்க கட்டளையிட்டு, தெரியாத போது வெளிப்படையாக ஒப்புக்கொள்ள வைக்கும் முறை.'
            },
            contentMarkdown: {
              en: `### What Causes Hallucinations?

LLMs do not have a database of "truth"; they are predictive language engines. When they lack facts, they fabricate plausible-sounding answers with total confidence.

#### The 2 Inoculation Clauses:
Add these two lines to any study or research prompt:

1. **Strict Grounding:** *"Answer strictly using ONLY the provided text below. Do not infer, extrapolate, or assume facts not explicitly mentioned."*
2. **The Honest Escape Hatch:** *"If the answer is not found in the text, respond: 'This information is not present in the reference material.' Do not guess."*

---

#### Data Privacy Warning:
Never paste passwords, Aadhaar numbers, personal phone numbers, or proprietary company code into public AI models!`,
              ta: `### AI ஏன் தவறான தகவல்களை (Hallucinations) உருவாக்குகிறது?

AI என்பது உண்மை தகவல்களின் அகராதி அல்ல; அது வார்த்தைகளை கணிக்கும் இயந்திரம். உண்மை தெரியாத போது, அது உண்மை போல தோன்றும் பொய்யான தகவல்களை மிக நம்பிக்கையுடன் வழங்கும்.

#### இதை தடுக்கும் 2 முக்கிய வழிகள்:
1. **ஆவண எல்லை நிர்ணயம்:** *"கீழே கொடுக்கப்பட்டுள்ள பத்தியில் இருந்து மட்டுமே பதில் கூற வேண்டும். இல்லாத தகவல்களை ஊகிக்கக் கூடாது."*
2. **வெளிப்படையான ஒப்புதல்:** *"கொடுக்கப்பட்ட பத்தியில் தகவல் இல்லையென்றால், 'இந்த தகவல் குறிப்பில் இல்லை' என்று நேரடியாக கூறிவிடு; தவறாக கணிக்காதே."*

---

#### பாதுகாப்பு எச்சரிக்கை:
ஒருபோதும் உங்கள் கடவுச்சொல், ஆதார் எண், தனிப்பட்ட விவரங்கள் அல்லது நிறுவனத்தின் ரகசியங்களை பொது AI கருவிகளில் உள்ளிடாதீர்கள்!`
            },
            keyTakeaways: [
              {
                en: 'Give AI an explicit "escape hatch" so it admits uncertainty instead of inventing facts.',
                ta: 'தெரியாத போது தெரியாது என்று கூற AI-க்கு முன் அனுமதி கொடுங்கள்.'
              },
              {
                en: 'Never input sensitive, personal, or confidential company data into unverified tools.',
                ta: 'தனிப்பட்ட மற்றும் ரகசிய தகவல்களை AI கருவிகளில் பதிவிடாதீர்கள்.'
              }
            ],
            quizQuestions: [
              {
                id: 'quiz-ai-201-1',
                question: {
                  en: 'Why is adding "If you do not know, say I do not know" effective?',
                  ta: '"தெரியவில்லை என்றால் தெரியாது என்று கூறு" என்ற கட்டளை ஏன் பலனளிக்கிறது?'
                },
                options: [
                  {
                    en: 'It reduces internet bandwidth.',
                    ta: 'இணையப் பயன்பாட்டைக் குறைக்கிறது.'
                  },
                  {
                    en: 'It gives the model permission to admit gaps instead of guessing plausible fabrications.',
                    ta: 'பொய்யான தகவல்களை ஊகிப்பதற்குப் பதிலாக, தகவல் இல்லை என்பதை ஒப்புக்கொள்ள AI-க்கு அனுமதியளிக்கிறது.'
                  },
                  {
                    en: 'It shuts down the model completely.',
                    ta: 'இது AI-ஐ முழுமையாக நிறுத்திவிடும்.'
                  },
                  {
                    en: 'It only works with Tamil language.',
                    ta: 'இது தமிழுக்கு மட்டுமே பொருந்தும்.'
                  }
                ],
                correctIndex: 1,
                explanation: {
                  en: 'Language models tend to please the user by completing thoughts; providing an explicit exit prevents confident false answers.',
                  ta: 'AI எப்படியாவது பதிலை நிறைவு செய்ய முயலும்; இந்த நிபந்தனை அது தவறான பதிலை சொல்வதை தடுக்கிறது.'
                }
              }
            ]
          }
        ]
      },
      {
        id: 'mod-ai-3',
        title: {
          en: 'Module 3: Study & Daily Work Automation',
          ta: 'தொகுதி 3: படிப்பு மற்றும் வேலைகளை AI மூலம் தானியங்கியாக்குதல்'
        },
        description: {
          en: 'Extract study notes, build revision question banks, and draft professional communications effortlessly.',
          ta: 'பாடக் குறிப்புகளை சுருக்குதல், மாதிரி வினா வங்கிகளை உருவாக்குதல் மற்றும் ஆவண தயாரிப்பு.'
        },
        order: 3,
        lessons: [
          {
            id: 'les-ai-301',
            title: {
              en: 'Automated Study Kits: Summaries, Flashcards & Quizzes',
              ta: 'தானியங்கி படிப்புத் தொகுப்பு: சுருக்கங்கள், Flashcards & வினாக்கள்'
            },
            slug: 'automated-study-kits',
            durationMinutes: 12,
            xp: 75,
            type: 'interactive_guide',
            summary: {
              en: 'Convert 10 pages of complex lecture notes into an executive summary, 5 active-recall flashcards, and a 3-question self-test in seconds.',
              ta: '10 பக்க பாடக் குறிப்புகளை சில நொடிகளில் சுருக்கம், 5 நினைவூட்டல் அட்டைகள் மற்றும் வினாடி வினாவாக மாற்றும் முறை.'
            },
            contentMarkdown: {
              en: `### The 3-Stage Study Assistant Pipeline

Instead of asking AI random questions, run this structured 3-stage study pipeline:

1. **Executive Breakdown:** Extract the top 3 core principles.
2. **Active Recall Generation:** Formulate 5 "What / Why / How" flashcards.
3. **Bilingual Synthesis:** Provide a simple Tamil analogy to anchor conceptual understanding.

#### Example Prompt Structure:
Analyze the text below and generate:
- 1. Executive Summary (Max 100 words)
- 2. Three Flashcards (Front / Back format)
- 3. தமிழ் விளக்கம் (Everyday relatable analogy)

This eliminates cognitive overwhelm and prepares you for active recall assessments.`,
              ta: `### 3-படி தானியங்கி படிப்புத் தொகுப்பு முறை

AI-யிடம் தொடர்பற்ற கேள்விகளைக் கேட்பதை விட, இந்த 3-படி முறையைப் பயன்படுத்துங்கள்:

1. **முக்கிய சுருக்கம்:** பாடத்தின் மிக முக்கியமான 3 விதிகளை மட்டும் பிரித்தெடுத்தல்.
2. **நினைவூட்டல் அட்டைகள் (Flashcards):** "What / Why / How" அடிப்படையில் 5 வினா-விடை அட்டைகள்.
3. **எளிய தமிழ் ஒப்புமை:** நமது அன்றாட எளிய உதாரணங்களுடன் கருத்துக்களை விளக்குதல்.

இது படிப்பை சுமையின்றி எளிதாக்கும்.`
            },
            keyTakeaways: [
              {
                en: 'Structured prompt pipelines produce ready-to-study flashcards and quizzes instantly.',
                ta: 'ஒழுங்கமைக்கப்பட்ட பிராம்ட் உடனடியாக படிக்கக்கூடிய வினா-விடை தொகுப்பை வழங்குகிறது.'
              },
              {
                en: 'Bilingual analogical explanations increase memory retention by over 60%.',
                ta: 'தாய்மொழி உதாரணங்களுடன் கூடிய விளக்கம் நினைவாற்றலை 60% அதிகரிக்கும்.'
              }
            ],
            practiceTask: {
              title: {
                en: 'Build a 3-part study pipeline prompt',
                ta: '3-படி படிப்பு பிராம்ட்டை வடிவமைக்கவும்'
              },
              instructions: {
                en: 'Write a prompt asking AI to summarize a science topic with English summary and Tamil analogy.',
                ta: 'ஆங்கில சுருக்கம் மற்றும் தமிழ் விளக்கத்துடன் ஒரு அறிவியல் பாடத்தை சுருக்கும் பிராம்ட்டை எழுதுங்கள்.'
              },
              starterPromptOrCode: 'Task: Summarize ...\\nSection 1: Summary\\nSection 2: Flashcards\\nSection 3: Tamil Analogy',
              solutionOrSample: 'Task: Create a 3-part study kit for Newton Laws of Motion.\\n1. Core principle in 2 sentences.\\n2. Three flashcards for active recall.\\n3. தமிழ் ஒப்புமை: படகு செலுத்துதல் அல்லது பந்து வீச்சு எளிய உதாரணம்.'
            },
            quizQuestions: [
              {
                id: 'quiz-ai-301-1',
                question: {
                  en: 'Why is generating active-recall flashcards better than passive re-reading?',
                  ta: 'வெறும் வாசிப்பை விட Flashcards வினாக்களை உருவாக்குவது ஏன் சிறந்தது?'
                },
                options: [
                  {
                    en: 'Active retrieval forces the brain to rebuild neural memory pathways.',
                    ta: 'நினைவிலிருந்து விடையை மீட்கும்போது மூளையின் நினைவாற்றல் நரம்புப் பாதைகள் பலப்படுகின்றன.'
                  },
                  {
                    en: 'Because computers read flashcards faster.',
                    ta: 'கணினிகள் விரைவாக வாசிக்கும் என்பதால்.'
                  },
                  {
                    en: 'There is no difference.',
                    ta: 'இரண்டிற்கும் எந்த வித்தியாசமும் இல்லை.'
                  }
                ],
                correctIndex: 0,
                explanation: {
                  en: 'Active recall and self-testing strengthen synaptic memory far more than passive re-reading.',
                  ta: 'நினைவு மீட்டல் பயிற்சி (Active Recall) வெறும் வாசிப்பை விட நினைவாற்றலை பன்மடங்கு பலப்படுத்துகிறது.'
                }
              }
            ],
            flashcards: [
              {
                id: 'fc-ai-301',
                front: {
                  en: 'Active Recall vs. Passive Reading',
                  ta: 'Active Recall vs. Passive Reading வேறுபாடு'
                },
                back: {
                  en: 'Active recall retrieves knowledge from memory, creating durable neural pathways.',
                  ta: 'நினைவு மீட்டல் மூளையிலிருந்து தகவல்களை வெளியே கொண்டு வந்து நிரந்தரமாக பதிய வைக்கிறது.'
                },
                category: 'Study Skills'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'course-web-dev',
    title: {
      en: 'Web Development Foundations & React',
      ta: 'இணையதள உருவாக்கம் & ரியாக்ட் அடிப்படைகள்'
    },
    slug: 'web-development-foundations',
    category: 'Web Development',
    level: 'Beginner',
    estimatedHours: 10,
    xpReward: 900,
    color: 'cyan',
    thumbnailGradient: 'from-cyan-600 via-blue-600 to-indigo-800',
    iconName: 'Code2',
    rating: 4.95,
    reviewCount: 680,
    enrolledCount: 4500,
    isFeatured: true,
    capstoneProjectId: 'project-web-portfolio',
    shortDescription: {
      en: 'Learn HTML, modern CSS, JavaScript logic, and React components by building real, deployable portfolio projects.',
      ta: 'HTML, CSS, JavaScript மற்றும் React பயன்படுத்தி உங்கள் சொந்த போர்ட்ஃபோலியோ இணையதளத்தை உருவாக்கி இணையத்தில் வெளியிடுங்கள்.'
    },
    fullDescription: {
      en: 'Step-by-step practical frontend engineering. From understanding how the browser works to building responsive mobile layouts, dynamic DOM interactions, and reusable React components with state.',
      ta: 'பூஜ்ஜியத்திலிருந்து ஒரு முழுமையான இணையதளத்தை உருவாக்கும் விரிவான பயிற்சி. பிரவுசர் எவ்வாறு செயல்படுகிறது என்பதில் தொடங்கி நவீன React செயலி வரை கற்பிக்கிறது.'
    },
    instructor: {
      name: 'Vigneshwaran M & Ananya Sharma',
      role: 'Lead Frontend Architects',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      bio: {
        en: 'Frontend developers passionate about web accessibility, clean architecture, and practical engineering education.',
        ta: 'எளிய வழியில் இணையதள உருவாக்கத்தை கற்பிக்கும் அனுபவமிக்க மென்பொருள் பொறியாளர்கள்.'
      },
      company: 'Seize Tech'
    },
    tags: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Responsive Design'],
    learningOutcomes: [
      {
        en: 'Build semantic, accessible HTML5 layouts with clean hierarchy.',
        ta: 'முறையான HTML5 கட்டமைப்பைக் கொண்டு இணையப் பக்கங்களை உருவாக்குங்கள்.'
      },
      {
        en: 'Master modern CSS Flexbox and Grid for responsive mobile-first screens.',
        ta: 'மொபைல் மற்றும் கணினிகளுக்கு ஏற்ற CSS Flexbox, Grid அமைப்புகளை கற்றுக்கொள்ளுங்கள்.'
      },
      {
        en: 'Write interactive JavaScript for user events, API calls, and calculations.',
        ta: 'பயனர் கிளிக்குகளுக்கு ஏற்ப செயல்படும் JavaScript நிரல்களை எழுதுங்கள்.'
      },
      {
        en: 'Build, style, and deploy a personal portfolio website with React.',
        ta: 'React மூலம் உங்கள் சொந்த போர்ட்ஃபோலியோ இணையதளத்தை உருவாக்கி வெளியிடுங்கள்.'
      }
    ],
    modules: [
      {
        id: 'mod-web-1',
        title: {
          en: 'Module 1: HTML & Semantic Architecture',
          ta: 'தொகுதி 1: HTML மற்றும் முறையான தள வடிவமைப்பு'
        },
        description: {
          en: 'The skeleton of the web: tags, semantic structure, links, and forms.',
          ta: 'இணையத்தின் அடித்தளம்: Tags, Semantic கூறுகள் மற்றும் படிவங்கள்.'
        },
        order: 1,
        lessons: [
          {
            id: 'les-web-101',
            title: {
              en: 'Semantic HTML5: The Building Blocks',
              ta: 'Semantic HTML5: சரியான முறையில் பக்கங்களை உருவாக்குதல்'
            },
            slug: 'semantic-html5-building-blocks',
            durationMinutes: 10,
            xp: 70,
            type: 'interactive_guide',
            summary: {
              en: 'Why <div> soup ruins accessibility and SEO, and how to use <header>, <main>, <article>, and <nav> properly.',
              ta: 'அனைத்திற்கும் <div> பயன்படுத்துவதை தவிர்த்து <header>, <main>, <nav> போன்ற முறையான Semantic Tag-களை பயன்படுத்தும் விதம்.'
            },
            contentMarkdown: {
              en: `### The Skeleton of Every Web Page

Every website you visit—from YouTube to Wikipedia—is fundamentally a tree of HTML tags.

#### Bad Practice: "Div Soup"
\`\`\`html
<!-- ❌ Hard for screen readers, Google SEO, and mobile devices -->
<div class="header">
  <div class="nav-links">...</div>
</div>
<div class="content">
  <div class="article">...</div>
</div>
\`\`\`

#### Good Practice: Semantic HTML5
\`\`\`html
<!-- ✅ Accessible, SEO-friendly, clean -->
<header>
  <nav aria-label="Main Navigation">
    <a href="/">Home</a>
    <a href="/projects">Projects</a>
  </nav>
</header>
<main>
  <article>
    <h1>My Journey into Code</h1>
    <p>Started building practical projects today...</p>
  </article>
</main>
<footer>
  <p>&copy; 2026 SeizeLearn</p>
</footer>
\`\`\`

#### Why Semantic HTML Matters
1. **Screen Readers:** Visually impaired users navigate easily via landmark tags.
2. **Google SEO:** Search engines index \`<article>\` and \`<main>\` with higher relevance.
3. **Maintainability:** Clearer code for team collaboration.`,
              ta: `### இணையப் பக்கங்களின் அடிப்படை எலும்புக்கூடு

நீங்கள் பார்க்கும் அனைத்து இணையதளங்களும் HTML Tag-களால் ஆன மரக்கட்டமைப்பே ஆகும்.

#### தவிர்க்க வேண்டிய முறை: "Div Soup"
\`\`\`html
<!-- ❌ பார்வை மாற்றுத் திறனாளிகளுக்கும் Google SEO-க்கும் புரிவது கடினம் -->
<div class="top">
  <div class="link">முகப்பு</div>
</div>
\`\`\`

#### சிறந்த முறை: Semantic HTML5
\`\`\`html
<!-- ✅ முறையான, எளிதில் புரியும் வடிவம் -->
<header>
  <nav>
    <a href="/">முகப்பு</a>
    <a href="/projects">திட்டப்பணிகள்</a>
  </nav>
</header>
<main>
  <article>
    <h1>எனது முதல் இணையதளம்</h1>
    <p>இன்று எனது முதல் திட்டப்பணியை தொடங்கினேன்...</p>
  </article>
</main>
<footer>
  <p>&copy; 2026 SeizeLearn</p>
</footer>
\`\`\`

#### நன்மைகள்:
1. கூகுள் தேடலில் உங்கள் தளம் முன்னிலை பெறும் (SEO).
2. திரைப் படிப்பான்கள் (Screen Readers) எளிதாக வாசிக்கும்.
3. குறியீடு பார்ப்பதற்கு நேர்த்தியாக இருக்கும்.`
            },
            keyTakeaways: [
              {
                en: 'Use <main> exactly once per page for the core unique content.',
                ta: 'ஒரு பக்கத்தின் முக்கிய உள்ளடக்கத்திற்கு <main> Tag-ஐ ஒரு முறை மட்டுமே பயன்படுத்தவும்.'
              },
              {
                en: '<nav> belongs around primary navigational links, not around random buttons.',
                ta: 'முக்கிய வழிசெலுத்தல் இணைப்புகளுக்கு மட்டுமே <nav> பயன்படுத்த வேண்டும்.'
              }
            ],
            practiceTask: {
              title: {
                en: 'Create a semantic card layout',
                ta: 'ஒரு Semantic அட்டை அமைப்பை உருவாக்குங்கள்'
              },
              instructions: {
                en: 'Write the HTML for a blog post card using <article>, <header>, <h3>, <p>, and <footer>.',
                ta: '<article>, <header>, <h3>, <p>, மற்றும் <footer> பயன்படுத்தி ஒரு வலைப்பதிவு அட்டையை எழுதுங்கள்.'
              },
              starterPromptOrCode: `<article>\n  <!-- Your code here -->\n</article>`,
              solutionOrSample: `<article class="card">\n  <header>\n    <h3>Learning React in 2026</h3>\n    <time datetime="2026-09-20">Sept 20, 2026</time>\n  </header>\n  <p>Practical steps to master components and state.</p>\n  <footer>\n    <a href="/post">Read article &rarr;</a>\n  </footer>\n</article>`
            },
            quizQuestions: [
              {
                id: 'quiz-web-101-1',
                question: {
                  en: 'Which HTML5 element represents the central unique content of a document?',
                  ta: 'ஒரு பக்கத்தின் மிக முக்கியமான தனித்துவமான உள்ளடக்கத்தைக் குறிக்கும் HTML5 Tag எது?'
                },
                options: [
                  { en: '<section>', ta: '<section>' },
                  { en: '<main>', ta: '<main>' },
                  { en: '<header>', ta: '<header>' },
                  { en: '<content>', ta: '<content>' }
                ],
                correctIndex: 1,
                explanation: {
                  en: '<main> specifies the main content of the document and must not be repeated multiple times.',
                  ta: '<main> Tag ஒரு பக்கத்தின் முதன்மை உள்ளடக்கத்தை குறிக்க மட்டுமே பயன்படுத்தப்படுகிறது.'
                }
              }
            ]
          },
          {
            id: 'les-web-102',
            title: {
              en: 'Responsive Layouts with Flexbox',
              ta: 'CSS Flexbox: மொபைலுக்கும் கணினிக்கும் ஏற்ற திரை அமைப்பு'
            },
            slug: 'responsive-layouts-flexbox',
            durationMinutes: 14,
            xp: 85,
            type: 'interactive_guide',
            summary: {
              en: 'Master display: flex, justify-content, align-items, and flex-wrap to make cards flow automatically on any screen.',
              ta: 'Flexbox மூலம் அட்டைகளையும் பொத்தான்களையும் அனைத்து திரை அளவுகளிலும் தானாக வரிசைப்படுத்தும் கலை.'
            },
            contentMarkdown: {
              en: `### Never Struggle with Centering Again!

Centering things in CSS used to be a nightmare. With **Flexbox**, it takes 3 lines:

\`\`\`css
.center-container {
  display: flex;
  justify-content: center; /* Horizontally along main axis */
  align-items: center;     /* Vertically along cross axis */
}
\`\`\`

---

#### The Core Flexbox Properties:

| Property | Purpose | Values |
|---|---|---|
| \`display: flex\` | Activates flex context on the parent | \`flex\`, \`inline-flex\` |
| \`flex-direction\` | Direction of main axis | \`row\`, \`column\` |
| \`justify-content\` | Alignment along main axis | \`space-between\`, \`center\`, \`flex-start\` |
| \`align-items\` | Alignment along cross axis | \`center\`, \`stretch\`, \`flex-start\` |
| \`flex-wrap\` | Should items wrap on small screens? | \`wrap\`, \`nowrap\` |

\`\`\`html
<div style="display: flex; gap: 16px; flex-wrap: wrap;">
  <div class="card">Skill 1</div>
  <div class="card">Skill 2</div>
  <div class="card">Skill 3</div>
</div>
\`\`\``,
              ta: `### CSS-ல் நடுவில் நிலைநிறுத்துவது இனி மிக எளிது!

பழைய CSS முறைகளில் பொருட்களை மையப்படுத்துவது சவாலானது. ஆனால் **Flexbox** மூலம் 3 வரிகளில் செய்துவிடலாம்:

\`\`\`css
.center-box {
  display: flex;
  justify-content: center; /* கிடைமட்டமாக மையப்படுத்துகிறது */
  align-items: center;     /* செங்குத்தாக மையப்படுத்துகிறது */
}
\`\`\`

---

#### முக்கிய Flexbox பண்புகள்:
- **\`display: flex\`**: ஒரு பெட்டியை Flex கொள்கலனாக மாற்றுகிறது.
- **\`justify-content: space-between\`**: பெட்டிகளுக்கு இடையே சமமான இடைவெளியை உருவாக்குகிறது.
- **\`flex-wrap: wrap\`**: மொபைல் திரையில் இடம் போதாத போது தானாக அடுத்த வரிக்கு மாற்றுகிறது.`
            },
            keyTakeaways: [
              {
                en: 'justify-content controls the main axis; align-items controls the cross axis.',
                ta: 'justify-content முதன்மை அச்சை கட்டுப்படுத்துகிறது; align-items குறுக்கு அச்சை கட்டுப்படுத்துகிறது.'
              },
              {
                en: 'Always set flex-wrap: wrap when building responsive card grids.',
                ta: 'அட்டைகள் மொபைலில் சுருங்காமல் இருக்க flex-wrap: wrap சேர்க்கவும்.'
              }
            ],
            quizQuestions: [
              {
                id: 'quiz-web-102-1',
                question: {
                  en: 'Which CSS property allows flex items to wrap onto multiple lines when space runs out?',
                  ta: 'இடம் போதாத போது பொருட்களை அடுத்த வரிக்கு மாற்றும் Flexbox பண்பு எது?'
                },
                options: [
                  { en: 'flex-flow: nowrap', ta: 'flex-flow: nowrap' },
                  { en: 'flex-wrap: wrap', ta: 'flex-wrap: wrap' },
                  { en: 'word-break: break-all', ta: 'word-break: break-all' },
                  { en: 'overflow: auto', ta: 'overflow: auto' }
                ],
                correctIndex: 1,
                explanation: {
                  en: 'flex-wrap: wrap tells the container to allow items to break into new rows instead of overflowing.',
                  ta: 'flex-wrap: wrap கொடுக்கும்போது பொருட்கள் அடுத்த வரிக்கு செல்லும்.'
                }
              }
            ]
          }
        ]
      },
      {
        id: 'mod-web-2',
        title: {
          en: 'Module 2: JavaScript DOM & Interactive Web',
          ta: 'தொகுதி 2: JavaScript DOM மற்றும் பயனர் தொடர்புகள்'
        },
        description: {
          en: 'Transform static HTML/CSS into dynamic, interactive experiences using JavaScript events and state.',
          ta: 'நிலையான பக்கங்களை பயனர் கிளிக்குகளுக்கு ஏற்ப செயல்படும் நவீன வலைப்பக்கங்களாக மாற்றும் பயிற்சி.'
        },
        order: 2,
        lessons: [
          {
            id: 'les-web-201',
            title: {
              en: 'Event Listeners & Dynamic DOM Updates',
              ta: 'Event Listeners: பொத்தான் கிளிக்குகளை கையாளும் முறை'
            },
            slug: 'event-listeners-dom-updates',
            durationMinutes: 12,
            xp: 75,
            type: 'interactive_guide',
            summary: {
              en: 'Learn addEventListener, querySelector, and updating innerText and classList to build responsive user controls.',
              ta: 'addEventListener மற்றும் classList மூலம் பயனர் தொடும் போது மாறும் விளைவுகளை உருவாக்குதல்.'
            },
            contentMarkdown: {
              en: `### Bringing the Web to Life with JavaScript

HTML is the structure, CSS is the style, and **JavaScript is the brain**.

#### The Core 3-Step DOM Workflow:
1. **Find the Element:** Use document.querySelector()
2. **Listen for User Action:** Use addEventListener('click', handler)
3. **Update State or UI:** Modify element.textContent or element.classList.toggle()

\`\`\`javascript
const toggleBtn = document.querySelector('#theme-btn');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
\`\`\`

#### Tamil Tip:
JavaScript மூலம் HTML கூறுகளின் நிறம், உரை மற்றும் தெரிவுநிலையை பயனர் தேவைக்கேற்ப மாற்றலாம்.`,
              ta: `### இணையப் பக்கத்திற்கு உயிர் கொடுக்கும் JavaScript

HTML என்பது எலும்புக்கூடு, CSS என்பது தோற்றம், **JavaScript என்பது மூளை**.

#### 3 முக்கிய படிகள்:
1. **பொருளைத் தேர்ந்தெடுப்பது:** document.querySelector()
2. **பயனர் செயலைக் கவனிப்பது:** addEventListener('click', ...)
3. **திரையை மாற்றுவது:** textContent அல்லது classList.toggle()

\`\`\`javascript
const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {
  alert('வணக்கம்! JavaScript வெற்றிகரமாக இயங்குகிறது.');
});
\`\`\`

இதுவே நவீன இணையதளங்களின் அடிப்படையாகும்.`
            },
            keyTakeaways: [
              {
                en: 'addEventListener separates interactive logic from HTML markup cleanly.',
                ta: 'addEventListener மூலம் குறியீட்டை நேர்த்தியாக பிரிக்க முடியும்.'
              },
              {
                en: 'classList.toggle() is the best way to trigger CSS transitions dynamically.',
                ta: 'classList.toggle() அனிமேஷன்களை இயக்க சிறந்த வழியாகும்.'
              }
            ],
            practiceTask: {
              title: {
                en: 'Write a click counter in JavaScript',
                ta: 'கிளிக் கவுண்டர் நிரல் எழுதுங்கள்'
              },
              instructions: {
                en: 'Write the JavaScript to increment a count variable and update a span element on button click.',
                ta: 'பொத்தானை அழுத்தும் போது எண்ணிக்கையை 1 அதிகரிக்கும் JavaScript நிரலை எழுதுங்கள்.'
              },
              starterPromptOrCode: 'let count = 0;\\nconst btn = document.querySelector("#counter-btn");\\n// Add listener here',
              solutionOrSample: 'let count = 0;\\nconst btn = document.querySelector("#counter-btn");\\nbtn.addEventListener("click", () => {\\n  count++;\\n  document.querySelector("#display").textContent = count;\\n});'
            },
            quizQuestions: [
              {
                id: 'quiz-web-201-1',
                question: {
                  en: 'Which method is the modern standard for listening to user interactions on a DOM element?',
                  ta: 'ஒரு HTML கூறில் பயனர் தொடர்புகளை கவனிக்க நவீன தரநிலையான முறை எது?'
                },
                options: [
                  { en: 'element.addEventListener("click", callback)', ta: 'element.addEventListener("click", callback)' },
                  { en: 'element.attachAction("click")', ta: 'element.attachAction("click")' },
                  { en: 'document.listen("click")', ta: 'document.listen("click")' },
                  { en: 'window.waitForUser()', ta: 'window.waitForUser()' }
                ],
                correctIndex: 0,
                explanation: {
                  en: 'addEventListener is the W3C standard method to bind event handlers to DOM elements.',
                  ta: 'addEventListener என்பது W3C அங்கீகரித்த உலகளாவிய முறை ஆகும்.'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'course-english-comm',
    title: {
      en: 'English & Workplace Communication',
      ta: 'ஆங்கிலம் & பணியிட தகவல் தொடர்பு பயிற்சி'
    },
    slug: 'english-communication-confidence',
    category: 'English & Communication',
    level: 'Beginner',
    estimatedHours: 5,
    xpReward: 550,
    color: 'amber',
    thumbnailGradient: 'from-amber-600 via-orange-600 to-yellow-700',
    iconName: 'WandSparkles',
    rating: 4.88,
    reviewCount: 310,
    enrolledCount: 2900,
    isFeatured: true,
    capstoneProjectId: 'project-self-pitch',
    shortDescription: {
      en: 'Speak with presence, write crisp emails, overcome hesitation, and deliver confident self-introductions in English.',
      ta: 'தயக்கமின்றி சரளமாக ஆங்கிலம் பேச, நேர்த்தியான ஈமெயில் எழுத மற்றும் நேர்காணல்களில் தன்னம்பிக்கையுடன் பதிலளிக்க கற்றுக்கொள்ளுங்கள்.'
    },
    fullDescription: {
      en: 'Designed specifically for learners and fresh graduates who understand English but hesitate when speaking. Master everyday conversational frameworks, pronunciation clarity, email etiquette, and interview presence with Tamil cues.',
      ta: 'ஆங்கிலம் புரிந்தும் பேசத் தயங்கும் மாணவர்களுக்காகவே பிரத்யேகமாக வடிவமைக்கப்பட்டது. தினசரி உரையாடல் மாதிரிகள், தொழில்முறை மின்னஞ்சல் எழுதுதல் மற்றும் நேர்காணல் வினாக்களுக்கு தயக்கமின்றி பதிலளிக்கும் பயிற்சி.'
    },
    instructor: {
      name: 'Radhika Krishnan',
      role: 'Corporate Communications & Soft Skills Coach',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      bio: {
        en: 'Over 10 years coaching college graduates and tech professionals to crack global MNC client interviews and leadership presentations.',
        ta: '10 ஆண்டுகளுக்கும் மேலாக மாணவர்களுக்கும் ஐடி பணியாளர்களுக்கும் ஆங்கிலப் பயிற்சி வழங்கி வருபவர்.'
      },
      company: 'Seize Communications'
    },
    tags: ['Spoken English', 'Interviews', 'Email Writing', 'Confidence', 'Body Language'],
    learningOutcomes: [
      {
        en: 'Deliver an engaging 60-second self-introduction without memorizing a script.',
        ta: 'மனப்பாடம் செய்யாமல் இயல்பாக 60 வினாடி சுய அறிமுகம் (Self-Introduction) செய்ய பழகுங்கள்.'
      },
      {
        en: 'Eliminate hesitation fillers ("ah", "um", "like") using deliberate pacing and pauses.',
        ta: 'பேசும்போது வரும் தேவையற்ற தயக்கங்களை (Um, Uh) தவிர்த்து நிதானமாக பேச கற்றுக்கொள்ளுங்கள்.'
      },
      {
        en: 'Write professional workplace emails with clear subject lines and polite calls to action.',
        ta: 'பணியிடத்தில் தெளிவான, பணிவான மின்னஞ்சல்களை (Professional Emails) பிழையின்றி எழுதுங்கள்.'
      },
      {
        en: 'Complete the 60-Second Video Self-Pitch capstone project.',
        ta: 'உங்கள் தொழில்முறை 60 வினாடி அறிமுக வீடியோ/ஆடியோ திட்டப்பணியை நிறைவு செய்யுங்கள்.'
      }
    ],
    modules: [
      {
        id: 'mod-eng-1',
        title: {
          en: 'Module 1: The Confident Self-Introduction',
          ta: 'தொகுதி 1: தன்னம்பிக்கையான சுய அறிமுகம்'
        },
        description: {
          en: 'How to answer "Tell me about yourself" with structure, energy, and relevance.',
          ta: '"உங்களைப் பற்றி கூறுங்கள்" என்ற கேள்விக்கு நேர்த்தியாக பதிலளிக்கும் கலை.'
        },
        order: 1,
        lessons: [
          {
            id: 'les-eng-101',
            title: {
              en: 'The P.P.F. Formula (Past, Present, Future)',
              ta: 'P.P.F சூத்திரம்: நேர்த்தியான சுய அறிமுகம்'
            },
            slug: 'ppf-formula-self-introduction',
            durationMinutes: 10,
            xp: 60,
            type: 'interactive_guide',
            summary: {
              en: 'Never freeze during "Tell me about yourself". Use Present, Past, Future to highlight your skills and motivation.',
              ta: 'நேர்காணலில் உங்களைப் பற்றி கேட்கும்போது திகைக்காமல், Present, Past, Future மூலம் சுருக்கமாக கூறும் சூத்திரம்.'
            },
            contentMarkdown: {
              en: `### The Most Common Interview Mistake

When interviewers say: *"Tell me about yourself"*, 80% of candidates recite their date of birth, family tree, and school percentages.

The interviewer already has your resume! What they really want to know is:
**"Can you communicate clearly, and why are you excited about this role?"**

---

#### The P.P.F. Framework:

\`\`\`text
1. Present: Where you are right now and your core focus.
2. Past: 1 or 2 relevant projects or experiences that built your skills.
3. Future: Why you are sitting in this interview and what you want to achieve.
\`\`\`

#### Example Template:
> *"Currently, I am completing my degree in Computer Science, focusing on practical web development and modern frontend tools. **[Present]**
> Over the last 6 months, I built a portfolio website and an automated task tool using React and REST APIs, which taught me how to solve real user problems. **[Past]**
> I am excited about this role because your team builds high-scale consumer applications, and I want to contribute to clean UI architecture here." **[Future]**"*

---

#### Tamil Tip (தயக்கத்தை போக்கும் வழி):
மனதில் தமிழில் யோசித்து அதை ஆங்கிலத்தில் வார்த்தைக்கு வார்த்தை மொழிபெயர்க்காதீர்கள்! எளிய ஆங்கில வாக்கியங்களில் சிறிய இடைவெளி (Pause) விட்டுப் பேசுங்கள்.`,
              ta: `### நேர்காணலில் பெரும்பாலானோர் செய்யும் தவறு

நேர்காணல் செய்பவர் *"Tell me about yourself"* என்று கேட்கும்போது, பலர் தங்களின் பிறந்த தேதி, குடும்ப விவரங்கள், பள்ளி மதிப்பெண்களை வரிசையாக கூறுவார்கள்.

அவர்களிடம் ஏற்கனவே உங்கள் Resume இருக்கிறது! அவர்கள் எதிர்பார்ப்பது:
**"உங்களால் தெளிவாக பேச முடிகிறதா? இந்த வேலைக்கு நீங்கள் ஏன் தகுதியானவர்?"**

---

#### P.P.F. சூத்திரம்:
1. **Present (தற்போது):** நீங்கள் தற்போது என்ன செய்கிறீர்கள், உங்கள் ஆர்வம் என்ன.
2. **Past (கடந்த காலம்):** நீங்கள் செய்த 1 அல்லது 2 முக்கிய திட்டப்பணிகள் (Projects).
3. **Future (எதிர்காலம்):** இந்த நிறுவனத்தில் பணியாற்ற நீங்கள் ஏன் விரும்புகிறீர்கள்.

#### மாதிரி பதில்:
> *"Currently, I am a final year student focusing on practical web development and modern AI tools. [Present]
> Recently, I built a responsive web app and an AI prompt workflow that solved real workflow problems for my peers. [Past]
> I am eager to join your team as a junior engineer where I can build reliable user features." [Future]*

---

#### முக்கிய குறிப்பு:
தமிழில் யோசித்து அப்படியே ஆங்கிலத்தில் மாற்ற முயலாதீர்கள். எளிய ஆங்கிலத்தில் 3 முதல் 4 வாக்கியங்களை நிதானமாக கூறுங்கள்.`
            },
            keyTakeaways: [
              {
                en: 'Focus on Present -> Past -> Future rather than personal biographical history.',
                ta: 'குடும்ப வரலாற்றை அடுக்காமல் Present -> Past -> Future வரிசையில் கூறுங்கள்.'
              },
              {
                en: 'Always tie your "Future" back to the value you will create for the team.',
                ta: 'உங்கள் "Future" நிறுவனத்திற்கு நீங்கள் எவ்வாறு உதவுவீர்கள் என்பதில் இணைய வேண்டும்.'
              }
            ],
            quizQuestions: [
              {
                id: 'quiz-eng-101-1',
                question: {
                  en: 'What does the P.P.F. framework stand for in interview introductions?',
                  ta: 'நேர்காணல் அறிமுகத்தில் P.P.F. என்பது எதைக் குறிக்கிறது?'
                },
                options: [
                  { en: 'Personal, Professional, Financial', ta: 'Personal, Professional, Financial' },
                  { en: 'Present, Past, Future', ta: 'Present, Past, Future' },
                  { en: 'Preparation, Practice, Feedback', ta: 'Preparation, Practice, Feedback' },
                  { en: 'Pitch, Problem, Formulation', ta: 'Pitch, Problem, Formulation' }
                ],
                correctIndex: 1,
                explanation: {
                  en: 'Present (current focus), Past (key accomplishments), Future (why this role) creates a compelling pitch.',
                  ta: 'Present (தற்போதைய நிலை), Past (செய்த பணிகள்), Future (எதிர்கால இலக்கு) சிறந்த சுய அறிமுகத்தை தரும்.'
                }
              }
            ]
          }
        ]
      },
      {
        id: 'mod-eng-2',
        title: {
          en: 'Module 2: Workplace Email & Written Polish',
          ta: 'தொகுதி 2: பணியிட மின்னஞ்சல்கள் & எழுத்து நடை'
        },
        description: {
          en: 'Write concise, professional emails that get fast responses without sounding blunt.',
          ta: 'சுருக்கமான, பணிவான மற்றும் பயனுள்ள தொழில்முறை மின்னஞ்சல்களை எழுதும் பயிற்சி.'
        },
        order: 2,
        lessons: [
          {
            id: 'les-eng-201',
            title: {
              en: 'Writing Action-Oriented Professional Emails',
              ta: 'பணியிட மின்னஞ்சல்கள்: தெளிவான பொருள் & பணிவான நடை'
            },
            slug: 'action-oriented-emails',
            durationMinutes: 10,
            xp: 65,
            type: 'interactive_guide',
            summary: {
              en: 'Master the 3-part email structure: Purpose, Details/Context, and explicit Call to Action.',
              ta: 'மின்னஞ்சலின் 3 முக்கிய பகுதிகள்: நோக்கம், விவரம் மற்றும் தெளிவான அடுத்த நடவடிக்கை.'
            },
            contentMarkdown: {
              en: `### How Busy Professionals Read Emails

Senior managers and clients receive 100+ emails every day.
If your email is a giant wall of text with no clear subject line, it gets ignored.

#### The 3-Part Email Structure:
1. **Clear Subject Line:** Action + Project + Deadline (e.g. "[Review Needed] Q3 UI Specs by Friday 5 PM")
2. **The "Bottom Line Up Front" (BLUF):** State your request in sentence #1.
3. **Bulleted Context & Next Steps:** Make it effortless for the reader to say Yes.

#### Avoid Over-Apologizing:
- ❌ Instead of: "Sorry for disturbing you again..."
- ✅ Say: "Thank you for your guidance on this."`,
              ta: `### பணியிட மின்னஞ்சல் எழுதும் முறை

அலுவலகங்களில் அனைவரும் தினமும் நூற்றுக்கணக்கான மின்னஞ்சல்களைப் பெறுகிறார்கள்.
தெளிவற்ற நீண்ட பத்திகளை யாரும் முழுமையாக வாசிப்பதில்லை.

#### 3 முக்கிய கூறுகள்:
1. **தெளிவான Subject Line:** என்ன பணி? எந்த திட்டப்பணி? (எ.கா: "[Approval Required] Leave Request for Sept 25")
2. **முதல் வரியிலேயே நோக்கம்:** நீங்கள் என்ன எதிர்பார்க்கிறீர்கள் என்பதை முதல் வரியிலேயே கூறிவிடுங்கள்.
3. **பணிவான நடை:** தேவையற்ற மன்னிப்புகளுக்குப் பதிலாக நன்றியை முன்னிறுத்துங்கள்.`
            },
            keyTakeaways: [
              {
                en: 'State your core question or request in the very first sentence (BLUF).',
                ta: 'மின்னஞ்சலின் முதல் வரியிலேயே உங்கள் தேவையை நேரடியாகவும் பணிவாகவும் கூறுங்கள்.'
              },
              {
                en: 'Use bullet points for details rather than long dense paragraphs.',
                ta: 'நீண்ட பத்திகளை விட குறிப்புகள் (Bullet points) படிக்க எளிதாக இருக்கும்.'
              }
            ],
            practiceTask: {
              title: {
                en: 'Draft an email requesting a project review',
                ta: 'திட்டப்பணி மறுஆய்வு கேட்டு மின்னஞ்சல் எழுதுங்கள்'
              },
              instructions: {
                en: 'Write a 3-sentence email asking your mentor to review your portfolio website before an interview next Monday.',
                ta: 'உங்கள் வழிகாட்டியிடம் உங்கள் போர்ட்ஃபோலியோவை சரிபார்க்கக் கோரும் 3 வரி மின்னஞ்சலை எழுதுங்கள்.'
              },
              starterPromptOrCode: 'Subject: ...\\nHi [Name],\\n\\n[Sentence 1: Request]\\n[Sentence 2: Link & details]\\n[Sentence 3: Polite closing]',
              solutionOrSample: 'Subject: [Review Request] Portfolio Website Draft for Monday Interview\\nHi Sarah,\\n\\nCould you spare 5 minutes to review my newly deployed portfolio before my interview on Monday?\\nHere is the live preview: https://my-portfolio.vercel.app (focusing on responsive CSS layout).\\nThank you for your time and guidance!'
            },
            quizQuestions: [
              {
                id: 'quiz-eng-201-1',
                question: {
                  en: 'Where should your primary request or decision point appear in a professional email?',
                  ta: 'ஒரு தொழில்முறை மின்னஞ்சலில் உங்கள் முக்கிய கோரிக்கை எங்கு இடம்பெற வேண்டும்?'
                },
                options: [
                  { en: 'In the very first sentence (BLUF - Bottom Line Up Front)', ta: 'முதல் வரியிலேயே (BLUF)' },
                  { en: 'At the very end of a 5-paragraph backstory', ta: 'கடைசி பத்தியில்' },
                  { en: 'Only in the email signature', ta: 'கையொப்பத்தில் மட்டும்' },
                  { en: 'As a hidden attachment', ta: 'இணைப்பில் மட்டும்' }
                ],
                correctIndex: 0,
                explanation: {
                  en: 'Stating the bottom line upfront respects the reader\'s time and gets decisions faster.',
                  ta: 'முதல் வரியிலேயே நோக்கத்தை கூறுவது வாசிப்பவரின் நேரத்தை மிச்சப்படுத்தி விரைவான பதிலை பெற்றுத் தரும்.'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'course-placement-prep',
    title: {
      en: 'Placement & Career Readiness',
      ta: 'வேலைவாய்ப்பு & கேம்பஸ் பிளேஸ்மென்ட் தயாரிப்பு'
    },
    slug: 'placement-career-readiness',
    category: 'Career & Placement Prep',
    level: 'Beginner',
    estimatedHours: 8,
    xpReward: 800,
    color: 'rose',
    thumbnailGradient: 'from-rose-600 via-pink-600 to-red-800',
    iconName: 'BriefcaseBusiness',
    rating: 4.92,
    reviewCount: 540,
    enrolledCount: 3800,
    isFeatured: true,
    capstoneProjectId: 'project-career-portfolio',
    shortDescription: {
      en: 'ATS-proof resumes, aptitude shortcuts, STAR method interview frameworks, and LinkedIn outreach that gets callbacks.',
      ta: 'நேர்த்தியான ரெஸ்யூம் தயாரிப்பு, ஆப்டிடியூட் நுட்பங்கள், STAR நேர்காணல் அணுகுமுறை மற்றும் வேலைவாய்ப்பு பெறுவதற்கான வழிகாட்டுதல்.'
    },
    fullDescription: {
      en: 'Everything freshers and career switchers need to turn effort into job offers. Master ATS resume filtering, ace behavioral HR interviews, master problem-solving aptitude patterns, and build an irresistible LinkedIn profile.',
      ta: 'மாணவர்களும் வேலை தேடுபவர்களும் எளிதில் வேலைவாய்ப்புகளை பெற உதவும் முழுமையான வழிகாட்டி. ATS Resume தயாரிப்பது முதல் HR நேர்காணலில் வெல்வது வரை அனைத்தும்.'
    },
    instructor: {
      name: 'Deepak Selvam & Meera Nair',
      role: 'Talent Acquisition Leads & Career Mentors',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      bio: {
        en: 'Former hiring leads at top tech firms who have reviewed over 20,000 resumes and placed hundreds of candidates.',
        ta: 'முன்னணி நிறுவனங்களின் ஆட்சேர்ப்பு வல்லுநர்கள் மற்றும் மாணவர்களின் வேலைவாய்ப்பு ஆலோசகர்கள்.'
      },
      company: 'Seize Careers'
    },
    tags: ['Resume Building', 'ATS Optimization', 'Aptitude', 'STAR Method', 'LinkedIn'],
    learningOutcomes: [
      {
        en: 'Format your resume with action verbs and quantifiable metrics to bypass ATS screening.',
        ta: 'ATS மென்பொருளில் தேர்வாகும் வகையில் அளவிடக்கூடிய சாதனைகளுடன் Resume தயாரிக்க பழகுங்கள்.'
      },
      {
        en: 'Answer behavioral questions ("Describe a conflict", "Your biggest mistake") using the STAR method.',
        ta: 'நடத்தை சார்ந்த கடினமான கேள்விகளுக்கு STAR முறையைப் பயன்படுத்தி சிறந்த கதைகளை விவரியுங்கள்.'
      },
      {
        en: 'Solve core aptitude shortcuts for percentages, ratios, and time-and-work problems.',
        ta: 'சதவீதம், விகிதம் மற்றும் வேலை-நேரக் கணக்குகளுக்கான எளிய குறுக்குவழிகளை கற்றுக்கொள்ளுங்கள்.'
      },
      {
        en: 'Assemble a complete Placement-Ready Portfolio & Interview Answer Bank.',
        ta: 'உங்கள் முழுமையான வேலைவாய்ப்பு போர்ட்ஃபோலியோ மற்றும் நேர்காணல் வினா வங்கியை உருவாக்குங்கள்.'
      }
    ],
    modules: [
      {
        id: 'mod-prep-1',
        title: {
          en: 'Module 1: Crafting an ATS-Optimized Resume',
          ta: 'தொகுதி 1: ATS தேர்வாகும் தொழில்முறை ரெஸ்யூம்'
        },
        description: {
          en: 'Beat the automated applicant screening bots and impress human hiring managers in 6 seconds.',
          ta: 'தானியங்கி ஸ்கிரீனிங் மென்பொருளை கடந்து தேர்வாளர்களை 6 வினாடிகளில் கவரும் உத்திகள்.'
        },
        order: 1,
        lessons: [
          {
            id: 'les-prep-101',
            title: {
              en: 'The X-Y-Z Resume Bullet Formula',
              ta: 'X-Y-Z சூத்திரம்: சாதனைகளை கவரும் வகையில் எழுதுதல்'
            },
            slug: 'xyz-resume-formula',
            durationMinutes: 10,
            xp: 70,
            type: 'interactive_guide',
            summary: {
              en: 'Google\'s famous formula: "Accomplished [X], as measured by [Y], by doing [Z]" to turn boring job duties into high-impact accomplishments.',
              ta: 'கூகுளின் புகழ்பெற்ற X-Y-Z சூத்திரத்தைப் பயன்படுத்தி சாதாரண வரிகளை சாதனை வரிகளாக மாற்றும் விதம்.'
            },
            contentMarkdown: {
              en: `### Why Most Resumes Get Rejected in 10 Seconds

Recruiters spend an average of **6 to 8 seconds** scanning your resume.
If they see vague job duties like *"Worked on web development"*, they move to the next candidate.

#### Google's X-Y-Z Formula:
> **"Accomplished [X], as measured by [Y], by doing [Z]"**

---

#### Look at the Contrast:

> ❌ **Weak Bullet:**
> *"Made a project for booking college seminar halls."*

> ✅ **X-Y-Z High-Impact Bullet:**
> *"Reduced hall double-booking errors by **85% [Y]** by building a full-stack reservation portal **[X]** using React, Firebase, and automated conflict-checking algorithms **[Z]**."*

---

#### 3 Essential Rules for ATS Success:
1. **Single-Column Layout:** Multi-column tables break ATS parsers.
2. **Standard Headers:** Use "Experience", "Projects", "Education", "Skills" — avoid cute headings like "My Superpowers".
3. **Save as clean PDF:** Ensure text is selectable (not an image or Canva flat export).`,
              ta: `### ரெஸ்யூம்கள் ஏன் 10 வினாடிகளில் நிராகரிக்கப்படுகின்றன?

வேலைவாய்ப்பு தேர்வாளர்கள் ஒரு ரெஸ்யூமைப் பார்க்க சராசரியாக **6 முதல் 8 வினாடிகள்** மட்டுமே எடுத்துக்கொள்கிறார்கள்.
அதில் *"Worked on web development"* போன்ற மேலோட்டமான வரிகள் இருந்தால் உடனடியாக அடுத்த நபருக்கு சென்றுவிடுவார்கள்.

#### கூகுளின் X-Y-Z சூத்திரம்:
> **"சாதனை [X] செய்தேன், அதை இத்தனை சதவீதமாக [Y] அளவிட்டேன், அதற்காக [Z] உத்தியை கையாண்டேன்"**

---

#### இந்த மாற்றத்தை கவனியுங்கள்:

> ❌ **சாதாரண வரி:**
> *"கல்லூரி கருத்தரங்கு அரங்கம் முன்பதிவு செய்யும் இணையதளம் செய்தேன்."*

> ✅ **X-Y-Z வரி:**
> *"அரங்க முன்பதிவு முரண்பாடுகளை **85% குறைத்தேன் [Y]**, React மற்றும் Firebase கொண்டு தானியங்கி முன்பதிவு செயலியை உருவாக்கி **[X]**, ஒரே நேரத்தில் இருவர் புக் செய்வதை தடுக்கும் அல்காரிதம் மூலம் **[Z]**."*

---

#### ATS விதிகளில் முக்கியமானவை:
1. ஒற்றை பத்தி (Single Column) அமைப்பை மட்டுமே பயன்படுத்தவும்.
2. வழக்கமான தலைப்புகளை (Education, Projects, Skills) மட்டுமே பயன்படுத்தவும்.
3. PDF வடிவில் சேமிக்கும்போது அதில் உள்ள உரையை (Text) காப்பி செய்ய முடிவதை உறுதிப்படுத்தவும்.`
            },
            keyTakeaways: [
              {
                en: 'Use the Google X-Y-Z formula: Accomplished [X], measured by [Y], by doing [Z].',
                ta: 'எப்பொழுதும் எண்களுடன் கூடிய சாதனைகளை (Metrics) முன்னிறுத்துங்கள்.'
              },
              {
                en: 'Keep your layout single-column to ensure flawless parsing by ATS systems.',
                ta: 'ஒற்றை பத்தி (Single column) எளிமையான வடிவமைப்பே தேர்வாக சிறந்ததாகும்.'
              }
            ],
            quizQuestions: [
              {
                id: 'quiz-prep-101-1',
                question: {
                  en: 'Which component of the Google X-Y-Z formula provides quantifiable proof of impact?',
                  ta: 'கூகுள் X-Y-Z சூத்திரத்தில் உங்கள் வெற்றியின் அளவை நிரூபிக்கும் கூறு எது?'
                },
                options: [
                  { en: '[X] The accomplishment', ta: '[X] சாதனை' },
                  { en: '[Y] The measured metric/percentage', ta: '[Y] அளவிடப்பட்ட எண் அல்லது சதவீதம்' },
                  { en: '[Z] The method/tools used', ta: '[Z] பயன்படுத்திய கருவிகள்' },
                  { en: 'None of the above', ta: 'மேற்கண்ட எதுவும் இல்லை' }
                ],
                correctIndex: 1,
                explanation: {
                  en: '[Y] represents the quantifiable metric (e.g. "reduced load time by 40%", "served 500 users").',
                  ta: '[Y] என்பது சதவீதங்கள் அல்லது எண்கள் போன்ற அளவிடக்கூடிய ஆதாரத்தை குறிக்கிறது.'
                }
              }
            ]
          }
        ]
      },
      {
        id: 'mod-prep-2',
        title: {
          en: 'Module 2: The S.T.A.R. Behavioral Interview Technique',
          ta: 'தொகுதி 2: STAR நேர்காணல் அணுகுமுறை'
        },
        description: {
          en: 'Turn past experiences into compelling answers for tough HR behavioral questions.',
          ta: 'நடத்தை சார்ந்த கடினமான கேள்விகளுக்கு STAR முறையில் சிறப்பான கதைகளுடன் பதிலளிக்கும் முறை.'
        },
        order: 2,
        lessons: [
          {
            id: 'les-prep-201',
            title: {
              en: 'Structuring Compelling STAR Stories',
              ta: 'STAR கதை வடிவமைப்பு: அனுபவங்களை சாதனைகளாக மாற்றுதல்'
            },
            slug: 'star-interview-stories',
            durationMinutes: 12,
            xp: 75,
            type: 'interactive_guide',
            summary: {
              en: 'Situation, Task, Action, Result — the global standard for answering behavioral questions like "Tell me about a conflict" or "Describe a failure".',
              ta: 'சூழல், பணி, நடவடிக்கை, முடிவு — கடினமான HR கேள்விகளுக்கு தன்னம்பிக்கையுடன் பதிலளிக்கும் உலகளாவிய அணுகுமுறை.'
            },
            contentMarkdown: {
              en: `### Why Behavioral Questions Trip Up Candidates

Interviewers ask questions like:
*"Tell me about a time you faced a tight deadline"* or *"Describe a conflict with a teammate"*.

Unprepared candidates ramble for 5 minutes without reaching a point.
Top candidates use the **S.T.A.R. Formula**:

1. **[S] Situation (20%):** Set the context and challenge briefly.
2. **[T] Task (10%):** What was your specific responsibility?
3. **[A] Action (50%):** What deliberate steps did YOU take? (Use "I", not just "we").
4. **[R] Result (20%):** What was the positive measurable outcome or key lesson?

#### Golden Rule:
Spend half your time on the **Action** step. Interviewers want to see your decision-making and resilience under pressure.`,
              ta: `### நடத்தை சார்ந்த நேர்காணல் வினாக்களில் வெல்வது எப்படி?

நேர்காணலில் அடிக்கடி கேட்கப்படும் கேள்விகள்:
*"குறுகிய கால அவகாசத்தில் ஒரு பணியை எப்படி முடித்தீர்கள்?"* அல்லது *"குழுவில் கருத்து வேறுபாடு ஏற்பட்டபோது என்ன செய்தீர்கள்?"*

இதற்கு **S.T.A.R சூத்திரத்தை** பயன்படுத்தவும்:

1. **[S] Situation (சூழல் - 20%):** நீங்கள் எதிர்கொண்ட சூழ்நிலையை சுருக்கமாக விளக்குங்கள்.
2. **[T] Task (பணி - 10%):** அந்த சூழலில் உங்கள் நேரடி பொறுப்பு என்ன?
3. **[A] Action (நடவடிக்கை - 50%):** சிக்கலை தீர்க்க நீங்கள் என்ன நடவடிக்கை எடுத்தீர்கள்?
4. **[R] Result (முடிவு - 20%):** இதன் விளைவாக என்ன நேர்மறையான மாற்றம் ஏற்பட்டது?

#### பொன்னான விதி:
உங்கள் பதிலின் பெரும்பகுதி நீங்கள் எடுத்த **நடவடிக்கை (Action)** மீதே இருக்க வேண்டும்.`
            },
            keyTakeaways: [
              {
                en: 'Focus 50% of your answer on personal Actions taken rather than general team activities.',
                ta: 'பொதுவான குழு செயல்களை விட நீங்கள் எடுத்த தனிப்பட்ட நடவடிக்கைகளுக்கு முக்கியத்துவம் கொடுங்கள்.'
              },
              {
                en: 'Always conclude with quantifiable Results or a clear positive lesson learned.',
                ta: 'முடிவை எப்பொழுதும் அளவிடக்கூடிய சாதனையுடன் அல்லது கற்றுக்கொண்ட பாடத்துடன் நிறைவு செய்யுங்கள்.'
              }
            ],
            practiceTask: {
              title: {
                en: 'Draft a STAR response for a past deadline challenge',
                ta: 'STAR முறையில் ஒரு நேர்காணல் பதிலை எழுதுங்கள்'
              },
              instructions: {
                en: 'Outline a 4-bullet STAR response describing a college project or work task completed under tight deadline pressure.',
                ta: 'குறுகிய கால அவகாசத்தில் முடித்த ஒரு திட்டப்பணியைப் பற்றி STAR முறையில் 4 குறிப்புகளை எழுதுங்கள்.'
              },
              starterPromptOrCode: 'Situation: ...\\nTask: ...\\nAction: ...\\nResult: ...',
              solutionOrSample: 'Situation: Our college symposium registration site crashed 48 hours before the event.\\nTask: As the lead coder, I needed to restore database connections and handle 800 pending registrations.\\nAction: I implemented Supabase connection pooling, indexed the primary key queries, and added rate limits within 4 hours.\\nResult: Zero downtime for the remainder of the event, handling 1,200 registrations smoothly.'
            },
            quizQuestions: [
              {
                id: 'quiz-prep-201-1',
                question: {
                  en: 'Which part of the S.T.A.R. framework should take up the largest portion (~50%) of your answer?',
                  ta: 'STAR அணுகுமுறையில் உங்கள் பதிலின் பெரும்பகுதியை (~50%) ஆக்கிரமிக்க வேண்டிய கூறு எது?'
                },
                options: [
                  { en: 'Situation (Setting the backstory)', ta: 'Situation (சூழலை விவரிப்பது)' },
                  { en: 'Action (Your specific personal contributions & decisions)', ta: 'Action (நீங்கள் எடுத்த நேரடி நடவடிக்கைகள்)' },
                  { en: 'Task (Your job title)', ta: 'Task (உங்கள் பதவி)' },
                  { en: 'None of the above', ta: 'மேற்கண்ட எதுவும் இல்லை' }
                ],
                correctIndex: 1,
                explanation: {
                  en: 'Interviewers evaluate your personal capabilities through the deliberate Actions you chose to take.',
                  ta: 'நீங்கள் எடுத்த தனிப்பட்ட நடவடிக்கைகளின் மூலமே உங்கள் திறமையை தேர்வாளர் கணிக்கிறார்.'
                }
              }
            ]
          }
        ]
      }
    ]
  }
];
