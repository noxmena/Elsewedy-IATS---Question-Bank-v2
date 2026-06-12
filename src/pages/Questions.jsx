import React, { useState, useMemo } from 'react';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  Filter,
  Eye,
  EyeOff,
  Smartphone,
  Server,
  CheckCircle,
  XCircle,
  ListChecks,
  GitCompare,
  MessageSquare,
  PenLine
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import TrueFalseCard from '@/components/questions/TrueFalseCard';
import MultipleChoiceCard from '@/components/questions/MultipleChoiceCard';
import MatchingCard from '@/components/questions/MatchingCard';
import ShortAnswerCard from '@/components/questions/ShortAnswerCard';
import FillBlankCard from '@/components/questions/FillBlankCard';
import CorrectionCard from '@/components/questions/CorrectionCard';
import TechnicalTermCard from '@/components/questions/TechnicalTermCard';

import { mobileQuestions, webApiQuestions } from '@/components/data/questions';
import { integratedMobileQuestions, integratedApiQuestions } from '@/components/data/integratedQuestions';
import { officialMobileQuestions, officialApiQuestions } from '@/components/data/officialQuestions';

export default function Questions() {
  const urlParams = new URLSearchParams(window.location.search);
  const subject = urlParams.get('subject') || 'mobile';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [questionType, setQuestionType] = useState('all');
  const [showAllAnswers, setShowAllAnswers] = useState(false);

  const subjectConfig = {
    mobile: {
      title: 'Mobile Applications',
      subtitle: 'Flutter & Cross-Platform Development',
      icon: Smartphone,
      gradient: 'from-violet-500 to-purple-600',
      questions: officialMobileQuestions
    },
    webapi: {
      title: 'ASP.NET Web API',
      subtitle: 'RESTful Services & Backend Development',
      icon: Server,
      gradient: 'from-emerald-500 to-teal-600',
      questions: officialApiQuestions
    },
    'integrated-mobile': {
      title: 'Mobile Development (Flutter)',
      subtitle: 'Integrated Software Development Specialization',
      icon: Smartphone,
      gradient: 'from-pink-500 to-rose-600',
      questions: integratedMobileQuestions
    },
    'integrated-api': {
      title: 'Web API Development',
      subtitle: 'Integrated Software Development Specialization',
      icon: Server,
      gradient: 'from-blue-500 to-cyan-600',
      questions: integratedApiQuestions
    },
    'official-mobile': {
      title: 'Flutter & Mobile Development',
      subtitle: 'Official Question Bank — Integrated Software Development',
      icon: Smartphone,
      gradient: 'from-orange-500 to-amber-500',
      questions: officialMobileQuestions
    },
    'official-api': {
      title: 'Web API & Backend Development',
      subtitle: 'Official Question Bank — Integrated Software Development',
      icon: Server,
      gradient: 'from-teal-500 to-green-600',
      questions: officialApiQuestions
    }
  };

  const config = subjectConfig[subject] || subjectConfig.mobile;
  const Icon = config.icon;

  const questionTypes = [
    { value: 'all', label: 'All Questions', icon: ListChecks },
    { value: 'trueFalse', label: 'True/False', icon: CheckCircle },
    { value: 'multipleChoice', label: 'Multiple Choice', icon: XCircle },
    { value: 'matching', label: 'Matching', icon: GitCompare },
    { value: 'fillBlank', label: 'Fill in Blank', icon: PenLine },
    { value: 'shortAnswer', label: 'Short Answer', icon: MessageSquare },
    { value: 'corrections', label: 'Corrections', icon: XCircle },
    { value: 'technicalTerms', label: 'Technical Terms', icon: MessageSquare },
  ];

  const filteredQuestions = useMemo(() => {
    let questions = config.questions;

    // Filter by type
    if (questionType !== 'all') {
      questions = {
        ...questions,
        trueFalse: questionType === 'trueFalse' ? questions.trueFalse : [],
        multipleChoice: questionType === 'multipleChoice' ? questions.multipleChoice : [],
        matching: questionType === 'matching' ? questions.matching : [],
        fillBlank: questionType === 'fillBlank' ? questions.fillBlank : [],
        shortAnswer: questionType === 'shortAnswer' ? questions.shortAnswer : [],
        corrections: questionType === 'corrections' ? questions.corrections : [],
        technicalTerms: questionType === 'technicalTerms' ? questions.technicalTerms : [],
      };
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      questions = {
        trueFalse: questions.trueFalse?.filter(q => q.question.toLowerCase().includes(query)) || [],
        multipleChoice: questions.multipleChoice?.filter(q => q.question.toLowerCase().includes(query)) || [],
        matching: questions.matching?.filter(q => 
          q.items?.some(item => item.columnA.toLowerCase().includes(query))
        ) || [],
        fillBlank: questions.fillBlank?.filter(q => q.question.toLowerCase().includes(query)) || [],
        shortAnswer: questions.shortAnswer?.filter(q => q.question.toLowerCase().includes(query)) || [],
        corrections: questions.corrections?.filter(q => q.question.toLowerCase().includes(query)) || [],
        technicalTerms: questions.technicalTerms?.filter(q => q.description.toLowerCase().includes(query)) || [],
      };
    }

    return questions;
  }, [config.questions, questionType, searchQuery]);

  const totalCount = 
    (filteredQuestions.trueFalse?.length || 0) +
    (filteredQuestions.multipleChoice?.length || 0) +
    (filteredQuestions.matching?.reduce((acc, m) => acc + (m.items?.length || 0), 0) || 0) +
    (filteredQuestions.fillBlank?.length || 0) +
    (filteredQuestions.shortAnswer?.reduce((acc, q) => acc + (String(q.number).includes('&') ? 2 : 1), 0) || 0) +
    (filteredQuestions.corrections?.length || 0) +
    (filteredQuestions.technicalTerms?.length || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className={`relative overflow-hidden bg-gradient-to-r ${config.gradient}`}>
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '20px 20px'}} />
        
        <div className="relative px-6 py-8">
          <div className="max-w-5xl mx-auto">
            <a 
              href={createPageUrl('Home')}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </a>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{config.title}</h1>
                <p className="text-white/70 text-sm">{config.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
            
            <div className="flex gap-3">
              <Select value={questionType} onValueChange={setQuestionType}>
                <SelectTrigger className="w-48 bg-white">
                  <SelectValue placeholder="Question Type" />
                </SelectTrigger>
                <SelectContent>
                  {questionTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <span className="flex items-center gap-2">
                        <type.icon className="w-4 h-4" />
                        {type.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => setShowAllAnswers(!showAllAnswers)}
                className="gap-2"
              >
                {showAllAnswers ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showAllAnswers ? 'Hide All' : 'Show All'}
              </Button>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
            <span>{totalCount} questions found</span>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* True/False Questions */}
          {filteredQuestions.trueFalse?.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800">True or False</h2>
                <span className="text-sm text-slate-500">({filteredQuestions.trueFalse.length})</span>
              </div>
              <div className="space-y-3">
                {filteredQuestions.trueFalse.map((q, idx) => (
                  <TrueFalseCard 
                    key={idx} 
                    question={q} 
                    index={idx}
                    showAnswer={showAllAnswers}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Multiple Choice Questions */}
          {filteredQuestions.multipleChoice?.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                  <ListChecks className="w-4 h-4 text-violet-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800">Multiple Choice</h2>
                <span className="text-sm text-slate-500">({filteredQuestions.multipleChoice.length})</span>
              </div>
              <div className="space-y-3">
                {filteredQuestions.multipleChoice.map((q, idx) => (
                  <MultipleChoiceCard 
                    key={idx} 
                    question={q} 
                    index={idx}
                    showAnswer={showAllAnswers}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Matching Questions */}
          {filteredQuestions.matching?.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <GitCompare className="w-4 h-4 text-emerald-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800">Matching</h2>
              </div>
              <div className="space-y-3">
                {filteredQuestions.matching.map((q, idx) => (
                  <MatchingCard 
                    key={idx} 
                    question={q} 
                    index={idx}
                    showAnswer={showAllAnswers}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Fill in Blank Questions */}
          {filteredQuestions.fillBlank?.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
                  <PenLine className="w-4 h-4 text-cyan-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800">Fill in the Blank</h2>
                <span className="text-sm text-slate-500">({filteredQuestions.fillBlank.length})</span>
              </div>
              <div className="space-y-3">
                {filteredQuestions.fillBlank.map((q, idx) => (
                  <FillBlankCard 
                    key={idx} 
                    question={q} 
                    index={idx}
                    showAnswer={showAllAnswers}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Short Answer Questions */}
          {filteredQuestions.shortAnswer?.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-amber-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800">Short Answer</h2>
                <span className="text-sm text-slate-500">({filteredQuestions.shortAnswer.length})</span>
              </div>
              <div className="space-y-3">
                {filteredQuestions.shortAnswer.map((q, idx) => (
                  <ShortAnswerCard 
                    key={idx} 
                    question={q} 
                    index={idx}
                    showAnswer={showAllAnswers}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Correction Questions */}
          {filteredQuestions.corrections?.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                  <XCircle className="w-4 h-4 text-orange-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800">Corrections</h2>
                <span className="text-sm text-slate-500">({filteredQuestions.corrections.length})</span>
              </div>
              <div className="space-y-3">
                {filteredQuestions.corrections.map((q, idx) => (
                  <CorrectionCard 
                    key={idx} 
                    question={q} 
                    index={idx}
                    showAnswer={showAllAnswers}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Technical Terms Questions */}
          {filteredQuestions.technicalTerms?.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-purple-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800">Technical Terms</h2>
                <span className="text-sm text-slate-500">({filteredQuestions.technicalTerms.length})</span>
              </div>
              <div className="space-y-3">
                {filteredQuestions.technicalTerms.map((q, idx) => (
                  <TechnicalTermCard 
                    key={idx} 
                    question={q} 
                    index={idx}
                    showAnswer={showAllAnswers}
                  />
                ))}
              </div>
            </section>
          )}

          {totalCount === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-700 mb-2">No questions found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Watermark */}
        <div className="mt-8 text-center text-slate-400 text-sm pb-4">
          Made by Mina Magdy
        </div>
      </div>
    </div>
  );
}