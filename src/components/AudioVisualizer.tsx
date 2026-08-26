import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioVisualizer: React.FC<{ onToggle?: (playing: boolean) => void }> = ({ onToggle }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const oscillatorRef = useRef<OscillatorNode | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);

    const toggleAudio = () => {
        if (!isPlaying) {
            // Start ambient synth tone
            try {
                const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
                const ctx = new AudioContext();
                audioCtxRef.current = ctx;

                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                // Warm ambient drone frequency (A2 110Hz)
                osc.type = 'sine';
                osc.frequency.setValueAtTime(110, ctx.currentTime);

                gain.gain.setValueAtTime(0, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 2); // Soft volume fade-in

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start();
                oscillatorRef.current = osc;
                gainNodeRef.current = gain;

                setIsPlaying(true);
                if (onToggle) onToggle(true);
            } catch (err) {
                console.warn("Audio context not allowed or failed:", err);
            }
        } else {
            // Stop ambient soundscape
            if (gainNodeRef.current && audioCtxRef.current) {
                gainNodeRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 0.5);
                setTimeout(() => {
                    oscillatorRef.current?.stop();
                    audioCtxRef.current?.close();
                    setIsPlaying(false);
                    if (onToggle) onToggle(false);
                }, 500);
            } else {
                setIsPlaying(false);
                if (onToggle) onToggle(false);
            }
        }
    };

    useEffect(() => {
        return () => {
            if (audioCtxRef.current) {
                audioCtxRef.current.close();
            }
        };
    }, []);

    return (
        <button
            onClick={toggleAudio}
            className={`px-3 py-1.5 rounded-full border text-xs font-mono tracking-wider uppercase flex items-center space-x-2 transition-all duration-300 ${isPlaying
                    ? 'bg-stone-100 text-stone-900 border-white shadow-md'
                    : 'bg-stone-900/60 text-stone-300 border-stone-700 hover:border-stone-400 hover:text-white'
                }`}
            title={isPlaying ? "Mute Ambient Soundscape" : "Play Silent Language Soundscape"}
        >
            {isPlaying ? (
                <>
                    <Volume2 className="w-3.5 h-3.5 text-stone-900 animate-pulse" />
                    <span>Soundscape Active</span>
                </>
            ) : (
                <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Ambient Audio</span>
                </>
            )}
        </button>
    );
};
