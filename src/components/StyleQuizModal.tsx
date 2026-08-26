import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, RefreshCw, Award, ArrowRight, Share2 } from 'lucide-react';

interface StyleQuizModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectArchetypeFilter?: (category: 'menswear' | 'womenswear' | 'unisex' | 'all') => void;
    onShowToast?: (message: string) => void;
}

const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: "What's your default outfit when heading out with friends or going to an event?",
        options: [
            { emoji: "🧥", text: "Boxy vintage leather jacket, plain crewneck tee & wide-leg denim", archetype: "Arch", category: "menswear" },
            { emoji: "🧥", text: "Flowing beige trench coat, minimal crop top & relaxed wide-leg trousers", archetype: "Flow", category: "womenswear" },
            { emoji: "🎶", text: "Heavyweight 400+ GSM hoodie, technical cargo pants & clean sneakers", archetype: "Street", category: "unisex" },
            { emoji: "🛍️", text: "Unique thrifted vintage knit, retro Y2K sunglasses & low-rise jeans", archetype: "Vintage", category: "womenswear" }
        ]
    },
    {
        id: 2,
        question: "When picking outerwear for cold evenings, what is your ultimate go-to?",
        options: [
            { emoji: "🧥", text: "Oversized leather jacket or structured coat for instant presence", archetype: "Arch", category: "menswear" },
            { emoji: "🧣", text: "Flowing trench coat or relaxed unconstructed blazer", archetype: "Flow", category: "womenswear" },
            { emoji: "🎒", text: "Cropped tactical puffer jacket or technical hoodie", archetype: "Street", category: "unisex" },
            { emoji: "⚡", text: "One-of-a-kind vintage thrift sweater with distinct textures", archetype: "Vintage", category: "womenswear" }
        ]
    },
    {
        id: 3,
        question: "What do you want your silhouette to say before you even speak?",
        options: [
            { emoji: "👑", text: "Unshakeable confidence, clean lines & sharp proportions.", archetype: "Arch", category: "menswear" },
            { emoji: "🌊", text: "Effortless casual elegance & fluid comfort.", archetype: "Flow", category: "womenswear" },
            { emoji: "⚡", text: "Urban street energy, raw attitude & authentic aura.", archetype: "Street", category: "unisex" },
            { emoji: "🎨", text: "Creative individuality mixing retro finds with modern staples.", archetype: "Vintage", category: "womenswear" }
        ]
    },
    {
        id: 4,
        question: "Pick your ultimate color palette for daily fits:",
        options: [
            { emoji: "🖤", text: "Obsidian Black, Distressed Leather & Charcoal Grey", archetype: "Arch", category: "menswear" },
            { emoji: "🌾", text: "Trench Beige, Soft Cream & Warm Cinnamon", archetype: "Flow", category: "womenswear" },
            { emoji: "🏙️", text: "Urban Slate, Dark Denim & Tactical Crimson", archetype: "Street", category: "unisex" },
            { emoji: "🔥", text: "Vintage Mustard, Washed Blue & Subtle Gold", archetype: "Vintage", category: "womenswear" }
        ]
    }
];

export const ARCHETYPES: Record<string, { title: string; subtitle: string; description: string; colors: string[]; matchingCategory: 'menswear' | 'womenswear' | 'unisex' }> = {
    Arch: {
        title: "Oversized Leather & Tailored Denim",
        subtitle: "Sharp Proportions & Natural Aura",
        description: "Your style blends clean street proportions with statement leather coats and wide-leg denim. You project natural poise and clean aesthetic confidence.",
        colors: ["#1c1917", "#44403c", "#d6d3d1"],
        matchingCategory: "menswear"
    },
    Flow: {
        title: "Fluid Urban Chic",
        subtitle: "Trench Layers & Relaxed Trousers",
        description: "You embody relaxed elegance. You love pairing flowing coats with minimal base layers and wide-leg trousers for a sleek, comfortable daily flow.",
        colors: ["#78716c", "#a8a29e", "#f5f5f4"],
        matchingCategory: "womenswear"
    },
    Street: {
        title: "Technical Streetwear & Cargos",
        subtitle: "Heavy Hoodies & Utility Outerwear",
        description: "Your daily uniform revolves around heavy cotton hoodies, tactical puffer jackets, and multi-pocket cargo pants built for urban comfort.",
        colors: ["#09090b", "#3f3f46", "#e4e4e7"],
        matchingCategory: "unisex"
    },
    Vintage: {
        title: "Vintage Thrifting & Y2K Aesthetics",
        subtitle: "Retro Knits & Unique Character",
        description: "You love hunting for one-of-a-kind vintage pieces. You pair retro knits, Y2K frames, and low-rise denim to curate unrepeatable outfits.",
        colors: ["#854d0e", "#ca8a04", "#18181b"],
        matchingCategory: "womenswear"
    }
};

