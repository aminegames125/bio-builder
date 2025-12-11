import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const NFTBlock = ({
    platform = 'opensea',
    contractAddress,
    tokenId,
    title,
    name,
    description,
    image,
    marketplace_url,
    ctaText = 'View asset'
}) => {
    const [metadata, setMetadata] = useState(null);
    const [error, setError] = useState(null);

    const getMarketplaceUrl = () => {
        if (marketplace_url) return marketplace_url;
        if (platform === 'opensea' && contractAddress && tokenId) return `https://opensea.io/assets/${contractAddress}/${tokenId}`;
        if (platform === 'rarible' && contractAddress && tokenId) return `https://rarible.com/token/${contractAddress}:${tokenId}`;
        return '#';
    };

    useEffect(() => {
        const apiKey = import.meta.env.VITE_OPENSEA_API_KEY;
        if (!apiKey || !contractAddress || !tokenId) {
            return;
        }

        const controller = new AbortController();

        const fetchMetadata = async () => {
            try {
                const res = await fetch(
                    `https://api.opensea.io/api/v2/chain/ethereum/contract/${contractAddress}/nfts/${tokenId}`,
                    {
                        headers: { 'X-API-KEY': apiKey },
                        signal: controller.signal
                    }
                );

                if (!res.ok) throw new Error(`OpenSea responded with ${res.status}`);
                const json = await res.json();
                setMetadata(json.nft || null);
                setError(null);
            } catch (err) {
                if (controller.signal.aborted) return;
                console.error('Failed to fetch NFT metadata', err);
                setError('Could not load NFT metadata.');
            }
        };

        fetchMetadata();

        return () => controller.abort();
    }, [contractAddress, tokenId, platform]);

    const resolvedImage = metadata?.image_url || image;
    const resolvedTitle = title || metadata?.name || name || (tokenId ? `NFT #${tokenId}` : 'NFT Asset');
    const resolvedDescription = description || metadata?.description;
    const resolvedMarketplaceUrl = getMarketplaceUrl();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -4 }}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-800"
        >
            <div className="relative aspect-square bg-gray-800 flex items-center justify-center overflow-hidden">
                {resolvedImage ? (
                    <img
                        src={resolvedImage}
                        alt={resolvedTitle}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 opacity-50 animate-pulse"></div>
                )}
                <div className="relative z-10 text-center p-6 bg-black/30 backdrop-blur-sm rounded-xl">
                    <span className="text-4xl mb-2 block">💎</span>
                    <p className="text-white font-semibold">{resolvedTitle}</p>
                    {contractAddress && tokenId && (
                        <p className="text-white/60 text-xs mt-1">#{tokenId}</p>
                    )}
                </div>

                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10 capitalize">
                    {platform}
                </div>
            </div>

            <div className="p-4 space-y-3">
                {resolvedDescription && <p className="text-gray-400 text-sm line-clamp-3">{resolvedDescription}</p>}

                {error && (
                    <div className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-lg p-2">
                        {error}
                    </div>
                )}

                <a
                    href={resolvedMarketplaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2.5 bg-white text-black font-bold text-center rounded-xl hover:bg-gray-200 transition-colors"
                >
                    {ctaText} {platform ? `on ${platform.charAt(0).toUpperCase() + platform.slice(1)}` : ''}
                </a>
            </div>
        </motion.div>
    );
};

export default NFTBlock;
