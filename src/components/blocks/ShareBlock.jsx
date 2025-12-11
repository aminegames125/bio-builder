import { useMemo } from 'react';
import { motion } from 'framer-motion';
import AnimatedIcon from '../icons/AnimatedIcon';

const ShareBlock = ({ url, title, text, platforms = ['twitter', 'facebook', 'linkedin'] }) => {
    const shareUrl = useMemo(() => url || (typeof window !== 'undefined' ? window.location.href : ''), [url]);
    const shareText = text || 'Check out this bio page!';
    const shareTitle = title || (typeof document !== 'undefined' ? document.title : 'My Bio');

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
                return;
            } catch (err) {
                console.error('Error sharing:', err);
            }
        }

        try {
            await navigator.clipboard.writeText(shareUrl);
            alert('Link copied to clipboard!');
        } catch (err) {
            console.error('Copy failed', err);
        }
    };

    return (
        <div className="w-full bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-4">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="w-full py-3 px-6 rounded-lg bg-gray-900 text-white flex items-center justify-center gap-2 font-semibold hover:bg-gray-800 transition-all"
            >
                <AnimatedIcon name="Share2" size={20} />
                <span>Share this page</span>
            </motion.button>

            <div className="mt-3 flex flex-wrap gap-2">
                {platforms.map((platform) => {
                    const link = shareLinks[platform];
                    if (!link) return null;
                    const iconName = platform.charAt(0).toUpperCase() + platform.slice(1);

                    return (
                        <a
                            key={platform}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                        >
                            <AnimatedIcon name={iconName} size={16} />
                            <span className="capitalize">{platform}</span>
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default ShareBlock;
