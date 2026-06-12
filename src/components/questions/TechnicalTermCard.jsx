import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TechnicalTermCard({ question, index, showAnswer = false }) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(showAnswer);

  useEffect(() => {
    setIsAnswerVisible(showAnswer);
  }, [showAnswer]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 transition-colors">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold">
              {question.number}
            </span>
            <span className="text-xs text-slate-500 font-medium">Technical Term</span>
          </div>
          <p className="text-slate-800 leading-relaxed italic">
            "{question.description}"
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
            <BookOpen className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Answer:</p>
              <p className="text-purple-700 font-semibold">{question.answer}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}