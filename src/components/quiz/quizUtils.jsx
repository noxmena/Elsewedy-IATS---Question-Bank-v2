import { officialMobileQuestions, officialApiQuestions } from '@/components/data/officialQuestions';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function flattenQuestions(source) {
  const questions = [];

  (source.fillBlank || []).forEach(q => questions.push({ ...q, type: 'fillBlank' }));
  (source.corrections || []).forEach(q => questions.push({ ...q, type: 'correction' }));
  (source.technicalTerms || []).forEach(q => questions.push({ ...q, type: 'technicalTerm' }));
  (source.shortAnswer || []).forEach(q => questions.push({ ...q, type: 'shortAnswer' }));
  (source.trueFalse || []).forEach(q => questions.push({ ...q, type: 'trueFalse' }));
  (source.multipleChoice || []).forEach(q => questions.push({ ...q, type: 'multipleChoice' }));

  return questions;
}

export function buildQuizQuestions(topic, count, selectedTypes) {
  let pool = [];

  if (topic === 'flutter' || topic === 'both') {
    pool = pool.concat(flattenQuestions(officialMobileQuestions));
  }
  if (topic === 'webapi' || topic === 'both') {
    pool = pool.concat(flattenQuestions(officialApiQuestions));
  }

  if (selectedTypes && selectedTypes.length > 0) {
    pool = pool.filter(q => selectedTypes.includes(q.type));
  }

  const shuffled = shuffle(pool);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getQuestionText(q) {
  if (q.type === 'technicalTerm') return q.description;
  return q.question;
}

export function getCorrectAnswer(q) {
  if (q.type === 'trueFalse') return q.answer ? 'True' : 'False';
  if (q.type === 'multipleChoice') {
    const idx = q.answer.toLowerCase().charCodeAt(0) - 97;
    return q.choices[idx];
  }
  return q.answer;
}