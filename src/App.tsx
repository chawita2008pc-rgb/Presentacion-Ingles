import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  ArrowRight, Sparkles,
  BookOpen,
  Send, Instagram, Twitter, Mail,
  Zap, CheckCircle
} from 'lucide-react';
import { LOOKBOOK_ITEMS, REAL_FASHION_FACTS, LookbookItem } from './data/fashionData';
import { ManifestoModal } from './components/ManifestoModal';
import { GlobalTrendsModal } from './components/GlobalTrendsModal';
import { LightboxModal } from './components/LightboxModal';
import { StyleQuizModal } from './components/StyleQuizModal';
import { AudioVisualizer } from './components/AudioVisualizer';
import { Toast } from './components/Toast';

const FadeIn = ({ children, delay = 0, className = "", key }: { children: React.ReactNode, delay?: number, className?: string, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  // Modals & Interactivity States
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);
  const [isTrendsOpen, setIsTrendsOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<LookbookItem | null>(null);

  // Lookbook Filter State
  const [activeFilter, setActiveFilter] = useState<'all' | 'menswear' | 'womenswear' | 'unisex'>('all');

  // Newsletter State & Toast Feedback
  const [emailInput, setEmailInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredLookbook = LOOKBOOK_ITEMS.filter(item => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes('@')) {
      setToastMessage('Please enter a valid email address.');
      return;
    }
    setToastMessage(`✨ Weekly fashion updates sent to ${emailInput}`);
    setEmailInput('');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-stone-900 selection:text-white font-sans text-stone-900">

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Interactive Modals */}
      <ManifestoModal isOpen={isManifestoOpen} onClose={() => setIsManifestoOpen(false)} />
      <GlobalTrendsModal isOpen={isTrendsOpen} onClose={() => setIsTrendsOpen(false)} />
      <StyleQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectArchetypeFilter={(cat) => setActiveFilter(cat)}
        onShowToast={(msg) => showToast(msg)}
      />
      <LightboxModal item={selectedItem} onClose={() => setSelectedItem(null)} />

      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-40 bg-stone-950/85 backdrop-blur-md border-b border-stone-800/60 text-white transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <a href="#" className="flex items-center space-x-3 group">
            <span className="w-3.5 h-3.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
            <span className="text-lg md:text-xl font-serif tracking-widest uppercase text-white font-bold">
              FASHION: A SILENT LANGUAGE
            </span>
          </a>

          <div className="hidden lg:flex items-center space-x-8 text-xs font-mono tracking-widest uppercase">
            <a href="#facts" className="hover:text-amber-400 transition-colors">Style Facts</a>
            <a href="#dual-perspective" className="hover:text-amber-400 transition-colors">2026 Perspectives</a>
            <a href="#identity" className="hover:text-amber-400 transition-colors">Identity</a>
            <a href="#lookbook" className="hover:text-amber-400 transition-colors">Lookbook</a>
          </div>

          <div className="flex items-center space-x-3">
            <AudioVisualizer onToggle={(playing) => showToast(playing ? "🎵 Ambient Soundscape Activated" : "⏸ Ambient Soundscape Paused")} />

            <button
              onClick={() => setIsQuizOpen(true)}
              className="hidden sm:inline-flex items-center space-x-2 bg-amber-400 text-stone-950 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-amber-300 hover:shadow-lg transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Style Quiz</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden bg-stone-950 text-white flex items-center justify-center">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Dual Grid Background showcasing 2026 Menswear & Womenswear */}
          <div className="grid grid-cols-2 w-full h-full opacity-55">
            <img
              src="/images/menswear_leather.png"
              alt="2026 Menswear Streetwear"
              className="w-full h-full object-cover"
            />
            <img
              src="/images/womenswear_trench.png"
              alt="2026 Womenswear Streetwear"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-6 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-flex items-center space-x-3 bg-stone-900/80 border border-stone-700/80 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] text-amber-400 font-mono"
          >
            <span>Editorial Standard 2026</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Youth Street Aesthetics</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tight leading-none text-stone-100"
          >
            SILENT LANGUAGE
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-2xl md:text-4xl font-serif italic text-stone-200 max-w-2xl mx-auto"
          >
            How Youth Express Identity Through Clothes
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-sm md:text-base text-stone-300 max-w-xl mx-auto font-sans leading-relaxed"
          >
            An editorial perspective on 2026 streetwear. Exploring oversized leather silhouettes, fluid trench coats, music-inspired layers, and vintage thrift finds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={() => setIsQuizOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-amber-400 text-stone-950 uppercase font-bold text-xs tracking-widest hover:bg-amber-300 transition-all rounded-lg shadow-xl flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Find Your Style Archetype</span>
            </button>

            <button
              onClick={() => setIsManifestoOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-stone-900 border border-stone-700 text-stone-200 uppercase font-semibold text-xs tracking-widest hover:border-amber-400 hover:text-amber-400 transition-all rounded-lg flex items-center justify-center space-x-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Style Principles</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Style Facts Section */}
      <section id="facts" className="py-24 px-6 bg-stone-900 text-stone-100 border-b border-stone-800">
        <div className="max-w-7xl mx-auto space-y-12">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-semibold">Street Style Culture</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white mt-2">
              The Real Drivers of Modern Fashion
            </h2>
            <p className="text-stone-400 text-sm md:text-base font-sans mt-3">
              Key insights into how modern youth curate their personal aesthetic:
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {REAL_FASHION_FACTS.map((fact, idx) => (
              <FadeIn key={fact.id} delay={idx * 0.1}>
                <div className="bg-stone-950/80 p-6 rounded-xl border border-stone-800 hover:border-amber-500/50 transition-all group h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-serif font-bold text-amber-400">{fact.stat}</span>
                      <span className="text-2xl">{fact.emoji}</span>
                    </div>
                    <h3 className="text-base font-serif text-white mb-2 group-hover:text-amber-300 transition-colors">
                      {fact.title}
                    </h3>
                    <p className="text-xs text-stone-400 font-sans leading-relaxed">
                      {fact.detail}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-850 text-[10px] uppercase font-mono text-stone-500 flex items-center justify-between">
                    <span>Street Perspective</span>
                    <Zap className="w-3 h-3 text-amber-400" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Perspective Showcase: Modern 2026 Men & Women */}
      <section id="dual-perspective" className="py-24 px-6 bg-stone-100">
        <div className="max-w-7xl mx-auto space-y-16">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-stone-500 font-mono">2026 Gender Perspectives</span>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mt-2">
              Menswear & Womenswear Aesthetics
            </h2>
            <p className="text-stone-600 font-sans mt-4 text-base">
              Moving past traditional formalwear. 2026 style is defined by wide-leg denim, boxy leather jackets, heavy hoodies, and fluid outerwear.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 2026 Menswear Column */}
            <FadeIn delay={0.1}>
              <div className="bg-stone-900 text-stone-100 rounded-xl overflow-hidden shadow-xl border border-stone-800 flex flex-col h-full group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src="/images/menswear_leather.png"
                    alt="2026 Menswear Streetwear"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-amber-400 text-stone-950 font-bold px-3 py-1 text-xs uppercase font-mono tracking-wider rounded">
                    Menswear 2026
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif text-white mb-3">Oversized Leather & Wide-Leg Denim</h3>
                    <p className="text-stone-300 text-sm leading-relaxed font-sans">
                      Boxy vintage leather coats, heavy cotton tees, and wide-leg denim create a relaxed, confident silhouette.
                    </p>
                  </div>
                  <button
                    onClick={() => { setActiveFilter('menswear'); document.getElementById('lookbook')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest uppercase text-amber-400 hover:text-amber-300 font-semibold pt-4 border-t border-stone-800 cursor-pointer"
                  >
                    <span>View Menswear Outfits</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </FadeIn>

            {/* 2026 Womenswear Column */}
            <FadeIn delay={0.2}>
              <div className="bg-stone-900 text-stone-100 rounded-xl overflow-hidden shadow-xl border border-stone-800 flex flex-col h-full group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src="/images/womenswear_trench.png"
                    alt="2026 Womenswear Streetwear"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-amber-400 text-stone-950 font-bold px-3 py-1 text-xs uppercase font-mono tracking-wider rounded">
                    Womenswear 2026
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif text-white mb-3">Flowing Trench Coats & Satin Details</h3>
                    <p className="text-stone-300 text-sm leading-relaxed font-sans">
                      Fluid beige trench coats paired with minimal crop tops, wide-leg trousers, and subtle satin textures.
                    </p>
                  </div>
                  <button
                    onClick={() => { setActiveFilter('womenswear'); document.getElementById('lookbook')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest uppercase text-amber-400 hover:text-amber-300 font-semibold pt-4 border-t border-stone-800 cursor-pointer"
                  >
                    <span>View Womenswear Outfits</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 1: Self-Expression & Identity */}
      <section id="identity" className="py-24 px-6 overflow-hidden bg-stone-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn className="order-2 lg:order-1">
            <div className="aspect-[4/5] overflow-hidden rounded-xl shadow-2xl relative">
              <img
                src="/images/unisex_trap.png"
                alt="2026 Streetwear Fashion"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute bottom-4 left-4 bg-stone-950/90 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-mono text-stone-200 border border-stone-800">
                Unisex Streetwear & Music Influence
              </div>
            </div>
          </FadeIn>
          <FadeIn className="order-1 lg:order-2 lg:pl-8" delay={0.2}>
            <div className="inline-flex items-center space-x-2 text-stone-500 uppercase tracking-widest text-xs font-mono mb-6">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Identity & Communication</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif mb-6 text-stone-900 leading-tight">
              Clothes Are Your <br /><span className="italic text-stone-500">Personal Signature</span>
            </h2>
            <p className="text-lg text-stone-600 font-sans leading-relaxed mb-8">
              Style is an unspoken dialogue. Combining relaxed proportions, vintage leather, and clean footwear represents the authentic self-expression of contemporary youth.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-start space-x-3 text-stone-700 text-sm">
                <CheckCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Menswear:</strong> Vintage leather, boxy hoodies & wide-leg denim.</span>
              </div>
              <div className="flex items-start space-x-3 text-stone-700 text-sm">
                <CheckCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Womenswear:</strong> Trench coats, thrifted knits & Y2K silhouettes.</span>
              </div>
              <div className="flex items-start space-x-3 text-stone-700 text-sm">
                <CheckCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Unisex:</strong> Cropped puffer jackets & technical cargo pants.</span>
              </div>
            </div>

            <button
              onClick={() => setIsManifestoOpen(true)}
              className="inline-flex items-center space-x-3 text-xs tracking-widest uppercase font-mono font-semibold border-b-2 border-stone-900 pb-2 hover:text-amber-600 hover:border-amber-600 transition-colors cursor-pointer"
            >
              <span>Read The 5 Principles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </FadeIn>
        </div>
      </section>

      {/* Interactive Lookbook Gallery Section with Category Filter */}
      <section id="lookbook" className="py-28 px-6 bg-stone-100 border-t border-stone-200">
        <div className="max-w-7xl mx-auto space-y-12">

          <FadeIn className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-stone-500 font-mono">2026 Collection</span>
            <h2 className="text-4xl md:text-6xl font-serif text-stone-900">
              Curated Lookbook
            </h2>
            <p className="text-stone-600 font-sans text-base">
              Filter by Menswear, Womenswear, or Unisex. Click any outfit card to view color palettes and style details.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center items-center gap-3 pt-6">
              {[
                { id: 'all', label: 'All Fits' },
                { id: 'menswear', label: '⚡ Menswear' },
                { id: 'womenswear', label: '✨ Womenswear' },
                { id: 'unisex', label: '🏔️ Unisex Streetwear' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${activeFilter === tab.id
                      ? 'bg-stone-900 text-white shadow-md'
                      : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-300'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Lookbook Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLookbook.map((item, index) => (
              <FadeIn key={item.id} delay={index * 0.1}>
                <div
                  onClick={() => setSelectedItem(item)}
                  className="group relative bg-white rounded-xl overflow-hidden border border-stone-200 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col h-full"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-stone-950/85 backdrop-blur-md px-3 py-1 text-[11px] uppercase tracking-widest text-amber-400 font-mono rounded border border-stone-700 font-bold">
                      {item.genderLabel}
                    </div>
                    <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-amber-400 text-stone-950 tracking-widest uppercase text-xs font-bold px-6 py-3 rounded-lg shadow-lg transform group-hover:translate-y-0 translate-y-2 transition-transform">
                        View Outfit Details
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-xl font-serif text-stone-900 group-hover:text-amber-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-stone-500 font-mono mt-1">Design Studio: {item.designer}</p>
                      <p className="text-xs text-stone-600 font-sans mt-3 leading-relaxed">
                        {item.concept}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-mono">
                      <span>Click for tags & colors</span>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Quiz CTA */}
      <section className="py-24 px-6 bg-stone-900 text-stone-100 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-semibold">1-Minute Style Test</span>
          <h2 className="text-4xl md:text-6xl font-serif text-white">
            Discover Your Personal Style Archetype
          </h2>
          <p className="text-stone-300 text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
            Take our style quiz to discover your personal aesthetic archetype and get recommended lookbook fits tailored to your style.
          </p>

          <button
            onClick={() => setIsQuizOpen(true)}
            className="px-10 py-5 bg-amber-400 text-stone-950 uppercase font-bold text-xs tracking-widest hover:bg-amber-300 transition-all rounded-lg shadow-2xl inline-flex items-center space-x-3 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch Style Quiz</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 py-20 px-6 border-t border-stone-850">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-stone-850">

          <div className="md:col-span-2 space-y-4">
            <div className="text-xl font-serif tracking-widest uppercase text-white font-bold flex items-center space-x-2">
              <span className="w-3.5 h-3.5 rounded-full bg-amber-400" />
              <span>Fashion: A Silent Language</span>
            </div>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed font-sans">
              An editorial platform dedicated to contemporary youth streetwear, non-verbal communication, and modern fashion identity.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-widest text-stone-200 font-semibold">Sections</h4>
            <ul className="space-y-2 text-xs font-mono">
              <li><button onClick={() => setIsManifestoOpen(true)} className="hover:text-white transition-colors">Style Principles</button></li>
              <li><button onClick={() => setIsTrendsOpen(true)} className="hover:text-white transition-colors">2026 Trend Report</button></li>
              <li><button onClick={() => setIsQuizOpen(true)} className="hover:text-white transition-colors">Style Quiz</button></li>
              <li><a href="#lookbook" className="hover:text-white transition-colors">Lookbook</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-widest text-stone-200 font-semibold">Weekly Dispatch</h4>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Your email..."
                  className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-amber-400 text-stone-950 rounded-md hover:bg-amber-300 transition-colors flex items-center justify-center font-bold text-xs cursor-pointer"
                  aria-label="Subscribe"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
              <span className="text-[10px] text-stone-500 block">Weekly curated fashion dispatches.</span>
            </form>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 font-mono space-y-4 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} Fashion: A Silent Language.</p>
          <div className="flex space-x-6 text-xs">
            <button onClick={() => showToast("Instagram @silentlanguage.fashion copied to clipboard")} className="hover:text-stone-300 flex items-center gap-1">
              <Instagram className="w-3.5 h-3.5" /> Instagram
            </button>
            <button onClick={() => showToast("Twitter @silentlangfashion copied to clipboard")} className="hover:text-stone-300 flex items-center gap-1">
              <Twitter className="w-3.5 h-3.5" /> Twitter
            </button>
            <button onClick={() => showToast("Editorial contact: hello@silentlanguage.fashion")} className="hover:text-stone-300 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> Contact
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
