import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, ChevronRight, Cpu, Database } from 'lucide-react';

const specializations = [
  {
    id: 'integration',
    title: 'Integrated Software Development',
    subtitle: 'Flutter, Mobile Apps & ASP.NET Web API',
    description: '200 official questions covering Flutter/Dart, Mobile Development, RESTful APIs, Entity Framework & more.',
    icon: Cpu,
    gradient: 'from-violet-500 via-indigo-500 to-blue-500',
    bgGlow: 'shadow-violet-200/60',
    link: '/Home',
    topics: ['Flutter & Dart', 'Mobile Apps', 'Web API', 'EF Core', 'REST', 'JWT'],
    count: 200,
  },
  {
    id: 'is',
    title: 'Information System',
    subtitle: 'System Analysis, SDLC, UML & Cybersecurity',
    description: '155+ questions covering System Analysis & Design, UML Diagrams, SDLC models, and Cybersecurity fundamentals.',
    icon: Database,
    gradient: 'from-blue-500 via-indigo-500 to-violet-500',
    bgGlow: 'shadow-blue-200/60',
    link: '/ISHome',
    topics: ['System Analysis', 'UML Diagrams', 'SDLC Models', 'Cybersecurity', 'ERD', 'Encryption'],
    count: 155,
  },
];

export default function MainHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative px-6 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm mb-6">
              <GraduationCap className="w-4 h-4" />
              Elsewedy IATS — Question Banks
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
              Choose Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300">
                Specialization
              </span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Select the specialization to access its complete question bank, quiz mode, and study tools.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {specializations.map((spec, index) => {
            const Icon = spec.icon;
            return (
              <motion.div
                key={spec.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={spec.link}>
                  <div className={`group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl ${spec.bgGlow} hover:-translate-y-1 transition-all duration-300`}>
                    {/* Top gradient bar */}
                    <div className={`h-1.5 bg-gradient-to-r ${spec.gradient}`} />

                    <div className="p-6">
                      {/* Icon + count */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${spec.gradient} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                          {spec.count}+ Questions
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-slate-800 mb-1">{spec.title}</h2>
                      <p className="text-sm text-slate-500 mb-1">{spec.subtitle}</p>
                      <p className="text-xs text-slate-400 leading-relaxed mb-5">{spec.description}</p>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {spec.topics.map(t => (
                          <span key={t} className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">{t}</span>
                        ))}
                      </div>

                      <div className={`flex items-center gap-2 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${spec.gradient} group-hover:gap-3 transition-all`}>
                        <span>Enter Specialization</span>
                        <ChevronRight className={`w-4 h-4 text-indigo-500 group-hover:translate-x-1 transition-transform`} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center text-slate-400 text-sm mt-10">
          Made by Mina Magdy
        </div>
      </div>
    </div>
  );
}