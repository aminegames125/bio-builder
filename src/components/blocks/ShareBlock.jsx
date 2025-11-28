import { motion } from 'framer-motion';
import AnimatedIcon from '../icons/AnimatedIcon';

const ShareBlock = ({ url, title, text }) => {
    const shareData = {
        title: title || document.title,
        text: text || 'Check out this bio page!',
        url: url || window.location.href
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(shareData.url);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="w-full py-3 px-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 
                 flex items-center justify-center gap-2 text-gray-700 font-medium hover:bg-white transition-all"
        >
            <AnimatedIcon name="Share2" size={20} />
            <span>Share this page</span>
        </motion.button>
    );
};

export default ShareBlock;
