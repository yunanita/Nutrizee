import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Github, Linkedin, Mail, Heart, Code2, Rocket, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="py-12 space-y-20">
      <header className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-black text-brand-coffee tracking-tight">{t('contactTitle')}</h1>
        <p className="text-xl text-brand-coffee/60 font-medium max-w-2xl mx-auto">
          {t('contactSubtitle')}
        </p>
      </header>

      {/* Portfolio Section */}
      <section className="glass-card rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-honey/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
          <div className="shrink-0">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="w-64 h-64 md:w-80 md:h-80 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl relative bg-brand-cream"
            >
              <img 
                src="/src/assets/images/regenerated_image_1778327831550.jpg" 
                alt="Novia Yunanita" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Novia';
                }}
              />
            </motion.div>
          </div>

          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-honey/10 text-brand-caramel border border-brand-honey/20">
                 <Rocket size={14} />
                 <span className="text-[10px] font-black uppercase tracking-widest">{t('creatorRole')}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-brand-coffee">Novia Yunanita</h2>
              <p className="text-xl text-brand-caramel font-bold italic">
                {t('creatorBio')}
              </p>
              <p className="text-brand-coffee/70 font-medium leading-relaxed">
                {t('creatorGoalDetail')}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <a href="https://instagram.com/yunannv" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-white border border-brand-honey/10 hover:bg-brand-honey hover:text-white transition-all group">
                <Instagram size={20} className="text-brand-honey group-hover:text-white" />
                <span className="font-bold text-xs uppercase tracking-widest">Instagram</span>
              </a>
              <a href="https://github.com/yunanita" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-white border border-brand-honey/10 hover:bg-brand-honey hover:text-white transition-all group">
                <Github size={20} className="text-brand-honey group-hover:text-white" />
                <span className="font-bold text-xs uppercase tracking-widest">GitHub</span>
              </a>
              <a href="https://linkedin.com/in/noviayunanita" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-white border border-brand-honey/10 hover:bg-brand-honey hover:text-white transition-all group">
                <Linkedin size={20} className="text-brand-honey group-hover:text-white" />
                <span className="font-bold text-xs uppercase tracking-widest">LinkedIn</span>
              </a>
              <a href="mailto:yunanitav@gmail.com" className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-white border border-brand-honey/10 hover:bg-brand-honey hover:text-white transition-all group">
                <Mail size={20} className="text-brand-honey group-hover:text-white" />
                <span className="font-bold text-xs uppercase tracking-widest">Email</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details Section */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="glass-card rounded-[2.5rem] p-10 space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-brand-avocado text-white flex items-center justify-center">
            <Heart size={24} />
          </div>
          <h3 className="text-3xl font-black text-brand-coffee">{t('coreValue')}</h3>
          <p className="text-brand-coffee/60 font-medium leading-relaxed">
            {t('coreValueDesc')}
          </p>
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <Users className="text-brand-avocado" />
                <span className="font-bold text-brand-coffee">{t('targetAudienceTitle')}: {t('targetAudienceDesc')}</span>
             </div>
          </div>
        </div>

        <div className="glass-card rounded-[2.5rem] p-10 space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-brand-caramel text-white flex items-center justify-center">
            <Code2 size={24} />
          </div>
          <h3 className="text-3xl font-black text-brand-coffee">{t('builtWithAI')}</h3>
          <p className="text-brand-coffee/60 font-medium leading-relaxed">
            {t('builtWithAIDesc')}
          </p>
          <div className="flex flex-wrap gap-2">
            {['React 19', 'Vite', 'Gemini AI', 'Tailwind CSS', 'Framer Motion'].map(tech => (
              <span key={tech} className="px-3 py-1 rounded-full bg-brand-cream text-brand-caramel text-[10px] font-black uppercase tracking-widest border border-brand-caramel/10">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
