import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Sparkles, Globe, Megaphone, Heart } from 'lucide-react';

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-stone-900 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 mix-blend-difference text-white">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
          <div className="text-xl font-serif tracking-widest uppercase">The Silent Language</div>
          <div className="text-sm font-sans tracking-widest uppercase flex space-x-8 hidden md:flex">
            <a href="#identity" className="hover:opacity-70 transition-opacity">Identity</a>
            <a href="#advocacy" className="hover:opacity-70 transition-opacity">Advocacy</a>
            <a href="#culture" className="hover:opacity-70 transition-opacity">Culture</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden bg-stone-900">
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
            alt="High fashion editorial" 
            className="w-full h-full object-cover opacity-60"
          />
        </motion.div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-sm md:text-base tracking-[0.3em] uppercase mb-6 text-stone-300"
          >
            More than just clothing
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif mb-6 leading-none"
          >
            FASHION
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-2xl md:text-4xl font-serif italic text-stone-200"
          >
            A Silent Language
          </motion.h2>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="text-2xl md:text-4xl font-serif leading-relaxed text-stone-800">
              Fashion transcends mere fabric and stitching. It is a powerful, unspoken form of communication that conveys our deepest ideals, beliefs, and personal narratives without uttering a single word.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Feature Sections */}
      <section id="identity" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn className="order-2 lg:order-1">
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop" 
                alt="Woman expressing identity through bold fashion"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </FadeIn>
          <FadeIn className="order-1 lg:order-2 lg:pl-12" delay={0.2}>
            <div className="inline-flex items-center space-x-2 text-stone-500 uppercase tracking-widest text-xs mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Self-Expression</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 text-stone-900 leading-tight">
              The Canvas of <br/><span className="italic text-stone-500">Identity</span>
            </h2>
            <p className="text-lg text-stone-600 font-sans leading-relaxed mb-10">
              Fashion is a profound art form that allows us to broadcast our identity, feelings, and thoughts to the world. Through bold experimentation with colors, geometric shapes, varying textures, and eclectic styles, we construct a visual identity that speaks volumes before we even introduce ourselves.
            </p>
            <button className="inline-flex items-center space-x-3 text-sm tracking-widest uppercase font-semibold border-b border-stone-900 pb-2 hover:text-stone-500 hover:border-stone-500 transition-colors">
              <span>Read the manifesto</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </FadeIn>
        </div>
      </section>

      <section id="advocacy" className="py-24 px-6 bg-stone-900 text-stone-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn className="lg:pr-12">
            <div className="inline-flex items-center space-x-2 text-stone-400 uppercase tracking-widest text-xs mb-8">
              <Megaphone className="w-4 h-4" />
              <span>Advocacy</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
              Walking <br/><span className="italic text-stone-400">Billboards</span>
            </h2>
            <p className="text-lg text-stone-300 font-sans leading-relaxed mb-10">
              Clothing is a medium for advocacy and empowerment. By wearing garments that bear specific messages, individuals transform into living platforms for social change. Fashion becomes a catalyst for important conversations, raising awareness for vital issues like mental health, equality, and human rights.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <img 
                src="https://images.unsplash.com/photo-1529139574466-a303027c028b?q=80&w=1920&auto=format&fit=crop" 
                alt="Empowered fashion style"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="culture" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn className="order-2 lg:order-1">
            <div className="aspect-[4/5] overflow-hidden rounded-sm relative">
              <img 
                src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1920&auto=format&fit=crop" 
                alt="Cultural fashion statement"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </FadeIn>
          <FadeIn className="order-1 lg:order-2 lg:pl-12" delay={0.2}>
            <div className="inline-flex items-center space-x-2 text-stone-500 uppercase tracking-widest text-xs mb-8">
              <Globe className="w-4 h-4" />
              <span>Culture & Society</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 text-stone-900 leading-tight">
              Weaving <br/><span className="italic text-stone-500">Societal Norms</span>
            </h2>
            <p className="text-lg text-stone-600 font-sans leading-relaxed mb-10">
              Fashion underscores the deep, intrinsic link between individuals and their heritage. It acts as a platform to communicate unique cultural features while simultaneously challenging outdated societal norms. It is a driving force supporting inclusion, diversity, and the pressing need for global sustainability.
            </p>
            <button className="inline-flex items-center space-x-3 text-sm tracking-widest uppercase font-semibold border-b border-stone-900 pb-2 hover:text-stone-500 hover:border-stone-500 transition-colors">
              <span>Explore global trends</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </FadeIn>
        </div>
      </section>

      {/* Lookbook / Gallery */}
      <section className="py-32 px-6 bg-stone-100">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-serif text-center mb-20 text-stone-900">
              The Vocabulary of Style
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn delay={0.1}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-sm cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" 
                  alt="Fashion detail" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white tracking-widest uppercase text-sm border border-white px-6 py-3">View Details</span>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.3} className="md:mt-24">
              <div className="group relative aspect-[3/4] overflow-hidden rounded-sm cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop" 
                  alt="Fashion statement" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white tracking-widest uppercase text-sm border border-white px-6 py-3">View Details</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-xl font-serif tracking-widest uppercase text-white mb-8 md:mb-0">
            The Silent Language
          </div>
          <div className="flex space-x-8 text-sm tracking-widest uppercase">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Editorial</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-800 text-xs text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Fashion: A Silent Language. All rights reserved.</p>
          <p className="mt-4 md:mt-0 flex items-center">
            Made with <Heart className="w-3 h-3 mx-1 text-stone-600" /> for self-expression
          </p>
        </div>
      </footer>
    </div>
  );
}
