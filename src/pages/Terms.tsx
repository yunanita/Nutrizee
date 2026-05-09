import React from 'react';
import { motion } from 'motion/react';
import { FileText, CheckCircle, AlertCircle, Scale } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Terms = () => {
  const { language } = useLanguage();

  const content = language === 'en' ? {
    title: "Terms of Service",
    subtitle: "Simple rules for a smarter consumption.",
    sections: [
      {
        icon: CheckCircle,
        title: "Usage Policy",
        text: "Nutrizee is an educational tool. By using this app, you agree to use it for personal, non-commercial purposes only."
      },
      {
        icon: AlertCircle,
        title: "Disclaimer",
        text: "Nutrizee provides AI-generated insights based on food labels. It is NOT a medical diagnosis system. Always consult a professional for serious dietary needs."
      },
      {
        icon: Scale,
        title: "Fair Use",
        text: "We provide high-quality AI analysis. Please refrain from uploading non-food related content to maintain system performance for everyone."
      }
    ]
  } : {
    title: "Ketentuan Layanan",
    subtitle: "Aturan sederhana untuk konsumsi yang lebih cerdas.",
    sections: [
      {
        icon: CheckCircle,
        title: "Kebijakan Penggunaan",
        text: "Nutrizee adalah alat pendidikan. Dengan menggunakan aplikasi ini, Anda setuju untuk menggunakannya hanya untuk tujuan pribadi dan non-komersial."
      },
      {
        icon: AlertCircle,
        title: "Penafian",
        text: "Nutrizee memberikan wawasan yang dihasilkan AI berdasarkan label makanan. Ini BUKAN sistem diagnosis medis. Selalu konsultasikan dengan profesional untuk kebutuhan diet serius."
      },
      {
        icon: Scale,
        title: "Penggunaan Wajar",
        text: "Kami menyediakan analisis AI berkualitas tinggi. Harap menahan diri untuk tidak mengunggah konten yang tidak terkait dengan makanan untuk menjaga kinerja sistem bagi semua orang."
      }
    ]
  };

  return (
    <div className="py-12 max-w-4xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-black text-brand-coffee">{content.title}</h1>
        <p className="text-xl text-brand-caramel font-semibold italic">{content.subtitle}</p>
      </header>

      <div className="grid gap-8">
        {content.sections.map((section, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-card p-10 rounded-[3rem] border-b-8 border-brand-honey relative overflow-hidden"
          >
            <div className="flex gap-8 items-start relative z-10">
               <div className="w-16 h-16 rounded-2xl bg-brand-cream text-brand-honey flex items-center justify-center shrink-0">
                  <section.icon size={32} />
               </div>
               <div className="space-y-4">
                  <h3 className="text-3xl font-black text-brand-coffee tracking-tight">{section.title}</h3>
                  <p className="text-brand-coffee/60 font-medium leading-relaxed italic">{section.text}</p>
               </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-honey/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          </motion.div>
        ))}
      </div>

      <footer className="text-center pt-8 text-brand-caramel/40 text-[10px] font-black uppercase tracking-widest">
        Agreement Version 1.0.2
      </footer>
    </div>
  );
};
