import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, BookOpen, ClipboardCheck, Layers, Brain,
  ChevronRight, GraduationCap, Sparkles, CreditCard,
  Database, Shield, GitBranch, BarChart2
} from 'lucide-react';
import { isQuestions } from '@/components/data/isQuestions.jsx';

const totalQuestions =
  (isQuestions.shortAnswer?.length || 0) +
  (isQuestions.technicalTerms?.length || 0) +
  (isQuestions.fillBlank?.length || 0) +
  (isQuestions.compare?.length || 0) +
  (isQuestions.corrections?.length || 0) +
  (isQuestions.trueFalse?.length || 0) +
  (isQuestions.multipleChoice?.length || 0) +
  (isQuestions.sdlcScenarios?.length || 0);

export default function ISHome() {
  const sections = [
    {
      id: 'questions',
      title: 'Question Bank',
      subtitle: 'Browse all IS questions by type',
      icon: BookOpen,
      gradient: 'from-sky-500 to-cyan-600',
      bgGradient: 'from-sky-50 to-cyan-50',
      iconColor: '#0369a1',
      count: `${totalQuestions} Questions`,
      href: '/ISQuestions',
    },
    {
      id: 'quiz',
      title: 'Quiz & Exam Mode',
      subtitle: 'Shuffled questions, static or AI correction',
      icon: ClipboardCheck,
      gradient: 'from-violet-500 to-indigo-600',
      bgGradient: 'from-violet-50 to-indigo-50',
      iconColor: '#7c3aed',
      count: 'Real-time Correction',
      href: '/ISQuiz',
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      subtitle: 'Flip cards to study terms & definitions',
      icon: CreditCard,
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-50',
      iconColor: '#d97706',
      count: `${(isQuestions.shortAnswer?.length || 0) + (isQuestions.technicalTerms?.length || 0) + (isQuestions.fillBlank?.length || 0)} Cards`,
      href: '/ISFlashcards',
    },
  ];

  const topics = [
    { label: 'System Analysis & Design', icon: Layers, color: 'text-sky-600 bg-sky-50' },
    { label: 'SDLC Models', icon: BarChart2, color: 'text-violet-600 bg-violet-50' },
    { label: 'UML Diagrams', icon: GitBranch, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Cybersecurity', icon: Shield, color: 'text-rose-600 bg-rose-50' },
    { label: 'ERD & Databases', icon: Database, color: 'text-amber-600 bg-amber-50' },
    { label: 'AI-Graded Answers', icon: Brain, color: 'text-indigo-600 bg-indigo-50' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-600 via-cyan-600 to-sky-700" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        <div className="relative px-6 py-16 md:py-20">
          <div className="max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Specializations
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6">
                <GraduationCap className="w-4 h-4" />
                <span>Elsewedy IATS — Information System</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Information System
              </h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                System Analysis, SDLC, UML Diagrams, Cybersecurity & More
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 pb-16">
        {/* Main Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-4 mb-10"
        >
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.div key={section.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
                <Link to={section.href}>
                  <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 h-full">
                    <div className={`h-1.5 bg-gradient-to-r ${section.gradient}`} />
                    <div className="p-5">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${section.bgGradient} flex items-center justify-center mb-4`}>
                        <Icon className="w-5 h-5" style={{ color: section.iconColor }} />
                      </div>
                      <h3 className="text-base font-semibold text-slate-800 mb-1">{section.title}</h3>
                      <p className="text-xs text-slate-500 mb-4">{section.subtitle}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />{section.count}
                        </span>
                        <div className="flex items-center gap-1 text-sm font-medium group-hover:gap-1.5 transition-all" style={{ color: section.iconColor }}>
                          <span>Open</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Topics covered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-8 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-50 to-cyan-50 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-sky-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Topics Covered</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {topics.map(({ label, icon: Icon, color }) => (
              <div key={label} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl ${color.split(' ')[1]}`}>
                <Icon className={`w-4 h-4 ${color.split(' ')[0]}`} />
                <span className="text-sm font-medium text-slate-700">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Question Type Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 flex items-center justify-center">
              <BarChart2 className="w-5 h-5 text-violet-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Question Types</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'Short Answer', count: isQuestions.shortAnswer?.length || 0, color: 'bg-sky-500' },
              { type: 'Technical Terms', count: isQuestions.technicalTerms?.length || 0, color: 'bg-cyan-500' },
              { type: 'Fill in Blank', count: isQuestions.fillBlank?.length || 0, color: 'bg-amber-500' },
              { type: 'Corrections', count: isQuestions.corrections?.length || 0, color: 'bg-rose-500' },
              { type: 'True / False', count: isQuestions.trueFalse?.length || 0, color: 'bg-emerald-500' },
              { type: 'Multiple Choice', count: isQuestions.multipleChoice?.length || 0, color: 'bg-violet-500' },
              { type: 'Compare', count: isQuestions.compare?.length || 0, color: 'bg-teal-500' },
              { type: 'SDLC Scenarios', count: isQuestions.sdlcScenarios?.length || 0, color: 'bg-indigo-500' },
            ].map((item) => (
              <div key={item.type} className="text-center p-4 rounded-xl bg-slate-50">
                <div className={`w-2 h-2 rounded-full ${item.color} mx-auto mb-3`} />
                <p className="text-2xl font-bold text-slate-800">{item.count}</p>
                <p className="text-xs text-slate-500 mt-1">{item.type}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-8 text-center text-slate-400 text-sm">
          Made by Mina Magdy
        </div>
      </div>
    </div>
  );
}