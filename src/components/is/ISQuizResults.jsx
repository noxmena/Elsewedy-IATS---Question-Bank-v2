import React, { useState } from 'react';
import { getISQuestionText } from './isQuizUtils';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw, ChevronDown, ChevronUp, CheckCircle, XCircle, Brain, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

function ScoreBar({ label, value, color }) {
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-600">{label}</span>
        <span className="font-semibold text-slate-700">{Math.round(value)}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function QuestionReview({ item, mode }) {
  const [expanded, setExpanded] = useState(false);
  const questionText = getISQuestionText(item.question);

  return (
    <div className={cn("rounded-xl border overflow-hidden",
      item.isCorrect ? "border-emerald-200 bg-emerald-50/40" : "border-rose-200 bg-rose-50/40"
    )}>
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center gap-3 p-4 text-left">
        {item.isCorrect
          ? <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
          : <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
        }
        <span className="flex-1 text-sm text-slate-700 line-clamp-2">{questionText}</span>
        <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full mr-2",
          item.isCorrect ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
        )}>{Math.round(item.score)}%</span>
        {expanded ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-slate-100 pt-4 space-y-3">
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-1">Your Answer:</p>
            <p className="text-sm text-slate-700 bg-white rounded-lg p-2 border border-slate-100">
              {item.userAnswer || <span className="text-slate-400 italic">No answer</span>}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-1">Model Answer:</p>
            <p className="text-sm text-emerald-700 bg-white rounded-lg p-2 border border-emerald-100">{String(item.correctAnswer)}</p>
          </div>
          {mode === 'ai' && item.aiScores && (
            <div className="bg-white rounded-lg p-3 border border-slate-100">
              <p className="text-xs font-semibold text-violet-600 mb-3 flex items-center gap-1">
                <Brain className="w-3.5 h-3.5" /> AI Evaluation
              </p>
              <ScoreBar label="Relevance" value={item.aiScores.relevance} color="bg-blue-400" />
              <ScoreBar label="Technical Accuracy" value={item.aiScores.technical_accuracy} color="bg-emerald-400" />
              <ScoreBar label="Overall Score" value={item.aiScores.overall_score} color="bg-sky-500" />
              {item.aiScores.what_was_correct && (
                <div className="mt-3 p-2 bg-emerald-50 rounded-lg text-xs text-emerald-700">
                  <span className="font-semibold">✓ Correct: </span>{item.aiScores.what_was_correct}
                </div>
              )}
              {item.aiScores.what_was_missing && (
                <div className="mt-1 p-2 bg-rose-50 rounded-lg text-xs text-rose-700">
                  <span className="font-semibold">✗ Missing: </span>{item.aiScores.what_was_missing}
                </div>
              )}
              {item.aiScores.suggested_improvements && (
                <div className="mt-1 p-2 bg-amber-50 rounded-lg text-xs text-amber-700">
                  <span className="font-semibold">💡 Improve: </span>{item.aiScores.suggested_improvements}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ISQuizResults({ results, onRestart }) {
  const { evaluated, mode } = results;
  const total = evaluated.length;
  const correct = evaluated.filter(e => e.isCorrect).length;
  const avgScore = Math.round(evaluated.reduce((sum, e) => sum + e.score, 0) / total);
  const percentage = Math.round((correct / total) * 100);

  const gradeInfo = (() => {
    if (avgScore >= 90) return { label: 'Excellent!', color: 'text-emerald-600', bg: 'bg-emerald-50' };
    if (avgScore >= 75) return { label: 'Good Job!', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (avgScore >= 60) return { label: 'Keep Practicing', color: 'text-amber-600', bg: 'bg-amber-50' };
    return { label: 'Needs Improvement', color: 'text-rose-600', bg: 'bg-rose-50' };
  })();

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-8 h-8 text-amber-500" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-1">Quiz Complete!</h1>
        <p className={cn("text-lg font-semibold", gradeInfo.color)}>{gradeInfo.label}</p>
      </div>

      <div className={cn("rounded-2xl p-6 mb-6 border", gradeInfo.bg, "border-slate-200")}>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-slate-800">{correct}/{total}</p>
            <p className="text-xs text-slate-500 mt-1">Correct Answers</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-800">{percentage}%</p>
            <p className="text-xs text-slate-500 mt-1">Accuracy</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-800">{avgScore}%</p>
            <p className="text-xs text-slate-500 mt-1">Avg Score</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3 flex items-center gap-2">
          <Target className="w-4 h-4" /> Question Analysis
        </h2>
        <div className="space-y-2">
          {evaluated.map((item, i) => (
            <QuestionReview key={i} item={item} mode={mode} />
          ))}
        </div>
      </div>

      <Button onClick={onRestart} className="w-full gap-2 h-12" variant="outline">
        <RotateCcw className="w-5 h-5" /> Take Another Quiz
      </Button>
    </div>
  );
}