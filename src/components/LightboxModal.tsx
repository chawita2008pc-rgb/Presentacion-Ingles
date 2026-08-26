import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Tag, Sparkles, User, Palette } from 'lucide-react';
import { LookbookItem } from '../data/fashionData';

interface LightboxModalProps {
    item: LookbookItem | null;
    onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
    if (!item) return null;

    return (
        <AnimatePresence>
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
                    className="relative w-full max-w-5xl max-h-[90vh] bg-stone-900 text-stone-100 rounded-lg shadow-2xl border border-stone-800 flex flex-col md:flex-row overflow-hidden z-10"
                >
                    {/* Close button top right */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 p-2 bg-stone-950/80 text-stone-300 hover:text-white rounded-full transition-colors border border-stone-800"
                        aria-label="Close detail modal"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Left: Large High-Res Image */}
                    <div className="w-full md:w-1/2 h-72 md:h-auto relative overflow-hidden bg-black">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-md border border-stone-800 px-3 py-1 text-xs uppercase tracking-widest text-stone-200 font-mono rounded">
                            {item.genderLabel}
                        </div>
                    </div>

                    {/* Right: Editorial Analysis & Specs */}
                    <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto flex flex-col justify-between space-y-8 custom-scrollbar">
                        <div>
                            <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-stone-400 font-mono mb-2">
                                <Sparkles className="w-4 h-4 text-amber-500" />
                                <span>Editorial Feature</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-serif text-white mb-3">{item.title}</h3>
                            <p className="text-sm font-serif italic text-stone-400 mb-6">Designed by {item.designer}</p>

                            <div className="space-y-4 text-stone-300 text-sm font-sans leading-relaxed">
                                <div>
                                    <h4 className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-1">Visual Concept</h4>
                                    <p>{item.concept}</p>
                                </div>

                                <div className="p-4 bg-stone-950/60 rounded-md border border-stone-800">
                                    <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-1 flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5" /> What This Speaks
                                    </h4>
                                    <p className="italic font-serif text-stone-200">"{item.statement}"</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 pt-6 border-t border-stone-800">
                            {/* Color Palette */}
                            <div>
                                <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-2 flex items-center gap-1.5 font-mono">
                                    <Palette className="w-3.5 h-3.5" /> Color Composition
                                </span>
                                <div className="flex space-x-3 mt-2">
                                    {item.palette.map((color, idx) => (
                                        <div key={idx} className="flex flex-col items-center gap-1">
                                            <div className="w-8 h-8 rounded-full border border-stone-700 shadow-inner" style={{ backgroundColor: color }} />
                                            <span className="text-[10px] font-mono text-stone-400">{color}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Style Tags */}
                            <div>
                                <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-2 flex items-center gap-1.5 font-mono">
                                    <Tag className="w-3.5 h-3.5" /> Style Descriptors
                                </span>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {item.tags.map((tag, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-stone-800 text-stone-300 rounded-full text-xs font-mono border border-stone-700">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full py-3 bg-stone-100 text-stone-900 uppercase font-semibold text-xs tracking-widest hover:bg-white transition-colors rounded-sm shadow-md"
                            >
                                Close Editorial Card
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
