import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { mapIconName } from '../../utils/iconMapper';

const AnimatedIcon = ({
    name = 'Heart',
    size = 24,
    color = 'currentColor',
    animation = 'scale',
    hover = true,
    className = ''
}) => {
    // Map friendly icon name to Lucide icon name
    const lucideIconName = mapIconName(name);
    const IconComponent = LucideIcons[lucideIconName];

    if (!IconComponent) {
        console.warn(`Icon "${name}" (mapped to "${lucideIconName}") not found in Lucide`);
        return null;
    }

    // Animation variants
    const animations = {
        scale: {
            initial: { scale: 0, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            hover: { scale: 1.2, rotate: 5 },
            tap: { scale: 0.9 }
        },
        bounce: {
            initial: { y: -20, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            hover: { y: -5 },
            transition: { type: 'spring', stiffness: 300, damping: 10 }
        },
        rotate: {
            initial: { rotate: -180, opacity: 0 },
            animate: { rotate: 0, opacity: 1 },
            hover: { rotate: 360 },
            transition: { duration: 0.5 }
        },
        pulse: {
            animate: {
                scale: [1, 1.1, 1],
                opacity: [1, 0.8, 1]
            },
            transition: {
                repeat: Infinity,
                duration: 2
            }
        },
        shake: {
            hover: {
                x: [0, -5, 5, -5, 5, 0],
                transition: { duration: 0.5 }
            }
        },
        flip: {
            initial: { rotateY: 90, opacity: 0 },
            animate: { rotateY: 0, opacity: 1 },
            hover: { rotateY: 180 },
            transition: { duration: 0.6 }
        },
        glow: {
            hover: {
                filter: 'drop-shadow(0 0 8px currentColor)',
                scale: 1.1
            }
        },
        spin: {
            animate: { rotate: 360 },
            transition: {
                repeat: Infinity,
                duration: 2,
                ease: 'linear'
            }
        },
        none: {
            initial: {},
            animate: {},
            hover: {}
        }
    };

    const animationConfig = animations[animation] || animations.scale;

    return (
        <motion.div
            className={`inline-flex items-center justify-center ${className}`}
            initial={animationConfig.initial}
            animate={animationConfig.animate}
            whileHover={hover ? animationConfig.hover : undefined}
            whileTap={animationConfig.tap}
            transition={animationConfig.transition}
        >
            <IconComponent size={size} color={color} />
        </motion.div>
    );
};

export default AnimatedIcon;
