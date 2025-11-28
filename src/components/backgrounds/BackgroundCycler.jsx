import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackgroundCycler = ({ backgrounds, interval = 5000, showIndicator = true }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!backgrounds || backgrounds.length === 0) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
        }, interval);

        return () => clearInterval(timer);
    }, [backgrounds, interval]);

    if (!backgrounds || backgrounds.length === 0) return null;

    const currentBg = backgrounds[currentIndex];

    return (
        <>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    className={`fixed inset-0 -z-10 ${currentBg.class}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                />
            </AnimatePresence>

            {showIndicator && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                    <div className="bg-black/50 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-3">
                        <div className="text-white text-sm font-medium">
                            {currentBg.name}
                        </div>
                        <div className="flex gap-2">
                            {backgrounds.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                            ? 'bg-white w-6'
                                            : 'bg-white/40 hover:bg-white/60'
                                        }`}
                                    aria-label={`Go to background ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BackgroundCycler;
