import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CorrectionCard({ question, index, showAnswer = false }) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(showAnswer);

  useEffect(() => {
    setIsAnswerVisible(showAnswer);
  }, [showAnswer]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 transition-colors">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
              {question.number}
            </span>
            <span className="text-xs text-slate-500 font-medium">Correct the underlined word</span>
          </div>
          <p className="text-slate-800 leading-relaxed">
            {question.question.split(question.wrongWord).map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="underline decoration-2 decoration-red-400 font-medium text-red-600">
                    {question.wrongWord}
                  </span>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsAnswerVisible(!isAnswerVisible)}
          className="flex-shrink-0"
        >
          {isAnswerVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </Button>
      </div>

      {isAnswerVisible && (
        <div className="border-t border-slate-200 pt-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Correct Answer:</p>
              <p className="text-green-700 font-medium">{question.answer}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}