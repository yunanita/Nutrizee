import React from 'react';
import { motion } from 'motion/react';
import { 
  Apple, 
  Heart, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  BrainCircuit, 
  Eye, 
  Filter,
  Camera,
  Cpu,
  Smartphone
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';
import { ProfessorChibi } from '../components/ProfessorChibi';

export const About = () => {
  const { t } = useLanguage();

  return (
    <div className="py-12 space-y-20">
      {/* Narrative Section */}
      <section className="max-w-4xl mx-auto text-center space-y-8">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="inline-flex items-center gap-2 mb-4"
        >
          <div className="h-px w-8 bg-brand-honey" />
          <span className="text-xs font-black text-brand-honey uppercase tracking-widest">{t('mission')}</span>
          <div className="h-px w-8 bg-brand-honey" />
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-black text-brand-coffee tracking-tight leading-[1.1]">
          {t('aboutTagline').split('. ').map((part, i) => (
            <React.Fragment key={i}>
              {i === 1 ? <span className="gradient-text italic italic">{part}</span> : part}
              {i === 0 && ". "}
            </React.Fragment>
          ))}
        </h1>

        <p className="text-xl md:text-2xl text-brand-coffee/70 font-medium leading-relaxed">
          {t('appMissionDesc')}
        </p>

        {/* Platform Overview */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-16 glass-card rounded-[3.5rem] p-8 md:p-12 relative overflow-hidden bg-brand-honey/5 border-2 border-brand-honey/10 text-left"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
            <div className="shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-brand-honey flex items-center justify-center text-white shadow-lg">
                <BrainCircuit size={40} />
              </div>
            </div>
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-honey/20 text-brand-honey border border-brand-honey/30">
                 <Sparkles size={12} />
                 <span className="text-[10px] font-black uppercase tracking-widest">{t('platformOverview')}</span>
              </div>
              <p className="text-lg md:text-xl text-brand-coffee font-bold leading-relaxed">
                {t('appDescription')}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 pt-12">
           <div className="space-y-4">
             <div className="w-16 h-16 rounded-3xl bg-brand-honey/10 mx-auto flex items-center justify-center text-brand-honey">
                <Search size={32} />
             </div>
             <h3 className="font-extrabold text-brand-coffee">{t('unmaskingJargon')}</h3>
             <p className="text-sm font-medium text-brand-coffee/50">{t('unmaskingJargonDesc')}</p>
           </div>
           <div className="space-y-4">
             <div className="w-16 h-16 rounded-3xl bg-brand-avocado/10 mx-auto flex items-center justify-center text-brand-avocado">
                <Sparkles size={32} />
             </div>
             <h3 className="font-extrabold text-brand-coffee">{t('instantAnalysis')}</h3>
             <p className="text-sm font-medium text-brand-coffee/50">{t('instantAnalysisDesc')}</p>
           </div>
           <div className="space-y-4">
             <div className="w-16 h-16 rounded-3xl bg-brand-honey/10 mx-auto flex items-center justify-center text-brand-honey">
                <Heart size={32} />
             </div>
             <h3 className="font-extrabold text-brand-coffee">{t('wellnessFirst')}</h3>
             <p className="text-sm font-medium text-brand-coffee/50">{t('wellnessFirstDesc')}</p>
           </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="glass-card rounded-[3.5rem] p-12 md:p-20 relative overflow-hidden bg-brand-cream/20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-black text-brand-coffee">{t('howItWorks')}</h2>
          <div className="w-20 h-1.5 bg-brand-honey mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative z-10">
          {[
            { 
              step: "01",
              icon: Camera, 
              title: t('howToUseStep1'), 
              desc: t('howToUseStep1Desc'),
              color: "text-brand-amber bg-brand-amber/10"
            },
            { 
              step: "02",
              icon: Cpu, 
              title: t('howToUseStep2'), 
              desc: t('howToUseStep2Desc'),
              color: "text-brand-honey bg-brand-honey/10"
            },
            { 
              step: "03",
              icon: Smartphone, 
              title: t('howToUseStep3'), 
              desc: t('howToUseStep3Desc'),
              color: "text-brand-avocado bg-brand-avocado/10"
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="text-center space-y-6 group"
            >
              <div className="relative mx-auto w-24 h-24">
                <div className={cn("w-full h-full rounded-[2rem] flex items-center justify-center premium-shadow group-hover:scale-110 transition-transform", item.color)}>
                  <item.icon size={40} />
                </div>
                <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white border border-brand-honey/20 flex items-center justify-center text-xs font-black text-brand-honey premium-shadow">
                  {item.step}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-black text-brand-coffee">{item.title}</h4>
                <p className="text-sm font-medium text-brand-coffee/50 leading-relaxed px-4">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Background Visual Elements */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-brand-honey/10 -translate-y-1/2 hidden md:block" />
      </section>

      {/* Noble Mission Section */}
      <section className="text-center max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
           <h2 className="text-4xl font-black text-brand-coffee">{t('coreValue')}</h2>
           <p className="text-xl text-brand-caramel font-medium leading-relaxed italic opacity-80">
             {t('coreValueDesc')}
           </p>
           <div className="pt-6 flex justify-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-brand-avocado/10 text-brand-avocado border border-brand-avocado/20">
                 <ShieldCheck size={20} />
                 <span className="text-sm font-black uppercase tracking-widest text-[10px] md:text-xs">On-Device Privacy (No Login Needed)</span>
              </div>
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
           <div className="glass-card p-10 rounded-[3rem] text-left space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-honey/10 text-brand-honey flex items-center justify-center">
                 <ShieldCheck size={24} />
              </div>
              <h3 className="text-2xl font-black text-brand-coffee">{t('targetAudienceTitle')}</h3>
              <p className="text-brand-coffee/60 font-medium leading-relaxed">
                 {t('targetAudienceDesc')}
              </p>
           </div>
           <div className="glass-card p-10 rounded-[3rem] text-left space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-avocado/10 text-brand-avocado flex items-center justify-center">
                 <Sparkles size={24} />
              </div>
              <h3 className="text-2xl font-black text-brand-coffee">{t('builtWithAI')}</h3>
              <p className="text-brand-coffee/60 font-medium leading-relaxed">
                 {t('builtWithAIDesc')}
              </p>
           </div>
        </div>
      </section>
    </div>
  );
};
