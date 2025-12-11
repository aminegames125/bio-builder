import { useEffect, useMemo } from 'react';

const SocialFeedBlock = ({ platform = 'twitter', username = '', height = 400, posts_count = 3 }) => {
    const handle = useMemo(() => (username || '').replace(/^@+/, ''), [username]);

    useEffect(() => {
        if (platform !== 'twitter') return;

        const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
        if (!existingScript) {
            const script = document.createElement('script');
            script.src = 'https://platform.twitter.com/widgets.js';
            script.async = true;
            document.body.appendChild(script);
        } else {
            // Re-run widget rendering when username changes
            window.twttr?.widgets?.load();
        }
    }, [platform, handle]);

    if (!handle) {
        return (
            <div className="w-full bg-white rounded-2xl shadow-lg p-6 text-center text-gray-500">
                Add a username to render the social feed.
            </div>
        );
    }

    return (
        <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
            {platform === 'twitter' && (
                <div className="p-4 overflow-y-auto" style={{ height }}>
                    <a
                        className="twitter-timeline"
                        href={`https://twitter.com/${handle}`}
                        data-height={height}
                        data-tweet-limit={posts_count}
                        data-chrome="nofooter"
                    >
                        Tweets by {handle}
                    </a>
                </div>
            )}

            {platform === 'instagram' && (
                <div className="relative" style={{ height }}>
                    <iframe
                        src={`https://www.instagram.com/${handle}/embed`}
                        width="100%"
                        height="100%"
                        allowTransparency
                        frameBorder="0"
                        scrolling="no"
                        title={`Instagram feed for ${handle}`}
                        className="bg-gray-50"
                    ></iframe>
                    <div className="absolute inset-x-0 bottom-0 p-3 text-center text-xs text-gray-400 bg-gradient-to-t from-white to-transparent">
                        <a
                            href={`https://instagram.com/${handle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 font-medium hover:underline"
                        >
                            View on Instagram →
                        </a>
                    </div>
                </div>
            )}

            {platform !== 'twitter' && platform !== 'instagram' && (
                <div className="p-6 text-center text-gray-500">
                    Social feed for {platform} is not supported yet.
                </div>
            )}
        </div>
    );
};

export default SocialFeedBlock;
