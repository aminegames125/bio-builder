import { motion } from 'framer-motion';

const TextBlock = ({ content, align = 'left', style = 'paragraph', color, className }) => {
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

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${styles[style] || styles.paragraph} ${alignment[align]} ${className || ''}`}
            style={{ color: color }}
        >
            {content}
        </motion.div>
    );
};

export default TextBlock;
