import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const ProfessorChibi = ({ message, type = 'info' }: { message: string, type?: 'info' | 'warning' | 'success' }) => {
  const { t } = useLanguage();
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white/80 backdrop-blur-md rounded-[2.5rem] border-2 border-brand-honey/30 premium-shadow relative overflow-hidden group"
    >
      {/* Background cute shapes */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-honey/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-brand-avocado/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      {/* The Chibi Character - Cute stylized mascot */}
      <div className="relative shrink-0 flex flex-col items-center">
        <motion.div 
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="relative w-28 h-28 flex items-center justify-center p-0"
        >
          {/* Main Body/Head - Rounded Chibi Shape */}
          <div className="absolute inset-0 bg-linear-to-br from-[#FFD166] to-[#F4A259] rounded-[3.5rem] shadow-2xl border-4 border-white overflow-hidden" />
          
          {/* Hair - Cute messy tuft */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-10 bg-brand-coffee rounded-t-full z-30" />
          <div className="absolute top-0 right-4 w-6 h-6 bg-brand-coffee rounded-full z-30" />
          
          {/* Blushing cheeks */}
          <div className="absolute top-[55px] left-4 w-5 h-3 bg-brand-alert/20 blur-[4px] rounded-full z-20" />
          <div className="absolute top-[55px] right-4 w-5 h-3 bg-brand-alert/20 blur-[4px] rounded-full z-20" />

          {/* Cute Face */}
          <div className="relative z-20 flex flex-col items-center gap-2 mt-4">
            <div className="flex gap-10">
              {/* Eyes with complex blink */}
              <motion.div 
                animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.95, 1, 1] }}
                className="w-4 h-4 rounded-full bg-brand-coffee relative"
              >
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full opacity-80" />
              </motion.div>
              <motion.div 
                animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.95, 1, 1] }}
                className="w-4 h-4 rounded-full bg-brand-coffee relative"
              >
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full opacity-80" />
              </motion.div>
            </div>

            {/* Chibi Smile */}
            <motion.div 
              animate={{ scaleX: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-8 h-4 border-b-4 border-brand-coffee rounded-full"
            />
          </div>

          {/* Chibi Glasses */}
          <div className="absolute top-[40px] w-full px-1 flex justify-between z-10 pointer-events-none">
             <div className="w-12 h-12 rounded-full border-4 border-brand-coffee/10 bg-white/30 backdrop-blur-[2px]" />
             <div className="w-12 h-12 rounded-full border-4 border-brand-coffee/10 bg-white/30 backdrop-blur-[1px]" />
          </div>
          
          {/* Lab Coat */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-20 h-8 flex z-10">
             <div className="flex-1 bg-white skew-x-[-15deg] rounded-bl-3xl shadow-sm border-l border-brand-cream" />
             <div className="flex-1 bg-white skew-x-[15deg] rounded-br-3xl shadow-sm border-r border-brand-cream" />
          </div>

          <motion.div
            animate={{ 
              rotate: [0, 15, -15, 0],
              y: [0, -5, 5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -top-4 -right-4"
          >
            <Sparkles className="text-brand-honey drop-shadow-md" size={24} />
          </motion.div>
        </motion.div>
        
        {/* Shadow */}
        <motion.div 
          animate={{ 
            scale: [1, 0.7, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="w-16 h-3 bg-brand-coffee/20 rounded-full mt-4 blur-md"
        />
      </div>

      <div className="flex-1 space-y-2 text-center md:text-left relative z-10">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <span className="text-[10px] font-black text-brand-honey uppercase tracking-widest">
            {t('professorSays')}
          </span>
          <div className="flex gap-1">
             {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-brand-honey/30" />)}
          </div>
        </div>
        <p className="text-lg font-bold text-brand-coffee leading-tight italic">
          "{message}"
        </p>
      </div>
    </motion.div>
  );
};
