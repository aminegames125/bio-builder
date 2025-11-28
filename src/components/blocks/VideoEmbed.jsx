import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const VideoEmbed = ({
    platform = 'youtube',
    video_id,
    title,
    autoplay = false
}) => {
    const getEmbedUrl = () => {
        switch (platform.toLowerCase()) {
            case 'youtube':
                return `https://www.youtube.com/embed/${video_id}${autoplay ? '?autoplay=1' : ''}`;
            case 'vimeo':
                return `https://player.vimeo.com/video/${video_id}${autoplay ? '?autoplay=1' : ''}`;
            case 'tiktok':
                return `https://www.tiktok.com/embed/${video_id}`;
            default:
                return '';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
        >
            {title && (
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Play className="size-5 text-primary-500" />
                    {title}
                </h3>
            )}

            <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-lg">
                <iframe
                    src={getEmbedUrl()}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={title || 'Video embed'}
                />
            </div>
        </motion.div>
    );
};

export default VideoEmbed;
