import React, { useState, useMemo } from 'react';
import { IS_ALL_TYPES, countISByTypes } from './isQuizUtils';
import { ArrowLeft, Hash, Brain, CheckSquare, Play, ListChecks } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Link } from 'react-router-dom';

export default function ISQuizSetup({ onStart }) {
  const [questionCount, setQuestionCount] = useState(10);
  const [correctionMode, setCorrectionMode] = useState('static');
  const [selectedTypes, setSelectedTypes] = useState(IS_ALL_TYPES.map(t => t.key));

  const maxCount = useMemo(() => countISByTypes(selectedTypes), [selectedTypes]);
  const clampedCount = Math.min(questionCount, Math.max(maxCount, 1));

  const toggleType = (key) => {
    setSelectedTypes(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };
  const allSelected = selectedTypes.length === IS_ALL_TYPES.length;

  const handleStart = () => {
    if (selectedTypes.length === 0) return;
    onStart({ questionCount: clampedCount, correctionMode, selectedTypes });
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <Link to="/ISHome" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to IS Home
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">IS Quiz Setup</h1>
        <p className="text-slate-500">Configure your quiz from the Information System Question Bank</p>
      </div>

      {/* Question Types */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-2">
            <ListChecks className="w-4 h-4" /> Question Types
          </h2>
          <button
            onClick={() => setSelectedTypes(allSelected ? [] : IS_ALL_TYPES.map(t => t.key))}
            className="text-xs font-medium text-sky-600 hover:text-sky-800 transition-colors"
          >
            {allSelected ? 'Deselect All' : 'Select All'}
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {IS_ALL_TYPES.map(({ key, label }) => {
            const isOn = selectedTypes.includes(key);
            return (
              <button
                key={key}
                onClick={() => toggleType(key)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border-2 text-sm font-medium transition-all text-left ${
                  isOn ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                }`}
              >
                <span className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center ${
                  isOn ? 'border-sky-500 bg-sky-500' : 'border-slate-300'
                }`}>
                  {isOn && <span className="text-white text-[10px] font-bold">✓</span>}
                </span>
                {label}
              </button>
            );
          })}
        </div>
        {selectedTypes.length === 0 && (
          <p className="text-xs text-red-500 mt-2">Please select at least one question type.</p>
        )}
      </div>

      {/* Question Count */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-2">
            <Hash className="w-4 h-4" /> Number of Questions
          </h2>
          <span className="text-2xl font-bold text-sky-600">{clampedCount}</span>
        </div>
        <div className="flex gap-2 flex-wrap mb-4">
          {[5, 10, 15, 20, 30, maxCount].map((n, i) => (
            <button
              key={i}
              onClick={() => setQuestionCount(n)}
              className={`h-9 px-3 rounded-lg border-2 text-sm font-bold transition-all ${
                clampedCount === n
                  ? 'border-sky-500 bg-sky-500 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              {n === maxCount ? `All (${maxCount})` : n}
            </button>
          ))}
        </div>
        <Slider
          min={1}
          max={maxCount || 1}
          step={1}
          value={[clampedCount]}
          onValueChange={([val]) => setQuestionCount(val)}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-2">
          <span>1</span>
          <span>{maxCount}</span>
        </div>
      </div>

      {/* Correction Mode */}
      <div className="mb-10">
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">Correction Mode</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setCorrectionMode('static')}
            className={`flex flex-col items-start gap-2 p-4 rounded-xl border-2 transition-all text-left ${
              correctionMode === 'static' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <CheckSquare className={`w-5 h-5 ${correctionMode === 'static' ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span className={`text-sm font-semibold ${correctionMode === 'static' ? 'text-emerald-700' : 'text-slate-700'}`}>Static Correction</span>
            <span className="text-xs text-slate-500 leading-relaxed">Instantly compared to the model answer.</span>
          </button>
          <button
            onClick={() => setCorrectionMode('ai')}
            className={`flex flex-col items-start gap-2 p-4 rounded-xl border-2 transition-all text-left ${
              correctionMode === 'ai' ? 'border-violet-500 bg-violet-50' : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <Brain className={`w-5 h-5 ${correctionMode === 'ai' ? 'text-violet-600' : 'text-slate-400'}`} />
            <span className={`text-sm font-semibold ${correctionMode === 'ai' ? 'text-violet-700' : 'text-slate-700'}`}>AI Correction</span>
            <span className="text-xs text-slate-500 leading-relaxed">AI evaluates relevance, accuracy, and completeness.</span>
          </button>
        </div>
      </div>

      <Button onClick={handleStart} disabled={selectedTypes.length === 0} className="w-full gap-2 h-12 text-base bg-sky-600 hover:bg-sky-700">
        <Play className="w-5 h-5" /> Start Quiz
      </Button>
    </div>
  );
}