import { isQuestions } from '@/components/data/isQuestions.jsx';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function flattenISQuestions(selectedTypes) {
  const questions = [];
  const typeMap = {
    shortAnswer:    { key: 'shortAnswer',    type: 'shortAnswer' },
    technicalTerm:  { key: 'technicalTerms', type: 'technicalTerm' },
    fillBlank:      { key: 'fillBlank',      type: 'fillBlank' },
    correction:     { key: 'corrections',    type: 'correction' },
    trueFalse:      { key: 'trueFalse',      type: 'trueFalse' },
    multipleChoice: { key: 'multipleChoice', type: 'multipleChoice' },
    sdlcScenario:   { key: 'sdlcScenarios',  type: 'sdlcScenario' },
  };

  for (const [typeKey, { key, type }] of Object.entries(typeMap)) {
    if (!selectedTypes || selectedTypes.includes(typeKey)) {
      (isQuestions[key] || []).forEach(q => questions.push({ ...q, type }));
    }
  }
  return questions;
}

export function buildISQuizQuestions(count, selectedTypes) {
  let pool = flattenISQuestions(selectedTypes);
  const shuffled = shuffle(pool);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getISQuestionText(q) {
  if (q.type === 'technicalTerm') return q.description;
  return q.question;
}

export function getISCorrectAnswer(q) {
  if (q.type === 'trueFalse') return q.answer ? 'True' : 'False';
  if (q.type === 'multipleChoice') {
    const idx = q.answer.toLowerCase().charCodeAt(0) - 97;
    return q.choices[idx];
  }
  return q.answer;
}

export const IS_ALL_TYPES = [
  { key: 'fillBlank',      label: 'Fill in the Blank' },
  { key: 'correction',     label: 'Corrections' },
  { key: 'technicalTerm',  label: 'Technical Terms' },
  { key: 'shortAnswer',    label: 'Short Answer' },
  { key: 'trueFalse',      label: 'True / False' },
  { key: 'multipleChoice', label: 'Multiple Choice' },
  { key: 'sdlcScenario',   label: 'SDLC Scenarios' },
];

// Count questions by types from isQuestions
export function countISByTypes(types) {
  const typeMap = {
    shortAnswer:    'shortAnswer',
    technicalTerm:  'technicalTerms',
    fillBlank:      'fillBlank',
    correction:     'corrections',
    trueFalse:      'trueFalse',
    multipleChoice: 'multipleChoice',
    sdlcScenario:   'sdlcScenarios',
  };
  return types.reduce((sum, t) => {
    const arr = isQuestions[typeMap[t]];
    return sum + (Array.isArray(arr) ? arr.length : 0);
  }, 0);
}