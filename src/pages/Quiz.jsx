import React, { useState } from 'react';
import QuizSetup from '@/components/quiz/QuizSetup';
import QuizExam from '@/components/quiz/QuizExam';
import QuizResults from '@/components/quiz/QuizResults';

export default function Quiz() {
  const [phase, setPhase] = useState('setup'); // setup | exam | results
  const [config, setConfig] = useState(null);
  const [results, setResults] = useState(null);

  const handleStart = (cfg) => {
    setConfig(cfg);
    setPhase('exam');
  };

  const handleFinish = (res) => {
    setResults(res);
    setPhase('results');
  };

  const handleRestart = () => {
    setConfig(null);
    setResults(null);
    setPhase('setup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {phase === 'setup' && <QuizSetup onStart={handleStart} />}
      {phase === 'exam' && <QuizExam config={config} onFinish={handleFinish} />}
      {phase === 'results' && <QuizResults results={results} config={config} onRestart={handleRestart} />}
    </div>
  );
}