export const StyleQuizModal: React.FC<StyleQuizModalProps> = ({
    isOpen,
    onClose,
    onSelectArchetypeFilter,
    onShowToast
}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [result, setResult] = useState<keyof typeof ARCHETYPES | null>(null);

    const handleSelectOption = (archetype: string) => {
        const nextAnswers = [...answers, archetype];
        setAnswers(nextAnswers);

        if (currentStep + 1 < QUIZ_QUESTIONS.length) {
            setCurrentStep(currentStep + 1);
        } else {
            const counts: Record<string, number> = {};
            nextAnswers.forEach(a => { counts[a] = (counts[a] || 0) + 1; });
            let dominant = nextAnswers[0];
            let maxCount = 0;
            Object.entries(counts).forEach(([k, v]) => {
                if (v > maxCount) {
                    maxCount = v;
                    dominant = k;
                }
            });
            setResult(dominant as keyof typeof ARCHETYPES);
        }
    };

    const handleReset = () => {
        setCurrentStep(0);
        setAnswers([]);
        setResult(null);
    };

    const handleViewFits = () => {
        if (!result) return;
        const cat = ARCHETYPES[result].matchingCategory;
        if (onSelectArchetypeFilter) {
            onSelectArchetypeFilter(cat);
        }
        onClose();
        setTimeout(() => {
            const el = document.getElementById('lookbook');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleShareResult = () => {
        if (!result) return;
        const text = `My Style Archetype is: ${ARCHETYPES[result].title} (${ARCHETYPES[result].subtitle}) - Discover your style match on Fashion: A Silent Language!`;
        navigator.clipboard.writeText(text);
        if (onShowToast) {
            onShowToast("✨ Style Card copied to clipboard!");
        }
    };

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
                        className="relative w-full max-w-2xl max-h-[90vh] bg-stone-900 text-stone-100 rounded-xl shadow-2xl border border-stone-800 flex flex-col overflow-hidden z-10"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-stone-800 flex justify-between items-center bg-stone-950/60">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-amber-400" />
                                </div>
                                <div>
                                    <span className="text-[11px] uppercase tracking-widest text-amber-400 font-mono font-bold">Style Discovery</span>
                                    <h3 className="text-xl font-serif text-white">Find Your Archetype</h3>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-full transition-colors cursor-pointer"
                                aria-label="Close quiz"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8 overflow-y-auto flex-1 custom-scrollbar">
                            {!result ? (
                                <div className="space-y-6">
                                    {/* Progress Bar */}
                                    <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
                                        <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
                                        <span className="text-amber-400 font-semibold">{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}%</span>
                                    </div>
                                    <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-amber-500 to-amber-400 h-full transition-all duration-500 ease-out"
                                            style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                                        />
                                    </div>

                                    <h4 className="text-xl md:text-2xl font-serif text-white leading-snug">
                                        {QUIZ_QUESTIONS[currentStep].question}
                                    </h4>

                                    <div className="space-y-3 pt-2">
                                        {QUIZ_QUESTIONS[currentStep].options.map((option, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleSelectOption(option.archetype)}
                                                className="w-full p-4 bg-stone-850 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/60 rounded-xl text-left transition-all duration-200 flex items-center justify-between group cursor-pointer"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-xl shrink-0">{option.emoji}</span>
                                                    <span className="text-stone-200 group-hover:text-white font-sans text-sm md:text-base leading-snug">
                                                        {option.text}
                                                    </span>
                                                </div>
                                                <div className="w-6 h-6 rounded-full border border-stone-700 group-hover:border-amber-500 flex items-center justify-center shrink-0 transition-colors">
                                                    <Check className="w-3.5 h-3.5 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                /* Result Card View */
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-6 text-center py-2"
                                >
                                    <div className="inline-flex items-center justify-center p-3 bg-amber-500/20 border border-amber-500/40 rounded-full">
                                        <Award className="w-8 h-8 text-amber-400" />
                                    </div>

                                    <div>
                                        <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-semibold">Your Official Archetype</span>
                                        <h4 className="text-3xl font-serif text-white mt-1 mb-1">
                                            {ARCHETYPES[result].title}
                                        </h4>
                                        <p className="text-xs uppercase tracking-widest text-stone-400 font-mono">
                                            {ARCHETYPES[result].subtitle}
                                        </p>
                                    </div>

                                    <div className="p-6 bg-stone-950/80 border border-stone-800 rounded-xl max-w-lg mx-auto text-left space-y-4 shadow-inner">
                                        <p className="text-stone-300 text-sm leading-relaxed font-sans">
                                            {ARCHETYPES[result].description}
                                        </p>

                                        <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
                                            <span className="text-stone-500 font-mono uppercase">Recommended Fits:</span>
                                            <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded font-mono uppercase text-[11px] font-semibold">
                                                {ARCHETYPES[result].matchingCategory}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-3 max-w-lg mx-auto pt-2">
                                        <button
                                            onClick={handleViewFits}
                                            className="w-full py-4 bg-amber-400 text-stone-950 uppercase font-bold text-xs tracking-widest hover:bg-amber-300 transition-all rounded-lg shadow-xl flex items-center justify-center space-x-2 cursor-pointer"
                                        >
                                            <span>Show My Recommended Fits in Lookbook</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>

                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={handleShareResult}
                                                className="py-3 border border-stone-700 text-stone-300 hover:text-white hover:border-stone-500 rounded-lg text-xs uppercase tracking-wider font-mono flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                                            >
                                                <Share2 className="w-3.5 h-3.5 text-amber-400" />
                                                <span>Share Results</span>
                                            </button>

                                            <button
                                                onClick={handleReset}
                                                className="py-3 border border-stone-700 text-stone-300 hover:text-white hover:border-stone-500 rounded-lg text-xs uppercase tracking-wider font-mono flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                                            >
                                                <RefreshCw className="w-3.5 h-3.5" />
                                                <span>Retake Quiz</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
