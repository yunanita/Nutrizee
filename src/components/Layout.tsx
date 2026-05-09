import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Apple, LayoutDashboard, Info, Scan, Menu, X, Languages, Phone, Shield, FileText, Sparkles, Droplets, Cookie } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

export const Layout = ({ 
  children, 
  activeTab, 
  setActiveTab 
}: { 
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full px-4 md:px-6 lg:px-12 py-3 lg:py-4 bg-white/70 backdrop-blur-xl border-b border-brand-caramel/5">
        <nav className="max-w-7xl mx-auto h-16 lg:h-20 flex items-center justify-between relative z-10">
          {/* Logo */}
          <div 
            className="flex items-center gap-1.5 md:gap-2 lg:gap-3 cursor-pointer group shrink-0"
            onClick={() => setActiveTab('home')}
          >
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 1, ease: "anticipate" }}
              className="w-9 h-9 md:w-11 md:h-11 lg:w-16 lg:h-16 rounded-[1rem] lg:rounded-[1.8rem] bg-linear-to-br from-brand-amber to-brand-honey flex items-center justify-center p-0 premium-shadow border-2 border-white/50"
            >
              <Apple className="text-white w-5 h-5 md:w-6 md:h-6 lg:w-10 lg:h-10" />
            </motion.div>
            <div className="hidden sm:block">
              <span className="text-base md:text-lg lg:text-2xl font-black tracking-tight text-brand-coffee leading-none block">Nutrizee</span>
              <span className="text-[6px] md:text-[7px] lg:text-[10px] uppercase tracking-widest text-brand-caramel font-black block mt-0.5">{t('wellnessAi')}</span>
            </div>
          </div>

          {/* Nav - Better Breakpoints and Spacing */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-8 text-[10px] lg:text-sm font-black uppercase tracking-widest">
            <button 
              onClick={() => setActiveTab('about')}
              className={cn(
                "transition-colors duration-300 py-1 px-1.5 lg:px-0",
                activeTab === 'about' ? "text-brand-honey border-b-2 border-brand-honey" : "text-brand-caramel hover:text-brand-honey"
              )}
            >
              {t('about')}
            </button>
            <button 
              onClick={() => setActiveTab('home')}
              className={cn(
                "transition-colors duration-300 py-1 px-1.5 lg:px-0",
                activeTab === 'home' ? "text-brand-honey border-b-2 border-brand-honey" : "text-brand-caramel hover:text-brand-honey"
              )}
            >
              {t('scanLabel')}
            </button>
            <button 
              onClick={() => setActiveTab('insights')}
              className={cn(
                "transition-colors duration-300 py-1 px-1.5 lg:px-0",
                activeTab === 'insights' ? "text-brand-honey border-b-2 border-brand-honey" : "text-brand-caramel hover:text-brand-honey"
              )}
            >
              {t('wellnessTrends')}
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 lg:gap-4 shrink-0">
            {/* Language Switch */}
            <div className="flex items-center bg-white/50 backdrop-blur-md rounded-full p-0.5 border border-brand-caramel/10">
              <button 
                onClick={() => setLanguage('en')}
                className={cn(
                  "px-1.5 lg:px-3 py-0.5 lg:py-1 rounded-full text-[8px] lg:text-[10px] font-black uppercase tracking-widest transition-all",
                  language === 'en' ? "bg-brand-caramel text-white shadow-md" : "text-brand-caramel"
                )}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('id')}
                className={cn(
                  "px-1.5 lg:px-3 py-0.5 lg:py-1 rounded-full text-[8px] lg:text-[10px] font-black uppercase tracking-widest transition-all",
                  language === 'id' ? "bg-brand-caramel text-white shadow-md" : "text-brand-caramel"
                )}
              >
                ID
              </button>
            </div>

            <button 
              onClick={() => setActiveTab('home')}
              className="btn-primary text-[10px] lg:text-sm px-3 lg:px-6 py-1.5 lg:py-3 hidden lg:block"
            >
              {t('tryItNow')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-brand-coffee"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 z-40 mx-6 md:hidden"
          >
            <div className="glass-card rounded-3xl p-6 flex flex-col gap-4 premium-shadow">
              <button 
                onClick={() => { setActiveTab('about'); setIsMenuOpen(false); }}
                className="flex items-center gap-3 p-4 rounded-2xl bg-brand-cream/50"
              >
                <Info className="text-brand-caramel" />
                <span className="font-bold text-brand-coffee">{t('about')}</span>
              </button>
              <button 
                onClick={() => { setActiveTab('home'); setIsMenuOpen(false); }}
                className="flex items-center gap-3 p-4 rounded-2xl bg-brand-cream/50"
              >
                <Scan className="text-brand-caramel" />
                <span className="font-bold text-brand-coffee">{t('scanLabel')}</span>
              </button>
              <button 
                onClick={() => { setActiveTab('insights'); setIsMenuOpen(false); }}
                className="flex items-center gap-3 p-4 rounded-2xl bg-brand-cream/50"
              >
                <LayoutDashboard className="text-brand-caramel" />
                <span className="font-bold text-brand-coffee">{t('insights')}</span>
              </button>
              <div className="flex justify-between items-center p-4">
                 <span className="text-xs font-black uppercase text-brand-coffee/40">Language</span>
                 <div className="flex gap-2">
                    <button onClick={() => setLanguage('en')} className={cn("px-2 py-1 rounded text-[10px] font-black", language === 'en' ? "bg-brand-caramel text-white" : "bg-brand-cream")}>EN</button>
                    <button onClick={() => setLanguage('id')} className={cn("px-2 py-1 rounded text-[10px] font-black", language === 'id' ? "bg-brand-caramel text-white" : "bg-brand-cream")}>ID</button>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
        <motion.div 
          animate={{ 
            y: [0, -40, 0], 
            rotate: [0, 15, 0],
            x: [0, 20, 0]
          }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[5%] text-brand-honey"
        >
          <Apple size={64} />
        </motion.div>
        <motion.div 
          animate={{ 
            y: [0, 50, 0], 
            rotate: [0, -20, 0],
            x: [0, -30, 0]
          }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[3%] text-brand-avocado"
        >
          <Sparkles size={80} />
        </motion.div>
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] right-[10%] text-brand-amber opacity-30"
        >
          <Droplets size={40} />
        </motion.div>
         <motion.div 
          animate={{ 
            y: [0, -100, 0],
            x: [0, 50, 0],
          }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[40%] left-[2%] text-brand-caramel opacity-30"
        >
          <Cookie size={40} />
        </motion.div>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pb-20 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-6 border-t border-brand-caramel/10 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-[1.5rem] bg-linear-to-br from-brand-amber to-brand-honey flex items-center justify-center p-0 premium-shadow">
              <Apple className="text-white w-9 h-9" />
            </div>
            <div>
              <span className="font-black text-brand-coffee text-xl block leading-none">Nutrizee</span>
              <span className="text-[10px] font-bold text-brand-caramel uppercase tracking-widest">{t('wellnessAi')}</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-brand-coffee/60">
            <button onClick={() => setActiveTab('privacy')} className="hover:text-brand-honey transition-colors flex items-center gap-1 text-[12px]">
              <Shield size={12} /> {t('privacy')}
            </button>
            <button onClick={() => setActiveTab('terms')} className="hover:text-brand-honey transition-colors flex items-center gap-1 text-[12px]">
              <FileText size={12} /> {t('terms')}
            </button>
            <button onClick={() => setActiveTab('contact')} className="hover:text-brand-honey transition-colors flex items-center gap-1 text-[12px]">
              <Phone size={12} /> {t('contact')}
            </button>
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-brand-coffee/40">
            © 2026 Nutrizee. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
