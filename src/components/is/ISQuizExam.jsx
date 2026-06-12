import React, { useState, useMemo } from 'react';
import { buildISQuizQuestions, getISQuestionText, getISCorrectAnswer } from './isQuizUtils';
import { gradeQuestionWithOpenRouterFree } from '@/lib/openRouterGrader';

import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, CheckCircle, XCircle, Brain, Loader2, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

const TYPE_LABEL = {
  trueFalse: 'True / False',
  multipleChoice: 'Multiple Choice',
  fillBlank: 'Fill in the Blank',
  correction: 'Correction',
  technicalTerm: 'Technical Term',
  shortAnswer: 'Short Answer',
  sdlcScenario: 'SDLC Scenario',
};

function StaticInput({ question, userAnswer, onAnswer, locked }) {
  const getChoiceLabel = (idx) => String.fromCharCode(97 + idx);

  if (question.type === 'trueFalse') {
    return (
      <div className="flex gap-3 mt-6">
        {['True', 'False'].map((opt) => (
          <button key={opt} onClick={() => !locked && onAnswer(opt)} disabled={locked}
            className={cn(
              "flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all",
              userAnswer === opt ? "border-sky-500 bg-sky-500 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-sky-300",
              locked && "cursor-default"
            )}
          >{opt}</button>
        ))}
      </div>
    );
  }

  if (question.type === 'multipleChoice') {
    return (
      <div className="space-y-2 mt-6">
        {question.choices.map((choice, idx) => (
          <button key={idx} onClick={() => !locked && onAnswer(choice)} disabled={locked}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left text-sm transition-all",
              userAnswer === choice ? "border-sky-500 bg-sky-50 text-sky-800" : "border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:bg-slate-50",
              locked && "cursor-default"
            )}
          >
            <span className={cn("flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
              userAnswer === choice ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-600"
            )}>
              {getChoiceLabel(idx).toUpperCase()}
            </span>
            {choice}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-6">
      <textarea
        value={userAnswer || ''}
        onChange={(e) => !locked && onAnswer(e.target.value)}
        readOnly={locked}
        placeholder="Type your answer..."
        rows={question.type === 'sdlcScenario' ? 5 : 3}
        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
      />
    </div>
  );
}

function FeedbackPanel({ result, mode }) {
  if (!result) return null;
  const { isCorrect, correctAnswer, aiScores, aiLoading, feedback, modelAnswer } = result;

  return (
    <div className={cn(
      "mt-4 rounded-xl border-2 p-4 space-y-3",
      isCorrect ? "border-emerald-300 bg-emerald-50" : "border-rose-300 bg-rose-50"
    )}>
      <div className="flex items-center gap-2">
        {isCorrect
          ? <><CheckCircle className="w-5 h-5 text-emerald-600" /><span className="font-semibold text-emerald-700">Correct!</span></>
          : <><XCircle className="w-5 h-5 text-rose-600" /><span className="font-semibold text-rose-700">Incorrect</span></>
        }
        {mode === 'ai' && aiScores && (
          <span className="ml-auto text-sm font-bold text-violet-700">{Math.round(aiScores.overall_score)}%</span>
        )}
      </div>

      {feedback && (
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-1">AI Feedback:</p>
          <p className="text-sm text-slate-700 bg-white rounded-lg px-3 py-2 border border-slate-200">{feedback}</p>
        </div>
      )}

      {modelAnswer && (
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-1">Model Answer:</p>
          <p className="text-sm text-emerald-800 bg-white rounded-lg px-3 py-2 border border-emerald-200">{String(modelAnswer)}</p>
        </div>
      )}

      {mode === 'ai' && aiLoading && (
        <div className="flex items-center gap-2 text-violet-600 text-sm">
          <Loader2 className="w-4 h-4 animate-spin" /> AI is evaluating...
        </div>
      )}

      {mode === 'ai' && aiScores && (
        <div className="bg-white rounded-lg p-3 border border-slate-100 space-y-1.5">
          <p className="text-xs font-semibold text-violet-600 flex items-center gap-1 mb-2">
            <Brain className="w-3.5 h-3.5" /> AI Feedback
          </p>
          {[
            { label: 'Relevance', val: aiScores.relevance },
            { label: 'Technical Accuracy', val: aiScores.technical_accuracy },
            { label: 'Overall Score', val: aiScores.overall_score },
          ].map(({ label, val }) => (
            <div key={label} className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 w-32 flex-shrink-0">{label}</span>
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-sky-400 rounded-full" style={{ width: `${val}%` }} />
              </div>
              <span className="text-slate-700 font-semibold w-8 text-right">{Math.round(val)}%</span>
            </div>
          ))}
          {aiScores.what_was_missing && (
            <div className="mt-2 p-2 bg-rose-50 rounded-lg text-xs text-rose-700">
              <span className="font-semibold">Missing: </span>{aiScores.what_was_missing}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ISQuizExam({ config, onFinish }) {
  const questions = useMemo(() => buildISQuizQuestions(config.questionCount, config.selectedTypes), []);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [evaluating, setEvaluating] = useState(false);

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const isLast = current === questions.length - 1;
  const currentAnswer = answers[current];
  const currentFeedback = feedbacks[current];
  const hasAnswered = currentAnswer !== undefined && currentAnswer !== '';

  const handleAnswer = (val) => {
    if (currentFeedback) return;
    setAnswers(prev => ({ ...prev, [current]: val }));
    if (q.type === 'trueFalse' || q.type === 'multipleChoice') {
      checkAnswer(val);
    }
  };

  const checkAnswer = async (overrideAnswer) => {
    const userAns = overrideAnswer !== undefined ? overrideAnswer : (currentAnswer || '');
    const correctAns = getISCorrectAnswer(q);

    if (config.correctionMode === 'static') {
      const isCorrect = userAns.trim().toLowerCase() === correctAns.toString().trim().toLowerCase();
      setFeedbacks(prev => ({ ...prev, [current]: { isCorrect, correctAnswer: correctAns, score: isCorrect ? 100 : 0 } }));
    } else {
      setFeedbacks(prev => ({ ...prev, [current]: { isCorrect: false, correctAnswer: correctAns, aiLoading: true, score: 0 } }));
      setEvaluating(true);
      const questionText = getISQuestionText(q);
      const result = await gradeQuestionWithOpenRouterFree({
        question: questionText,
        answer: correctAns,
        type: q.type,
      }, userAns);
      const isCorrect = result.isCorrect;
      setFeedbacks(prev => ({
        ...prev,
        [current]: {
          isCorrect,
          correctAnswer: correctAns,
          aiScores: null,
          aiLoading: false,
          score: result.score ?? 0,
          feedback: result.feedback,
          modelAnswer: result.modelAnswer,
        }
      }));
      setEvaluating(false);
    }
  };

  const handleFinish = () => {
    const evaluated = questions.map((qItem, i) => {
      const fb = feedbacks[i] || {};
      return {
        question: qItem,
        userAnswer: answers[i] || '',
        correctAnswer: fb.correctAnswer ?? getISCorrectAnswer(qItem),
        isCorrect: fb.isCorrect || false,
        score: fb.score ?? 0,
        aiScores: fb.aiScores || null,
      };
    });
    onFinish({ mode: config.correctionMode, evaluated, questions });
  };

  const needsManualCheck = hasAnswered && !currentFeedback && q.type !== 'trueFalse' && q.type !== 'multipleChoice';

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-500 mb-2">
          <span>Question {current + 1} of {questions.length}</span>
          <span>{Object.keys(feedbacks).length} checked</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-sky-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">{TYPE_LABEL[q.type] || q.type}</span>
          {config.correctionMode === 'ai' && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-violet-100 text-violet-600">AI Graded</span>
          )}
        </div>

        <p className="text-slate-800 text-base leading-relaxed font-medium">
          {q.type === 'correction' ? (
            <>
              {q.question.split(q.wrongWord).map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="underline decoration-2 decoration-red-400 font-semibold text-red-600">{q.wrongWord}</span>
                  )}
                </React.Fragment>
              ))}
            </>
          ) : getISQuestionText(q)}
        </p>

        <StaticInput question={q} userAnswer={currentAnswer} onAnswer={handleAnswer} locked={!!currentFeedback} />
        <FeedbackPanel result={currentFeedback} mode={config.correctionMode} />
      </div>

      {needsManualCheck && (
        <Button onClick={() => checkAnswer()} disabled={evaluating} className="w-full mb-4 gap-2 bg-sky-600 hover:bg-sky-700">
          {evaluating ? <><Loader2 className="w-4 h-4 animate-spin" /> Evaluating...</> : <><CheckCircle className="w-4 h-4" /> Check Answer</>}
        </Button>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setCurrent(c => c - 1)} disabled={current === 0} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Prev
        </Button>
        {!isLast ? (
          <Button onClick={() => setCurrent(c => c + 1)} disabled={!hasAnswered || (needsManualCheck && !currentFeedback) || evaluating} className="flex-1 gap-2 bg-sky-600 hover:bg-sky-700">
            Next <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={handleFinish} disabled={!hasAnswered || (needsManualCheck && !currentFeedback) || evaluating} className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700">
            <RotateCcw className="w-4 h-4" /> Finish & See Summary
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mt-6 justify-center">
        {questions.map((_, i) => {
          const fb = feedbacks[i];
          return (
            <button key={i} onClick={() => { setFeedbacks(prev => prev); setCurrent(i); }}
              className={cn(
                "w-7 h-7 rounded-full text-xs font-medium transition-all",
                i === current ? "ring-2 ring-sky-500 ring-offset-1 bg-sky-500 text-white"
                  : fb ? (fb.isCorrect ? "bg-emerald-400 text-white" : "bg-rose-400 text-white")
                  : answers[i] ? "bg-slate-300 text-slate-700" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              )}
            >{i + 1}</button>
          );
        })}
      </div>
    </div>
  );
}