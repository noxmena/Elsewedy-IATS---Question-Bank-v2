import React, { useState, useMemo } from 'react';
import { isQuestions } from '@/components/data/isQuestions.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildFlashcards() {
  const cards = [];
  (isQuestions.shortAnswer || []).forEach(q => cards.push({ front: q.question, back: q.answer, type: 'Short Answer' }));
  (isQuestions.technicalTerms || []).forEach(q => cards.push({ front: q.description, back: q.answer, type: 'Technical Term' }));
  (isQuestions.fillBlank || []).forEach(q => cards.push({ front: q.question, back: q.answer, type: 'Fill in the Blank' }));
  (isQuestions.corrections || []).forEach(q => cards.push({ front: `Correct the wrong word: "${q.question}"`, back: `Replace "${q.wrongWord}" with "${q.answer}"`, type: 'Correction' }));
  return cards;
}

export default function ISFlashcards() {
  const [cards, setCards] = useState(() => shuffle(buildFlashcards()));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [direction, setDirection] = useState(1);

  const card = cards[index];
  const total = cards.length;

  const goTo = (newIndex) => {
    setDirection(newIndex > index ? 1 : -1);
    setFlipped(false);
    setTimeout(() => setIndex(newIndex), 50);
  };

  const reshuffle = () => {
    setCards(shuffle(buildFlashcards()));
    setIndex(0);
    setFlipped(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Flashcards</h2>
          <p className="text-slate-500 text-sm mt-1">{index + 1} / {total} cards</p>
        </div>
        <Button variant="outline" onClick={reshuffle} className="gap-2">
          <Shuffle className="w-4 h-4" /> Shuffle
        </Button>
      </div>

      {/* Progress */}
      <div className="h-1.5 bg-slate-100 rounded-full mb-8 overflow-hidden">
        <div className="h-full bg-sky-500 rounded-full transition-all" style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 60 }}
          transition={{ duration: 0.25 }}
          className="cursor-pointer"
          onClick={() => setFlipped(f => !f)}
        >
          <div className={cn(
            "rounded-2xl border-2 min-h-[260px] flex flex-col justify-between p-8 shadow-lg transition-colors",
            flipped
              ? "border-sky-400 bg-sky-50"
              : "border-slate-200 bg-white"
          )}>
            <div className="flex items-center justify-between mb-4">
              <span className={cn(
                "text-xs font-semibold px-2.5 py-1 rounded-full",
                flipped ? "bg-sky-100 text-sky-700" : "bg-slate-100 text-slate-600"
              )}>
                {flipped ? 'Answer' : card.type}
              </span>
              {flipped
                ? <Eye className="w-4 h-4 text-sky-500" />
                : <EyeOff className="w-4 h-4 text-slate-400" />
              }
            </div>

            <p className={cn(
              "text-lg font-medium leading-relaxed flex-1 flex items-center",
              flipped ? "text-sky-800" : "text-slate-800"
            )}>
              {flipped ? card.back : card.front}
            </p>

            <p className="text-xs text-slate-400 mt-4 text-center">
              {flipped ? 'Tap to see question' : 'Tap to reveal answer'}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6 gap-3">
        <Button variant="outline" onClick={() => goTo(index - 1)} disabled={index === 0} className="gap-2">
          <ChevronLeft className="w-4 h-4" /> Prev
        </Button>

        <Button variant="outline" onClick={() => setFlipped(f => !f)} className="flex-1 gap-2">
          <RotateCcw className="w-4 h-4" /> Flip Card
        </Button>

        <Button variant="outline" onClick={() => goTo(index + 1)} disabled={index === total - 1} className="gap-2">
          Next <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Dots */}
      <div className="flex flex-wrap gap-1.5 mt-6 justify-center">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              i === index ? "bg-sky-500 w-4" : "bg-slate-200 hover:bg-slate-300"
            )}
          />
        ))}
      </div>
    </div>
  );
}