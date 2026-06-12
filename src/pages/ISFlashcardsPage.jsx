import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ISFlashcards from '@/components/is/ISFlashcards';

export default function ISFlashcardsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />
        <div className="relative px-6 py-10">
          <div className="max-w-2xl mx-auto">
            <Link to="/ISHome" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to IS Home
            </Link>
            <h1 className="text-3xl font-bold text-white">IS Flashcards</h1>
            <p className="text-white/70 mt-1">Tap a card to reveal the answer</p>
          </div>
        </div>
      </div>
      <ISFlashcards />
    </div>
  );
}