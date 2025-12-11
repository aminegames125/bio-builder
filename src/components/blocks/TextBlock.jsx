import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { mapIconName } from '../../utils/iconMapper';

const TextBlock = ({ 
    content, 
    align = 'left', 
    style = 'paragraph', 
    color, 
    className,
    icon,
    iconPosition = 'before',
    iconSize,
    iconAnimation = 'none',
    iconColor
}) => {
    const styles = {
        h1: 'text-3xl font-bold mb-4',
        h2: 'text-2xl font-bold mb-3',
        h3: 'text-xl font-semibold mb-2',
        paragraph: 'text-base leading-relaxed mb-4',
        quote: 'text-lg italic border-l-4 border-primary-500 pl-4 py-2 my-4 bg-gray-50 rounded-r-lg',
        caption: 'text-sm text-gray-500 uppercase tracking-wide'
    };

    const alignment = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify'
    };

    // Determine icon size based on text style if not provided
    const getIconSize = () => {
        if (iconSize) return iconSize;
        switch (style) {
            case 'h1': return 32;
            case 'h2': return 24;
            case 'h3': return 20;
            default: return 18;
        }
    };

    // Map friendly icon name to Lucide icon name
    const lucideIconName = icon ? mapIconName(icon) : null;
    const IconComponent = lucideIconName ? LucideIcons[lucideIconName] : null;

    const iconElement = IconComponent ? (
        <IconComponent 
            size={getIconSize()} 
            color={iconColor || color || 'currentColor'}
            className={iconPosition === 'before' ? 'mr-2 inline-block' : 'ml-2 inline-block'}
        />
    ) : null;

    const isFlexLayout = align === 'center' || align === 'left' || align === 'right';
    const flexClass = isFlexLayout && icon ? `flex items-center ${alignment[align] === 'text-center' ? 'justify-center' : alignment[align] === 'text-right' ? 'justify-end' : 'justify-start'}` : '';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${styles[style] || styles.paragraph} ${!isFlexLayout || !icon ? alignment[align] : ''} ${flexClass} ${className || ''}`}
            style={{ color: color }}
        >
            {icon && iconPosition === 'before' && iconElement}
            <span>{content}</span>
            {icon && iconPosition === 'after' && iconElement}
        </motion.div>
    );
};

export default TextBlock;
