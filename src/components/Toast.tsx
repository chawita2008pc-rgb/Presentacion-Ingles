import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info, X } from 'lucide-react';

interface ToastProps {
    message: string | null;
    onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    className="fixed bottom-6 right-6 z-50 max-w-sm bg-stone-900 text-stone-100 p-4 rounded-lg shadow-2xl border border-stone-700 flex items-start space-x-3"
                >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="flex-1 text-xs leading-relaxed font-sans text-stone-200">
                        {message}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 text-stone-400 hover:text-white rounded transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
