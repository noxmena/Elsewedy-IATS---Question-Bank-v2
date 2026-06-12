import React, { useState } from 'react';
import { Eye, EyeOff, MessageSquare } from 'lucide-react';

export default function ShortAnswerCard({ question, index, showAnswer: externalShowAnswer }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const isRevealed = externalShowAnswer || showAnswer;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 transition-colors">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-sm font-medium text-amber-600">
            {question.number || index + 1}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-slate-700 leading-relaxed">{question.question}</p>
            
            <div className="flex justify-end mt-3">
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors"
              >
                {showAnswer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showAnswer ? 'Hide Answer' : 'Show Answer'}
              </button>
            </div>

            {isRevealed && (
              <div className="mt-3 pt-3 border-t border-slate-100">
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {question.answer}
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