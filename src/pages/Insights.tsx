import React from 'react';
import { motion } from 'motion/react';
import { 
  History, 
  Calendar, 
  ChevronRight, 
  AlertCircle, 
  Trash2,
  TrendingUp,
  Activity,
  Droplets
} from 'lucide-react';
import { NutritionData, ScanHistory } from '../types';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';
import { ProfessorChibi } from '../components/ProfessorChibi';

interface InsightsProps {
  onViewHistory: (data: NutritionData) => void;
}

export const Insights = ({ onViewHistory }: InsightsProps) => {
  const [history, setHistory] = React.useState<ScanHistory[]>([]);
  const { t, language } = useLanguage();

  React.useEffect(() => {
    const saved = localStorage.getItem('nutrizee_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const deleteHistoryItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem('nutrizee_history', JSON.stringify(newHistory));
  };

  const avgScore = history.length > 0 
    ? Math.round(history.reduce((acc, curr) => acc + curr.score, 0) / history.length) 
    : 0;

  return (
    <div className="py-12 space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-3 text-brand-honey">
          <TrendingUp size={24} />
          <h2 className="text-sm font-black uppercase tracking-widest">{t('wellnessTrends')}</h2>
        </div>
        <h1 className="text-5xl font-black text-brand-coffee tracking-tight">{t('insights')}</h1>
        <p className="text-brand-coffee/60 font-medium max-w-xl">
          {t('historySubtitle')}
        </p>
      </header>

      <div className="max-w-4xl mx-auto">
        <ProfessorChibi 
          message={language === 'en' ? "Your privacy is my priority! All scan history is stored strictly on this device. No one else can see your data." : "Privasi Anda adalah prioritas saya! Semua riwayat pemindaian disimpan secara eksklusif di perangkat ini. Tidak ada orang lain yang bisa melihat data Anda."} 
          type="info" 
        />
      </div>

      {history.length > 0 ? (
        <>
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-3xl p-6 flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-brand-avocado/10 flex items-center justify-center text-brand-avocado">
                <Activity size={32} />
              </div>
              <div>
                <span className="text-[10px] font-black text-brand-coffee/40 uppercase tracking-widest block mb-1">{t('averageScore')}</span>
                <span className="text-4xl font-black text-brand-coffee">{avgScore}</span>
              </div>
            </div>
            <div className="glass-card rounded-3xl p-6 flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-brand-honey/10 flex items-center justify-center text-brand-honey">
                <History size={32} />
              </div>
              <div>
                <span className="text-[10px] font-black text-brand-coffee/40 uppercase tracking-widest block mb-1">{t('totalScans')}</span>
                <span className="text-4xl font-black text-brand-coffee">{history.length}</span>
              </div>
            </div>
            <div className="glass-card rounded-3xl p-6 flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-brand-alert/10 flex items-center justify-center text-brand-alert">
                <Droplets size={32} />
              </div>
              <div>
                <span className="text-[10px] font-black text-brand-coffee/40 uppercase tracking-widest block mb-1">{t('criticalAlerts')}</span>
                <span className="text-4xl font-black text-brand-coffee">
                  {history.filter(h => h.color === 'Red').length}
                </span>
              </div>
            </div>
          </div>

          {/* History List */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-brand-coffee italic flex items-center gap-2 px-2">
              {t('historyTitle')}
              <span className="w-1.5 h-1.5 rounded-full bg-brand-honey" />
            </h3>
            
            <div className="grid gap-4">
              {history.map((item, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={item.id}
                  onClick={() => onViewHistory(item.data)}
                  className="glass-card group rounded-3xl p-4 flex flex-col md:flex-row items-center gap-6 hover:bg-white transition-all hover:premium-shadow cursor-pointer border border-transparent hover:border-brand-honey/30"
                >
                  <div className="w-24 h-24 md:w-20 md:h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-brand-cream/50 shadow-sm relative">
                    <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                    <div className={cn(
                      "absolute inset-0 opacity-20",
                      item.color === 'Green' ? 'bg-brand-avocado' : item.color === 'Yellow' ? 'bg-brand-amber' : 'bg-brand-alert'
                    )} />
                  </div>
                  
                    <div className="flex-1 space-y-1.5 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <span className="text-[10px] font-black text-brand-coffee/30 uppercase tracking-widest">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-brand-honey uppercase tracking-[0.1em]">{item.data.productOverview.category}</h4>
                      <h3 className="text-xl font-extrabold text-brand-coffee leading-tight">
                        {item.productName && !['this', 'while', 'no', 'unknown'].includes(item.productName.toLowerCase()) 
                          ? item.productName 
                          : item.data.productOverview.type}
                      </h3>
                      <p className="text-xs font-semibold text-brand-coffee/50 line-clamp-1 max-w-sm">
                        {item.data.consumerFriendlySummary}
                      </p>
                    </div>

                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                    <div className="flex flex-col items-center md:items-end">
                      <span className={cn(
                        "text-3xl font-black",
                        item.color === 'Green' ? 'text-brand-avocado' : item.color === 'Yellow' ? 'text-brand-amber' : 'text-brand-alert'
                      )}>
                        {item.score}
                      </span>
                      <span className="text-[8px] font-black text-brand-coffee/30 uppercase tracking-[0.2em] mt-[-4px]">Rating</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => deleteHistoryItem(e, item.id)}
                        className="p-3 rounded-2xl bg-brand-alert/10 text-brand-alert hover:bg-brand-alert hover:text-white transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                      <div className="p-3 rounded-2xl bg-brand-cream text-brand-caramel group-hover:bg-brand-honey group-hover:text-white transition-all">
                        <ChevronRight size={18} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="glass-card rounded-[3rem] p-20 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-brand-honey/10" />
          <ProfessorChibi message={t('noHistorySubtitle')} type="info" />
          <div className="space-y-4">
            <h3 className="text-3xl font-black text-brand-coffee">{t('noHistory')}</h3>
            <p className="text-xl text-brand-coffee/50 font-medium max-w-md mx-auto">{t('noHistorySubtitle')}</p>
          </div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-4 rounded-full bg-brand-honey text-white font-black uppercase tracking-widest text-sm premium-shadow hover:scale-105 transition-transform"
          >
            {t('scanLabel')}
          </button>
        </div>
      )}
    </div>
  );
};
