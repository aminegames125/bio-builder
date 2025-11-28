import { motion } from 'framer-motion';

const MusicBlock = ({ platform, url, title, artist, cover, ...props }) => {

    const getEmbedUrl = () => {
        // Handle track_id if provided (for Spotify)
        if (platform === 'spotify' && !url && props.track_id) {
            return `https://open.spotify.com/embed/track/${props.track_id}`;
        }

        // Return null if url is not provided
        if (!url) return null;

        if (platform === 'spotify') {
            // Convert https://open.spotify.com/track/ID to embed URL
            const id = url.split('/').pop().split('?')[0];
            return `https://open.spotify.com/embed/track/${id}`;
        } else if (platform === 'soundcloud') {
            return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
        } else if (platform === 'applemusic') {
            // Convert https://music.apple.com/us/album/song/ID to embed
            const parts = url.split('/');
            const id = parts.pop(); // ID
            const name = parts.pop(); // Album/Song name
            const type = parts.pop(); // album or song
            return `https://embed.music.apple.com/us/${type}/${name}/${id}`;
        }
        return url;
    };

    const embedUrl = getEmbedUrl();

    // Don't render if no valid URL
    if (!embedUrl) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full overflow-hidden rounded-2xl shadow-lg bg-white"
        >
            {platform === 'spotify' && (
                <iframe
                    style={{ borderRadius: '12px' }}
                    src={embedUrl}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                ></iframe>
            )}

            {platform === 'soundcloud' && (
                <iframe
                    width="100%"
                    height="166"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src={embedUrl}
                ></iframe>
            )}

            {platform === 'applemusic' && (
                <iframe
                    allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                    frameBorder="0"
                    height="175"
                    style={{ width: '100%', maxWidth: '660px', overflow: 'hidden', background: 'transparent' }}
                    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                    src={embedUrl}
                ></iframe>
            )}

            {/* Fallback/Custom Player UI could go here */}
        </motion.div>
    );
};

export default MusicBlock;
