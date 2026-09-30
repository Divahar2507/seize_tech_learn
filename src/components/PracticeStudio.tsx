import React, { useState, useEffect, useRef } from 'react';
import { 
  Code2, 
  BrainCircuit, 
  Mic, 
  MicOff, 
  Volume2, 
  FileCheck, 
  Play, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Terminal, 
  Copy, 
  Check, 
  Award,
  Layers,
  ArrowRight,
  Trash2,
  Send,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';

type PracticeTool = 'web' | 'ai' | 'speech' | 'resume';

const WEB_TEMPLATES = [
  {
    id: 'flex-cards',
    name: 'Responsive Flexbox Cards',
    html: `<div class="card-container">
  <div class="card">
    <div class="card-tag">AI Skill</div>
    <h3>Prompt Mastery</h3>
    <p>Learn C.T.C.O prompting for daily workflows.</p>
    <button class="btn">Explore</button>
  </div>
  <div class="card">
    <div class="card-tag">Web Dev</div>
    <h3>HTML & Flexbox</h3>
    <p>Modern mobile-first responsive interfaces.</p>
    <button class="btn">Explore</button>
  </div>
</div>`,
    css: `body {
  font-family: system-ui, sans-serif;
  background: #0f172a;
  color: #f8fafc;
  padding: 20px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  margin: 0;
}
.card-container {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}
.card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 20px;
  width: 200px;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3);
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-4px);
  border-color: #8b5cf6;
}
.card-tag {
  color: #38bdf8;
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
}
h3 { margin: 8px 0; font-size: 16px; }
p { font-size: 12px; color: #94a3b8; }
.btn {
  margin-top: 12px;
  background: #8b5cf6;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
}
.btn:hover { background: #7c3aed; }`,
    js: `console.log('🚀 Responsive Flexbox Cards initialized successfully!');
console.log('📦 Rendered ' + document.querySelectorAll('.card').length + ' interactive cards.');

document.querySelectorAll('.btn').forEach((button, index) => {
  button.addEventListener('click', () => {
    const title = button.parentElement.querySelector('h3').textContent;
    console.info(\`[Card Event] Card \${index + 1} ("\${title}") clicked!\`);
  });
});`
  },
  {
    id: 'counter-ui',
    name: 'Interactive State Counter',
    html: `<div class="counter-box">
  <span class="label">Interactive Counter</span>
  <div id="count-display">0</div>
  <div class="actions">
    <button id="dec-btn">-</button>
    <button id="reset-btn">Reset</button>
    <button id="inc-btn">+</button>
  </div>
</div>`,
    css: `body {
  font-family: system-ui, sans-serif;
  background: #090d16;
  color: #fff;
  display: grid;
  place-items: center;
  min-height: 100vh;
  margin: 0;
}
.counter-box {
  background: #121829;
  border: 1px solid #1e293b;
  padding: 24px;
  border-radius: 16px;
  text-align: center;
}
.label { font-size: 12px; text-transform: uppercase; color: #38bdf8; font-weight: bold; }
#count-display { font-size: 48px; font-weight: 900; margin: 12px 0; color: #a78bfa; }
.actions button {
  background: #1e293b;
  color: white;
  border: 1px solid #334155;
  padding: 8px 16px;
  border-radius: 8px;
  margin: 0 4px;
  cursor: pointer;
  font-weight: bold;
}
.actions button:hover { background: #334155; }
#inc-btn { background: #8b5cf6; border-color: #8b5cf6; }`,
    js: `let count = 0;
const display = document.getElementById('count-display');
console.log('⚡ Interactive Counter app ready! Current count:', count);

document.getElementById('inc-btn').onclick = () => { 
  count++; 
  display.textContent = count; 
  console.log('[Counter] Incremented to:', count);
};
document.getElementById('dec-btn').onclick = () => { 
  count--; 
  display.textContent = count; 
  console.log('[Counter] Decremented to:', count);
};
document.getElementById('reset-btn').onclick = () => { 
  count = 0; 
  display.textContent = count; 
  console.warn('[Counter] Counter reset back to 0');
};`
  },
  {
    id: 'api-fetcher',
    name: 'Async API & Live Data Simulator',
    html: `<div class="api-card">
  <h2>Async Tech Radar</h2>
  <p id="status-text">Ready to query live endpoints...</p>
  <button id="fetch-btn" class="btn">Fetch Radar Metrics</button>
  <div id="output-box" class="json-box">No data requested yet</div>
</div>`,
    css: `body {
  font-family: system-ui, sans-serif;
  background: #090e1a;
  color: #f1f5f9;
  display: grid;
  place-items: center;
  min-height: 100vh;
  margin: 0;
  padding: 16px;
}
.api-card {
  background: #111827;
  border: 1px solid #1f2937;
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5);
}
h2 { margin: 0 0 8px; font-size: 18px; color: #38bdf8; }
p { font-size: 12px; color: #94a3b8; margin-bottom: 16px; }
.btn {
  background: linear-gradient(135deg, #06b6d4, #3b82f6);
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
  width: 100%;
}
.json-box {
  margin-top: 14px;
  background: #030712;
  border: 1px solid #374151;
  border-radius: 8px;
  padding: 12px;
  font-family: monospace;
  font-size: 11px;
  color: #a7f3d0;
  white-space: pre-wrap;
  word-break: break-all;
}`,
    js: `console.log('🌐 Async Data Simulator initialized.');
const btn = document.getElementById('fetch-btn');
const status = document.getElementById('status-text');
const output = document.getElementById('output-box');

btn.onclick = () => {
  status.textContent = 'Simulating network request to /api/metrics...';
  console.info('[Network] GET https://api.seizelearn.tech/v1/metrics (pending)');
  
  setTimeout(() => {
    const payload = {
      statusCode: 200,
      activeLearners: 1248,
      trendingSkill: 'Agentic AI Workflows',
      uptime: '99.98%',
      timestamp: new Date().toLocaleTimeString()
    };
    status.textContent = 'Request completed successfully (200 OK)';
    output.textContent = JSON.stringify(payload, null, 2);
    console.log('[Response 200 OK]:', payload);
  }, 450);
};`
  }
];

export const PracticeStudio: React.FC = () => {
  const { language, t, triggerConfetti } = useLearning();
  const [activeTool, setActiveTool] = useState<PracticeTool>('web');

  // 1. Web Dev State
  const [selectedWebTpl, setSelectedWebTpl] = useState(WEB_TEMPLATES[0]);
  const [htmlCode, setHtmlCode] = useState(selectedWebTpl.html);
  const [cssCode, setCssCode] = useState(selectedWebTpl.css);
  const [jsCode, setJsCode] = useState(selectedWebTpl.js);
  const [activeCodeTab, setActiveCodeTab] = useState<'html' | 'css' | 'js'>('html');
  const [iframeSrc, setIframeSrc] = useState('');

  // Live In-Browser Console & REPL State
  interface ConsoleLogItem {
    id: string;
    level: 'log' | 'info' | 'warn' | 'error';
    message: string;
    timestamp: string;
  }
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLogItem[]>([]);
  const [consoleFilter, setConsoleFilter] = useState<'all' | 'log' | 'warn' | 'error'>('all');
  const [consoleInput, setConsoleInput] = useState('');
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const consoleBottomRef = useRef<HTMLDivElement>(null);

  // 2. AI Prompt State
  const [promptText, setPromptText] = useState(
    `You are an expert React mentor. [Context]\nExplain React 19 optimistic updates to a junior developer in 3 short paragraphs. [Task]\nDo not use complex jargon, and use a restaurant ordering analogy. [Constraints]\nProvide output as clean Markdown with a 1-sentence takeaway. [Output]`
  );
  const [promptScore, setPromptScore] = useState<number | null>(null);
  const [promptFeedback, setPromptFeedback] = useState<string[]>([]);
  const [simulatedOutput, setSimulatedOutput] = useState<string>('');
  const [isSimulating, setIsSimulating] = useState(false);

  // 3. Speech Studio State
  const [speechText, setSpeechText] = useState(
    `Currently, I am completing my practical web development certification at SeizeLearn. Over the last three months, I designed responsive interfaces and automated workflows with React and modern APIs. I am excited to apply my skills to build high-scale products.`
  );
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [fillerCount, setFillerCount] = useState<Record<string, number>>({});
  const recognitionRef = useRef<any>(null);

  // 4. Resume Scorer State
  const [bulletText, setBulletText] = useState(
    `Increased seminar hall booking efficiency by 85% by engineering a full-stack reservation portal using React, Firebase, and conflict-detection algorithms.`
  );
  const [resumeScore, setResumeScore] = useState<number | null>(null);
  const [resumeBreakdown, setResumeBreakdown] = useState<{
    hasActionVerb: boolean;
    hasMetric: boolean;
    hasAccomplishment: boolean;
    hasToolOrTech: boolean;
  }>({ hasActionVerb: true, hasMetric: true, hasAccomplishment: true, hasToolOrTech: true });

  // Listen for console logs transmitted from the iframe sandbox
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.source === 'seize-live-console') {
        const item: ConsoleLogItem = {
          id: `log-${Date.now()}-${Math.random()}`,
          level: event.data.level,
          message: event.data.message,
          timestamp: event.data.timestamp || new Date().toLocaleTimeString()
        };
        setConsoleLogs(prev => [...prev.slice(-99), item]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Auto-scroll console when new logs arrive
  useEffect(() => {
    if (consoleBottomRef.current) {
      consoleBottomRef.current.scrollTop = consoleBottomRef.current.scrollHeight;
    }
  }, [consoleLogs]);

  // Execute interactive REPL expressions inside sandbox
  const handleRunRepl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consoleInput.trim()) return;
    const cmd = consoleInput.trim();
    setConsoleInput('');

    setConsoleLogs(prev => [
      ...prev,
      {
        id: `repl-in-${Date.now()}`,
        level: 'info',
        message: `> ${cmd}`,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);

    try {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        const res = (iframeRef.current.contentWindow as any).eval(cmd);
        if (res !== undefined) {
          setConsoleLogs(prev => [
            ...prev,
            {
              id: `repl-out-${Date.now()}`,
              level: 'log',
              message: `< ${typeof res === 'object' ? JSON.stringify(res, null, 2) : String(res)}`,
              timestamp: new Date().toLocaleTimeString()
            }
          ]);
        }
      }
    } catch (err: any) {
      setConsoleLogs(prev => [
        ...prev,
        {
          id: `repl-err-${Date.now()}`,
          level: 'error',
          message: `< Uncaught ${err?.message || String(err)}`,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    }
  };

  // Update Live Web Preview with console interceptor
  useEffect(() => {
    const combined = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            ${cssCode}
          </style>
          <script>
            (function() {
              function serialize(arg) {
                if (arg === null) return 'null';
                if (arg === undefined) return 'undefined';
                if (typeof arg === 'function') return '[Function: ' + (arg.name || 'anonymous') + ']';
                if (arg instanceof Error) return arg.toString() + (arg.stack ? '\\n' + arg.stack : '');
                if (typeof arg === 'object') {
                  try { return JSON.stringify(arg, null, 2); } catch (e) { return String(arg); }
                }
                return String(arg);
              }

              function sendLog(level, args) {
                try {
                  const text = Array.from(args).map(serialize).join(' ');
                  window.parent.postMessage({
                    source: 'seize-live-console',
                    level: level,
                    message: text,
                    timestamp: new Date().toLocaleTimeString()
                  }, '*');
                } catch (err) {}
              }

              const _log = console.log;
              const _info = console.info;
              const _warn = console.warn;
              const _error = console.error;

              console.log = function(...args) { _log.apply(console, args); sendLog('log', args); };
              console.info = function(...args) { _info.apply(console, args); sendLog('info', args); };
              console.warn = function(...args) { _warn.apply(console, args); sendLog('warn', args); };
              console.error = function(...args) { _error.apply(console, args); sendLog('error', args); };

              window.onerror = function(message, source, lineno, colno, error) {
                sendLog('error', [message + (lineno ? ' (line ' + lineno + ')' : '')]);
                return false;
              };
            })();
          </script>
        </head>
        <body>
          ${htmlCode}
          <script>
            try {
              ${jsCode}
            } catch (err) {
              console.error(err);
            }
          </script>
        </body>
      </html>
    `;
    setIframeSrc(combined);
  }, [htmlCode, cssCode, jsCode]);

  // C.T.C.O Prompt Analyzer
  const handleEvaluatePrompt = () => {
    const text = promptText.toLowerCase();
    const hasContext = text.includes('you are') || text.includes('context') || text.includes('role') || text.includes('mentor') || text.includes('engineer');
    const hasTask = text.includes('explain') || text.includes('draft') || text.includes('write') || text.includes('task') || text.includes('create') || text.includes('summarize');
    const hasConstraints = text.includes('do not') || text.includes('avoid') || text.includes('max') || text.includes('limit') || text.includes('constraint') || text.includes('without');
    const hasOutput = text.includes('output') || text.includes('markdown') || text.includes('bullet') || text.includes('table') || text.includes('format') || text.includes('paragraph');

    let score = 0;
    const tips: string[] = [];

    if (hasContext) score += 25; else tips.push('Add Context/Persona: Specify who the AI is acting as (e.g. "You are an expert engineer").');
    if (hasTask) score += 25; else tips.push('Clarify the Task: State the precise action required (e.g. "Draft", "Summarize").');
    if (hasConstraints) score += 25; else tips.push('Add Negative Constraints: What should it avoid? (e.g. "Do not use buzzwords, max 150 words").');
    if (hasOutput) score += 25; else tips.push('Define Output Format: Request specific markdown, table, or structured bullets.');

    setPromptScore(score);
    setPromptFeedback(tips);

    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulatedOutput(
        `### React 19 Optimistic UI Explained\n\nImagine ordering food at a restaurant. An **optimistic update** is like the waiter immediately writing down your order and smiling—they assume the kitchen will succeed without making you wait at the counter for 20 minutes.\n\nIn React 19, \`useOptimistic\` shows the user their new item instantly in the UI before the server responds. If the server request succeeds, the temporary state is made permanent. If it fails, React seamlessly reverts back to the original state.\n\n**Takeaway:** Optimistic updates eliminate perceived network delay by updating the screen before server confirmation.`
      );
      if (score >= 75) triggerConfetti();
    }, 600);
  };

  // Web Speech API Voice Handlers
  const handlePlayTTS = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Speech synthesis is not supported on this browser.');
    }
  };

  const handleToggleSpeechRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is supported on Chrome/Edge browsers. Please test on a supported browser.');
      return;
    }

    if (isRecording) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript + ' ';
        }
        setTranscript(currentTranscript);

        // Analyze hesitation fillers
        const lower = currentTranscript.toLowerCase();
        const fillers = ['um', 'uh', 'like', 'you know', 'actually', 'basically'];
        const counts: Record<string, number> = {};
        fillers.forEach(f => {
          const regex = new RegExp(`\\b${f}\\b`, 'gi');
          const matches = lower.match(regex);
          if (matches) counts[f] = matches.length;
        });
        setFillerCount(counts);
      };

      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);

      recognitionRef.current = recognition;
      recognition.start();
      setIsRecording(true);
    }
  };

  // Resume Bullet Evaluator
  const handleEvaluateResume = () => {
    const text = bulletText.trim();
    const actionVerbs = ['increased', 'reduced', 'engineered', 'built', 'developed', 'spearheaded', 'designed', 'optimized', 'implemented', 'launched', 'automated'];
    const hasActionVerb = actionVerbs.some(v => new RegExp(`\\b${v}\\b`, 'i').test(text));
    const hasMetric = /\b(\d+%|\$\d+|\d+\s*(users|ms|hours|registrations|seconds|leads))\b/i.test(text);
    const hasAccomplishment = text.length > 25;
    const hasToolOrTech = /(react|javascript|python|sql|firebase|html|css|tailwind|api|aws|git)/i.test(text);

    let score = 0;
    if (hasActionVerb) score += 25;
    if (hasMetric) score += 35; // Metric carries highest weight in Google X-Y-Z
    if (hasAccomplishment) score += 20;
    if (hasToolOrTech) score += 20;

    setResumeScore(score);
    setResumeBreakdown({ hasActionVerb, hasMetric, hasAccomplishment, hasToolOrTech });
    if (score >= 80) triggerConfetti();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-300">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Practical Skills Sandbox</span>
          </div>
          <h1 className="mt-2 font-heading text-2xl sm:text-3xl font-black text-white">
            {language === 'ta' ? 'செய்முறைப் பயிற்சி மையம்' : 'Category Practice Studio'}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            {language === 'ta'
              ? 'நிரல் எழுதுதல், AI பிராம்ட் ஆய்வு, பேச்சுப் பயிற்சி மற்றும் ரெஸ்யூம் சோதனைகளுக்கான நேரடி ஆய்வகம்.'
              : 'Interactive execution sandboxes tailored to Web Development, AI Prompting, Spoken English, and Placement Preparation.'}
          </p>
        </div>

        {/* Tool Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-slate-800 bg-slate-900/90 p-1.5">
          <button
            onClick={() => setActiveTool('web')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition ${
              activeTool === 'web' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="h-4 w-4" />
            <span>Web CodeLab</span>
          </button>
          <button
            onClick={() => setActiveTool('ai')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition ${
              activeTool === 'ai' ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BrainCircuit className="h-4 w-4" />
            <span>C.T.C.O Prompt Tester</span>
          </button>
          <button
            onClick={() => setActiveTool('speech')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition ${
              activeTool === 'speech' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mic className="h-4 w-4" />
            <span>Speech Studio</span>
          </button>
          <button
            onClick={() => setActiveTool('resume')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition ${
              activeTool === 'resume' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCheck className="h-4 w-4" />
            <span>ATS Resume Scorer</span>
          </button>
        </div>
      </div>

      {/* 1. WEB CODELAB */}
      {activeTool === 'web' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Template:</span>
              <select
                value={selectedWebTpl.id}
                onChange={e => {
                  const tpl = WEB_TEMPLATES.find(t => t.id === e.target.value) || WEB_TEMPLATES[0];
                  setSelectedWebTpl(tpl);
                  setHtmlCode(tpl.html);
                  setCssCode(tpl.css);
                  setJsCode(tpl.js);
                }}
                className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white outline-none focus:border-cyan-400"
              >
                {WEB_TEMPLATES.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                setHtmlCode(selectedWebTpl.html);
                setCssCode(selectedWebTpl.css);
                setJsCode(selectedWebTpl.js);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Template</span>
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Code Editors */}
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 flex flex-col shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-2">
                <div className="flex gap-2">
                  {(['html', 'css', 'js'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveCodeTab(tab)}
                      className={`rounded-lg px-3 py-1 text-xs font-mono font-bold uppercase transition ${
                        activeCodeTab === tab ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Live Sync Active</span>
              </div>

              <div className="flex-1 p-4">
                {activeCodeTab === 'html' && (
                  <textarea
                    rows={16}
                    value={htmlCode}
                    onChange={e => setHtmlCode(e.target.value)}
                    className="w-full h-full resize-none font-mono text-xs bg-transparent text-emerald-300 outline-none leading-relaxed"
                    spellCheck={false}
                  />
                )}
                {activeCodeTab === 'css' && (
                  <textarea
                    rows={16}
                    value={cssCode}
                    onChange={e => setCssCode(e.target.value)}
                    className="w-full h-full resize-none font-mono text-xs bg-transparent text-cyan-300 outline-none leading-relaxed"
                    spellCheck={false}
                  />
                )}
                {activeCodeTab === 'js' && (
                  <textarea
                    rows={16}
                    value={jsCode}
                    onChange={e => setJsCode(e.target.value)}
                    className="w-full h-full resize-none font-mono text-xs bg-transparent text-amber-300 outline-none leading-relaxed"
                    spellCheck={false}
                  />
                )}
              </div>
            </div>

            {/* Live Sandbox Preview & Interactive Console Panel */}
            <div className="space-y-4">
              {/* Sandbox Preview Window */}
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 flex flex-col shadow-xl">
                <div className="border-b border-slate-800 bg-slate-900 px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono text-slate-400 ml-2">Live Web Sandbox</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Sync
                    </span>
                  </div>
                </div>

                <iframe
                  ref={iframeRef}
                  title="Live Sandbox"
                  srcDoc={iframeSrc}
                  sandbox="allow-scripts allow-modals"
                  className="w-full h-[320px] border-none bg-white rounded-b-none"
                />
              </div>

              {/* In-Browser Live JS Console & Terminal */}
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#090d16] flex flex-col shadow-xl">
                {/* Console Bar Header */}
                <div className="border-b border-slate-800 bg-slate-900/90 px-4 py-2 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400">
                      <Terminal className="h-4 w-4" />
                      <span>Console & REPL</span>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex items-center gap-1 ml-2 text-[10px]">
                      <button
                        onClick={() => setConsoleFilter('all')}
                        className={`rounded px-2 py-0.5 font-mono transition ${
                          consoleFilter === 'all' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        All ({consoleLogs.length})
                      </button>
                      <button
                        onClick={() => setConsoleFilter('log')}
                        className={`rounded px-2 py-0.5 font-mono transition ${
                          consoleFilter === 'log' ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Logs ({consoleLogs.filter(l => l.level === 'log').length})
                      </button>
                      <button
                        onClick={() => setConsoleFilter('warn')}
                        className={`rounded px-2 py-0.5 font-mono transition ${
                          consoleFilter === 'warn' ? 'bg-amber-500/20 text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Warn ({consoleLogs.filter(l => l.level === 'warn').length})
                      </button>
                      <button
                        onClick={() => setConsoleFilter('error')}
                        className={`rounded px-2 py-0.5 font-mono transition ${
                          consoleFilter === 'error' ? 'bg-rose-500/20 text-rose-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Errors ({consoleLogs.filter(l => l.level === 'error').length})
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setConsoleLogs([])}
                      title="Clear Console"
                      className="p-1 rounded-md text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
                      aria-label="Clear Console"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setIsConsoleOpen(!isConsoleOpen)}
                      className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
                      aria-label="Toggle Console View"
                    >
                      {isConsoleOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Console Log Area */}
                {isConsoleOpen && (
                  <>
                    <div 
                      ref={consoleBottomRef}
                      className="h-[180px] overflow-y-auto p-3 font-mono text-xs space-y-1.5 bg-[#070a12]/95 border-b border-slate-800/80 scrollbar-thin scrollbar-thumb-slate-800"
                    >
                      {consoleLogs.length === 0 ? (
                        <div className="text-[11px] text-slate-500 italic py-6 text-center">
                          Console ready. Use <span className="text-cyan-400">console.log(...)</span> or interact with preview elements to see live output.
                        </div>
                      ) : (
                        consoleLogs
                          .filter(log => consoleFilter === 'all' || log.level === consoleFilter)
                          .map(log => {
                            const isError = log.level === 'error';
                            const isWarn = log.level === 'warn';
                            const isInfo = log.level === 'info';

                            return (
                              <div
                                key={log.id}
                                className={`flex items-start gap-2 py-0.5 px-1.5 rounded transition ${
                                  isError 
                                    ? 'bg-rose-950/30 text-rose-300 border-l-2 border-rose-500' 
                                    : isWarn 
                                    ? 'bg-amber-950/20 text-amber-300 border-l-2 border-amber-500' 
                                    : isInfo
                                    ? 'text-cyan-300'
                                    : 'text-slate-200 hover:bg-slate-900/50'
                                }`}
                              >
                                <span className="text-[10px] text-slate-600 select-none shrink-0 pt-0.5">
                                  {log.timestamp}
                                </span>
                                <span className="shrink-0 pt-0.5">
                                  {isError ? (
                                    <AlertCircle className="h-3 w-3 text-rose-400" />
                                  ) : isWarn ? (
                                    <AlertTriangle className="h-3 w-3 text-amber-400" />
                                  ) : isInfo ? (
                                    <Info className="h-3 w-3 text-cyan-400" />
                                  ) : (
                                    <span className="text-emerald-400 text-[10px] font-bold">&gt;</span>
                                  )}
                                </span>
                                <pre className="font-mono text-xs whitespace-pre-wrap break-all flex-1">
                                  {log.message}
                                </pre>
                              </div>
                            );
                          })
                      )}
                    </div>

                    {/* Interactive REPL Prompt Bar */}
                    <form onSubmit={handleRunRepl} className="flex items-center gap-2 bg-slate-950 px-3 py-2">
                      <span className="font-mono text-xs font-bold text-cyan-400 select-none">&gt;</span>
                      <input
                        type="text"
                        value={consoleInput}
                        onChange={e => setConsoleInput(e.target.value)}
                        placeholder="Type JS expression (e.g. 2 + 2, document.title) & press Enter..."
                        className="flex-1 bg-transparent text-xs font-mono text-white placeholder-slate-600 outline-none"
                      />
                      <button
                        type="submit"
                        disabled={!consoleInput.trim()}
                        className="rounded-lg bg-cyan-600/30 text-cyan-300 hover:bg-cyan-600/50 px-2.5 py-1 text-[11px] font-bold transition disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                      >
                        <Send className="h-3 w-3" />
                        <span>Eval</span>
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. C.T.C.O PROMPT EVALUATOR */}
      {activeTool === 'ai' && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-white">
                C.T.C.O Prompt Laboratory
              </h3>
              <span className="text-xs font-mono text-violet-400">Context · Task · Constraints · Output</span>
            </div>

            <textarea
              rows={8}
              value={promptText}
              onChange={e => setPromptText(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 font-mono text-xs text-white outline-none focus:border-violet-500 leading-relaxed"
              placeholder="Write your prompt here using Persona, Task, Limits, and Format..."
            />

            <button
              onClick={handleEvaluatePrompt}
              disabled={isSimulating}
              className="w-full rounded-xl bg-violet-600 py-3 text-xs font-bold text-white hover:bg-violet-500 transition shadow-lg shadow-violet-600/20 disabled:opacity-50"
            >
              {isSimulating ? 'Analyzing & Simulating...' : 'Analyze Prompt & Simulate AI (+XP)'}
            </button>

            {/* Scorecard */}
            {promptScore !== null && (
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-400">Prompt Quality Score:</span>
                  <span className={`font-heading text-xl font-black ${promptScore >= 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {promptScore} / 100
                  </span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${promptScore >= 75 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                    style={{ width: `${promptScore}%` }}
                  />
                </div>

                {promptFeedback.length > 0 ? (
                  <ul className="space-y-1.5 text-xs text-slate-300 pt-2">
                    {promptFeedback.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <AlertCircle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 pt-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Flawless C.T.C.O Structure! Minimal hallucination risk.</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Simulated Model Response */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  Simulated AI Output (Grounded Preview)
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Zero Hallucinations</span>
              </div>

              {simulatedOutput ? (
                <div className="prose prose-invert max-w-none text-xs leading-relaxed text-slate-200">
                  {simulatedOutput.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-xs text-slate-500">
                  Click "Analyze Prompt & Simulate AI" to see how a model responds to your C.T.C.O instructions.
                </div>
              )}
            </div>

            <div className="rounded-xl border border-violet-500/20 bg-violet-950/20 p-3 text-[11px] text-violet-300 mt-4">
              <strong>Tip:</strong> Adding explicit output schemas cuts response latency and formatting bugs in downstream apps.
            </div>
          </div>
        </div>
      )}

      {/* 3. SPEECH & PRONUNCIATION STUDIO */}
      {activeTool === 'speech' && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
            <h3 className="font-heading text-lg font-bold text-white">
              Spoken English & Interview Elevator Pitch
            </h3>

            <p className="text-xs text-slate-300">
              Practice reading this 60-second introduction pitch aloud. Listen to standard pronunciation or record yourself to count hesitation fillers.
            </p>

            <textarea
              rows={6}
              value={speechText}
              onChange={e => setSpeechText(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-xs text-white outline-none focus:border-amber-400 leading-relaxed font-sans"
            />

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handlePlayTTS}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-300 transition"
              >
                <Volume2 className="h-4 w-4" />
                <span>Listen to Pronunciation</span>
              </button>

              <button
                onClick={handleToggleSpeechRecording}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition ${
                  isRecording
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'border border-slate-700 bg-slate-800 text-white hover:bg-slate-700'
                }`}
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                <span>{isRecording ? 'Stop Recording' : 'Record My Voice'}</span>
              </button>
            </div>
          </div>

          {/* Speech Analysis & Hesitation Buster */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-amber-400">
              Hesitation Filler Analysis & Transcript
            </h4>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 min-h-[140px] text-xs text-slate-300 leading-relaxed font-mono">
              {transcript ? transcript : isRecording ? 'Listening... Speak clearly into your microphone.' : 'Press "Record My Voice" and read your pitch aloud to check for hesitation words.'}
            </div>

            {/* Filler Word Counter */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400">Detected Fillers ("Buster Target: 0"):</span>
              <div className="flex flex-wrap gap-2">
                {['um', 'uh', 'like', 'you know'].map(word => {
                  const count = fillerCount[word] || 0;
                  return (
                    <span
                      key={word}
                      className={`rounded-lg px-3 py-1 text-xs font-bold ${
                        count === 0 ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300' : 'bg-rose-950 border border-rose-500/40 text-rose-300'
                      }`}
                    >
                      "{word}": {count}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="text-[11px] text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <strong>Fluency Rule:</strong> Replace "um" with a silent 1.5-second pause. Recruiters perceive pauses as thoughtful confidence, while fillers sound uncertain.
            </div>
          </div>
        </div>
      )}

      {/* 4. ATS RESUME BULLET SCORER */}
      {activeTool === 'resume' && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
            <h3 className="font-heading text-lg font-bold text-white">
              Google X-Y-Z Resume Bullet Optimizer
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Google's standard formula: <em>"Accomplished [X], measured by [Y], by doing [Z]"</em>. Paste any resume bullet point to receive an immediate ATS pass rate.
            </p>

            <textarea
              rows={4}
              value={bulletText}
              onChange={e => setBulletText(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-xs text-white outline-none focus:border-rose-500 leading-relaxed font-sans"
              placeholder="e.g. Reduced query latency by 45% by architecting Redis cache clusters in Node.js..."
            />

            <button
              onClick={handleEvaluateResume}
              className="w-full rounded-xl bg-rose-500 py-3 text-xs font-bold text-white hover:bg-rose-400 transition shadow-lg shadow-rose-500/20"
            >
              Analyze Resume Bullet (+XP)
            </button>
          </div>

          {/* Results Breakdown */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                ATS Screening Score
              </span>
              {resumeScore !== null && (
                <span className={`font-heading text-2xl font-black ${resumeScore >= 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {resumeScore}%
                </span>
              )}
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                <span>Strong Action Verb (Engineered, Reduced, Built)</span>
                {resumeBreakdown.hasActionVerb ? (
                  <span className="font-bold text-emerald-400 flex items-center gap-1"><Check className="h-3.5 w-3.5" /> Present</span>
                ) : (
                  <span className="font-bold text-rose-400 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> Missing</span>
                )}
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                <span>Quantifiable Metric [Y] (%, numbers, ms, users)</span>
                {resumeBreakdown.hasMetric ? (
                  <span className="font-bold text-emerald-400 flex items-center gap-1"><Check className="h-3.5 w-3.5" /> Present</span>
                ) : (
                  <span className="font-bold text-rose-400 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> Missing</span>
                )}
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                <span>Clear Accomplishment [X]</span>
                {resumeBreakdown.hasAccomplishment ? (
                  <span className="font-bold text-emerald-400 flex items-center gap-1"><Check className="h-3.5 w-3.5" /> Present</span>
                ) : (
                  <span className="font-bold text-rose-400 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> Missing</span>
                )}
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                <span>Tools / Technology Specified [Z]</span>
                {resumeBreakdown.hasToolOrTech ? (
                  <span className="font-bold text-emerald-400 flex items-center gap-1"><Check className="h-3.5 w-3.5" /> Present</span>
                ) : (
                  <span className="font-bold text-rose-400 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> Missing</span>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-[11px] text-slate-400 leading-relaxed">
              <strong>ATS Screening Rule:</strong> Recruiters filter candidates by keywords and metrics. Every bullet on your resume should prove direct business or technical impact.
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
