import React, { useState } from 'react';
import { Eye, EyeOff, PenLine } from 'lucide-react';

export default function FillBlankCard({ question, index, showAnswer: externalShowAnswer }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  
  const isRevealed = externalShowAnswer || showAnswer;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 transition-colors">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center text-sm font-medium text-cyan-600">
            {question.number || index + 1}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-slate-700 leading-relaxed">{question.question}</p>
            
            <div className="mt-4 flex items-center gap-3">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer..."
                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                {showAnswer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showAnswer ? 'Hide' : 'Show'}
              </button>
            </div>

            {isRevealed && (
              <div className="mt-3 pt-3 border-t border-slate-100">
                <div className="flex items-start gap-2">
                  <PenLine className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-slate-600">
                    <span className="font-medium text-cyan-700">{question.answer}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}