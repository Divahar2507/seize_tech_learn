import { DailyChallenge } from '../types/learning';

export const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: 'dc-2026-09-21',
    date: '2026-09-21',
    title: {
      en: 'AI Prompt Grounding Challenge',
      ta: 'AI பிராம்ட் நம்பகத்தன்மை சவால்'
    },
    category: 'AI Tools & Prompting',
    topic: 'Prompt Engineering',
    xpReward: 40,
    estimatedMinutes: 3,
    problemStatement: {
      en: 'Which clause best prevents an LLM from hallucinating when summarizing customer reviews?',
      ta: 'வாடிக்கையாளர் விமர்சனங்களை சுருக்கும்போது AI தவறான தகவல்களை கூறாமல் இருக்க எந்த கட்டளை மிகவும் சிறந்தது?'
    },
    type: 'quiz',
    quizQuestion: {
      id: 'qq-dc-1',
      question: {
        en: 'Which prompt instruction provides the strongest defense against AI hallucinations?',
        ta: 'AI தவறான தகவல்களை உருவாக்குவதை தடுக்கும் மிகச் சிறந்த பிராம்ட் கட்டளை எது?'
      },
      options: [
        {
          en: '"Be extremely smart and don\'t make any mistakes."',
          ta: '"மிக புத்திசாலியாக இரு, எந்த தவறும் செய்யாதே."'
        },
        {
          en: '"Base your response solely on facts directly mentioned in the context. If not mentioned, state: \'Not available in context\'."',
          ta: '"கொடுக்கப்பட்ட பத்தியில் உள்ள உண்மைகளின் அடிப்படையில் மட்டுமே பதிலளி. தகவல் இல்லை என்றால் \'தகவல் இல்லை\' என்று நேரடியாகக் கூறிவிடு."'
        },
        {
          en: '"Search Wikipedia to double-check yourself."',
          ta: '"விக்கிபீடியாவில் தேடி சரிபார்த்துக் கொள்."'
        },
        {
          en: '"Write the answer in JSON format."',
          ta: '"JSON வடிவில் பதிலை எழுது."'
        }
      ],
      correctIndex: 1,
      explanation: {
        en: 'Strict grounding to provided context with an explicit escape hatch is the proven industry method to minimize hallucinations.',
        ta: 'கொடுக்கப்பட்ட ஆவண எல்லைக்குள் மட்டுமே பதிலளிக்க கட்டளையிட்டு, தகவல் இல்லை என்றால் அதை ஒப்புக்கொள்ள வைப்பதே சிறந்த முறையாகும்.'
      }
    }
  },
  {
    id: 'dc-2026-09-22',
    date: '2026-09-22',
    title: {
      en: 'CSS Flexbox Centering Drill',
      ta: 'CSS Flexbox சென்டரிங் பயிற்சி'
    },
    category: 'Web Development',
    topic: 'Modern CSS',
    xpReward: 45,
    estimatedMinutes: 4,
    problemStatement: {
      en: 'Center a call-to-action button perfectly inside a 100vh hero container using Flexbox.',
      ta: 'Flexbox பயன்படுத்தி ஒரு பொத்தானை திரையின் நடுவில் சரியாக மையப்படுத்துங்கள்.'
    },
    type: 'quiz',
    quizQuestion: {
      id: 'qq-dc-2',
      question: {
        en: 'To center an element both horizontally and vertically with Flexbox, which properties are applied to the parent container?',
        ta: 'ஒரு பொருளை கிடைமட்டமாகவும் செங்குத்தாகவும் மையப்படுத்த தாய் கொள்கலனில் (Parent) எந்த CSS பண்புகளை சேர்க்க வேண்டும்?'
      },
      options: [
        {
          en: 'text-align: center; vertical-align: middle;',
          ta: 'text-align: center; vertical-align: middle;'
        },
        {
          en: 'display: flex; justify-content: center; align-items: center;',
          ta: 'display: flex; justify-content: center; align-items: center;'
        },
        {
          en: 'margin: auto; float: center;',
          ta: 'margin: auto; float: center;'
        },
        {
          en: 'display: block; position: fixed; top: 50%;',
          ta: 'display: block; position: fixed; top: 50%;'
        }
      ],
      correctIndex: 1,
      explanation: {
        en: 'display: flex with justify-content: center (main axis) and align-items: center (cross axis) centers children in 2D space.',
        ta: 'display: flex உடன் justify-content: center மற்றும் align-items: center சேர்ப்பது சரியான மைய அமைப்பைத் தரும்.'
      }
    }
  },
  {
    id: 'dc-2026-09-23',
    date: '2026-09-23',
    title: {
      en: 'Spoken English Filler Buster',
      ta: 'ஆங்கில தயக்க சொற்களை தவிர்க்கும் பயிற்சி'
    },
    category: 'English & Communication',
    topic: 'Conversational Fluency',
    xpReward: 35,
    estimatedMinutes: 3,
    problemStatement: {
      en: 'What is the most effective replacement for hesitation filler words like "umm" and "you know"?',
      ta: 'பேசும்போது வரும் "Um", "Uh", "You know" போன்ற தயக்க சொற்களை தவிர்ப்பதற்கான சிறந்த உத்தி எது?'
    },
    type: 'quiz',
    quizQuestion: {
      id: 'qq-dc-3',
      question: {
        en: 'What should you do when you need a moment to think of a word in English?',
        ta: 'ஆங்கிலத்தில் பேசும்போது அடுத்த வார்த்தையை யோசிக்க நேரம் தேவைப்பட்டால் என்ன செய்ய வேண்டும்?'
      },
      options: [
        {
          en: 'Keep repeating "like, like, like" so silence doesn\'t happen.',
          ta: 'அமைதியைத் தவிர்க்க "like, like" என்று தொடர்ந்து கூற வேண்டும்.'
        },
        {
          en: 'Take a confident 1-2 second silent pause while breathing gently.',
          ta: 'பயமின்றி 1-2 வினாடிகள் அமைதியாக (Silent Pause) இடைவெளி விட வேண்டும்.'
        },
        {
          en: 'Switch immediately to your mother tongue without warning.',
          ta: 'எச்சரிக்கையின்றி உடனடியாக தாய்மொழிக்கு மாற வேண்டும்.'
        },
        {
          en: 'Apologize profusely: "Sorry my English is very bad."',
          ta: '"மன்னிக்கவும் என் ஆங்கிலம் மோசம்" என்று மன்னிப்பு கேட்க வேண்டும்.'
        }
      ],
      correctIndex: 1,
      explanation: {
        en: 'A quiet, confident 2-second pause sounds thoughtful and professional, while filler words sound nervous.',
        ta: 'நிதானமான 2 வினாடி அமைதியான இடைவெளி (Pause) கேட்பவருக்கு உங்கள் முதிர்ச்சியையும் தன்னம்பிக்கையையும் உணர்த்தும்.'
      }
    }
  }
];
