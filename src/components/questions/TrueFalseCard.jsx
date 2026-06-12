import React, { useState } from 'react';
import { Check, X, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TrueFalseCard({ question, index, showAnswer: externalShowAnswer }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  const isRevealed = externalShowAnswer || showAnswer;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 transition-colors">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-medium text-slate-600">
            {question.number || index + 1}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-slate-700 leading-relaxed">{question.question}</p>
            
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <button
                onClick={() => setSelectedAnswer(true)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  selectedAnswer === true
                    ? isRevealed
                      ? question.answer === true
                        ? "bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500"
                        : "bg-rose-100 text-rose-700 ring-2 ring-rose-500"
                      : "bg-indigo-100 text-indigo-700 ring-2 ring-indigo-500"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                <Check className="w-4 h-4" />
                True
              </button>
              
              <button
                onClick={() => setSelectedAnswer(false)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  selectedAnswer === false
                    ? isRevealed
                      ? question.answer === false
                        ? "bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500"
                        : "bg-rose-100 text-rose-700 ring-2 ring-rose-500"
                      : "bg-indigo-100 text-indigo-700 ring-2 ring-indigo-500"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                <X className="w-4 h-4" />
                False
              </button>

              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="ml-auto flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors"
              >
                {showAnswer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showAnswer ? 'Hide' : 'Show'}
              </button>
            </div>

            {isRevealed && (
              <div className="mt-3 pt-3 border-t border-slate-100">
                <div className={cn(
                  "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium",
                  question.answer ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                )}>
                  {question.answer ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  Answer: {question.answer ? 'True' : 'False'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}