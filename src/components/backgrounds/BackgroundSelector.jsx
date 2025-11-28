import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackgroundSelector = ({ onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentBg, setCurrentBg] = useState(null);

    const backgrounds = {
        gradients: [
            { name: 'Ocean', class: 'bg-gradient-ocean', category: 'Static Gradient' },
            { name: 'Sunset', class: 'bg-gradient-sunset', category: 'Static Gradient' },
            { name: 'Neon', class: 'bg-gradient-neon', category: 'Static Gradient' },
            { name: 'Purple Dream', class: 'bg-gradient-purple-dream', category: 'Static Gradient' },
            { name: 'Fire', class: 'bg-gradient-fire', category: 'Static Gradient' },
            { name: 'Aurora', class: 'bg-gradient-aurora', category: 'Static Gradient' },
            { name: 'Cosmic', class: 'bg-gradient-cosmic', category: 'Static Gradient' },
            { name: 'Instagram', class: 'bg-gradient-instagram', category: 'Static Gradient' },
            { name: 'Tropical', class: 'bg-gradient-tropical', category: 'Static Gradient' },
            { name: 'Mint', class: 'bg-gradient-mint', category: 'Static Gradient' },
        ],
        animated: [
            { name: 'Animated Sunset', class: 'gradient-animated-sunset', category: 'Animated Gradient' },
            { name: 'Animated Ocean', class: 'gradient-animated-ocean', category: 'Animated Gradient' },
            { name: 'Animated Neon', class: 'gradient-animated-neon', category: 'Animated Gradient' },
            { name: 'Animated Aurora', class: 'gradient-animated-aurora', category: 'Animated Gradient' },
            { name: 'Holographic', class: 'gradient-animated-holographic', category: 'Animated Gradient' },
            { name: 'Fire Animation', class: 'gradient-animated-fire', category: 'Animated Gradient' },
            { name: 'Cosmic Flow', class: 'gradient-animated-cosmic', category: 'Animated Gradient' },
            { name: 'Instagram Flow', class: 'gradient-animated-instagram', category: 'Animated Gradient' },
        ],
        patterns: [
            { name: 'Dots', class: 'bg-pattern-dots', category: 'Static Pattern' },
            { name: 'Grid', class: 'bg-pattern-grid', category: 'Static Pattern' },
            { name: 'Diagonal Lines', class: 'bg-pattern-diagonal-lines', category: 'Static Pattern' },
            { name: 'Checkerboard', class: 'bg-pattern-checkerboard', category: 'Static Pattern' },
            { name: 'Circles', class: 'bg-pattern-circles', category: 'Static Pattern' },
        ],
        animatedPatterns: [
            { name: 'Moving Grid', class: 'bg-pattern-animated-grid', category: 'Animated Pattern' },
            { name: 'Moving Dots', class: 'bg-pattern-animated-dots', category: 'Animated Pattern' },
            { name: 'Pulse Dots', class: 'bg-pattern-pulse-dots', category: 'Animated Pattern' },
            { name: 'Pulse Grid', class: 'bg-pattern-pulse-grid', category: 'Animated Pattern' },
            { name: 'Wave Dots', class: 'bg-pattern-wave-dots', category: 'Animated Pattern' },
            { name: 'Wave Grid', class: 'bg-pattern-wave-grid', category: 'Animated Pattern' },
            { name: 'Slide Stripes', class: 'bg-pattern-slide-stripes', category: 'Animated Pattern' },
            { name: 'Zoom Dots', class: 'bg-pattern-zoom-dots', category: 'Animated Pattern' },
            { name: 'Rainbow Grid', class: 'bg-pattern-rainbow-grid', category: 'Animated Pattern' },
            { name: 'Matrix', class: 'bg-pattern-animated-matrix', category: 'Animated Pattern' },
            { name: 'Cosmic', class: 'bg-pattern-animated-cosmic', category: 'Animated Pattern' },
            { name: 'Neon Grid', class: 'bg-pattern-animated-neon-grid', category: 'Animated Pattern' },
        ],
        composite: [
            { name: 'Ocean Grid', class: 'bg-composite-ocean-grid', category: 'Composite' },
            { name: 'Sunset Dots', class: 'bg-composite-sunset-dots', category: 'Composite' },
            { name: 'Neon Stripes', class: 'bg-composite-neon-stripes', category: 'Composite' },
            { name: 'Aurora Dots', class: 'bg-composite-aurora-dots', category: 'Composite' },
            { name: 'Cosmic Grid', class: 'bg-composite-cosmic-grid', category: 'Composite' },
            { name: 'Fire Diagonals', class: 'bg-composite-fire-diagonals', category: 'Composite' },
            { name: 'Instagram Circles', class: 'bg-composite-instagram-circles', category: 'Composite' },
            { name: 'Animated Ocean', class: 'bg-composite-animated-ocean', category: 'Composite Animated' },
            { name: 'Animated Neon', class: 'bg-composite-animated-neon', category: 'Composite Animated' },
            { name: 'Matrix Grid', class: 'bg-composite-animated-matrix', category: 'Composite Animated' },
        ],
        mesh: [
            { name: 'Mesh Sunset', class: 'bg-mesh-sunset', category: 'Mesh Gradient' },
            { name: 'Mesh Ocean', class: 'bg-mesh-ocean', category: 'Mesh Gradient' },
            { name: 'Mesh Cosmic', class: 'bg-mesh-cosmic', category: 'Mesh Gradient' },
        ],
        special: [
            { name: 'Spotlight', class: 'bg-spotlight', category: 'Special Effect' },
            { name: 'Laser Grid', class: 'bg-laser-grid', category: 'Special Effect' },
            { name: 'Nebula', class: 'bg-nebula', category: 'Special Effect' },
        ],
    };

    const allBackgrounds = Object.values(backgrounds).flat();
    const categories = ['all', ...Object.keys(backgrounds)];

    const filteredBgs = selectedCategory === 'all'
        ? allBackgrounds
        : backgrounds[selectedCategory] || [];

    const handleSelect = (bg) => {
        setCurrentBg(bg);
        if (onSelect) onSelect(bg);
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 right-4 z-50 px-4 py-2 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black/70 transition-all flex items-center gap-2"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                Backgrounds
            </button>

            {/* Selector Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 20 }}
                        className="fixed right-0 top-0 h-screen w-96 bg-black/90 backdrop-blur-xl border-l border-white/10 z-50 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-white">Backgrounds</h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white/60 hover:text-white transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Category Filters */}
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${selectedCategory === cat
                                                ? 'bg-white text-black'
                                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                                            }`}
                                    >
                                        {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Background Grid */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="grid grid-cols-2 gap-3">
                                {filteredBgs.map((bg, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSelect(bg)}
                                        className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${currentBg?.class === bg.class
                                                ? 'border-white scale-105'
                                                : 'border-white/20 hover:border-white/40 hover:scale-105'
                                            }`}
                                    >
                                        <div className={`absolute inset-0 ${bg.class}`} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                        <div className="absolute bottom-2 left-2 right-2">
                                            <div className="text-white text-xs font-medium truncate">
                                                {bg.name}
                                            </div>
                                            <div className="text-white/60 text-xxs">
                                                {bg.category}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-white/10">
                            <div className="text-white/60 text-xs text-center">
                                {filteredBgs.length} background{filteredBgs.length !== 1 ? 's' : ''}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default BackgroundSelector;
