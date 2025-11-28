import { motion } from 'framer-motion';
import AnimatedIcon from '../icons/AnimatedIcon';

const ButtonBlock = ({ label, url, style = 'primary', size = 'md', icon, width = 'full', className }) => {
    const styles = {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/30',
        secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 shadow-lg shadow-secondary-500/30',
        outline: 'border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white',
        ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
        white: 'bg-white text-gray-900 hover:bg-gray-50 shadow-md'
    };

    const sizes = {
        sm: 'py-2 px-4 text-sm',
        md: 'py-3 px-6 text-base',
        lg: 'py-4 px-8 text-lg font-bold'
    };

    const widthClass = width === 'full' ? 'w-full' : 'w-auto inline-flex';

    return (
        <div className={`flex ${width === 'full' ? 'w-full' : 'justify-center'}`}>
            <motion.a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
          ${widthClass} items-center justify-center gap-2 rounded-xl transition-all
          ${styles[style] || styles.primary}
          ${sizes[size] || sizes.md}
          ${className || ''}
        `}
            >
                {icon && <AnimatedIcon name={icon} size={20} />}
                {label}
            </motion.a>
        </div>
    );
};

export default ButtonBlock;
