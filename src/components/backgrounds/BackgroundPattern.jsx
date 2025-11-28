import { useEffect } from 'react';

const BackgroundPattern = ({ config }) => {
    useEffect(() => {
        // Cleanup function to remove classes when component unmounts
        return () => {
            document.body.className = document.body.className
                .split(' ')
                .filter(cls => !cls.startsWith('bg-') && !cls.startsWith('gradient-'))
                .join(' ');
            document.body.style.backgroundColor = '';
        };
    }, []);

    useEffect(() => {
        if (!config) {
            // Clear body classes if no config
            document.body.className = document.body.className
                .split(' ')
                .filter(cls => !cls.startsWith('bg-') && !cls.startsWith('gradient-'))
                .join(' ');
            document.body.style.backgroundColor = '';
            return;
        }

        const {
            type,
            pattern,
            base_color,
            pattern_overlay,
            gradient_class,
            mesh_class,
            special_class,
            animated_pattern,
            composite_class
        } = config;

        let classes = '';

        if (type === 'solid') {
            // Solid color background
            classes = '';
        } else if (type === 'pattern') {
            // Pattern background (static or animated)
            classes = animated_pattern || pattern || 'bg-pattern-dots';
        } else if (type === 'gradient') {
            // Gradient background (static or animated)
            classes = gradient_class || 'bg-gradient-sunset';
        } else if (type === 'composite') {
            // Composite: gradient + pattern, or predefined composite class
            if (composite_class) {
                classes = composite_class;
            } else {
                classes = `${gradient_class || ''} ${pattern_overlay || ''}`.trim();
            }
        } else if (type === 'mesh') {
            // Mesh gradient
            classes = mesh_class || 'bg-mesh-sunset';
        } else if (type === 'special') {
            // Special effects (spotlight, laser, nebula)
            classes = special_class || 'bg-spotlight';
        } else if (type === 'animated-gradient') {
            // Animated gradient backgrounds
            classes = gradient_class || 'gradient-animated-sunset';
        } else if (type === 'animated-pattern') {
            // Animated pattern backgrounds
            classes = animated_pattern || 'bg-pattern-animated-grid';
        } else {
            // Fallback to gradient_class if provided
            classes = gradient_class || pattern || '';
        }

        // Remove old background classes from body
        const existingClasses = document.body.className
            .split(' ')
            .filter(cls => !cls.startsWith('bg-') && !cls.startsWith('gradient-'));

        // Add new background classes
        document.body.className = [...existingClasses, ...classes.split(' ')].filter(Boolean).join(' ');

        // Apply base color if provided
        if (base_color) {
            document.body.style.backgroundColor = base_color;
        } else {
            document.body.style.backgroundColor = '';
        }
    }, [config]);

    // Don't render anything - background is applied to body element
    return null;
};

export default BackgroundPattern;
