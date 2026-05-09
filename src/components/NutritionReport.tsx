import React from 'react';
import { motion } from 'motion/react';
import { 
  FlaskConical, 
  Flame, 
  Activity, 
  Zap, 
  AlertTriangle, 
  ShieldCheck, 
  BadgeCheck,
  ChevronRight,
  Info,
  Droplets,
  Beef,
  Sparkles
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { NutritionData } from '../types';
import { cn } from '../lib/utils';
import { ProfessorChibi } from './ProfessorChibi';
import { useLanguage } from '../contexts/LanguageContext';

interface NutritionReportProps {
  data: NutritionData;
}

const ScoreBadge = ({ score, color }: { score: number, color: string }) => {
  const getColors = () => {
    switch (color) {
      case 'Green': return 'from-brand-avocado to-green-600 shadow-brand-avocado/30';
      case 'Yellow': return 'from-brand-amber to-orange-400 shadow-brand-amber/30';
      case 'Red': return 'from-brand-alert to-red-600 shadow-brand-alert/30';
      default: return 'from-brand-caramel to-brand-honey';
    }
  };

  return (
    <div className={cn(
      "relative w-32 h-32 md:w-32 md:h-32 rounded-full bg-linear-to-br p-1 shadow-2xl transition-transform hover:scale-105 duration-500",
      getColors()
    )}>
      <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center p-2">
         <svg className="absolute w-full h-full rotate-[-90deg]">
            <circle cx="64" cy="64" r="54" stroke="#E5E7EB" strokeWidth="8" fill="none" className="md:cx-[64] md:cy-[64] md:r-[54] cx-[64] cy-[64] r-[54]" />
            <circle 
              cx="64" cy="64" r="54" 
              stroke={color === 'Green' ? '#7BAE7F' : color === 'Yellow' ? '#F6C453' : '#D96C4A'} 
              strokeWidth="8" 
              strokeDasharray="339.29" 
              strokeDashoffset={339.29 - (339.29 * score / 100)} 
              fill="none" 
              strokeLinecap="round" 
              className="transition-all duration-1000 ease-out"
            />
         </svg>
        <span className="text-4xl font-black text-brand-coffee leading-tight z-10">{score}</span>
      </div>
    </div>
  );
};

const NutritionCard = ({ icon: Icon, label, value, unit, subtext, colorClass }: any) => (
  <div className="glass-card rounded-[2rem] p-6 hover:translate-y-[-4px] transition-transform duration-300">
    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 premium-shadow", colorClass)}>
      <Icon size={24} className="text-white" />
    </div>
    <div className="space-y-1">
      <span className="text-[10px] font-extrabold text-brand-coffee/40 uppercase tracking-widest">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black text-brand-coffee">{value}</span>
        <span className="text-xs font-bold text-brand-coffee/40">{unit}</span>
      </div>
      {subtext && <p className="text-[10px] font-semibold text-brand-coffee/60 leading-tight pt-1">{subtext}</p>}
    </div>
  </div>
);

export const NutritionReport = ({ data }: NutritionReportProps) => {
  const { t } = useLanguage();
  const chartData = [
    { name: 'Sugar', value: parseFloat(data.nutritionSummary.sugar) || 0, fill: '#F4A259' },
    { name: 'Protein', value: parseFloat(data.nutritionSummary.protein) || 0, fill: '#7BAE7F' },
    { name: 'Fat', value: parseFloat(data.nutritionSummary.totalFat) || 0, fill: '#8B5E3C' },
    { name: 'Carbs', value: (parseFloat(data.nutritionSummary.carbohydrates) || 0) - (parseFloat(data.nutritionSummary.sugar) || 0), fill: '#F6C453' },
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-12 py-8">
      {/* Hero Section */}
      <div className="glass-card rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-honey/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start relative z-10">
          <div className="flex-shrink-0">
            <ScoreBadge score={data.overallHealthScore.score} color={data.overallHealthScore.color} />
          </div>
          
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-brand-honey/10 text-brand-caramel text-[10px] font-black uppercase tracking-widest border border-brand-honey/20">
                  {data.productOverview.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-brand-caramel/10 text-brand-caramel text-[10px] font-black uppercase tracking-widest border border-brand-caramel/20">
                  {data.productOverview.type}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-brand-coffee mb-4 leading-tight">
                {data.overallHealthScore.summary}
              </h2>
              <p className="text-lg text-brand-coffee/60 font-medium leading-relaxed max-w-2xl">
                {data.consumerFriendlySummary}
              </p>
            </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-honey" />
                <span className="text-xs font-bold text-brand-coffee/70 uppercase tracking-widest">{t('analysisConfirmed')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-avocado" />
                <span className="text-xs font-bold text-brand-coffee/70 uppercase tracking-widest">{t('premiumAi')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professor Chibi Summary */}
      <ProfessorChibi message={data.overallHealthScore.summary} />

      {/* Grid: Nutrition Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <NutritionCard 
          icon={Flame} 
          label={t('energy')} 
          value={data.nutritionSummary.calories} 
          unit={data.nutritionSummary.units.calories || 'kcal'} 
          colorClass="bg-brand-honey"
        />
        <NutritionCard 
          icon={Activity} 
          label={t('sugar')} 
          value={data.nutritionSummary.sugar} 
          unit={data.nutritionSummary.units.sugar || 'g'} 
          subtext={data.assessments.sugar.explanation}
          colorClass={data.assessments.sugar.level === 'High' || data.assessments.sugar.level === 'Very High' ? 'bg-brand-alert' : 'bg-brand-honey/50'}
        />
        <NutritionCard 
          icon={Beef} 
          label={t('protein')} 
          value={data.nutritionSummary.protein} 
          unit={data.nutritionSummary.units.protein || 'g'} 
          subtext={data.assessments.protein.impact}
          colorClass="bg-brand-avocado"
        />
        <NutritionCard 
          icon={Droplets} 
          label={t('sodium')} 
          value={data.nutritionSummary.sodium} 
          unit={data.nutritionSummary.units.sodium || 'mg'} 
          subtext={data.assessments.sodium.explanation}
          colorClass={data.assessments.sodium.level === 'High' ? 'bg-brand-alert' : 'bg-brand-caramel/40'}
        />
        <NutritionCard 
          icon={Zap} 
          label={t('fat')} 
          value={data.nutritionSummary.totalFat} 
          unit={data.nutritionSummary.units.totalFat || 'g'} 
          subtext={data.assessments.fat.explanation}
          colorClass="bg-brand-caramel"
        />
        <NutritionCard 
          icon={Activity} 
          label={t('fiber')} 
          value={data.nutritionSummary.fiber} 
          unit={data.nutritionSummary.units.fiber || 'g'} 
          colorClass="bg-brand-honey/80"
        />
      </div>

      {/* Main Content Sections */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Column: Visual Analytics & Serving Size */}
        <div className="lg:col-span-12 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Composition Chart */}
            <div className="glass-card rounded-[2.5rem] p-8 min-h-[400px] flex flex-col">
              <h3 className="text-2xl font-black text-brand-coffee mb-6">{t('macronutrients')}</h3>
              <div className="flex-1 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '16px', 
                        border: 'none', 
                        backgroundColor: '#FFF', 
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)' 
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                {chartData.map((d) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.fill }} />
                    <span className="text-xs font-bold text-brand-coffee/60 uppercase">{d.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Serving Size Analysis */}
            <div className="glass-card rounded-[2.5rem] p-8 border-l-8 border-brand-honey">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-honey/10 flex items-center justify-center text-brand-honey">
                   <BadgeCheck size={24} />
                </div>
                <h3 className="text-2xl font-black text-brand-coffee uppercase">{t('servingInsights')}</h3>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-brand-cream/50">
                    <span className="text-[10px] font-black text-brand-caramel uppercase tracking-widest block mb-1">{t('perServing')}</span>
                    <span className="text-xl font-black text-brand-coffee">{data.servingSizeAnalysis.labelServingSize}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-brand-cream/50">
                    <span className="text-[10px] font-black text-brand-caramel uppercase tracking-widest block mb-1">{t('inPackage')}</span>
                    <span className="text-xl font-black text-brand-coffee">{data.servingSizeAnalysis.servingsPerContainer}</span>
                  </div>
                </div>
                
                <div className="bg-brand-coffee/5 p-6 rounded-3xl">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-lg bg-brand-honey flex items-center justify-center text-white shrink-0 mt-1">
                      <ChevronRight size={14} />
                    </div>
                    <p className="text-lg font-bold text-brand-coffee italic leading-snug">
                      "{data.servingSizeAnalysis.realisticAssessment}"
                    </p>
                  </div>
                </div>

                {data.servingSizeAnalysis.totalPackageImpact && (
                  <p className="text-sm font-semibold text-brand-alert/80 border-t border-brand-alert/10 pt-4 flex items-center gap-2">
                    <AlertTriangle size={16} />
                    {data.servingSizeAnalysis.totalPackageImpact}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients & Allergens Column */}
        <div className="lg:col-span-12 grid lg:grid-cols-2 gap-8">
          {/* Ingredient Explorer */}
          <div className="glass-card rounded-[2.5rem] p-8">
            <h3 className="text-2xl font-black text-brand-coffee mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-brand-caramel text-white flex items-center justify-center">
                <Beef size={20} />
              </span>
              {t('ingredientExplorer')}
            </h3>
            <div className="space-y-4">
              {data.ingredientBreakdown.map((ing, idx) => (
                <div key={idx} className="group p-5 rounded-3xl bg-brand-cream/30 hover:bg-white transition-colors border border-transparent hover:border-brand-honey/20 hover:premium-shadow">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-lg font-black text-brand-coffee">{ing.name}</span>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                      ing.cautionLevel === 'Safe' ? 'bg-brand-avocado/10 text-brand-avocado' : 
                      ing.cautionLevel === 'Moderate' ? 'bg-brand-amber/10 text-brand-amber' : 'bg-brand-alert/10 text-brand-alert'
                    )}>
                      {ing.cautionLevel}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] font-black text-brand-caramel uppercase tracking-widest mt-0.5">{t('explanation')}</span>
                      <p className="text-sm font-medium text-brand-coffee/70">{ing.explanation}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-brand-honey uppercase tracking-widest">{t('purpose')}</span>
                      <span className="text-xs font-bold text-brand-coffee/60">{ing.purpose}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {/* Additives Review */}
            <div className="glass-card rounded-[2.5rem] p-8 border-b-8 border-brand-amber text-left">
              <h3 className="text-2xl font-black text-brand-coffee mb-8 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-brand-amber text-white flex items-center justify-center">
                  <FlaskConical size={20} />
                </span>
                {t('processingReview')}
              </h3>
              <div className="grid gap-4 text-left">
                {data.additivesReview.map((add, idx) => (
                  <div key={idx} className="flex gap-4 p-5 rounded-3xl bg-brand-honey/5 text-left">
                    <div className="pt-1 shrink-0">
                      <div className="w-8 h-8 rounded-full bg-brand-amber/20 flex items-center justify-center text-brand-amber">
                        <Info size={16} />
                      </div>
                    </div>
                    <div className="space-y-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-brand-coffee text-left">{add.name}</span>
                        <span className="text-[9px] font-black bg-brand-amber/10 text-brand-amber px-2 py-0.5 rounded-full uppercase tracking-widest">{add.type}</span>
                      </div>
                      <p className="text-sm font-medium text-brand-coffee/60 text-left">{add.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Allergen Shield */}
            <div className="glass-card rounded-[2.5rem] p-8 bg-brand-alert/5 border border-brand-alert/10 text-left">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-brand-coffee italic text-left uppercase tracking-tight">{t('allergenShield')}</h3>
                <AlertTriangle className="text-brand-alert" size={32} />
              </div>
              
              <div className="space-y-8 text-left">
                {data.allergyWarnings.confirmed.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-brand-alert uppercase tracking-widest">{t('confirmedPresence')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {data.allergyWarnings.confirmed.map(a => (
                        <span key={a} className="px-4 py-2 rounded-2xl bg-brand-alert text-white font-black text-sm premium-shadow">{a}</span>
                      ))}
                    </div>
                  </div>
                )}

                {(data.allergyWarnings.traces.length > 0 || data.allergyWarnings.inferred.length > 0) && (
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-brand-amber uppercase tracking-widest">{t('potentialRisks')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {[...data.allergyWarnings.traces, ...data.allergyWarnings.inferred].map(a => (
                        <span key={a} className="px-4 py-2 rounded-2xl bg-white text-brand-coffee/70 font-bold text-sm border border-brand-amber/30">{a}</span>
                      ))}
                    </div>
                  </div>
                )}

                {data.allergyWarnings.confirmed.length === 0 && data.allergyWarnings.traces.length === 0 && (
                  <div className="flex items-center gap-4 p-4 rounded-3xl bg-brand-avocado/10">
                    <ShieldCheck className="text-brand-avocado" size={24} />
                    <p className="font-bold text-brand-avocado leading-tight text-left">{t('noAllergens')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Final Conclusion Section */}
        <div className="lg:col-span-12">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="glass-card rounded-[3.5rem] p-10 md:p-16 bg-linear-to-br from-brand-coffee to-brand-caramel text-white relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-96 h-96 bg-brand-honey/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
               <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-4">
                     <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center">
                        <Sparkles size={32} className="text-brand-honey" />
                     </div>
                     <h3 className="text-4xl font-black italic tracking-tight uppercase">{t('insightsTitle')}</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                     <div className="space-y-6">
                        <p className="text-xl md:text-2xl font-medium leading-relaxed text-white/90">
                           {data.consumerFriendlySummary}
                        </p>
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 italic font-medium">
                           "{data.overallHealthScore.summary}"
                        </div>
                     </div>
                     <div className="space-y-6">
                        <div className="flex flex-col gap-4">
                           <div className="flex items-center gap-3">
                              <BadgeCheck className="text-brand-honey" size={24} />
                              <span className="font-black text-sm uppercase tracking-widest">Nutrizee Score: {data.overallHealthScore.score}/100</span>
                           </div>
                           <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
                              <motion.div 
                                 initial={{ width: 0 }}
                                 whileInView={{ width: `${data.overallHealthScore.score}%` }}
                                 transition={{ duration: 1.5, ease: "easeOut" }}
                                 className={cn("h-full", data.overallHealthScore.color === 'Green' ? 'bg-brand-avocado' : data.overallHealthScore.color === 'Yellow' ? 'bg-brand-amber' : 'bg-brand-alert')}
                              />
                           </div>
                        </div>
                        <button 
                           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                           className="w-full py-5 rounded-full bg-brand-honey text-brand-coffee font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-transform premium-shadow mt-4"
                        >
                           {t('scanAnother')}
                        </button>
                     </div>
                  </div>
               </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
};
