import React, { useState } from 'react';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Server, 
  BookOpen, 
  Brain,
  ChevronRight,
  GraduationCap,
  Sparkles,
  FileText,
  ClipboardCheck
} from 'lucide-react';

export default function Home() {
  const questionBanks = [
    {
      name: 'Summarized Question Bank',
      description: 'Mobile Applications & Web APIs',
      subjects: [
        {
          id: 'mobile',
          title: 'Mobile Applications',
          subtitle: 'Flutter & Cross-Platform Development',
          icon: Smartphone,
          questionCount: 71,
          gradient: 'from-violet-500 to-purple-600',
          bgGradient: 'from-violet-50 to-purple-50'
        },
        {
          id: 'webapi',
          title: 'ASP.NET Web API',
          subtitle: 'RESTful Services & Backend Development',
          icon: Server,
          questionCount: 110,
          gradient: 'from-emerald-500 to-teal-600',
          bgGradient: 'from-emerald-50 to-teal-50'
        }
      ]
    },

    {
      name: 'Official Question Bank',
      description: 'Integrated Software Development Specialization — 200 Questions with Model Answers',
      subjects: [
        {
          id: 'official-mobile',
          title: 'Flutter & Mobile Development',
          subtitle: 'Fill in blank, corrections, technical terms, True/False & MCQ',
          icon: Smartphone,
          questionCount: 82,
          gradient: 'from-orange-500 to-amber-500',
          bgGradient: 'from-orange-50 to-amber-50'
        },
        {
          id: 'official-api',
          title: 'Web API & Backend Development',
          subtitle: 'Fill in blank, corrections, technical terms, True/False & MCQ',
          icon: Server,
          questionCount: 120,
          gradient: 'from-teal-500 to-green-600',
          bgGradient: 'from-teal-50 to-green-50'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600" />
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '20px 20px'}} />
        
        <div className="relative px-6 py-16 md:py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <a href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors">
              ← Back to Specializations
            </a>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6">
              <GraduationCap className="w-4 h-4" />
              <span>Elsewedy IATS — Integrated Software Dev</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              Question Banks
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Choose your subject to start practicing
            </p>
          </motion.div>
        </div>
      </div>

      {/* Question Banks */}
      <div className="max-w-5xl mx-auto px-6 py-8 pb-16">
        {questionBanks.map((bank, bankIndex) => (
          <motion.div
            key={bank.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: bankIndex * 0.2 }}
            className="mb-10"
          >
            {/* Bank Header */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-800 mb-0.5">
                {bank.name}
              </h2>
              <p className="text-slate-500 text-sm">
                {bank.description}
              </p>
            </div>

            {/* Subject Cards */}
            <div className="grid md:grid-cols-2 gap-4">
              {bank.subjects.map((subject, index) => {
                const iconColor = subject.id === 'mobile' ? '#7c3aed' : subject.id === 'webapi' ? '#059669' : subject.id === 'official-mobile' ? '#f97316' : '#0d9488';
                return (
                  <motion.div
                    key={subject.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (bankIndex * 0.15) + (index * 0.08) }}
                  >
                    <a href={createPageUrl(`Questions?subject=${subject.id}`)}>
                      <div className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${subject.gradient}`} />
                        
                        <div className="p-5">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${subject.bgGradient} flex items-center justify-center mb-4`}>
                            <subject.icon className="w-5 h-5" style={{color: iconColor}} />
                          </div>
                          
                          <h3 className="text-base font-semibold text-slate-800 mb-1">
                            {subject.title}
                          </h3>
                          <p className="text-xs mb-4" style={{color: iconColor}}>
                            {subject.subtitle}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-sm text-slate-500">
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>{subject.questionCount} Questions</span>
                            </div>
                            
                            <div className="flex items-center gap-1 text-sm font-medium group-hover:gap-1.5 transition-all" style={{color: iconColor}}>
                              <span>Start Practice</span>
                              <ChevronRight className="w-3.5 h-3.5" style={{color: iconColor}} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Question Types</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'True/False', count: 50, color: 'bg-blue-500' },
              { type: 'Multiple Choice', count: 85, color: 'bg-violet-500' },
              { type: 'Matching', count: 30, color: 'bg-emerald-500' },
              { type: 'Short Answer', count: 36, color: 'bg-amber-500' }
            ].map((item) => (
              <div key={item.type} className="text-center p-4 rounded-xl bg-slate-50">
                <div className={`w-2 h-2 rounded-full ${item.color} mx-auto mb-3`} />
                <p className="text-2xl font-bold text-slate-800">{item.count}</p>
                <p className="text-xs text-slate-500 mt-1">{item.type}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quiz Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-6"
        >
          <a href={createPageUrl('Quiz')}>
            <div className="group bg-gradient-to-r from-violet-500 to-indigo-600 rounded-2xl shadow-lg shadow-violet-200/50 border border-violet-100 overflow-hidden hover:shadow-xl hover:shadow-violet-200/60 transition-all duration-300 hover:-translate-y-1">
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ClipboardCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Quiz & Exam Mode
                    </h3>
                    <p className="text-sm text-white/80">
                      Test yourself with static or AI-graded correction
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>
        </motion.div>

        {/* Offline Document Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <a href={createPageUrl('OfflineDocument')}>
            <div className="group bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-200/50 border border-blue-100 overflow-hidden hover:shadow-xl hover:shadow-blue-200/60 transition-all duration-300 hover:-translate-y-1">
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Offline Document
                    </h3>
                    <p className="text-sm text-white/80">
                      View and download the complete question bank offline
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>
        </motion.div>

        {/* Watermark */}
        <div className="mt-8 text-center text-slate-400 text-sm pb-4">
          Made by Mina Magdy
        </div>
      </div>
    </div>
  );
}