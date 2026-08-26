import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Feather } from 'lucide-react';
import { MANIFESTO_PRINCIPLES } from '../data/fashionData';

interface ManifestoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ManifestoModal: React.FC<ManifestoModalProps> = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/85 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-4xl max-h-[90vh] bg-stone-900 text-stone-100 rounded-xl shadow-2xl border border-stone-800 flex flex-col overflow-hidden z-10"
                    >
                        {/* Header */}
                        <div className="p-6 md:p-8 border-b border-stone-800 flex justify-between items-center bg-stone-950/60">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                                    <Feather className="w-4 h-4 text-amber-400" />
                                </div>
                                <div>
                                    <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-semibold">2026 Style Principles</span>
                                    <h3 className="text-2xl font-serif text-white">The Fashion Manifesto</h3>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-full transition-colors cursor-pointer"
                                aria-label="Close manifesto"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="p-6 md:p-10 overflow-y-auto space-y-8 custom-scrollbar">
                            <div className="text-center max-w-2xl mx-auto space-y-3">
                                <p className="text-lg font-serif italic text-stone-200">
                                    "Fashion isn't about blindly following rules. It's about combining streetwear freedom with authentic personal attitude."
                                </p>
                                <div className="w-16 h-[1px] bg-amber-500/50 mx-auto" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {MANIFESTO_PRINCIPLES.map((principle) => (
                                    <div key={principle.number} className="bg-stone-950/80 p-6 rounded-xl border border-stone-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-2xl font-serif font-bold text-amber-400">{principle.number}</span>
                                                <Sparkles className="w-4 h-4 text-amber-400" />
                                            </div>
                                            <h4 className="text-xl font-serif text-white mb-1">{principle.title}</h4>
                                            <p className="text-xs uppercase tracking-wider text-amber-400/90 mb-3 font-mono font-semibold">{principle.subtitle}</p>
                                            <p className="text-sm text-stone-300 leading-relaxed font-sans">{principle.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-stone-800 bg-stone-950/60 flex justify-between items-center text-xs text-stone-400">
                            <span>5 Core Rules of Modern Street Style</span>
                            <button
                                onClick={onClose}
                                className="px-6 py-2.5 bg-amber-400 text-stone-950 uppercase font-bold text-xs tracking-widest hover:bg-amber-300 transition-colors rounded-lg cursor-pointer"
                            >
                                Close Manifesto
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
