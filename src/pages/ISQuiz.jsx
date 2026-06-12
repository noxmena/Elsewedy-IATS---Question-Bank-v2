import React, { useState } from 'react';
import ISQuizSetup from '@/components/is/ISQuizSetup';
import ISQuizExam from '@/components/is/ISQuizExam';
import ISQuizResults from '@/components/is/ISQuizResults';

export default function ISQuiz() {
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

  if (phase === 'exam') return <ISQuizExam config={config} onFinish={handleFinish} />;
  if (phase === 'results') return <ISQuizResults results={results} config={config} onRestart={handleRestart} />;
  return <ISQuizSetup onStart={handleStart} />;
}