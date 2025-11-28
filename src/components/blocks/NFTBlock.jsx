import { motion } from 'framer-motion';

const NFTBlock = ({ platform = 'opensea', contractAddress, tokenId, title, description }) => {
    // Mock display for NFT since real embeds often require scripts or API calls
    // In a real app, we might use the OpenSea Embed API or similar

    const getMarketplaceUrl = () => {
        if (platform === 'opensea') return `https://opensea.io/assets/${contractAddress}/${tokenId}`;
        if (platform === 'rarible') return `https://rarible.com/token/${contractAddress}:${tokenId}`;
        return '#';
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -4 }}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-800"
        >
            <div className="relative aspect-square bg-gray-800 flex items-center justify-center overflow-hidden">
                {/* Placeholder for NFT Image - in real app would fetch metadata */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 opacity-50 animate-pulse"></div>
                <div className="relative z-10 text-center p-6">
                    <span className="text-4xl mb-2 block">💎</span>
                    <p className="text-white/50 text-xs uppercase tracking-widest">NFT Asset</p>
                </div>

                {/* Platform Badge */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                    {platform === 'opensea' ? 'OpenSea' : 'Rarible'}
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-white font-bold text-lg truncate">{title || `NFT #${tokenId}`}</h3>
                {description && <p className="text-gray-400 text-sm mt-1 line-clamp-2">{description}</p>}

                <a
                    href={getMarketplaceUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block w-full py-2.5 bg-white text-black font-bold text-center rounded-xl hover:bg-gray-200 transition-colors"
                >
                    View on {platform === 'opensea' ? 'OpenSea' : 'Rarible'}
                </a>
            </div>
        </motion.div>
    );
};

export default NFTBlock;
