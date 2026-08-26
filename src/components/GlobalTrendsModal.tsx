import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Globe, ArrowUpRight, Compass } from 'lucide-react';
import { GLOBAL_TRENDS } from '../data/fashionData';

interface GlobalTrendsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const GlobalTrendsModal: React.FC<GlobalTrendsModalProps> = ({ isOpen, onClose }) => {
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
                        className="relative w-full max-w-5xl max-h-[90vh] bg-stone-900 text-stone-100 rounded-xl shadow-2xl border border-stone-800 flex flex-col overflow-hidden z-10"
                    >
                        {/* Header */}
                        <div className="p-6 md:p-8 border-b border-stone-800 flex justify-between items-center bg-stone-950/60">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                                    <Globe className="w-4 h-4 text-amber-400" />
                                </div>
                                <div>
                                    <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-semibold">Streetwear Report</span>
                                    <h3 className="text-2xl font-serif text-white">2026 Trend Radar</h3>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-full transition-colors cursor-pointer"
                                aria-label="Close trends"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {GLOBAL_TRENDS.map((trend) => (
                                    <div key={trend.city} className="bg-stone-950/80 rounded-xl border border-stone-800 overflow-hidden flex flex-col group hover:border-amber-500/50 transition-colors">
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={trend.image}
                                                alt={trend.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute top-3 left-3 bg-amber-400 text-stone-950 px-3 py-1 text-xs uppercase tracking-widest font-mono font-bold rounded">
                                                {trend.city}
                                            </div>
                                            <div className="absolute top-3 right-3 bg-stone-900 text-stone-200 border border-stone-700 px-3 py-1 text-xs uppercase tracking-wider font-semibold rounded">
                                                {trend.focus}
                                            </div>
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                            <div>
                                                <h4 className="text-xl font-serif text-white mb-2 flex items-center justify-between">
                                                    <span>{trend.title}</span>
                                                    <ArrowUpRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                </h4>
                                                <p className="text-sm text-stone-300 leading-relaxed font-sans mb-3">
                                                    {trend.description}
                                                </p>
                                            </div>

                                            <div className="pt-3 border-t border-stone-800 flex items-start space-x-2 text-xs text-amber-400 font-mono">
                                                <Compass className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                                                <span><strong>2026 Vibe:</strong> {trend.trendVibe}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-stone-800 bg-stone-950/60 flex justify-between items-center text-xs text-stone-400">
                            <span>Curated Urban Hubs</span>
                            <button
                                onClick={onClose}
                                className="px-6 py-2.5 bg-amber-400 text-stone-950 uppercase font-bold text-xs tracking-widest hover:bg-amber-300 transition-colors rounded-lg cursor-pointer"
                            >
                                Close Report
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
