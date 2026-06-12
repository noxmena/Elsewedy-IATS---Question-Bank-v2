import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Eye, EyeOff } from 'lucide-react';
import { isQuestions } from '@/components/data/isQuestions.jsx';
import { cn } from '@/lib/utils';

const TABS = [
  { key: 'shortAnswer',    label: 'Short Answer',     src: 'shortAnswer' },
  { key: 'technicalTerms', label: 'Technical Terms',  src: 'technicalTerms' },
  { key: 'fillBlank',      label: 'Fill in the Blank',src: 'fillBlank' },
  { key: 'compare',        label: 'Compare',          src: 'compare' },
  { key: 'multipleChoice', label: 'Multiple Choice',  src: 'multipleChoice' },
  { key: 'trueFalse',      label: 'True / False',     src: 'trueFalse' },
  { key: 'corrections',    label: 'Corrections',      src: 'corrections' },
  { key: 'sdlcScenarios',  label: 'SDLC Scenarios',   src: 'sdlcScenarios' },
];

function QuestionCard({ q, type, showAll }) {
  const [show, setShow] = useState(false);
  const revealed = showAll || show;

  const getQuestion = () => {
    if (type === 'technicalTerms') return q.description;
    if (type === 'compare') return q.question;
    return q.question;
  };

  const getAnswer = () => {
    if (type === 'trueFalse') return q.answer ? 'True ✓' : 'False ✗';
    if (type === 'multipleChoice') {
      const idx = q.answer.toLowerCase().charCodeAt(0) - 97;
      return `(${q.answer.toUpperCase()}) ${q.choices[idx]}`;
    }
    return q.answer;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-sky-100 text-sky-700 text-xs font-bold flex items-center justify-center">
          {q.number}
        </span>
        <div className="flex-1 min-w-0">
          {type === 'compare' ? (
            <div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium mb-3">{q.question}</p>
              {revealed && (
                <div className="mt-2 overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr>
                        <th className="bg-sky-100 text-sky-800 px-3 py-2 text-left rounded-tl-lg border border-sky-200">{q.leftTitle}</th>
                        <th className="bg-violet-100 text-violet-800 px-3 py-2 text-left rounded-tr-lg border border-violet-200">{q.rightTitle}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {q.points.map((pt, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                          <td className="px-3 py-2 border border-slate-200 text-slate-700">{pt.left}</td>
                          <td className="px-3 py-2 border border-slate-200 text-slate-700">{pt.right}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : type === 'corrections' ? (
            <p className="text-sm text-slate-700 leading-relaxed">
              {q.question.split(q.wrongWord).map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="underline decoration-2 decoration-red-400 text-red-600 font-semibold">{q.wrongWord}</span>
                  )}
                </React.Fragment>
              ))}
            </p>
          ) : type === 'multipleChoice' ? (
            <div>
              <p className="text-sm text-slate-700 leading-relaxed mb-2">{getQuestion()}</p>
              <div className="grid grid-cols-1 gap-1">
                {q.choices.map((choice, idx) => {
                  const letter = String.fromCharCode(97 + idx);
                  const isCorrect = revealed && letter === q.answer.toLowerCase();
                  return (
                    <div key={idx} className={cn("text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-2",
                      isCorrect ? "bg-emerald-100 text-emerald-800 font-semibold" : "bg-slate-50 text-slate-600"
                    )}>
                      <span className="font-medium">{letter.toUpperCase()}.</span> {choice}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-700 leading-relaxed">{getQuestion()}</p>
          )}

          {revealed && type !== 'compare' && (
            <div className="mt-3 p-2.5 bg-emerald-50 rounded-lg border border-emerald-100">
              <p className="text-xs font-semibold text-emerald-600 mb-0.5">Answer:</p>
              <p className="text-sm text-emerald-800">{getAnswer()}</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setShow(s => !s)}
          className="flex-shrink-0 p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400"
        >
          {revealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

export default function ISQuestions() {
  const [activeTab, setActiveTab] = useState('shortAnswer');
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);

  const currentTab = TABS.find(t => t.key === activeTab);
  const rawList = isQuestions[currentTab.src] || [];

  const filtered = rawList.filter(q => {
    const text = (q.question || q.description || '').toLowerCase();
    return !search || text.includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-600 via-cyan-600 to-sky-700" />
        <div className="relative px-6 py-10">
          <div className="max-w-4xl mx-auto">
            <Link to="/ISHome" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to IS Home
            </Link>
            <h1 className="text-3xl font-bold text-white">IS Question Bank</h1>
            <p className="text-white/70 mt-1">Information System — All Questions</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setSearch(''); }}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all border",
                activeTab === tab.key
                  ? "bg-sky-600 text-white border-sky-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-sky-300"
              )}
            >
              {tab.label}
              <span className="ml-1.5 text-xs opacity-70">({(isQuestions[tab.src] || []).length})</span>
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
            />
          </div>
          <button
            onClick={() => setShowAll(s => !s)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all",
              showAll ? "bg-sky-600 text-white border-sky-600" : "bg-white text-slate-600 border-slate-200 hover:border-sky-300"
            )}
          >
            {showAll ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showAll ? 'Hide Answers' : 'Show All'}
          </button>
        </div>

        {/* Questions */}
        <div className="space-y-3">
          {filtered.map((q, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}>
              <QuestionCard q={q} type={activeTab} showAll={showAll} />
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400">No questions found</div>
          )}
        </div>
      </div>
    </div>
  );
}