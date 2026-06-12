import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MatchingCard({ question, index, showAnswer: externalShowAnswer }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedMatches, setSelectedMatches] = useState({});
  
  const isRevealed = externalShowAnswer || showAnswer;

  const handleMatch = (itemIndex, value) => {
    setSelectedMatches(prev => ({ ...prev, [itemIndex]: value }));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-sm font-medium text-emerald-600">
            M
          </span>
          <h3 className="text-sm font-medium text-slate-700">Matching Questions</h3>
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="ml-auto flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors"
          >
            {showAnswer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showAnswer ? 'Hide Answers' : 'Show Answers'}
          </button>
        </div>

        <div className="space-y-3">
          {question.items.map((item, idx) => {
            const userAnswer = selectedMatches[idx];
            const isCorrect = userAnswer === item.answer;
            
            return (
              <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600">
                  {item.number || idx + 56}
                </span>
                <span className="flex-1 text-sm text-slate-700 min-w-0">{item.columnA}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                
                <select
                  value={userAnswer || ''}
                  onChange={(e) => handleMatch(idx, e.target.value)}
                  className={cn(
                    "w-20 px-2 py-1.5 rounded-lg text-sm border transition-colors",
                    isRevealed && userAnswer
                      ? isCorrect
                        ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                        : "bg-rose-50 border-rose-300 text-rose-700"
                      : "bg-white border-slate-200"
                  )}
                >
                  <option value="">Select</option>
                  {question.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>

                {isRevealed && (
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-700">
                    <Check className="w-3 h-3" />
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}