import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import AnimatedIcon from '../icons/AnimatedIcon';

const LinkCard = ({
    title,
    description,
    url,
    icon,
    icon_gradient,
    featured = false,
    thumbnail
}) => {
    const gradientStyle = icon_gradient && icon_gradient.length >= 2
        ? { background: `linear-gradient(135deg, ${icon_gradient[0]}, ${icon_gradient[1]})` }
        : { background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))' };

    // Handle both emoji and animated icon
    const renderIcon = () => {
        if (typeof icon === 'string') {
            // Emoji string
            return <span className="text-2xl">{icon}</span>;
        } else if (icon && icon.type === 'animated') {
            // Animated icon object
            return (
                <AnimatedIcon
                    name={icon.name}
                    size={icon.size || 24}
                    color={icon.color || '#FFFFFF'}
                    animation={icon.animation || 'scale'}
                    hover={icon.hover_effect !== false}
                />
            );
        }
        // Default emoji
        return <span className="text-2xl">🔗</span>;
    };

    return (
        <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`
        block p-6 bg-white rounded-2xl shadow-lg
        border transition-all duration-300
        hover:shadow-xl
        ${featured ? 'border-primary-400 ring-2 ring-primary-200' : 'border-gray-100'}
      `}
        >
            {thumbnail && (
                <div className="w-full h-32 mb-4 rounded-xl overflow-hidden">
                    <img
                        src={thumbnail}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div className="flex items-center gap-4">
                <div
                    className="size-12 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                    style={gradientStyle}
                >
                    {renderIcon()}
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                        {title}
                    </h3>
                    {description && (
                        <p className="text-sm text-gray-500 line-clamp-2">
                            {description}
                        </p>
                    )}
                </div>

                <ExternalLink
                    className="size-5 text-gray-400 flex-shrink-0 group-hover:text-primary-500 transition-colors"
                />
            </div>
        </motion.a>
    );
};

export default LinkCard;
