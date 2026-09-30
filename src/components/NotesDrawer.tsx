import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Trash2, 
  Download, 
  FileText, 
  Clock,
  Sparkles
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { UserNote } from '../types/learning';

export const NotesDrawer: React.FC = () => {
  const { 
    language, 
    t, 
    openNotesDrawer, 
    setOpenNotesDrawer, 
    activeLesson, 
    activeCourse, 
    userState, 
    saveNote, 
    deleteNote 
  } = useLearning();

  const [currentNoteText, setCurrentNoteText] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Load existing note for this lesson
  useEffect(() => {
    if (activeLesson) {
      const noteId = `note-${activeLesson.id}`;
      const existing = userState.notes[noteId];
      setCurrentNoteText(existing ? existing.content : '');
    }
  }, [activeLesson, userState.notes]);

  if (!openNotesDrawer) return null;

  const handleSave = () => {
    if (!activeLesson || !activeCourse) return;
    saveNote(activeLesson.id, activeCourse.id, t(activeLesson.title), currentNoteText);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const allSavedNotes: UserNote[] = Object.values(userState.notes);

  const handleExportAll = () => {
    if (allSavedNotes.length === 0) return;
    const combined = allSavedNotes
      .map(n => `# ${n.lessonTitle}\n*Saved: ${new Date(n.updatedAt).toLocaleString()}*\n\n${n.content}\n\n---\n`)
      .join('\n');
    const blob = new Blob([combined], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seizelearn-all-notes.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm">
      <div className="flex h-full w-full max-w-md flex-col border-l border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-6 overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-cyan-400" />
            <h3 className="font-heading text-lg font-bold text-white">
              {language === 'ta' ? 'கற்றல் குறிப்பேடு' : 'Study Notes'}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {allSavedNotes.length > 0 && (
              <button
                onClick={handleExportAll}
                className="rounded-lg p-1.5 text-slate-400 hover:text-white"
                title="Export all notes to Markdown"
              >
                <Download className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => setOpenNotesDrawer(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Current Lesson Note Editor */}
        {activeLesson ? (
          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-violet-400">
                {language === 'ta' ? 'நடப்பு பாடம்' : 'Current Lesson'}
              </span>
              <span className="text-[11px] text-slate-500 font-mono truncate max-w-[150px]">
                {t(activeLesson.title)}
              </span>
            </div>

            <textarea
              rows={6}
              value={currentNoteText}
              onChange={e => setCurrentNoteText(e.target.value)}
              placeholder={language === 'ta' ? 'உங்கள் சொந்த குறிப்புகளை இங்கே எழுதுங்கள்...' : 'Jot down key takeaways, code snippets, or interview ideas here...'}
              className="w-full resize-none rounded-xl border border-slate-800 bg-slate-900/90 p-3 text-xs text-white outline-none focus:border-cyan-400 font-mono leading-relaxed"
            />

            <div className="flex items-center justify-between">
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white hover:bg-violet-500 transition"
              >
                <Save className="h-3.5 w-3.5" />
                <span>{savedSuccess ? (language === 'ta' ? 'சேமிக்கப்பட்டது!' : 'Saved!') : (language === 'ta' ? 'சேமிக்க' : 'Save Note')}</span>
              </button>

              {userState.notes[`note-${activeLesson.id}`] && (
                <button
                  onClick={() => {
                    deleteNote(`note-${activeLesson.id}`);
                    setCurrentNoteText('');
                  }}
                  className="rounded-lg p-2 text-rose-400 hover:bg-rose-500/10"
                  title="Delete Note"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ) : null}

        {/* Saved Notes History */}
        <div className="space-y-3 flex-1">
          <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-400">
            {language === 'ta' ? 'சேமிக்கப்பட்ட அனைத்து குறிப்புகள்' : 'Saved Notes Archive'} ({allSavedNotes.length})
          </h4>

          {allSavedNotes.length > 0 ? (
            <div className="space-y-2.5">
              {allSavedNotes.map(n => (
                <div key={n.id} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-xs font-bold text-white truncate max-w-[200px]">
                      {n.lessonTitle}
                    </span>
                    <button
                      onClick={() => deleteNote(n.id)}
                      className="text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-3 font-mono">
                    {n.content}
                  </p>
                  <div className="text-[10px] text-slate-500">
                    {new Date(n.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-800 p-6 text-center text-xs text-slate-500">
              {language === 'ta' ? 'இன்னும் எந்த குறிப்பும் சேமிக்கப்படவில்லை.' : 'No notes saved yet. Write insights from any lesson!'}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
