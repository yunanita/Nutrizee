import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Privacy = () => {
  const { language } = useLanguage();
  
  const content = language === 'en' ? {
    title: "Privacy Policy",
    subtitle: "Your trust is our most important ingredient.",
    sections: [
      {
        icon: Eye,
        title: "Transparency",
        text: "We collect only what's necessary to analyze your food. Images are processed by AI and are not shared with third parties for marketing."
      },
      {
        icon: Lock,
        title: "Security",
        text: "We use laboratory-grade encryption to protect your data. Your analysis history is stored only on your device locally unless you sync."
      },
      {
        icon: Shield,
        title: "Data Integrity",
        text: "You have full control over your data. You can clear your scan history at any time from the Wellness Trends dashboard."
      }
    ]
  } : {
    title: "Kebijakan Privasi",
    subtitle: "Kepercayaan Anda adalah bahan terpenting kami.",
    sections: [
      {
        icon: Eye,
        title: "Transparansi",
        text: "Kami hanya mengumpulkan apa yang diperlukan untuk menganalisis makanan Anda. Gambar diproses oleh AI dan tidak dibagikan kepada pihak ketiga untuk pemasaran."
      },
      {
        icon: Lock,
        title: "Keamanan",
        text: "Kami menggunakan enkripsi tingkat laboratorium untuk melindungi data Anda. Riwayat analisis Anda hanya disimpan secara lokal di perangkat Anda kecuali jika Anda melakukan sinkronisasi."
      },
      {
        icon: Shield,
        title: "Integritas Data",
        text: "Anda memiliki kontrol penuh atas data Anda. Anda dapat menghapus riwayat pemindaian kapan saja dari dasbor Tren Kesejahteraan."
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
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="glass-card p-8 rounded-[2.5rem] flex gap-6 items-start hover:premium-shadow transition-all"
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-honey/10 text-brand-honey flex items-center justify-center shrink-0">
               <section.icon size={32} />
            </div>
            <div className="space-y-2">
               <h3 className="text-2xl font-black text-brand-coffee">{section.title}</h3>
               <p className="text-brand-coffee/60 font-medium leading-relaxed">{section.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <footer className="text-center pt-8 text-brand-caramel/40 text-[10px] font-black uppercase tracking-widest">
        Last Updated: May 2026
      </footer>
    </div>
  );
};
