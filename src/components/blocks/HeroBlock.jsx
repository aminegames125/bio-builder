import { motion } from 'framer-motion';

const HeroBlock = ({ title = 'Welcome', subtitle = '', buttonText = 'Explore', url = '#', align = 'center' }) => {
    const alignClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-2xl border border-gray-100 p-10 ${alignClass}`}
        >
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{title}</h1>
            {subtitle && <p className="mt-3 text-gray-600 text-sm md:text-base">{subtitle}</p>}
            {buttonText && url && (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center mt-6 px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
                >
                    {buttonText}
                </a>
            )}
        </motion.div>
    );
};

export default HeroBlock;
