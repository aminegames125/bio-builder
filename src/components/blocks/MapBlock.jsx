import { motion } from 'framer-motion';

const MapBlock = ({ address, location, title, height = 300, zoom = 15, apiKey }) => {
    const resolvedAddress = address || location || 'New York, NY';
    const encodedAddress = encodeURIComponent(resolvedAddress);

    // Use Google Maps Embed API if API key is provided, otherwise use the free embed URL
    const getMapUrl = () => {
        if (apiKey) {
            return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}&zoom=${zoom}`;
        }
        // Free Google Maps embed (no API key required, but has usage limits)
        return `https://maps.google.com/maps?q=${encodedAddress}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full overflow-hidden rounded-2xl shadow-lg bg-white"
        >
            {title && (
                <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">{title}</h3>
                </div>
            )}
            <iframe
                width="100%"
                height={height}
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={getMapUrl()}
                title={title || resolvedAddress}
            ></iframe>
        </motion.div>
    );
};

export default MapBlock;
