import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'id';

interface Translations {
  [key: string]: {
    en: string;
    id: string;
  };
}

export const translations: Translations = {
  scanLabel: { en: 'Scan Label', id: 'Pindai Label' },
  insights: { en: 'Wellness Trends', id: 'Tren Kesejahteraan' },
  about: { en: 'About', id: 'Tentang' },
  contact: { en: 'Contact', id: 'Kontak' },
  tryItNow: { en: 'Try it now', id: 'Coba sekarang' },
  heroTitle: { en: "Understand Exactly What's Inside.", id: 'Pahami Tepat Apa Yang Ada Di Dalam.' },
  heroSubtitle: { en: 'Upload any nutrition label and let AI instantly decode complex ingredients into simple health insights.', id: 'Unggah label nutrisi apa pun dan biarkan AI secara instan menerjemahkan bahan-bahan rumit menjadi wawasan kesehatan yang sederhana.' },
  dropLabel: { en: 'Drop food label here', id: 'Letakkan label makanan di sini' },
  orClick: { en: 'or click to browse from device', id: 'atau klik untuk mencari dari perangkat' },
  takePhoto: { en: 'Take Photo', id: 'Ambil Foto' },
  analyzeProduct: { en: 'Analyze Product', id: 'Analisis Produk' },
  readingNutrition: { en: 'Reading Nutrition Facts...', id: 'Membaca Fakta Nutrisi...' },
  detectingIngredients: { en: 'Detecting Ingredients...', id: 'Mendeteksi Bahan-Bahan...' },
  analyzingSugar: { en: 'Analyzing Sugar Levels...', id: 'Menganalisis Kadar Gula...' },
  checkingAllergens: { en: 'Checking Allergens...', id: 'Memeriksa Alergen...' },
  generatingInsights: { en: 'Generating Health Insights...', id: 'Menghasilkan Wawasan Kesehatan...' },
  privacy: { en: 'Privacy', id: 'Privasi' },
  terms: { en: 'Terms', id: 'Syarat' },
  mission: { en: 'Our Vision', id: 'Visi Kami' },
  missionSubtitle: { en: 'Empowering you to make smarter food choices every day.', id: 'Memberdayakan Anda untuk membuat pilihan makanan yang lebih cerdas setiap hari.' },
  unmaskingJargon: { en: 'Unmasking Jargon', id: 'Membongkar Jargon' },
  unmaskingJargonDesc: { en: 'We translate "maltodextrin" and "carrageenan" into simple human language.', id: 'Kami menerjemahkan "maltodekstrin" dan "karagenan" ke dalam bahasa manusia yang sederhana.' },
  instantAnalysis: { en: 'Instant Analysis', id: 'Analisis Instan' },
  instantAnalysisDesc: { en: 'Next-gen multimodal AI scans labels in seconds, not minutes.', id: 'AI multimodal generasi berikutnya memindai label dalam hitungan detik, bukan menit.' },
  wellnessFirst: { en: 'Wellness First', id: 'Utamakan Kesehatan' },
  wellnessFirstDesc: { en: 'Designed for health-conscious souls who care about what they consume.', id: 'Dirancang untuk jiwa yang sadar kesehatan yang peduli dengan apa yang mereka konsumsi.' },
  appDescription: { 
    en: 'Nutrizee is an AI-powered nutrition label intelligence platform designed to transform confusing food packaging information into structured, understandable, and actionable health insights for everyday consumers. The application is not a chatbot and must never behave like one. Instead, Nutrizee functions as a specialized AI analysis engine focused on extracting, interpreting, and explaining nutrition labels and ingredient compositions from packaged food products.', 
    id: 'Nutrizee adalah platform kecerdasan label nutrisi berbasis AI yang dirancang untuk mengubah informasi kemasan makanan yang membingungkan menjadi wawasan kesehatan yang terstruktur, mudah dipahami, dan dapat ditindaklanjuti bagi konsumen sehari-hari. Aplikasi ini bukan chatbot dan tidak boleh berperilaku seperti itu. Sebaliknya, Nutrizee berfungsi sebagai mesin analisis AI khusus yang berfokus pada ekstraksi, interpretasi, dan penjelasan label nutrisi serta komposisi bahan dari produk makanan kemasan.' 
  },
  retakeTitle: { en: 'Unclear Image Detected', id: 'Gambar Kurang Jelas Terdeteksi' },
  retakeMessage: { en: "We couldn't read the label clearly. Please retake the photo with better lighting and focus for accurate AI analysis.", id: 'Kami tidak dapat membaca label dengan jelas. Silakan ambil ulang foto dengan pencahayaan dan fokus yang lebih baik untuk analisis AI yang akurat.' },
  retakeButton: { en: 'Retake Photo', id: 'Ambil Ulang Foto' },
  platformOverview: { en: 'Platform Overview', id: 'Ikhtisar Platform' },
  historyTitle: { en: 'Wellness Trends', id: 'Tren Kesejahteraan' },
  insightsTitle: { en: 'Nutrizee Insight', id: 'Wawasan Nutrizee' },
  historySubtitle: { en: 'Review your scan patterns and track the big picture of your nutritional choices.', id: 'Tinjau pola pemindaian Anda dan lihat gambaran besar dari pilihan nutrisi Anda.' },
  averageScore: { en: 'Average Health Score', id: 'Skor Kesehatan Rata-rata' },
  totalScans: { en: 'Total Scans', id: 'Total Pemindaian' },
  criticalAlerts: { en: 'Critical Alerts', id: 'Peringatan Kritis' },
  noHistory: { en: 'No Trends recorded yet', id: 'Belum ada tren yang tercatat' },
  noHistorySubtitle: { en: 'Start scanning labels to see your wellness trends here.', id: 'Mulai pindai label untuk melihat tren kesejahteraan Anda di sini.' },
  wellnessTrends: { en: 'Wellness Trends', id: 'Tren Kesejahteraan' },
  builtWithAI: { en: 'Built with AI', id: 'Dibangun dengan AI' },
  builtWithAIDesc: { en: 'Nutrizee is powered by Google Gemini Multimodal AI for accurate analysis.', id: 'Nutrizee didukung oleh AI Multimodal Google Gemini untuk analisis yang akurat.' },
  appMissionTitle: { en: 'Bridging the Knowledge Gap', id: 'Menjembatani Kesenjangan Pengetahuan' },
  appMissionDesc: { en: 'We transform complex food labels into beautiful, structured, and understandable health insights.', id: 'Kami mengubah label makanan yang rumit menjadi wawasan kesehatan yang indah, terstruktur, dan mudah dipahami.' },
  aboutTagline: { en: 'Transparent Nutrition. For Everyone.', id: 'Nutrisi Transparan. Untuk Semua.' },
  conclusionTitle: { en: 'Final Conclusion', id: 'Kesimpulan Akhir' },
  professorSays: { en: 'Prof. Nutrizee Explains', id: 'Penjelasan Prof. Nutrizee' },
  creatorRole: { en: 'Creator & Developer', id: 'Pencipta & Pengembang' },
  creatorBio: { en: 'Data Science Student at Universitas Muhammadiyah Semarang, Currently in 6th Semester.', id: 'Mahasiswa Data Science di Universitas Muhammadiyah Semarang, Saat ini sedang semester 6.' },
  creatorGoalDetail: { en: 'I am a data and AI enthusiast passionate about creating technology that solves real-world problems. My focus is on transforming complex data into accessible, human-centric experiences.', id: 'Saya adalah penggemar data dan AI yang bersemangat menciptakan teknologi untuk memecahkan masalah dunia nyata. Fokus saya adalah mengubah data kompleks menjadi pengalaman yang mudah diakses dan berpusat pada manusia.' },
  coreValue: { en: 'Transparency for Everyone', id: 'Transparansi untuk Semua Orang' },
  coreValueDesc: { en: 'The heart of this project is food transparency. We aim to protect consumers from deceptive marketing and complex jargon.', id: 'Inti dari proyek ini adalah transparansi makanan. Kami bertujuan untuk melindungi konsumen dari pemasaran yang menipu dan jargon yang rumit.' },
  targetAudienceTitle: { en: 'Who is this for?', id: 'Untuk siapa ini?' },
  targetAudienceDesc: { en: 'Families, Health Seekers, & Fitness Enthusiasts asking "What am I eating?".', id: 'Keluarga, Pencari Kesehatan, & Penggemar Kebugaran yang bertanya "Apa yang saya makan?".' },
  contactTitle: { en: "Let's Connect", id: 'Mari Terhubung' },
  contactSubtitle: { en: 'Nutrizee is a passion project built to empower consumers. Meet the creator behind the mission.', id: 'Nutrizee adalah proyek gairah yang dibangun untuk memberdayakan konsumen. Temui pencipta di balik misi ini.' },
  scanningActive: { en: 'AI Scanner Active', id: 'Scanner AI Aktif' },
  scanningSubtitle: { en: 'Professor Nutrizee is crunching the data...', id: 'Profesor Nutrizee sedang menghitung data...' },
  reportId: { en: 'Report ID', id: 'ID Laporan' },
  scanAnother: { en: 'Scan Another', id: 'Pindai Lagi' },
  transparencyPromise: { en: 'Transparent by Design', id: 'Transparan Sejak Awal' },
  transparencyDesc: { en: 'We believe you deserve to know exactly what goes into your body. No secrets, no jargon.', id: 'Kami percaya Anda berhak tahu apa yang masuk ke tubuh Anda. Tanpa rahasia, tanpa jargon.' },
  howItWorks: { en: 'How it works', id: 'Cara kerja' },
  howToUseStep1: { en: 'Capture Label', id: 'Ambil Foto Label' },
  howToUseStep1Desc: { en: 'Ensure the nutrition facts table and ingredients list are clearly visible.', id: 'Pastikan tabel fakta nutrisi dan daftar bahan terlihat jelas.' },
  howToUseStep2: { en: 'Instant Processing', id: 'Pemrosesan Instan' },
  howToUseStep2Desc: { en: 'Our premium AI scans and calculates nutritional impact in seconds.', id: 'AI premium kami memindai dan menghitung dampak nutrisi dalam hitungan detik.' },
  howToUseStep3: { en: 'Stay Informed', id: 'Tetap Terinformasi' },
  howToUseStep3Desc: { en: 'Understand your food and save your insights to track your wellness trends.', id: 'Pahami makanan Anda dan simpan wawasan untuk melacak tren kesejahteraan.' },
  analysisReport: { en: 'Nutrition Breakdown', id: 'Rincian Nutrisi' },
  professorGreeting: { en: 'Hello! I am Prof. Nutrizee. Let me help you understand this product.', id: 'Halo! Saya Prof. Nutrizee. Mari saya bantu memahami produk ini.' },
  ratingLabel: { en: 'Nutri-Score', id: 'Skor-Nutrisi' },
  detected: { en: 'Detected', id: 'Terdeteksi' },
  calories: { en: 'Calories', id: 'Kalori' },
  sugar: { en: 'Sugar', id: 'Gula' },
  protein: { en: 'Protein', id: 'Protein' },
  misleadingServing: { en: 'Misleading Serving Size', id: 'Takaran Saji Menyesatkan' },
  misleadingServingDesc: { en: 'Package suggests multiple servings, but most consumers drink the entire container.', id: 'Kemasan menyarankan beberapa porsi, tetapi sebagian besar konsumen meminum seluruh isinya.' },
  highSodium: { en: 'High Sodium', id: 'Natrium Tinggi' },
  glutenFree: { en: 'Gluten Free', id: 'Bebas Gluten' },
  productClassification: { en: 'Product Classification', id: 'Klasifikasi Produk' },
  nutritionFacts: { en: 'Nutrition Facts', id: 'Fakta Nutrisi' },
  servingInsights: { en: 'Serving Insights', id: 'Wawasan Takaran Saji' },
  ingredientExplorer: { en: 'Ingredient Explorer', id: 'Penjelajah Bahan' },
  processingReview: { en: 'Processing Review', id: 'Tinjauan Pengolahan' },
  allergenShield: { en: 'Allergen Shield', id: 'Perisai Alergen' },
  confirmedPresence: { en: 'Confirmed Presence', id: 'Keberadaan Terkonfirmasi' },
  potentialRisks: { en: 'Potential Risks & Inferences', id: 'Risiko & Inferensi Potensial' },
  noAllergens: { en: 'No critical allergens detected in the visible label.', id: 'Tidak ada alergen kritis yang terdeteksi pada label yang terlihat.' },
  intelligentChoice: { en: 'Intelligent Choice', id: 'Pilihan Cerdas' },
  intelligentChoiceDesc: { en: 'Every Nutrizee analysis is powered by advanced multimodal AI patterns. We simplify the science so you can focus on the taste.', id: 'Setiap analisis Nutrizee didukung oleh pola AI multimodal yang canggih. Kami menyederhanakan sains sehingga Anda dapat fokus pada rasa.' },
  wellnessAi: { en: 'Wellness AI', id: 'AI Kesejahteraan' },
  analysisConfirmed: { en: 'Analysis Confirmed', id: 'Analisis Terkonfirmasi' },
  premiumAi: { en: 'Premium AI Engine', id: 'Mesin AI Premium' },
  energy: { en: 'Energy', id: 'Energi' },
  fiber: { en: 'Fiber', id: 'Serat' },
  fat: { en: 'Fat', id: 'Lemak' },
  sodium: { en: 'Sodium', id: 'Natrium' },
  macronutrients: { en: 'Macronutrient Composition', id: 'Komposisi Makronutrien' },
  perServing: { en: 'Per Serving', id: 'Per Takaran Saji' },
  inPackage: { en: 'In Package', id: 'Dalam Kemasan' },
  explanation: { en: 'Explanation', id: 'Penjelasan' },
  purpose: { en: 'Purpose', id: 'Tujuan' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
