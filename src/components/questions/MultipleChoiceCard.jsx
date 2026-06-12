import React, { useState } from 'react';
import { Check, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MultipleChoiceCard({ question, index, showAnswer: externalShowAnswer }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  const isRevealed = externalShowAnswer || showAnswer;
  const getChoiceLabel = (idx) => String.fromCharCode(97 + idx);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 transition-colors">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-sm font-medium text-violet-600">
            {question.number || index + 1}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-slate-700 leading-relaxed mb-4">{question.question}</p>
            
            <div className="space-y-2">
              {question.choices.map((choice, idx) => {
                const choiceKey = getChoiceLabel(idx);
                const isSelected = selectedAnswer === choiceKey;
                const isCorrectAnswer = question.answer.toLowerCase() === choiceKey;
                
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedAnswer(choiceKey)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm transition-all",
                      isSelected
                        ? isRevealed
                          ? isCorrectAnswer
                            ? "bg-emerald-50 border-2 border-emerald-500 text-emerald-800"
                            : "bg-rose-50 border-2 border-rose-500 text-rose-800"
                          : "bg-indigo-50 border-2 border-indigo-500 text-indigo-800"
                        : isRevealed && isCorrectAnswer
                          ? "bg-emerald-50 border-2 border-emerald-300 text-emerald-700"
                          : "bg-slate-50 border-2 border-transparent hover:bg-slate-100 text-slate-700"
                    )}
                  >
                    <span className={cn(
                      "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                      isSelected
                        ? isRevealed
                          ? isCorrectAnswer ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                          : "bg-indigo-500 text-white"
                        : isRevealed && isCorrectAnswer
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-200 text-slate-600"
                    )}>
                      {isRevealed && isCorrectAnswer ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        choiceKey.toUpperCase()
                      )}
                    </span>
                    <span className="flex-1">{choice}</span>
                    {isSelected && (
                      <CheckCircle2 className={cn(
                        "w-5 h-5",
                        isRevealed
                          ? isCorrectAnswer ? "text-emerald-500" : "text-rose-500"
                          : "text-indigo-500"
                      )} />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors"
              >
                {showAnswer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showAnswer ? 'Hide Answer' : 'Show Answer'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}