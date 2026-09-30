import { Badge } from '../types/learning';

export const ALL_BADGES: Badge[] = [
  {
    id: 'badge-first-step',
    title: {
      en: 'First Step',
      ta: 'முதல் படி'
    },
    description: {
      en: 'Completed your very first practical bite-sized lesson.',
      ta: 'உங்கள் முதல் செய்முறைப் பாடத்தை வெற்றிகரமாக முடித்தீர்கள்.'
    },
    icon: '🚀',
    category: 'completion'
  },
  {
    id: 'badge-quiz-ace',
    title: {
      en: 'Cognitive Master',
      ta: 'அறிவுக்கூர்மை வெற்றியாளர்'
    },
    description: {
      en: 'Scored 100% on a lesson or daily challenge quiz.',
      ta: 'ஒரு வினாடி வினாவில் 100% மதிப்பெண் பெற்றீர்கள்.'
    },
    icon: '🎯',
    category: 'xp'
  },
  {
    id: 'badge-streak-3',
    title: {
      en: 'Focus Fire (3 Days)',
      ta: 'தொடர் கற்றல் (3 நாட்கள்)'
    },
    description: {
      en: 'Maintained an active 3-day learning streak.',
      ta: 'தொடர்ந்து 3 நாட்கள் கற்றல் பயணத்தை மேற்கொண்டீர்கள்.'
    },
    icon: '🔥',
    category: 'streak'
  },
  {
    id: 'badge-project-builder',
    title: {
      en: 'Proof Builder',
      ta: 'செயல்முறை உருவாக்குநர்'
    },
    description: {
      en: 'Submitted your first real project with checklist proof in Project Hub.',
      ta: 'Project Hub-ல் உங்கள் முதல் திட்டப்பணியை வெற்றிகரமாக சமர்ப்பித்தீர்கள்.'
    },
    icon: '🏆',
    category: 'project'
  },
  {
    id: 'badge-bilingual-learner',
    title: {
      en: 'Dual-Tongue Scholar',
      ta: 'இருமொழி அறிஞர்'
    },
    description: {
      en: 'Explored lessons in both English and Tamil.',
      ta: 'ஆங்கிலம் மற்றும் தமிழ் ஆகிய இரு மொழிகளிலும் பாடங்களை கற்றறிந்தீர்கள்.'
    },
    icon: '🌐',
    category: 'completion'
  }
];
