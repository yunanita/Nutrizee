import React from 'react';
import { motion } from 'motion/react';
import { Apple, Sparkles, BrainCircuit, History } from 'lucide-react';
import { UploadZone } from '../components/UploadZone';
import { NutritionReport } from '../components/NutritionReport';
import { NutritionData, ScanHistory } from '../types';
import { analyzeNutritionLabel } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';

interface HomeProps {
  initialResult?: NutritionData | null;
}

export const Home = ({ initialResult }: HomeProps) => {
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [result, setResult] = React.useState<NutritionData | null>(initialResult || null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (initialResult) {
      setResult(initialResult);
    }
  }, [initialResult]);
  const { t, language } = useLanguage();

  const handleAnalyze = async (image: string) => {
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeNutritionLabel(image);
      setResult(data);
      
      // Play aesthetic success sound
      const audio = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_731427181c.mp3'); // A better bubble/ding sound
      audio.volume = 0.3;
      audio.play().catch(() => {}); // Silent fail
      
      // Save to history
      const historyItem: ScanHistory = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        productName: data.productOverview.productName || 'Unknown Product',
        score: data.overallHealthScore.score,
        color: data.overallHealthScore.color,
        imageUrl: image,
        data: data
      };
      
      const existingHistory = JSON.parse(localStorage.getItem('nutrizee_history') || '[]');
      localStorage.setItem('nutrizee_history', JSON.stringify([historyItem, ...existingHistory].slice(0, 20)));

    } catch (err: any) {
      setError("We couldn't analyze this image. Please ensure the label is clearly visible and try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="py-8 md:py-12 space-y-20 lg:space-y-32">
      {/* Hero */}
      {!result ? (
        <>
          <section className="flex flex-col lg:flex-row items-center gap-12 lg:min-h-[70vh]">
            {/* Left Column */}
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-honey/10 text-brand-caramel border border-brand-honey/20 mb-4"
              >
                <Sparkles size={16} />
                <span className="text-xs font-black uppercase tracking-widest text-[#F4A259]">{t('instantAnalysis')}</span>
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-brand-coffee tracking-tight">
                {t('heroTitle').split(' ').map((word, i) => (
                  <span key={i}>
                    {word === 'Exactly' || word === 'Tepat' ? <span className="text-brand-honey">{word}</span> : word}{' '}
                  </span>
                ))}
              </h1>
              
              <p className="text-base md:text-xl text-brand-caramel font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                {t('heroSubtitle')}
              </p>

              <div className="pt-4 max-w-xl mx-auto lg:mx-0">
                <UploadZone onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
                
                {error && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="mt-6 p-4 rounded-2xl bg-brand-alert/10 text-brand-alert font-bold text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right Column: Visual Mockup */}
            <div className="flex-1 w-full relative hidden lg:flex items-center justify-center overflow-hidden">
               {/* Result Card Mockup */}
               <motion.div 
                 initial={{ rotate: 5, y: 50, opacity: 0 }}
                 animate={{ rotate: 0, y: 0, opacity: 1 }}
                 transition={{ delay: 0.2, duration: 0.8 }}
                 className="w-full max-w-[480px] glass-card rounded-[40px] p-8 border border-white flex flex-col gap-6 scale-90 xxl:scale-100"
               >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="px-3 py-1 bg-brand-cream text-brand-honey text-[10px] font-bold uppercase rounded-full tracking-wider">{t('analysisReport')}</span>
                      <h2 className="text-2xl font-bold text-brand-coffee mt-3">ChocoMalt Instant Drink</h2>
                      <p className="text-xs text-brand-caramel font-semibold">{t('detected')}: {language === 'en' ? 'Sweetened Beverage Mix' : 'Campuran Minuman Manis'}</p>
                    </div>
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <svg className="absolute w-full h-full rotate-[-90deg]">
                        <circle cx="40" cy="40" r="34" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                        <circle cx="40" cy="40" r="34" stroke="#F6C453" strokeWidth="8" strokeDasharray="213.6" strokeDashoffset="60" fill="none" strokeLinecap="round" />
                      </svg>
                      <span className="text-xl font-black text-brand-coffee">72</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-brand-beige p-3 rounded-2xl border border-brand-honey/10 text-center">
                      <p className="text-[10px] uppercase text-brand-caramel font-bold tracking-tight">{t('calories')}</p>
                      <p className="text-lg font-black text-brand-coffee">160</p>
                    </div>
                    <div className="bg-brand-beige p-3 rounded-2xl border border-brand-honey/10 text-center">
                      <p className="text-[10px] uppercase text-brand-caramel font-bold tracking-tight">{t('sugar')}</p>
                      <p className="text-lg font-black text-brand-alert">24g</p>
                    </div>
                    <div className="bg-brand-beige p-3 rounded-2xl border border-brand-honey/10 text-center">
                      <p className="text-[10px] uppercase text-brand-caramel font-bold tracking-tight">{t('protein')}</p>
                      <p className="text-lg font-black text-brand-avocado">4g</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-4 p-4 bg-brand-cream rounded-2xl border border-brand-amber/30 text-left">
                      <div className="w-8 h-8 shrink-0 rounded-full bg-brand-amber flex items-center justify-center text-white font-black">!</div>
                      <div className="text-xs leading-tight text-left">
                        <p className="font-bold text-brand-coffee">{t('misleadingServing')}</p>
                        <p className="text-brand-caramel mt-1 text-left">{t('misleadingServingDesc')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 bg-white border border-brand-honey/30 rounded-full text-[10px] font-bold text-brand-caramel">Non-GMO</span>
                    <span className="px-3 py-1 bg-white border border-brand-alert/30 rounded-full text-[10px] font-bold text-brand-alert">{t('highSodium')}</span>
                    <span className="px-3 py-1 bg-white border border-brand-avocado/30 rounded-full text-[10px] font-bold text-brand-avocado">{t('glutenFree')}</span>
                  </div>
               </motion.div>

               <div className="absolute top-10 left-10 w-24 h-24 bg-brand-avocado/20 rounded-full blur-2xl animate-pulse" />
               <div className="absolute bottom-20 right-10 w-32 h-32 bg-brand-honey/20 rounded-full blur-3xl animate-pulse" />
            </div>
          </section>

          {/* Quick Steps Section - Moved from About to Home for visibility */}
          <section className="py-12 border-t border-brand-honey/10">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-black text-brand-coffee">{t('howItWorks')}</h2>
              <div className="w-12 h-1 bg-brand-honey mx-auto rounded-full" />
            </div>

            <div className="grid sm:grid-cols-3 gap-8 lg:gap-16">
              {[
                { 
                  icon: "📸", 
                  title: t('howToUseStep1'), 
                  desc: t('howToUseStep1Desc'),
                  bg: "bg-brand-amber/10"
                },
                { 
                  icon: "⚡", 
                  title: t('howToUseStep2'), 
                  desc: t('howToUseStep2Desc'),
                  bg: "bg-brand-honey/10"
                },
                { 
                  icon: "🥗", 
                  title: t('howToUseStep3'), 
                  desc: t('howToUseStep3Desc'),
                  bg: "bg-brand-avocado/10"
                }
              ].map((item, i) => (
                <div key={i} className="text-center space-y-4 px-4">
                  <div className={`w-16 h-16 ${item.bg} rounded-3xl mx-auto flex items-center justify-center text-3xl premium-shadow`}>
                    {item.icon}
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-brand-coffee">{item.title}</h4>
                  <p className="text-xs font-bold text-brand-caramel/70 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
            <div className="flex items-center justify-between flex-wrap gap-4 px-4">
            <button 
              onClick={() => setResult(null)}
              className="px-6 py-3 rounded-full bg-white text-brand-coffee font-black uppercase tracking-widest text-xs premium-shadow hover:bg-brand-honey/10 transition-colors flex items-center gap-2"
            >
              <Sparkles size={14} className="text-brand-honey" />
              {t('scanOther')}
            </button>
            <div className="h-px flex-1 bg-brand-caramel/10 hidden sm:block" />
            <span className="text-xs font-bold text-brand-coffee/40 uppercase tracking-widest">{t('reportId')}: {Math.random().toString(36).substr(2, 9)}</span>
          </div>
          
          <NutritionReport data={result} />
        </motion.div>
      )}
    </div>
  );
};
