import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Camera, Loader2, CheckCircle2, Cookie, Milk, Sandwich } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

interface UploadZoneProps {
  onAnalyze: (image: string) => Promise<void>;
  isAnalyzing: boolean;
}

export const UploadZone = ({ onAnalyze, isAnalyzing }: UploadZoneProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const steps = [
    t('readingNutrition'),
    t('detectingIngredients'),
    t('analyzingSugar'),
    t('checkingAllergens'),
    t('generatingInsights')
  ];

  React.useEffect(() => {
    let interval: any;
    if (isAnalyzing) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
      }, 1500);
    } else {
      setCurrentStep(0);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing, steps.length]);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG/JPG)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setPreview(base64);
      onAnalyze(base64);
    };
    reader.readAsDataURL(file);
  };

  const onDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      {/* Cute Floating Food Animations */}
      {!isAnalyzing && (
        <>
          <motion.div 
            animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -left-12 text-brand-honey/40 hidden md:block"
          >
            <Cookie size={48} />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-12 -right-12 text-brand-avocado/40 hidden md:block"
          >
            <Milk size={48} />
          </motion.div>
        </>
      )}

      <AnimatePresence mode="wait">
        {!isAnalyzing ? (
          <motion.div
            key="upload-ui"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full flex flex-col gap-4"
          >
            <div
              onDragEnter={onDrag}
              onDragLeave={onDrag}
              onDragOver={onDrag}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "relative h-80 rounded-[3rem] border-4 border-dashed transition-all duration-500 cursor-pointer overflow-hidden group",
                dragActive 
                  ? "border-brand-honey bg-brand-honey/10 scale-105" 
                  : "border-brand-caramel/20 bg-white/40 hover:bg-white/60 hover:border-brand-caramel/40"
              )}
            >
              <div className="absolute inset-0 bg-linear-to-br from-brand-cream to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center text-brand-honey mb-4"
                >
                  <Upload size={32} />
                </motion.div>
                <div>
                  <p className="text-xl font-black text-brand-coffee">{t('dropLabel')}</p>
                  <p className="text-sm text-brand-caramel font-bold italic">{t('orClick')}</p>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onChange}
              />
            </div>

            <button 
              onClick={() => cameraInputRef.current?.click()}
              className="btn-gradient flex items-center justify-center gap-3 w-full"
            >
              <Camera size={20} />
              {t('takePhoto')}
            </button>

            <input
              ref={cameraInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              capture="environment"
              onChange={onChange}
            />
          </motion.div>
        ) : (
          <motion.div
            key="loading-ui"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card rounded-[3rem] p-12 text-center premium-shadow overflow-hidden relative"
          >
            <div className="absolute inset-x-0 h-1 bg-brand-honey shadow-[0_0_15px_rgba(244,162,89,0.5)] z-10 animate-scan" style={{ top: '0%' }} />
            
            {preview && (
              <div className="w-48 h-48 mx-auto mb-8 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl relative">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-brand-caramel/20 backdrop-blur-[2px]" />
              </div>
            )}

            <div className="flex flex-col items-center gap-6">
              <div className="p-4 rounded-2xl bg-brand-cream animate-pulse-slow relative">
                <Loader2 size={40} className="text-brand-caramel animate-spin" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-brand-coffee">{t('scanningActive')}</h3>
                <p className="text-brand-coffee/50 font-bold italic">{t('scanningSubtitle')}</p>
              </div>

              <div className="w-full max-w-sm space-y-3 mt-4">
                {steps.map((step, idx) => {
                  const isActive = idx === currentStep;
                  const isDone = idx < currentStep;
                  return (
                    <motion.div
                      key={step}
                      animate={{ 
                        opacity: isActive || isDone ? 1 : 0.3,
                        x: isActive ? 10 : 0
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/50 border border-brand-caramel/5"
                    >
                      {isDone ? (
                        <CheckCircle2 size={18} className="text-brand-avocado" />
                      ) : isActive ? (
                        <Loader2 size={18} className="text-brand-honey animate-spin" />
                      ) : (
                        <div className="w-4.5 h-4.5 rounded-full border-2 border-brand-coffee/20" />
                      )}
                      <span className={cn(
                        "text-sm font-bold",
                        isActive ? "text-brand-caramel" : "text-brand-coffee/60"
                      )}>
                        {step}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
