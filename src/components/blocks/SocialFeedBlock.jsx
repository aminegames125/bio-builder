import { useEffect } from 'react';

const SocialFeedBlock = ({ platform, username, height = 400 }) => {

    useEffect(() => {
        // Load Twitter widget script if needed
        if (platform === 'twitter') {
            const script = document.createElement('script');
            script.src = "https://platform.twitter.com/widgets.js";
            script.async = true;
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }
    }, [platform]);

    return (
        <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
            {platform === 'twitter' && (
                <div className="p-4 overflow-y-auto" style={{ height }}>
                    <a
                        className="twitter-timeline"
                        href={`https://twitter.com/${username}`}
                        data-height={height}
                    >
                        Tweets by {username}
                    </a>
                </div>
            )}

            {platform === 'instagram' && (
                <div className="flex items-center justify-center h-full p-8 text-center bg-gray-50">
                    <div>
                        <p className="text-gray-500 mb-2">Instagram Embed Placeholder</p>
                        <p className="text-xs text-gray-400">
                            (Instagram requires an access token for API embeds.
                            For a real app, we'd use a service like SnapWidget or the official Instagram Basic Display API.)
                        </p>
                        <a
                            href={`https://instagram.com/${username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-block text-primary-600 font-medium hover:underline"
                        >
                            View on Instagram &rarr;
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SocialFeedBlock;
